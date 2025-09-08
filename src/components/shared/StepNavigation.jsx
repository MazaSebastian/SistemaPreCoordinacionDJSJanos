const StepNavigation = ({ currentStep, totalSteps, onBack }) => {
  return (
    <div className="step-navigation">
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {currentStep} de {totalSteps}
        </div>
      </div>
      
      <button className="btn-back" onClick={onBack}>
        ← Volver al Inicio
      </button>
    </div>
  )
}

export default StepNavigation
