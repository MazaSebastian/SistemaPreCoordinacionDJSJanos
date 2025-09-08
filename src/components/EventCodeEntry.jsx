import { useState } from 'react'
import TestLinks from './TestLinks'

const EventCodeEntry = ({ onSubmit }) => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (code.length !== 6) {
      alert('El código debe tener 6 dígitos')
      return
    }

    setIsLoading(true)
    
    // Simular búsqueda en base de datos
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(code)
    }, 1000)
  }

  return (
    <div className="event-code-entry">
      <div className="header">
        <h1>🎵 Sistema de Precoordinación Musical</h1>
        <p>Ingresa el código de tu evento para comenzar</p>
      </div>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="eventCode">Código del Evento</label>
            <input
              type="text"
              id="eventCode"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              maxLength="6"
              required
            />
            <small>Ingresa el código del evento para comenzar la precoordinación musical</small>
          </div>
          
          <button 
            type="submit" 
            className="btn-search"
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? 'Buscando...' : 'Buscar Evento'}
          </button>
        </form>
      </div>
      
      <TestLinks />
    </div>
  )
}

export default EventCodeEntry
