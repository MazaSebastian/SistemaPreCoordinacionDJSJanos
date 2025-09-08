import { useState } from 'react'
import StepNavigation from '../shared/StepNavigation'
import StepPanel from '../shared/StepPanel'
import RadioOptions from '../shared/RadioOptions'
import TextInput from '../shared/TextInput'
import SuggestionsDropdown from '../shared/SuggestionsDropdown'
import GenreSelector from '../shared/GenreSelector'
import FinalSummary from '../shared/FinalSummary'
import { useEmailSender } from '../../hooks/useEmailSender'

const XVAñosFlow = ({ 
  currentStep, 
  userSelections, 
  onSelectionUpdate, 
  onNextStep, 
  onPrevStep, 
  onBack 
}) => {
  const totalSteps = 12
  const { sendEmail, isSending } = useEmailSender()
  const [emailSent, setEmailSent] = useState(false)

  const handleSelection = (step, data) => {
    onSelectionUpdate(step, data)
  }

  const handleFinalStep = async () => {
    console.log('handleFinalStep called, emailSent:', emailSent)
    if (!emailSent) {
      console.log('Sending email...')
      const result = await sendEmail({ eventType: 'XV Años' }, userSelections)
      console.log('Email result:', result)
      if (result.success) {
        console.log('Email sent successfully!')
        setEmailSent(true)
      } else {
        console.error('Email failed:', result.error)
        // Mostramos el mensaje de despedida incluso si falla el email
        setEmailSent(true)
      }
    }
  }

  const canProceed = (step) => {
    switch (step) {
      case 1: // Estilo de XV
        return userSelections[1]?.style
      case 2: // Música de Recepción y Cena
        return userSelections[2]?.receptionMusic && userSelections[2]?.dinnerMusic
      case 3: // Ingreso a Recepción
        const receptionEntrance = userSelections[3]?.receptionEntrance
        if (receptionEntrance === 'no') return true
        return receptionEntrance === 'si' && userSelections[3]?.receptionEntranceSong
      case 4: // Canción de Ingreso al Salón
        return userSelections[4]?.salonEntranceSong
      case 5: // Géneros para Tandas de Baile
        return userSelections[5]?.danceGenres?.length > 0
      case 6: // Artistas Favoritos
        return userSelections[6]?.artists?.length > 0
      case 7: // Coreografía
        const choreography = userSelections[7]?.choreography
        if (choreography === 'no') return true
        return choreography === 'si' && userSelections[7]?.choreographySong
      case 8: // Canción para el Vals
        const waltzDance = userSelections[8]?.waltzDance
        if (waltzDance === 'no') return true
        return waltzDance === 'si' && userSelections[8]?.waltzSong
      case 9: // Canción para el Brindis
        return userSelections[9]?.toastSong
      case 10: // Ceremonia de Velas
        const candlesCeremony = userSelections[10]?.candlesCeremony
        if (candlesCeremony === 'no') return true
        const individualSongs = userSelections[10]?.individualSongs
        if (individualSongs === 'no') return userSelections[10]?.candlesGeneralSong
        return individualSongs === 'si' && userSelections[10]?.candlesList
      case 11: // Entrada en Carioca
        const cariocaEntrance = userSelections[11]?.cariocaEntrance
        if (cariocaEntrance === 'no') return true
        return cariocaEntrance === 'si' && userSelections[11]?.cariocaEntranceSong
      default:
        return true
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <StepPanel
            title="👑 Estilo de tu XV Años"
            description="¿Qué estilo prefieres para tu celebración?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(1)}
          >
            <RadioOptions
              name="style"
              options={[
                { value: 'princesa_elegante', label: 'Princesa y Elegante' },
                { value: 'moderna_trendy', label: 'Moderna y Trendy' },
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
            description="Define la música para los momentos de recepción y cena (que no son tandas de baile)"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(2)}
          >
            <div className="music-sections">
              {/* Música de Recepción */}
              <div className="music-section">
                <h3>🎵 Música de Recepción</h3>
                <p>Selecciona el estilo musical para el momento de recepción:</p>
                <RadioOptions
                  name="receptionMusic"
                  options={[
                    { value: 'ambiental', label: 'Música Ambiental' },
                    { value: 'pop', label: 'Pop' },
                    { value: 'acusticos', label: 'Acústicos' },
                    { value: 'rock_nacional', label: 'Rock Nacional' },
                    { value: 'rock', label: 'Rock' },
                    { value: 'bossa', label: 'Bossa' }
                  ]}
                  onSelection={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    receptionMusic: value 
                  })}
                  selected={userSelections[2]?.receptionMusic}
                />
                <TextInput
                  label="Sugerencias personalizadas para la recepción:"
                  placeholder="Ej: Frank Sinatra, Norah Jones, alguna banda específica..."
                  value={userSelections[2]?.receptionSuggestions || ''}
                  onChange={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    receptionSuggestions: value 
                  })}
                />
              </div>

              {/* Música de Cena */}
              <div className="music-section">
                <h3>🎵 Música de Cena</h3>
                <p>Selecciona el estilo musical para el momento de la cena:</p>
                <RadioOptions
                  name="dinnerMusic"
                  options={[
                    { value: 'ambiental', label: 'Música Ambiental' },
                    { value: 'pop', label: 'Pop' },
                    { value: 'acusticos', label: 'Acústicos' },
                    { value: 'rock_nacional', label: 'Rock Nacional' },
                    { value: 'rock', label: 'Rock' },
                    { value: 'bossa', label: 'Bossa' }
                  ]}
                  onSelection={(value) => handleSelection(2, { 
                    ...userSelections[2], 
                    dinnerMusic: value 
                  })}
                  selected={userSelections[2]?.dinnerMusic}
                />
                <TextInput
                  label="Sugerencias personalizadas para la cena:"
                  placeholder="Ej: Andrea Bocelli, Diana Krall, alguna canción específica..."
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
            title="♫ Ingreso a Recepción"
            description="¿Realizas ingreso a recepción?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(3)}
          >
            <RadioOptions
              name="receptionEntrance"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(3, { receptionEntrance: value })}
              selected={userSelections[3]?.receptionEntrance}
            />
            
            {userSelections[3]?.receptionEntrance === 'si' && (
              <div className="conditional-content">
                <h3>♫ Canción de Ingreso a Recepción</h3>
                <TextInput
                  placeholder="Escribe el nombre de la canción..."
                  value={userSelections[3]?.receptionEntranceSong || ''}
                  onChange={(value) => handleSelection(3, { 
                    ...userSelections[3], 
                    receptionEntranceSong: value 
                  })}
                />
                <SuggestionsDropdown
                  categories={[
                    {
                      name: 'Energetico',
                      suggestions: ['Shake It Off - Taylor Swift', 'Uptown Funk - Bruno Mars']
                    },
                    {
                      name: 'Divertido',
                      suggestions: ['Happy - Pharrell Williams', 'Can\'t Stop the Feeling - Justin Timberlake']
                    },
                    {
                      name: 'Emotivo',
                      suggestions: ['Perfect - Ed Sheeran', 'A Thousand Years - Christina Perri']
                    }
                  ]}
                  onSelect={(song) => handleSelection(3, { 
                    ...userSelections[3], 
                    receptionEntranceSong: song 
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
            description="¿Con qué canción quieres ingresar al salón?"
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
                  name: 'Energetico',
                  suggestions: ['Shake It Off - Taylor Swift', 'Uptown Funk - Bruno Mars']
                },
                {
                  name: 'Emotivo',
                  suggestions: ['Perfect - Ed Sheeran', 'A Thousand Years - Christina Perri']
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
                'RKT', 'Guaracha', 'Reggaeton Viejo', 'Rktrends'
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
            title="💃 Coreografía"
            description="¿Vas a realizar coreografía?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(7)}
          >
            <RadioOptions
              name="choreography"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(7, { choreography: value })}
              selected={userSelections[7]?.choreography}
            />
            
            {userSelections[7]?.choreography === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción de Coreografía</h3>
                <TextInput
                  placeholder="Escribe el nombre de la canción para la coreografía..."
                  value={userSelections[7]?.choreographySong || ''}
                  onChange={(value) => handleSelection(7, { 
                    ...userSelections[7], 
                    choreographySong: value 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 8:
        return (
          <StepPanel
            title="💃 Canción para el Vals"
            description="¿Vas a bailar el vals?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(8)}
          >
            <RadioOptions
              name="waltzDance"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(8, { waltzDance: value })}
              selected={userSelections[8]?.waltzDance}
            />
            
            {userSelections[8]?.waltzDance === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción para el Vals</h3>
                <TextInput
                  placeholder="Ej: 'Perfect' - Ed Sheeran"
                  value={userSelections[8]?.waltzSong || ''}
                  onChange={(value) => handleSelection(8, { 
                    ...userSelections[8], 
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
                      name: 'Clasicos',
                      suggestions: ['Perfect - Ed Sheeran', 'All of Me - John Legend']
                    },
                    {
                      name: 'Disney',
                      suggestions: ['A Whole New World', 'Beauty and the Beast']
                    }
                  ]}
                  onSelect={(song) => handleSelection(8, { 
                    ...userSelections[8], 
                    waltzSong: song 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 9:
        return (
          <StepPanel
            title="🥂 Canción para el Brindis"
            description="Especifica la canción que quieres para el momento del brindis"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(9)}
          >
            <TextInput
              label="Canción para el Brindis"
              placeholder="Ej: 'Perfect' - Ed Sheeran"
              value={userSelections[9]?.toastSong || ''}
              onChange={(value) => handleSelection(9, { toastSong: value })}
            />
            <SuggestionsDropdown
              categories={[
                {
                  name: 'Canciones Clásicas para Brindis',
                  suggestions: ['Perfect - Ed Sheeran', 'All of Me - John Legend', 'A Thousand Years - Christina Perri']
                }
              ]}
              onSelect={(song) => handleSelection(9, { toastSong: song })}
            />
          </StepPanel>
        )

      case 10:
        return (
          <StepPanel
            title="🕯️ Ceremonia de Velas"
            description="¿Realizas ceremonia de velas?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(10)}
          >
            <RadioOptions
              name="candlesCeremony"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(10, { candlesCeremony: value })}
              selected={userSelections[10]?.candlesCeremony}
            />
            
            {userSelections[10]?.candlesCeremony === 'si' && (
              <div className="conditional-content">
                <h3>🎵 ¿Asignarás una canción individual por cada vela?</h3>
                <RadioOptions
                  name="individualSongs"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' }
                  ]}
                  onSelection={(value) => handleSelection(10, { 
                    ...userSelections[10], 
                    individualSongs: value 
                  })}
                  selected={userSelections[10]?.individualSongs}
                />
                
                {userSelections[10]?.individualSongs === 'si' && (
                  <div className="candles-list-section">
                    <h4>🕯️ Lista de Velas y Canciones</h4>
                    <p>Escribe la información de cada vela en el siguiente formato:</p>
                    <p><strong>Formato:</strong> Número de vela - Nombre - Canción</p>
                    <p><strong>Ejemplo:</strong><br />
                    1 - Mamá - "A Thousand Years" - Christina Perri<br />
                    2 - Papá - "Perfect" - Ed Sheeran<br />
                    3 - Abuela - "Can't Help Myself" - Four Tops</p>
                    <TextInput
                      placeholder="Ej: 1 - Mamá - 'A Thousand Years' - Christina Perri"
                      value={userSelections[10]?.candlesList || ''}
                      onChange={(value) => handleSelection(10, { 
                        ...userSelections[10], 
                        candlesList: value 
                      })}
                      multiline
                      rows={6}
                    />
                  </div>
                )}
                
                {userSelections[10]?.individualSongs === 'no' && (
                  <div className="candles-general-section">
                    <h4>🎵 ¿Qué música te gustaría para la ceremonia de velas?</h4>
                    <TextInput
                      placeholder="Ej: 'Perfect' - Ed Sheeran"
                      value={userSelections[10]?.candlesGeneralSong || ''}
                      onChange={(value) => handleSelection(10, { 
                        ...userSelections[10], 
                        candlesGeneralSong: value 
                      })}
                    />
                  </div>
                )}
              </div>
            )}
          </StepPanel>
        )

      case 11:
        return (
          <StepPanel
            title="🎭 Entrada en Carioca"
            description="¿Realizas entrada en carioca?"
            onNext={onNextStep}
            onPrev={onPrevStep}
            canProceed={canProceed(11)}
          >
            <RadioOptions
              name="cariocaEntrance"
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
              onSelection={(value) => handleSelection(11, { cariocaEntrance: value })}
              selected={userSelections[11]?.cariocaEntrance}
            />
            
            {userSelections[11]?.cariocaEntrance === 'si' && (
              <div className="conditional-content">
                <h3>🎵 Canción de Entrada en Carioca</h3>
                <TextInput
                  placeholder="Ej: 'Perfect' - Ed Sheeran"
                  value={userSelections[11]?.cariocaEntranceSong || ''}
                  onChange={(value) => handleSelection(11, { 
                    ...userSelections[11], 
                    cariocaEntranceSong: value 
                  })}
                />
                <SuggestionsDropdown
                  categories={[
                    {
                      name: 'Canciones Clásicas para Carioca',
                      suggestions: ['Perfect - Ed Sheeran', 'All of Me - John Legend', 'A Thousand Years - Christina Perri']
                    }
                  ]}
                  onSelect={(song) => handleSelection(11, { 
                    ...userSelections[11], 
                    cariocaEntranceSong: song 
                  })}
                />
              </div>
            )}
          </StepPanel>
        )

      case 12:
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
              eventData={{ eventType: 'XV Años' }}
              userSelections={userSelections}
            />
          </StepPanel>
        )

      default:
        return <div>Paso no encontrado</div>
    }
  }

  return (
    <div className="xv-anos-flow">
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={onBack}
      />
      {renderStepContent(currentStep)}
    </div>
  )
}

export default XVAñosFlow
