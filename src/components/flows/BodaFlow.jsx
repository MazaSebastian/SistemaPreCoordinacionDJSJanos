import React, { useState } from 'react'
import StepNavigation from '../shared/StepNavigation'
import StepPanel from '../shared/StepPanel'
import RadioOptions from '../shared/RadioOptions'
import TextInput from '../shared/TextInput'
import SuggestionsDropdown from '../shared/SuggestionsDropdown'
import GenreSelector from '../shared/GenreSelector'
import FinalSummary from '../shared/FinalSummary'
import { useEmailSender } from '../../hooks/useEmailSender'

const BodaFlow = ({ 
  currentStep, 
  userSelections, 
  onSelectionUpdate, 
  onNextStep, 
  onPrevStep, 
  onBack 
}) => {
  const totalSteps = 11
  const { sendEmail, isSending } = useEmailSender()
  const [emailSent, setEmailSent] = useState(false)

  const handleSelection = (step, data) => {
    onSelectionUpdate(step, data)
  }

  const handleFinalStep = async () => {
    console.log('handleFinalStep called, emailSent:', emailSent)
    if (!emailSent) {
      console.log('Sending email...')
      const result = await sendEmail({ eventType: 'Bodas' }, userSelections)
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
      case 1: // Estilo de Boda
        return userSelections[1]?.style
      case 2: // Música de Recepción y Cena
        return userSelections[2]?.receptionMusic && userSelections[2]?.dinnerMusic
      case 3: // Ceremonia en el Salón
        const hasCeremony = userSelections[3]?.hasCeremony
        if (hasCeremony === 'no') return true // Si no hay ceremonia, puede avanzar
        return hasCeremony === 'si' && userSelections[3]?.ceremonySong // Si hay, debe tener canción
      case 4: // Canción de Ingreso al Salón
        return userSelections[4]?.salonEntranceSong
      case 5: // Géneros para Tandas de Baile
        return userSelections[5]?.danceGenres?.length > 0
      case 6: // Artistas Favoritos
        return userSelections[6]?.artists?.length > 0
      case 7: // Canción para el Vals
        const waltzDance = userSelections[7]?.waltzDance
        if (waltzDance === 'no') return true
        return waltzDance === 'si' && userSelections[7]?.waltzSong
      case 8: // Canción para el Brindis
        return userSelections[8]?.toastSong
      case 9: // Coreografía
        const hasChoreography = userSelections[9]?.hasChoreography
        if (hasChoreography === 'no') return true // Si no hay coreografía, puede avanzar
        return hasChoreography === 'si' && userSelections[9]?.choreographySong // Si hay, debe tener canción
      case 10: // Entrada en Carioca
        const hasCarioca = userSelections[10]?.hasCarioca
        if (hasCarioca === 'no') return true // Si no hay carioca, puede avanzar
        return hasCarioca === 'si' && userSelections[10]?.cariocaSong // Si hay, debe tener canción
      default:
        return true
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <StepPanel
            title="💒 Estilo de tu Boda"
            description="¿Qué estilo prefieres para tu celebración?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(1)}
          >
            <RadioOptions
              name="style"
              options={[
                { value: 'clasica_elegante', label: 'Clásica y Elegante' },
                { value: 'moderna_contemporanea', label: 'Moderna y Contemporánea' },
                { value: 'rustica_bohemia', label: 'Rústica y Bohemia' },
                { value: 'tematica_especial', label: 'Temática Especial' }
              ]}
              onSelection={(value) => handleSelection(1, { style: value })}
              selected={userSelections[1]?.style}
            />
          </StepPanel>
        )

      case 2:
        return (
          <StepPanel
            title="🍽️ Música de Recepción y Cena"
            description="Define la música para la recepción y el momento de la cena"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(2)}
          >
            <div className="music-sections">
              <div className="music-section">
                <h3>🎵 Música de Recepción</h3>
                <RadioOptions
                  name="receptionMusic"
                  options={[
                    { value: 'ambiental', label: 'Música Ambiental' },
                    { value: 'pop', label: 'Pop' },
                    { value: 'jazz', label: 'Jazz' },
                    { value: 'lounge', label: 'Lounge' },
                    { value: 'acusticos', label: 'Acústicos' }
                  ]}
                  onSelection={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    receptionMusic: value 
                  })}
                  selected={userSelections[2]?.receptionMusic}
                />
                <TextInput
                  placeholder="Sugerencias personalizadas para la recepción..."
                  value={userSelections[2]?.receptionSuggestions || ''}
                  onChange={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    receptionSuggestions: value 
                  })}
                />
              </div>

              <div className="music-section">
                <h3>🍽️ Música de Cena</h3>
                <RadioOptions
                  name="dinnerMusic"
                  options={[
                    { value: 'ambiental', label: 'Música Ambiental' },
                    { value: 'pop', label: 'Pop' },
                    { value: 'jazz', label: 'Jazz' },
                    { value: 'lounge', label: 'Lounge' },
                    { value: 'acusticos', label: 'Acústicos' }
                  ]}
                  onSelection={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    dinnerMusic: value 
                  })}
                  selected={userSelections[2]?.dinnerMusic}
                />
                <TextInput
                  placeholder="Sugerencias personalizadas para la cena..."
                  value={userSelections[2]?.dinnerSuggestions || ''}
                  onChange={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    dinnerSuggestions: value 
                  })}
                />
              </div>
            </div>
          </StepPanel>
        )

      case 3:
        return (
          <StepPanel
            title="⛪ Ceremonia en el Salón"
            description="¿Realizan ceremonia en el salón?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(3)}
          >
            <RadioOptions
              name="hasCeremony"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(3, { hasCeremony: value })}
              selected={userSelections[3]?.hasCeremony}
            />
            
            {userSelections[3]?.hasCeremony === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción para la Ceremonia</h3>
                <TextInput
                  placeholder="Ej: 'Canon en Re Mayor' - Pachelbel"
                  value={userSelections[3]?.ceremonySong || ''}
                  onChange={(value) => handleSelection(3, { 
                    ...userSelections[3], 
                    ceremonySong: value 
                  })}
                />
                <SuggestionsDropdown
                  categories={[
                    {
                      name: 'Clásicas',
                      suggestions: ['Marcha Nupcial - Mendelssohn', 'Ave María - Schubert', 'Canon en Re Mayor - Pachelbel']
                    },
                    {
                      name: 'Contemporáneas',
                      suggestions: ['A Thousand Years - Christina Perri', 'Perfect - Ed Sheeran', 'All of Me - John Legend']
                    }
                  ]}
                  onSelect={(song) => handleSelection(3, { 
                    ...userSelections[3], 
                    ceremonySong: song 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 4:
        return (
          <StepPanel
            title="🎵 Canción de Ingreso al Salón"
            description="¿Con qué canción quieren ingresar al salón?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(4)}
          >
            <TextInput
              label="Canción de Ingreso al Salón"
              placeholder="Ej: 'Perfect' - Ed Sheeran"
              value={userSelections[4]?.salonEntranceSong || ''}
              onChange={(value) => handleSelection(4, { salonEntranceSong: value })}
            />
            <SuggestionsDropdown
              categories={[
                {
                  name: 'Canciones Románticas',
                  suggestions: ['Perfect - Ed Sheeran', 'All of Me - John Legend', 'A Thousand Years - Christina Perri']
                },
                {
                  name: 'Canciones Clásicas',
                  suggestions: ['At Last - Etta James', 'Unchained Melody - The Righteous Brothers']
                }
              ]}
              onSelect={(song) => handleSelection(4, { salonEntranceSong: song })}
            />
          </StepPanel>
        )

      case 5:
        return (
          <StepPanel
            title="💃 Géneros para Tandas de Baile"
            description="Selecciona los géneros musicales que quieres para las tandas de baile"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(5)}
          >
            <GenreSelector
              genres={[
                'Cumbia', 'Cuarteto', 'Disco', '80s', '90s', '2000s',
                'Rock Nacional', 'Música Electrónica', 'Pop', 'Reggaeton',
                'RKT', 'Guaracha', 'Reggaeton Viejo', 'Rktrends', 'Bachata', 'Salsa'
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
            description="Menciona tus artistas favoritos"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(6)}
          >
            <div className="artists-section">
              <div className="artist-input-group">
                <TextInput
                  label="Artistas Favoritos"
                  placeholder="Ej: Ed Sheeran, Taylor Swift, Bruno Mars..."
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
            title="💃 Canción para el Vals"
            description="¿Van a bailar el vals?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(7)}
          >
            <RadioOptions
              name="waltzDance"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(7, { waltzDance: value })}
              selected={userSelections[7]?.waltzDance}
            />
            
            {userSelections[7]?.waltzDance === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción para el Vals</h3>
                <TextInput
                  placeholder="Ej: 'Perfect' - Ed Sheeran"
                  value={userSelections[7]?.waltzSong || ''}
                  onChange={(value) => handleSelection(7, { 
                    ...userSelections[7], 
                    waltzSong: value 
                  })}
                />
                <SuggestionsDropdown
                  categories={[
                    {
                      name: 'Instrumental',
                      suggestions: ['Perfect - Ed Sheeran (Instrumental)', 'A Thousand Years - Piano']
                    },
                    {
                      name: 'Clásicos',
                      suggestions: ['Perfect - Ed Sheeran', 'All of Me - John Legend']
                    },
                    {
                      name: 'Disney',
                      suggestions: ['A Whole New World', 'Beauty and the Beast']
                    }
                  ]}
                  onSelect={(song) => handleSelection(7, { 
                    ...userSelections[7], 
                    waltzSong: song 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 8:
        return (
          <StepPanel
            title="🥂 Canción para el Brindis"
            description="Especifica la canción que quieres para el momento del brindis"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(8)}
          >
            <TextInput
              label="Canción para el Brindis"
              placeholder="Ej: 'Perfect' - Ed Sheeran"
              value={userSelections[8]?.toastSong || ''}
              onChange={(value) => handleSelection(8, { toastSong: value })}
            />
            <SuggestionsDropdown
              categories={[
                {
                  name: 'Canciones Clásicas para Brindis',
                  suggestions: ['Perfect - Ed Sheeran', 'All of Me - John Legend', 'A Thousand Years - Christina Perri']
                }
              ]}
              onSelect={(song) => handleSelection(8, { toastSong: song })}
            />
          </StepPanel>
        )

      case 9:
        return (
          <StepPanel
            title="💃 Coreografía"
            description="¿Realizarán alguna coreografía?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(9)}
          >
            <RadioOptions
              name="hasChoreography"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(9, { hasChoreography: value })}
              selected={userSelections[9]?.hasChoreography}
            />
            
            {userSelections[9]?.hasChoreography === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción para la Coreografía</h3>
                <TextInput
                  placeholder="Ej: 'Perfect' - Ed Sheeran"
                  value={userSelections[9]?.choreographySong || ''}
                  onChange={(value) => handleSelection(9, { 
                    ...userSelections[9], 
                    choreographySong: value 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 10:
        return (
          <StepPanel
            title="🎭 Entrada en Carioca"
            description="¿Realizan entrada en carioca?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(10)}
          >
            <RadioOptions
              name="hasCarioca"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(10, { hasCarioca: value })}
              selected={userSelections[10]?.hasCarioca}
            />
            
            {userSelections[10]?.hasCarioca === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción para la Entrada en Carioca</h3>
                <TextInput
                  placeholder="Ej: 'La Carioca' - Carmen Miranda"
                  value={userSelections[10]?.cariocaSong || ''}
                  onChange={(value) => handleSelection(10, { 
                    ...userSelections[10], 
                    cariocaSong: value 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 11:
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
              eventData={{ eventType: 'Boda' }}
              userSelections={userSelections}
            />
          </StepPanel>
        )

      default:
        return <div>Paso no encontrado</div>
    }
  }

  return (
    <div className="boda-flow">
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={onBack}
      />
      {renderStepContent(currentStep)}
    </div>
  )
}

export default BodaFlow