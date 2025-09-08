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
      event_summary: getEventSummary(eventData, userSelections),
      // Datos estructurados para el template HTML
      event_info: getEventInfo(eventData, userSelections),
      music_selections: getMusicSelections(userSelections),
      special_activities: getSpecialActivities(userSelections),
      contact_info: getContactInfo()
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

// Función para formatear los detalles del evento exactamente como FinalSummary
const formatEventDetails = (eventData, userSelections) => {
  let details = `Resumen de tu Selección Musical\n\n`
  
  // Usar la misma lógica que FinalSummary
  Object.entries(userSelections).forEach(([step, data]) => {
    if (data && typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        if (value && value !== 'no') {
          const displayKey = formatDisplayKey(key)
          
          // Special handling for candlesList to preserve line breaks
          if (key === 'candlesList' && typeof value === 'string') {
            const lines = value.split('\n').filter(line => line.trim())
            details += `${displayKey}:\n`
            lines.forEach(line => {
              details += `• ${line.trim()}\n`
            })
            details += '\n'
          } else {
            const displayValue = formatDisplayValue(key, value)
            details += `${displayKey}: ${displayValue}\n`
          }
        }
      })
    }
  })
  
  return details
}

// Función para formatear las claves (exactamente igual a FinalSummary)
const formatDisplayKey = (key) => {
  const keyMap = {
    'style': 'Estilo',
    'receptionMusic': 'Música de Recepción',
    'receptionSuggestions': 'Sugerencias de Recepción',
    'dinnerMusic': 'Música de Cena',
    'dinnerSuggestions': 'Sugerencias de Cena',
    'receptionEntrance': 'Ingreso a Recepción',
    'receptionEntranceSong': 'Canción de Ingreso a Recepción',
    'salonEntranceSong': 'Canción de Ingreso al Salón',
    'danceGenres': 'Géneros para Tandas de Baile',
    'artists': 'Artistas Favoritos',
    'choreography': 'Coreografía',
    'choreographySong': 'Canción de Coreografía',
    'waltzDance': 'Canción de Vals',
    'waltzSong': 'Canción de Vals',
    'toastSong': 'Canción para el Brindis',
    'candlesCeremony': 'Ceremonia de Velas',
    'individualSongs': 'Canciones Individuales por Vela',
    'candlesList': 'Lista de Velas y Canciones',
    'candlesGeneralSong': 'Música General para Ceremonia de Velas',
    'cariocaEntrance': 'Entrada en Carioca',
    'cariocaEntranceSong': 'Canción de Entrada en Carioca',
    // Campos específicos para Bodas
    'hasCeremony': 'Ceremonia en el Salón',
    'ceremonySong': 'Canción para la Ceremonia',
    'ceremonyMusic': 'Música de Ceremonia',
    'ceremonySpecificSong': 'Canción Específica de Ceremonia',
    'receptionMusic': 'Música de Recepción',
    'receptionSuggestions': 'Sugerencias de Recepción',
    'hasChoreography': 'Coreografía',
    'choreographySong': 'Canción para la Coreografía',
    'hasCarioca': 'Entrada en Carioca',
    'cariocaSong': 'Canción para la Entrada en Carioca',
    // Campos específicos para Cumpleaños
    'ambientMusic': 'Música de Ambiente',
    'ambientSuggestions': 'Sugerencias de Ambiente',
    'hasEntrance': 'Ingreso al Salón',
    'entranceSong': 'Canción de Ingreso al Salón',
    'birthdaySong': 'Canción de Cumpleaños',
    'hasActivities': 'Actividades Especiales',
    'activities': 'Actividades y Música',
    'hasCarioca': 'Ingreso en Carioca',
    'cariocaSong': 'Canción para el Ingreso en Carioca',
    // Campos específicos para Corporativos
    'eventType': 'Tipo de Evento Corporativo',
    'ambientMusic': 'Música de Ambiente General',
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
    'specificArtists': 'Artistas o Estilos Específicos'
  }
  return keyMap[key] || key
}

