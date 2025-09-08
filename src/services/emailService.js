import emailjs from '@emailjs/browser'

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_qhkyorl'
const EMAILJS_TEMPLATE_ID = 'template_z0p72gf'
const EMAILJS_PUBLIC_KEY = 'kEXeGOz27a_L8PMs7'

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export const sendPrecoordinacionEmail = async (eventData, userSelections) => {
  try {
    console.log('📧 Enviando email con EmailJS...')
    
    // Formatear los datos para el template
    const templateParams = {
      to_email: 'djsebamaza@gmail.com',
      event_type: eventData.eventType,
      user_selections: JSON.stringify(userSelections, null, 2),
      date: new Date().toLocaleString('es-ES'),
      // Datos específicos del evento
      event_details: formatEventDetails(eventData, userSelections),
      // Elementos para mayor prioridad
      subject: `🎵 NUEVA PRECOORDINACIÓN - ${eventData.eventType} - ${new Date().toLocaleDateString('es-ES')}`,
      priority: 'high',
      importance: 'urgent',
      from_name: 'Sistema Precoordinación DJ',
      // Headers adicionales para prioridad
      x_priority: '1',
      x_msmail_priority: 'High',
      reply_to: 'djsebamaza@gmail.com',
      // Contenido destacado
      urgent_flag: 'URGENTE - Nueva Precoordinación Recibida',
      event_summary: getEventSummary(eventData, userSelections)
    }

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    console.log('✅ Email enviado exitosamente:', result)
    return { success: true, messageId: result.text }
    
  } catch (error) {
    console.error('❌ Error enviando email:', error)
    return { success: false, error: error.text || error.message }
  }
}

// Función para formatear los detalles del evento de forma más estética
const formatEventDetails = (eventData, userSelections) => {
  let details = `🎵 INFORMACIÓN MUSICAL DEL EVENTO\n`
  details += `═══════════════════════════════════════\n\n`
  
  // Agrupar información por categorías
  const categories = {
    '🎯 Información General': [],
    '🎵 Música Principal': [],
    '🎤 Canciones Específicas': [],
    '🎨 Artistas y Estilos': [],
    '🎪 Actividades Especiales': [],
    '📝 Notas Adicionales': []
  }
  
  Object.entries(userSelections).forEach(([step, data]) => {
    if (data && Object.keys(data).length > 0) {
      Object.entries(data).forEach(([key, value]) => {
        if (value && value !== '') {
          const displayKey = formatDisplayKey(key)
          const displayValue = formatDisplayValue(key, value)
          
          // Categorizar según el tipo de información
          if (key === 'style' || key === 'eventType') {
            categories['🎯 Información General'].push(`${displayKey}: ${displayValue}`)
          } else if (key.includes('Music') || key.includes('Genres') || key.includes('danceGenres')) {
            categories['🎵 Música Principal'].push(`${displayKey}: ${displayValue}`)
          } else if (key.includes('Song') || key.includes('waltz') || key.includes('toast') || key.includes('birthday')) {
            categories['🎤 Canciones Específicas'].push(`${displayKey}: ${displayValue}`)
          } else if (key.includes('artists') || key.includes('Artists') || key.includes('specific')) {
            categories['🎨 Artistas y Estilos'].push(`${displayKey}: ${displayValue}`)
          } else if (key.includes('has') || key.includes('choreography') || key.includes('carioca') || key.includes('activities')) {
            categories['🎪 Actividades Especiales'].push(`${displayKey}: ${displayValue}`)
          } else {
            categories['📝 Notas Adicionales'].push(`${displayKey}: ${displayValue}`)
          }
        }
      })
    }
  })
  
  // Construir el formato final
  Object.entries(categories).forEach(([category, items]) => {
    if (items.length > 0) {
      details += `${category}\n`
      details += `${'─'.repeat(category.length)}\n`
      items.forEach(item => {
        details += `  ✓ ${item}\n`
      })
      details += '\n'
    }
  })
  
  return details
}

// Función para formatear las claves (similar a FinalSummary)
const formatDisplayKey = (key) => {
  const keyMap = {
    'style': 'Estilo',
    'receptionMusic': 'Música de Recepción',
    'dinnerMusic': 'Música de Cena',
    'entranceSong': 'Canción de Ingreso',
    'danceGenres': 'Géneros para Bailar',
    'artists': 'Artistas Favoritos',
    'choreography': 'Coreografía',
    'waltzSong': 'Canción de Vals',
    'toastSong': 'Canción para el Brindis',
    'candlesCeremony': 'Ceremonia de Velas',
    'cariocaEntrance': 'Entrada en Carioca',
    'ambientMusic': 'Música de Ambiente',
    'networkingMusic': 'Música para Networking',
    'presentationMusic': 'Música para Presentaciones',
    'coffeeBreakMusic': 'Música para Coffee Break',
    'closingMusic': 'Música para el Cierre',
    'specificArtists': 'Artistas Específicos'
  }
  return keyMap[key] || key
}

// Función para formatear los valores
const formatDisplayValue = (key, value) => {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return value
}

// Función para crear un resumen destacado del evento
const getEventSummary = (eventData, userSelections) => {
  let summary = `🎉 NUEVA PRECOORDINACIÓN RECIBIDA\n\n`
  summary += `📅 Fecha: ${new Date().toLocaleDateString('es-ES')}\n`
  summary += `⏰ Hora: ${new Date().toLocaleTimeString('es-ES')}\n`
  summary += `🎵 Tipo de Evento: ${eventData.eventType}\n\n`
  
  // Destacar información clave
  const keyInfo = []
  Object.entries(userSelections).forEach(([step, data]) => {
    if (data && Object.keys(data).length > 0) {
      Object.entries(data).forEach(([key, value]) => {
        if (value && value !== '' && typeof value === 'string') {
          if (key.includes('Song') || key.includes('Music') || key.includes('artists')) {
            keyInfo.push(`• ${formatDisplayKey(key)}: ${value}`)
          }
        }
      })
    }
  })
  
  if (keyInfo.length > 0) {
    summary += `🎯 INFORMACIÓN CLAVE:\n${keyInfo.slice(0, 5).join('\n')}\n\n`
  }
  
  summary += `📧 Este email fue generado automáticamente por el Sistema de Precoordinación DJ`
  
  return summary
}
