import React, { useState } from 'react'
import StepPanel from '../shared/StepPanel'
import RadioOptions from '../shared/RadioOptions'
import TextInput from '../shared/TextInput'
import SuggestionsDropdown from '../shared/SuggestionsDropdown'
import GenreSelector from '../shared/GenreSelector'
import FinalSummary from '../shared/FinalSummary'
import { useEmailSender } from '../../hooks/useEmailSender'

const CorporativoFlow = ({ 
  currentStep, 
  userSelections, 
  onSelectionUpdate, 
  onNextStep, 
  onPrevStep, 
  onBack 
}) => {
  const totalSteps = 8
  const { sendEmail, isSending } = useEmailSender()
  const [emailSent, setEmailSent] = useState(false)

  const handleSelection = (step, data) => {
    onSelectionUpdate(step, data)
  }

  const handleFinalStep = async () => {
    console.log('handleFinalStep called, emailSent:', emailSent)
    if (!emailSent) {
      console.log('Sending email...')
      const result = await sendEmail({ eventType: 'Corporativos' }, userSelections)
      console.log('Email result:', result)
      if (result.success) {
        console.log('Email sent successfully!')
        setEmailSent(true)
      } else {
        console.error('Email failed:', result.error)
        setEmailSent(true)
      }
    }
  }

  const canProceed = (step) => {
    switch (step) {
      case 1: // Tipo de Evento Corporativo
        return userSelections[1]?.eventType
      case 2: // Música de Ambiente
        return userSelections[2]?.ambientMusic
      case 3: // Música para Networking
        return userSelections[3]?.networkingMusic
      case 4: // Música para Presentaciones
        const hasPresentations = userSelections[4]?.hasPresentations
        if (hasPresentations === 'no') return true
        return hasPresentations === 'si' && userSelections[4]?.presentationMusic
      case 5: // Música para Coffee Break
        const hasCoffeeBreak = userSelections[5]?.hasCoffeeBreak
        if (hasCoffeeBreak === 'no') return true
        return hasCoffeeBreak === 'si' && userSelections[5]?.coffeeBreakMusic
      case 6: // Música para Cierre
        return userSelections[6]?.closingMusic
      case 7: // Artistas/Estilos Específicos
        return userSelections[7]?.specificArtists
      case 8: // Confirmación Final
        return true
      default:
        return true
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <StepPanel
            title="🏢 Tipo de Evento Corporativo"
            description="¿Qué tipo de evento corporativo estás organizando?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(1)}
          >
            <RadioOptions
              name="eventType"
              options={[
                { value: 'conferencia', label: 'Conferencia / Seminario' },
                { value: 'lanzamiento', label: 'Lanzamiento de Producto' },
                { value: 'networking', label: 'Evento de Networking' },
                { value: 'gala', label: 'Gala Corporativa' },
                { value: 'team_building', label: 'Team Building' },
                { value: 'premios', label: 'Ceremonia de Premios' },
                { value: 'fiesta_empresa', label: 'Fiesta de Empresa' }
              ]}
              onSelection={(value) => handleSelection(1, { eventType: value })}
              selected={userSelections[1]?.eventType}
            />
          </StepPanel>
        )

      case 2:
        return (
          <StepPanel
            title="🎵 Música de Ambiente General"
            description="¿Qué música te gustaría para el ambiente general del evento?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(2)}
          >
            <RadioOptions
              name="ambientMusic"
              options={[
                { value: 'instrumental', label: 'Música Instrumental' },
                { value: 'jazz_lounge', label: 'Jazz / Lounge' },
                { value: 'ambient_electronic', label: 'Ambient / Electrónica Suave' },
                { value: 'classical', label: 'Música Clásica' },
                { value: 'world_music', label: 'World Music' },
                { value: 'corporate_playlist', label: 'Playlist Corporativa Estándar' }
              ]}
              onSelection={(value) => handleSelection(2, { ambientMusic: value })}
              selected={userSelections[2]?.ambientMusic}
            />
            <TextInput
              placeholder="¿Alguna especificación adicional para el ambiente?"
              value={userSelections[2]?.ambientNotes || ''}
              onChange={(value) => handleSelection(2, { 
                ...userSelections[2], 
                ambientNotes: value 
              })}
            />
          </StepPanel>
        )

      case 3:
        return (
          <StepPanel
            title="🤝 Música para Networking"
            description="¿Qué música prefieres para los momentos de networking y socialización?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(3)}
          >
            <RadioOptions
              name="networkingMusic"
              options={[
                { value: 'conversational', label: 'Música Conversacional (volumen bajo)' },
                { value: 'energetic', label: 'Música Energética (para motivar)' },
                { value: 'sophisticated', label: 'Música Sofisticada' },
                { value: 'international', label: 'Música Internacional' },
                { value: 'local_artists', label: 'Artistas Locales' },
                { value: 'no_music', label: 'Sin música (solo conversación)' }
              ]}
              onSelection={(value) => handleSelection(3, { networkingMusic: value })}
              selected={userSelections[3]?.networkingMusic}
            />
            <TextInput
              placeholder="¿Alguna preferencia específica para el networking?"
              value={userSelections[3]?.networkingNotes || ''}
              onChange={(value) => handleSelection(3, { 
                ...userSelections[3], 
                networkingNotes: value 
              })}
            />
          </StepPanel>
        )

      case 4:
        return (
          <StepPanel
            title="📊 Música para Presentaciones"
            description="¿Habrá presentaciones que requieran música específica?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(4)}
          >
            <RadioOptions
              name="hasPresentations"
              options={[
                { value: 'si', label: 'Sí, habrá presentaciones' },
                { value: 'no', label: 'No, no habrá presentaciones' }
              ]}
              onSelection={(value) => handleSelection(4, { hasPresentations: value })}
              selected={userSelections[4]?.hasPresentations}
            />
            
            {userSelections[4]?.hasPresentations === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Música para Presentaciones</h3>
                <RadioOptions
                  name="presentationMusic"
                  options={[
                    { value: 'minimal', label: 'Música Mínima / Ambiental' },
                    { value: 'corporate', label: 'Música Corporativa Estándar' },
                    { value: 'inspiring', label: 'Música Inspiracional' },
                    { value: 'tech', label: 'Música Tecnológica / Moderna' },
                    { value: 'custom', label: 'Música Personalizada' }
                  ]}
                  onSelection={(value) => handleSelection(4, { 
                    ...userSelections[4], 
                    presentationMusic: value 
                  })}
                  selected={userSelections[4]?.presentationMusic}
                />
                <TextInput
                  placeholder="¿Alguna especificación para las presentaciones?"
                  value={userSelections[4]?.presentationNotes || ''}
                  onChange={(value) => handleSelection(4, { 
                    ...userSelections[4], 
                    presentationNotes: value 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 5:
        return (
          <StepPanel
            title="☕ Música para Coffee Break"
            description="¿Habrá coffee break o momentos de descanso?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(5)}
          >
            <RadioOptions
              name="hasCoffeeBreak"
              options={[
                { value: 'si', label: 'Sí, habrá coffee break' },
                { value: 'no', label: 'No, no habrá coffee break' }
              ]}
              onSelection={(value) => handleSelection(5, { hasCoffeeBreak: value })}
              selected={userSelections[5]?.hasCoffeeBreak}
            />
            
            {userSelections[5]?.hasCoffeeBreak === 'si' && (
              <div className="conditional-content">
                <h3>☕ Música para Coffee Break</h3>
                <RadioOptions
                  name="coffeeBreakMusic"
                  options={[
                    { value: 'relaxing', label: 'Música Relajante' },
                    { value: 'jazz', label: 'Jazz Suave' },
                    { value: 'acoustic', label: 'Música Acústica' },
                    { value: 'instrumental', label: 'Instrumental' },
                    { value: 'no_music', label: 'Sin música' }
                  ]}
                  onSelection={(value) => handleSelection(5, { 
                    ...userSelections[5], 
                    coffeeBreakMusic: value 
                  })}
                  selected={userSelections[5]?.coffeeBreakMusic}
                />
              </div>
            )}
          </StepPanel>
        )

      case 6:
        return (
          <StepPanel
            title="🎉 Música para el Cierre"
            description="¿Qué música te gustaría para el cierre del evento?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(6)}
          >
            <RadioOptions
              name="closingMusic"
              options={[
                { value: 'inspiring', label: 'Música Inspiracional' },
                { value: 'celebratory', label: 'Música de Celebración' },
                { value: 'professional', label: 'Música Profesional' },
                { value: 'thank_you', label: 'Música de Agradecimiento' },
                { value: 'corporate_anthem', label: 'Himno Corporativo' },
                { value: 'no_music', label: 'Sin música' }
              ]}
              onSelection={(value) => handleSelection(6, { closingMusic: value })}
              selected={userSelections[6]?.closingMusic}
            />
            <TextInput
              placeholder="¿Alguna canción específica para el cierre?"
              value={userSelections[6]?.closingSong || ''}
              onChange={(value) => handleSelection(6, { 
                ...userSelections[6], 
                closingSong: value 
              })}
            />
          </StepPanel>
        )

      case 7:
        return (
          <StepPanel
            title="🎤 Artistas o Estilos Específicos"
            description="¿Hay algún artista, banda o estilo musical específico que quieras incluir o evitar?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(7)}
          >
            <TextInput
              label="Artistas o Estilos Específicos"
              placeholder="Ej: Evitar música con letras, incluir jazz clásico, evitar música muy alta..."
              value={userSelections[7]?.specificArtists || ''}
              onChange={(value) => handleSelection(7, { specificArtists: value })}
            />
            <SuggestionsDropdown
              categories={[
                {
                  name: 'Estilos Corporativos Comunes',
                  suggestions: ['Jazz instrumental', 'Música ambiental', 'Lounge music', 'Música clásica moderna']
                },
                {
                  name: 'Artistas Corporativos',
                  suggestions: ['Kenny G', 'Yanni', 'Enya', 'Ludovico Einaudi']
                },
                {
                  name: 'Restricciones Comunes',
                  suggestions: ['Sin música con letras', 'Volumen bajo', 'Sin música muy alta', 'Solo instrumental']
                }
              ]}
              onSelect={(item) => handleSelection(7, { specificArtists: item })}
            />
          </StepPanel>
        )

      case 8:
        if (emailSent) {
          return (
            <StepPanel
              title="✅ ¡Información Enviada!"
              description="Nuestro DJ se contactará a la brevedad! Muchas Gracias"
              onNext={() => onBack()}
              onPrev={null}
              canProceed={true}
            >
              <div className="success-message">
                <div className="success-icon">🎉</div>
                <h3>¡Precoordinación Completada!</h3>
                <p>Hemos recibido toda tu información musical y la hemos enviado a nuestro DJ.</p>
                <p><strong>¡Que comience la fiesta!</strong></p>
              </div>
            </StepPanel>
          )
        }

        return (
          <StepPanel
            title="🎯 ¡Evento Corporativo Listo!"
            description="Revisa y confirma tu selección musical"
            onNext={handleFinalStep}
            onPrev={onPrevStep}
            canProceed={!isSending}
            nextButtonText={isSending ? "Enviando..." : "Finalizar"}
          >
            <FinalSummary
              eventData={{ eventType: 'Corporativo' }}
              userSelections={userSelections}
            />
          </StepPanel>
        )

      default:
        return <div>Paso no encontrado</div>
    }
  }

  return (
    <div className="corporativo-flow">
      {renderStepContent(currentStep)}
    </div>
  )
}

export default CorporativoFlow