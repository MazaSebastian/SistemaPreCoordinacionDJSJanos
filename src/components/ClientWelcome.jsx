const ClientWelcome = ({ eventData, clientLink, onStartSelection }) => {
  const getGreeting = () => {
    const name = eventData.clientName
    const eventType = eventData.eventType
    
    // Determinar género basado en el nombre (lógica simple)
    const isFemale = name.endsWith('a') || name.includes('María') || name.includes('Sofía') || name.includes('Ana')
    
    if (eventType === 'XV Años') {
      return `¡Bienvenida ${name} a la selección musical de tu XV años!`
    } else if (eventType === 'Boda') {
      return `¡Bienvenida ${name} a la selección musical de tu ${eventType}!`
    } else {
      const greeting = isFemale ? 'Bienvenida' : 'Bienvenido'
      return `¡${greeting} ${name} a la selección musical de tu ${eventType}!`
    }
  }

  return (
    <div className="client-welcome">
      <div className="header">
        <h1>🎉 {getGreeting()}</h1>
        <p>Vamos a personalizar la música perfecta para tu celebración especial</p>
      </div>
      
      
      <div className="welcome-actions">
        <button 
          className="btn-start"
          onClick={onStartSelection}
        >
          <span>Comenzar Selección Musical</span>
        </button>
      </div>
      
    </div>
  )
}

export default ClientWelcome
