const StepPanel = ({ 
  title, 
  description, 
  children, 
  onNext, 
  onPrev, 
  canProceed = true,
  nextButtonText = "Siguiente →"
}) => {
  return (
    <div className="step-panel">
      <div className="step-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      
      <div className="step-content">
        {children}
      </div>
      
      <div className="step-actions">
        {onPrev && (
          <button className="btn-prev" onClick={onPrev}>
            <span>← Anterior</span>
          </button>
        )}
        
        {onNext && (
          <button 
            className="btn-next" 
            onClick={onNext}
            disabled={!canProceed}
          >
            <span>{nextButtonText}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default StepPanel
