const FinalSummary = ({ eventData, userSelections }) => {
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

  const renderSummaryItems = () => {
    const items = []
    
    Object.entries(userSelections).forEach(([step, data]) => {
      if (data && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          if (value && value !== 'no') {
            const displayKey = formatDisplayKey(key)
            
            // Special handling for candlesList to preserve line breaks
            if (key === 'candlesList' && typeof value === 'string') {
              const lines = value.split('\n').filter(line => line.trim())
              items.push(
                <div key={`${step}-${key}`} className="summary-item">
                  <strong>{displayKey}:</strong>
                  <div className="candles-list">
                    {lines.map((line, index) => (
                      <div key={index} className="candle-item">• {line.trim()}</div>
                    ))}
                  </div>
                </div>
              )
            } else {
              const displayValue = formatDisplayValue(key, value)
              items.push(
                <div key={`${step}-${key}`} className="summary-item">
                  <strong>{displayKey}:</strong>
                  <span>{displayValue}</span>
                </div>
              )
            }
          }
        })
      }
    })
    
    return items
  }


  return (
    <div className="final-summary">
      <h3>Resumen de tu Selección Musical</h3>
      <div className="summary-content">
        {renderSummaryItems()}
      </div>
    </div>
  )
}

export default FinalSummary
