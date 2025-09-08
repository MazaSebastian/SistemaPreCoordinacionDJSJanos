const EventConfirmation = ({ eventData, onConfirm }) => {
  const generateClientLink = () => {
    return `${window.location.origin}${window.location.pathname}?client=${eventData.code || '111111'}`
  }

  const handleConfirm = (confirmed) => {
    onConfirm(confirmed)
  }

  return (
    <div className="event-confirmation">
      <div className="header">
        <h1>✅ Confirmar Información del Evento</h1>
        <p>Por favor, verifica que los datos sean correctos</p>
      </div>
      
      <div className="event-details">
        <div className="detail-card">
          <h2>Información del Evento</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Cliente:</span>
              <span className="value">{eventData.clientName}</span>
            </div>
            <div className="detail-item">
              <span className="label">Tipo de Evento:</span>
              <span className="value">{eventData.eventType}</span>
            </div>
            <div className="detail-item">
              <span className="label">Fecha:</span>
              <span className="value">{eventData.date}</span>
            </div>
            <div className="detail-item">
              <span className="label">Horario:</span>
              <span className="value">{eventData.time}</span>
            </div>
            <div className="detail-item">
              <span className="label">Salón:</span>
              <span className="value">{eventData.venue}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="client-link">
        <p><strong>Enlace para enviar al cliente:</strong></p>
        <p className="link-description">Copia este enlace y envíalo a {eventData.clientName} para que pueda iniciar su selección musical</p>
        <div className="link-container">
          <input 
            type="text" 
            value={generateClientLink()} 
            readOnly 
            className="link-input"
          />
          <button 
            className="btn-copy"
            onClick={() => {
              navigator.clipboard.writeText(generateClientLink())
              alert('Enlace copiado al portapapeles')
            }}
          >
            📋 Copiar
          </button>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <button 
          className="btn-cancel"
          onClick={() => handleConfirm(false)}
        >
          <span>❌ Cancelar</span>
        </button>
        <button 
          className="btn-confirm"
          onClick={() => handleConfirm(true)}
        >
          <span>✅ Confirmar</span>
        </button>
      </div>
    </div>
  )
}

export default EventConfirmation
