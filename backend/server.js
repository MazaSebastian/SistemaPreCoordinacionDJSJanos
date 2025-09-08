const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Configuración del transporter de email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Función para formatear el email
const formatEmailContent = (eventData) => {
  const { eventType, userSelections } = eventData;
  
  let content = `
    <h2>🎵 Nueva Precoordinación Musical - ${eventType}</h2>
    <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
    <hr>
  `;

  // Agregar cada selección del usuario
  Object.entries(userSelections).forEach(([step, data]) => {
    if (data && Object.keys(data).length > 0) {
      content += `<h3>Paso ${step}</h3><ul>`;
      
      Object.entries(data).forEach(([key, value]) => {
        if (value && value !== '') {
          const displayKey = formatDisplayKey(key);
          const displayValue = formatDisplayValue(key, value);
          content += `<li><strong>${displayKey}:</strong> ${displayValue}</li>`;
        }
      });
      
      content += `</ul>`;
    }
  });

  content += `
    <hr>
    <p><em>Este email fue generado automáticamente por el Sistema de Precoordinación DJS</em></p>
  `;

  return content;
};

// Función para formatear las claves de display (similar a FinalSummary)
const formatDisplayKey = (key) => {
  const keyMap = {
    'eventType': 'Tipo de Evento',
    'style': 'Estilo',
    'receptionMusic': 'Música de Recepción',
    'dinnerMusic': 'Música de Cena',
    'receptionSuggestions': 'Sugerencias de Recepción',
    'dinnerSuggestions': 'Sugerencias de Cena',
    'hasCeremony': 'Ceremonia en el Salón',
    'ceremonySong': 'Canción para la Ceremonia',
    'entranceSong': 'Canción de Ingreso al Salón',
    'danceGenres': 'Géneros para Bailar',
    'favoriteArtists': 'Artistas Favoritos',
    'hasChoreography': 'Coreografía',
    'choreographySong': 'Canción de Coreografía',
    'hasCarioca': 'Entrada en Carioca',
    'cariocaSong': 'Canción para Carioca',
    'valsSong': 'Canción para el Vals',
    'brindisSong': 'Canción para el Brindis',
    'candleCeremony': 'Ceremonia de Velas',
    'ambientMusic': 'Música de Ambiente',
    'ambientNotes': 'Notas de Ambiente',
    'networkingMusic': 'Música para Networking',
    'networkingNotes': 'Notas de Networking',
    'hasPresentations': 'Presentaciones',
    'presentationMusic': 'Música para Presentaciones',
    'presentationNotes': 'Notas de Presentaciones',
    'hasCoffeeBreak': 'Coffee Break',
    'coffeeBreakMusic': 'Música para Coffee Break',
    'closingMusic': 'Música para el Cierre',
    'closingSong': 'Canción para el Cierre',
    'specificArtists': 'Artistas o Estilos Específicos',
    'birthdaySong': 'Canción de Cumpleaños',
    'hasActivities': 'Actividades Especiales',
    'activities': 'Actividades y Música',
    'hasEntrance': 'Ingreso al Salón',
    'entranceSong': 'Canción de Ingreso al Salón'
  };
  return keyMap[key] || key;
};

// Función para formatear los valores de display
const formatDisplayValue = (key, value) => {
  // Mapeos de estilos
  if (key === 'eventType' || key === 'style') {
    const styleMap = {
      'clasica_elegante': 'Clásica y Elegante',
      'moderna_contemporanea': 'Moderna y Contemporánea',
      'rustica_bohemia': 'Rústica y Bohemia',
      'tematica_especial': 'Temática Especial',
      'casual_relajado': 'Casual y Relajado',
      'divertido_animado': 'Divertido y Animado',
      'tematico': 'Temático (disfraces, etc.)',
      'intimo_familiar': 'Íntimo y Familiar',
      'conferencia': 'Conferencia / Seminario',
      'lanzamiento': 'Lanzamiento de Producto',
      'networking': 'Evento de Networking',
      'gala': 'Gala Corporativa',
      'team_building': 'Team Building',
      'premios': 'Ceremonia de Premios',
      'fiesta_empresa': 'Fiesta de Empresa'
    };
    return styleMap[value] || value;
  }

  // Mapeos de música
  if (key === 'receptionMusic' || key === 'dinnerMusic' || key === 'ambientMusic') {
    const musicMap = {
      'ambiental': 'Música Ambiental',
      'pop': 'Pop',
      'jazz': 'Jazz',
      'lounge': 'Lounge',
      'acusticos': 'Acústicos',
      'instrumental': 'Música Instrumental',
      'jazz_lounge': 'Jazz / Lounge',
      'ambient_electronic': 'Ambient / Electrónica Suave',
      'classical': 'Música Clásica',
      'world_music': 'World Music',
      'corporate_playlist': 'Playlist Corporativa Estándar'
    };
    return musicMap[value] || value;
  }

  // Valores Sí/No
  if (key === 'hasCeremony' || key === 'hasChoreography' || key === 'hasCarioca' || 
      key === 'hasActivities' || key === 'hasEntrance' || key === 'hasPresentations' || 
      key === 'hasCoffeeBreak') {
    return value === 'si' ? 'Sí' : 'No';
  }

  return value;
};

// Endpoint para enviar email
app.post('/api/send-precoordinacion', async (req, res) => {
  try {
    const { eventData } = req.body;

    if (!eventData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datos del evento requeridos' 
      });
    }

    const transporter = createTransporter();
    const emailContent = formatEmailContent(eventData);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `🎵 Nueva Precoordinación - ${eventData.eventType} - ${new Date().toLocaleDateString('es-ES')}`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Email enviado correctamente' 
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el email',
      error: error.message 
    });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor de precoordinación funcionando',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de precoordinación ejecutándose en puerto ${PORT}`);
  console.log(`📧 Email configurado para: ${process.env.EMAIL_TO || 'No configurado'}`);
  console.log(`🌐 CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;
