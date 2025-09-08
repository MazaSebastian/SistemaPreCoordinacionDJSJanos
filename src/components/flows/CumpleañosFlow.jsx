import React, { useState } from 'react'
import StepPanel from '../shared/StepPanel'
import RadioOptions from '../shared/RadioOptions'
import TextInput from '../shared/TextInput'
import SuggestionsDropdown from '../shared/SuggestionsDropdown'
import GenreSelector from '../shared/GenreSelector'
import FinalSummary from '../shared/FinalSummary'
import { useEmailSender } from '../../hooks/useEmailSender'

const CumpleañosFlow = ({ 
  currentStep, 
  userSelections, 
  onSelectionUpdate, 
  onNextStep, 
  onPrevStep, 
  onBack 
}) => {
  const totalSteps = 9
  const { sendEmail, isSending } = useEmailSender()
  const [emailSent, setEmailSent] = useState(false)

  const handleSelection = (step, data) => {
    onSelectionUpdate(step, data)
  }

  const handleFinalStep = async () => {
    console.log('handleFinalStep called, emailSent:', emailSent)
    if (!emailSent) {
      console.log('Sending email...')
      const result = await sendEmail({ eventType: 'Cumpleaños' }, userSelections)
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
      case 1: // Estilo de Cumpleaños
        return userSelections[1]?.style
      case 2: // Música de Ambiente
        return userSelections[2]?.ambientMusic
      case 3: // Ingreso al Salón
        const hasEntrance = userSelections[3]?.hasEntrance
        if (hasEntrance === 'no') return true
        return hasEntrance === 'si' && userSelections[3]?.entranceSong
      case 4: // Canción de Cumpleaños
        return userSelections[4]?.birthdaySong
      case 5: // Géneros para Bailar
        return userSelections[5]?.danceGenres?.length > 0
      case 6: // Artistas Favoritos
        return userSelections[6]?.artists?.length > 0
      case 7: // Actividades Especiales
        const hasActivities = userSelections[7]?.hasActivities
        if (hasActivities === 'no') return true
        return hasActivities === 'si' && userSelections[7]?.activities
      case 8: // Ingreso en Carioca
        const hasCarioca = userSelections[8]?.hasCarioca
        if (hasCarioca === 'no') return true
        return hasCarioca === 'si' && userSelections[8]?.cariocaSong
      case 9: // Confirmación Final
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
            title="🎉 Estilo de tu Cumpleaños"
            description="¿Qué tipo de celebración tienes en mente?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(1)}
          >
            <RadioOptions
              name="style"
              options={[
                { value: 'casual_relajado', label: 'Casual y Relajado' },
                { value: 'divertido_animado', label: 'Divertido y Animado' },
                { value: 'tematico', label: 'Temático (disfraces, etc.)' },
                { value: 'intimo_familiar', label: 'Íntimo y Familiar' }
              ]}
              onSelection={(value) => handleSelection(1, { style: value })}
              selected={userSelections[1]?.style}
            />
          </StepPanel>
        )

      case 2:
        return (
          <StepPanel
            title="🎵 Música de Ambiente"
            description="¿Qué música te gustaría para el ambiente general de la fiesta?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(2)}
          >
            <RadioOptions
              name="ambientMusic"
              options={[
                { value: 'pop_actual', label: 'Pop Actual' },
                { value: 'retro_vintage', label: 'Retro/Vintage' },
                { value: 'latin_reggeaton', label: 'Latino/Reggaeton' },
                { value: 'rock_alternativo', label: 'Rock/Alternativo' },
                { value: 'electronica', label: 'Música Electrónica' },
                { value: 'mixto_variado', label: 'Mixto y Variado' }
              ]}
              onSelection={(value) => handleSelection(2, { ambientMusic: value })}
              selected={userSelections[2]?.ambientMusic}
            />
            <TextInput
              placeholder="¿Alguna sugerencia específica para el ambiente?"
              value={userSelections[2]?.ambientSuggestions || ''}
              onChange={(value) => handleSelection(2, { 
                ...userSelections[2], 
                ambientSuggestions: value 
              })}
            />
          </StepPanel>
        )

      case 3:
        return (
          <StepPanel
            title="🚪 Ingreso al Salón"
            description="¿Realizas ingreso al salón?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(3)}
          >
            <RadioOptions
              name="hasEntrance"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(3, { hasEntrance: value })}
              selected={userSelections[3]?.hasEntrance}
            />
            
            {userSelections[3]?.hasEntrance === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción de Ingreso al Salón</h3>
                <TextInput
                  placeholder="Ej: 'Happy' - Pharrell Williams"
                  value={userSelections[3]?.entranceSong || ''}
                  onChange={(value) => handleSelection(3, { 
                    ...userSelections[3], 
                    entranceSong: value 
                  })}
                />
                <SuggestionsDropdown
                  categories={[
                    {
                      name: 'Alegres',
                      suggestions: ['Happy - Pharrell Williams', 'I Gotta Feeling - Black Eyed Peas', 'We Found Love - Rihanna']
                    },
                    {
                      name: 'Divertidas',
                      suggestions: ['Uptown Funk - Bruno Mars', 'Can\'t Stop the Feeling - Justin Timberlake', 'Shake It Off - Taylor Swift']
                    }
                  ]}
                  onSelect={(song) => handleSelection(3, { 
                    ...userSelections[3], 
                    entranceSong: song 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 4:
        return (
          <StepPanel
            title="🎂 Canción de Cumpleaños"
            description="¿Qué canción quieres para el momento del pastel?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(4)}
          >
            <TextInput
              label="Canción para el Pastel"
              placeholder="Ej: 'Happy Birthday' - Stevie Wonder"
              value={userSelections[4]?.birthdaySong || ''}
              onChange={(value) => handleSelection(4, { birthdaySong: value })}
            />
            <SuggestionsDropdown
              categories={[
                {
                  name: 'Clásicas',
                  suggestions: ['Happy Birthday - Stevie Wonder', 'Happy Birthday - The Beatles', 'Cumpleaños Feliz - Versión Original']
                },
                {
                  name: 'Divertidas',
                  suggestions: ['Birthday - Katy Perry', 'It\'s My Party - Lesley Gore', 'Celebration - Kool & The Gang']
                },
                {
                  name: 'Personalizadas',
                  suggestions: ['Alguna canción que te guste mucho', 'Tu canción favorita del momento']
                }
              ]}
              onSelect={(song) => handleSelection(4, { birthdaySong: song })}
            />
          </StepPanel>
        )


      case 5:
        return (
          <StepPanel
            title="💃 Géneros para Bailar"
            description="¿Qué géneros musicales quieres para que la gente baile?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(5)}
          >
            <GenreSelector
              genres={[
                'Reggaeton', 'Cumbia', 'Cuarteto', 'Pop', 'Rock', 'Disco',
                '80s', '90s', '2000s', 'Bachata', 'Salsa', 'Música Electrónica',
                'RKT', 'Guaracha', 'Trap', 'Hip Hop', 'Funk'
              ]}
              selected={userSelections[5]?.danceGenres || []}
              onSelection={(genres) => handleSelection(5, { danceGenres: genres })}
            />
          </StepPanel>
        )

      case 6:
        return (
          <StepPanel
            title="🎤 Artistas Favoritos"
            description="Menciona tus artistas o bandas favoritas"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(6)}
          >
            <div className="artists-section">
              <div className="artist-input-group">
                <TextInput
                  label="Artistas Favoritos"
                  placeholder="Ej: Bad Bunny, Taylor Swift, The Weeknd..."
                  value={userSelections[6]?.currentArtist || ''}
                  onChange={(value) => handleSelection(6, { 
                    ...userSelections[6], 
                    currentArtist: value 
                  })}
                />
                <button 
                  className="btn-add-artist"
                  onClick={() => {
                    const currentArtist = userSelections[6]?.currentArtist?.trim()
                    if (currentArtist) {
                      const currentArtists = userSelections[6]?.artists || []
                      const updatedArtists = [...currentArtists, currentArtist]
                      handleSelection(6, { 
                        artists: updatedArtists,
                        currentArtist: ''
                      })
                    }
                  }}
                  disabled={!userSelections[6]?.currentArtist?.trim()}
                >
                  ➕ Agregar
                </button>
              </div>
              
              {userSelections[6]?.artists && userSelections[6].artists.length > 0 && (
                <div className="artists-list">
                  <h4>Artistas agregados:</h4>
                  <div className="artists-tags">
                    {userSelections[6].artists.map((artist, index) => (
                      <div key={index} className="artist-tag">
                        <span>{artist}</span>
                        <button 
                          className="btn-remove-artist"
                          onClick={() => {
                            const updatedArtists = userSelections[6].artists.filter((_, i) => i !== index)
                            handleSelection(6, { 
                              ...userSelections[6], 
                              artists: updatedArtists 
                            })
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </StepPanel>
        )

      case 7:
        return (
          <StepPanel
            title="🎪 Actividades Especiales"
            description="¿Habrá alguna actividad especial que requiera música específica?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(7)}
          >
            <RadioOptions
              name="hasActivities"
              options={[
                { value: 'si', label: 'Sí, habrá actividades especiales' },
                { value: 'no', label: 'No, solo música y baile' }
              ]}
              onSelection={(value) => handleSelection(7, { hasActivities: value })}
              selected={userSelections[7]?.hasActivities}
            />
            
            {userSelections[7]?.hasActivities === 'si' && (
              <div className="conditional-content">
                <h3>🎭 Actividades y Música</h3>
                <TextInput
                  label="Describe las actividades y qué música necesitas"
                  placeholder="Ej: Karaoke, concurso de baile, juegos musicales..."
                  value={userSelections[7]?.activities || ''}
                  onChange={(value) => handleSelection(7, { 
                    ...userSelections[7], 
                    activities: value 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 8:
        return (
          <StepPanel
            title="🎭 Ingreso en Carioca"
            description="¿Realizas ingreso en carioca?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(8)}
          >
            <RadioOptions
              name="hasCarioca"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(8, { hasCarioca: value })}
              selected={userSelections[8]?.hasCarioca}
            />
            
            {userSelections[8]?.hasCarioca === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción para el Ingreso en Carioca</h3>
                <TextInput
                  placeholder="Ej: 'La Carioca' - Carmen Miranda"
                  value={userSelections[8]?.cariocaSong || ''}
                  onChange={(value) => handleSelection(8, { 
                    ...userSelections[8], 
                    cariocaSong: value 
                  })}
                />
                <SuggestionsDropdown
                  categories={[
                    {
                      name: 'Clásicas de Carioca',
                      suggestions: ['La Carioca - Carmen Miranda', 'Garota de Ipanema - João Gilberto', 'Aquarela do Brasil - Ary Barroso']
                    },
                    {
                      name: 'Modernas',
                      suggestions: ['Ai Se Eu Te Pego - Michel Teló', 'Dança Kuduro - Don Omar', 'Despacito - Luis Fonsi']
                    }
                  ]}
                  onSelect={(song) => handleSelection(8, { 
                    ...userSelections[8], 
                    cariocaSong: song 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 9:
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
            title="🎉 ¡Que comience la fiesta!"
            description="Revisa y confirma tu selección musical"
            onNext={handleFinalStep}
            onPrev={onPrevStep}
            canProceed={!isSending}
            nextButtonText={isSending ? "Enviando..." : "Finalizar"}
          >
            <FinalSummary
              eventData={{ eventType: 'Cumpleaños' }}
              userSelections={userSelections}
            />
          </StepPanel>
        )

      default:
        return <div>Paso no encontrado</div>
    }
  }

  return (
    <div className="cumpleanos-flow">
      {renderStepContent(currentStep)}
    </div>
  )
}

export default CumpleañosFlow