// Función para formatear los valores (exactamente igual a FinalSummary)
const formatDisplayValue = (key, value) => {
  if (key === 'style') {
    const styleMap = {
      // XV Años
      'princesa_elegante': 'Princesa y Elegante',
      'moderna_trendy': 'Moderna y Trendy',
      'tematica_especial': 'Temática Especial',
      // Bodas
      'clasica_elegante': 'Clásica y Elegante',
      'moderna_contemporanea': 'Moderna y Contemporánea',
      'rustica_bohemia': 'Rústica y Bohemia',
      'tematica_especial': 'Temática Especial',
      // Cumpleaños
      'casual_relajado': 'Casual y Relajado',
      'divertido_animado': 'Divertido y Animado',
      'tematico': 'Temático (disfraces, etc.)',
      'intimo_familiar': 'Íntimo y Familiar',
      // Corporativos
      'conferencia': 'Conferencia / Seminario',
      'lanzamiento': 'Lanzamiento de Producto',
      'networking': 'Evento de Networking',
      'gala': 'Gala Corporativa',
      'team_building': 'Team Building',
      'premios': 'Ceremonia de Premios',
      'fiesta_empresa': 'Fiesta de Empresa'
    }
    return styleMap[value] || value
  }
  if (key === 'receptionMusic' || key === 'dinnerMusic' || key === 'ambientMusic') {
    const musicMap = {
      'ambiental': 'Música Ambiental',
      'pop': 'Pop',
      'pop_actual': 'Pop Actual',
      'jazz': 'Jazz',
      'lounge': 'Lounge',
      'acusticos': 'Acústicos',
      'rock_nacional': 'Rock Nacional',
      'rock': 'Rock',
      'rock_alternativo': 'Rock/Alternativo',
      'bossa': 'Bossa',
      'retro_vintage': 'Retro/Vintage',
      'latin_reggeaton': 'Latino/Reggaeton',
      'electronica': 'Música Electrónica',
      'mixto_variado': 'Mixto y Variado',
      // Corporativos
      'instrumental': 'Música Instrumental',
      'jazz_lounge': 'Jazz / Lounge',
      'ambient_electronic': 'Ambient / Electrónica Suave',
      'classical': 'Música Clásica',
      'world_music': 'World Music',
      'corporate_playlist': 'Playlist Corporativa Estándar'
    }
    return musicMap[value] || value
  }
  if (key === 'choreography' || key === 'hasCeremony' || key === 'hasChoreography' || key === 'hasCarioca' || key === 'hasActivities' || key === 'hasEntrance' || key === 'hasPresentations' || key === 'hasCoffeeBreak') {
    return value === 'si' ? 'Sí' : 'No'
  }
  if (key === 'ceremonyMusic') {
    const ceremonyMap = {
      'clasica': 'Música Clásica',
      'religiosa': 'Música Religiosa',
      'contemporanea': 'Música Contemporánea',
      'instrumental': 'Instrumental'
    }
    return ceremonyMap[value] || value
  }
  if (key === 'networkingMusic') {
    const networkingMap = {
      'conversational': 'Música Conversacional (volumen bajo)',
      'energetic': 'Música Energética (para motivar)',
      'sophisticated': 'Música Sofisticada',
      'international': 'Música Internacional',
      'local_artists': 'Artistas Locales',
      'no_music': 'Sin música (solo conversación)'
    }
    return networkingMap[value] || value
  }
  if (key === 'presentationMusic') {
    const presentationMap = {
      'minimal': 'Música Mínima / Ambiental',
      'corporate': 'Música Corporativa Estándar',
      'inspiring': 'Música Inspiracional',
      'tech': 'Música Tecnológica / Moderna',
      'custom': 'Música Personalizada'
    }
    return presentationMap[value] || value
  }
  if (key === 'coffeeBreakMusic') {
    const coffeeMap = {
      'relaxing': 'Música Relajante',
      'jazz': 'Jazz Suave',
      'acoustic': 'Música Acústica',
      'instrumental': 'Instrumental',
      'no_music': 'Sin música'
    }
    return coffeeMap[value] || value
  }
  if (key === 'closingMusic') {
    const closingMap = {
      'inspiring': 'Música Inspiracional',
      'celebratory': 'Música de Celebración',
      'professional': 'Música Profesional',
      'thank_you': 'Música de Agradecimiento',
      'corporate_anthem': 'Himno Corporativo',
      'no_music': 'Sin música'
    }
    return closingMap[value] || value
  }
  if (key === 'receptionMusic') {
    const receptionMap = {
      'ambiental': 'Música Ambiental',
      'pop': 'Pop',
      'jazz': 'Jazz',
      'lounge': 'Lounge',
      'acusticos': 'Acústicos'
    }
    return receptionMap[value] || value
  }
  if (key === 'danceGenres' && Array.isArray(value)) {
    return value.join(', ')
  }
  if (key === 'candlesList' && typeof value === 'string') {
    return value.split('\n').filter(line => line.trim()).map(line => `• ${line.trim()}`).join('\n')
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

// Función para obtener información estructurada del evento
const getEventInfo = (eventData, userSelections) => {
  const info = {
    type: eventData.eventType,
    date: new Date().toLocaleDateString('es-ES'),
    time: new Date().toLocaleTimeString('es-ES'),
    style: userSelections[1]?.style || 'No especificado'
  }
  return JSON.stringify(info, null, 2)
}

// Función para obtener selecciones musicales estructuradas
const getMusicSelections = (userSelections) => {
  const music = {
    reception: userSelections[2]?.receptionMusic || userSelections[2]?.ambientMusic,
    dinner: userSelections[2]?.dinnerMusic,
    entrance: userSelections[4]?.salonEntranceSong || userSelections[3]?.entranceSong,
    dance_genres: userSelections[5]?.danceGenres || [],
    artists: userSelections[6]?.artists || [],
    waltz: userSelections[8]?.waltzSong || userSelections[7]?.waltzSong,
    toast: userSelections[9]?.toastSong || userSelections[8]?.toastSong,
    birthday: userSelections[4]?.birthdaySong,
    networking: userSelections[3]?.networkingMusic,
    presentation: userSelections[4]?.presentationMusic,
    coffee_break: userSelections[5]?.coffeeBreakMusic,
    closing: userSelections[6]?.closingMusic
  }
  return JSON.stringify(music, null, 2)
}

// Función para obtener actividades especiales
const getSpecialActivities = (userSelections) => {
  const activities = {
    choreography: {
      has: userSelections[7]?.choreography || userSelections[9]?.hasChoreography,
      song: userSelections[7]?.choreographySong || userSelections[9]?.choreographySong
    },
    carioca: {
      has: userSelections[11]?.cariocaEntrance || userSelections[10]?.hasCarioca || userSelections[8]?.hasCarioca,
      song: userSelections[11]?.cariocaEntranceSong || userSelections[10]?.cariocaSong || userSelections[8]?.cariocaSong
    },
    candles: {
      has: userSelections[10]?.candlesCeremony,
      individual: userSelections[10]?.individualSongs,
      list: userSelections[10]?.candlesList
    },
    ceremony: {
      has: userSelections[3]?.hasCeremony,
      song: userSelections[3]?.ceremonySong
    },
    activities: {
      has: userSelections[7]?.hasActivities,
      description: userSelections[7]?.activities
    }
  }
  return JSON.stringify(activities, null, 2)
}

// Función para obtener información de contacto
const getContactInfo = () => {
  return JSON.stringify({
    system: 'Sistema de Precoordinación Musical',
    dj: 'DJ Seba Maza',
    email: 'djsebamaza@gmail.com',
    generated_at: new Date().toISOString()
  }, null, 2)
}
