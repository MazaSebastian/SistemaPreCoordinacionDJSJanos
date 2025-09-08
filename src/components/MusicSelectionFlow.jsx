import { useState } from 'react'
import XVAñosFlow from './flows/XVAñosFlow'
import BodaFlow from './flows/BodaFlow'
import CumpleañosFlow from './flows/CumpleañosFlow'
import CorporativoFlow from './flows/CorporativoFlow'
import ReligiosoFlow from './flows/ReligiosoFlow'

const MusicSelectionFlow = ({ eventData, onBack }) => {
  const [userSelections, setUserSelections] = useState({})
  const [currentStep, setCurrentStep] = useState(1)

  const handleSelectionUpdate = (step, data) => {
    setUserSelections(prev => ({
      ...prev,
      [step]: data
    }))
  }

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const renderFlow = () => {
    const eventType = eventData.eventType.toLowerCase()
    
    const commonProps = {
      currentStep,
      userSelections,
      onSelectionUpdate: handleSelectionUpdate,
      onNextStep: handleNextStep,
      onPrevStep: handlePrevStep,
      onBack
    }

    switch (eventType) {
      case 'xv años':
        return <XVAñosFlow {...commonProps} />
      
      case 'boda':
        return <BodaFlow {...commonProps} />
      
      case 'cumpleaños':
        return <CumpleañosFlow {...commonProps} />
      
      case 'corporativo':
        return <CorporativoFlow {...commonProps} />
      
      case 'religioso':
        return <ReligiosoFlow {...commonProps} />
      
      default:
        return <div>Tipo de evento no soportado</div>
    }
  }

  return (
    <div className="music-selection-flow">
      {renderFlow()}
    </div>
  )
}

export default MusicSelectionFlow
