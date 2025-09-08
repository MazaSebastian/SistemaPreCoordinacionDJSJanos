import React, { useState, useEffect } from 'react'
import './App.css'
import EventCodeEntry from './components/EventCodeEntry'
import EventConfirmation from './components/EventConfirmation'
import ClientWelcome from './components/ClientWelcome'
import MusicSelectionFlow from './components/MusicSelectionFlow'

// Datos mock de eventos
const mockEvents = {
  '111111': {
    clientName: 'María González',
    eventType: 'Boda',
    date: '15 de Diciembre, 2024',
    time: '20:00 - 04:00',
    venue: 'San Telmo'
  },
  '222222': {
    clientName: 'Sofía Rodríguez',
    eventType: 'XV Años',
    date: '15 de Diciembre, 2024',
    time: '20:00 - 04:00',
    venue: 'San Telmo'
  },
  '333333': {
    clientName: 'Carlos López',
    eventType: 'Cumpleaños',
    date: '15 de Diciembre, 2024',
    time: '20:00 - 04:00',
    venue: 'Lahusen'
  },
  '444444': {
    clientName: 'Ana Martínez',
    eventType: 'Corporativo',
    date: '15 de Diciembre, 2024',
    time: '20:00 - 04:00',
    venue: 'Puerto Madero Boutique'
  },
  '555555': {
    clientName: 'Roberto Silva',
    eventType: 'Religioso',
    date: '15 de Diciembre, 2024',
    time: '20:00 - 04:00',
    venue: 'Costanera 1'
  }
}

function App() {
  const [currentStep, setCurrentStep] = useState('codeEntry')
  const [eventCode, setEventCode] = useState('')
  const [eventData, setEventData] = useState(null)
  const [clientLink, setClientLink] = useState('')

  // Verificar si hay parámetros de URL para acceso directo
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const clientCode = urlParams.get('client')
    
    if (clientCode && mockEvents[clientCode]) {
      setEventCode(clientCode)
      setEventData({...mockEvents[clientCode], code: clientCode})
      setCurrentStep('welcome')
    }
  }, [])

  const handleCodeSubmit = (code) => {
    const event = mockEvents[code]
    if (event) {
      setEventCode(code)
      setEventData(event)
      setCurrentStep('confirmation')
    } else {
      alert('Código de evento no válido')
    }
  }

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      // Generar link único para el cliente
      const uniqueLink = `${window.location.origin}${window.location.pathname}?client=${eventCode}`
      setClientLink(uniqueLink)
      setCurrentStep('welcome')
    } else {
      setCurrentStep('codeEntry')
    }
  }

  const handleStartSelection = () => {
    setCurrentStep('musicSelection')
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'codeEntry':
        return <EventCodeEntry onSubmit={handleCodeSubmit} />
      
      case 'confirmation':
        return (
          <EventConfirmation 
            eventData={{...eventData, code: eventCode}}
            onConfirm={handleConfirmation}
          />
        )
      
      case 'welcome':
        return (
          <ClientWelcome 
            eventData={eventData}
            clientLink={clientLink}
            onStartSelection={handleStartSelection}
          />
        )
      
      case 'musicSelection':
        return (
          <MusicSelectionFlow 
            eventData={eventData}
            onBack={() => setCurrentStep('welcome')}
          />
        )
      
      default:
        return <EventCodeEntry onSubmit={handleCodeSubmit} />
    }
  }

  return (
    <div className="app">
      <div className="container">
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default App