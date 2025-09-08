const ReligiosoFlow = ({ currentStep, userSelections, onSelectionUpdate, onNextStep, onPrevStep, onBack }) => {
  return (
    <div className="religioso-flow">
      <div className="step-navigation">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 7) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentStep} de 7
          </div>
        </div>
        <button className="btn-back" onClick={onBack}>
          ← Volver al Inicio
        </button>
      </div>
      
      <div className="step-panel">
        <div className="step-header">
          <h2>⛪ Flujo Religioso</h2>
          <p>Paso {currentStep} - En desarrollo</p>
        </div>
        <div className="step-content">
          <p>El flujo específico para Eventos Religiosos está en desarrollo.</p>
          <p>Por ahora, puedes usar el flujo de XV Años como referencia.</p>
        </div>
        <div className="step-actions">
          {currentStep > 1 && (
            <button className="btn-prev" onClick={onPrevStep}>
              <span>← Anterior</span>
            </button>
          )}
          {currentStep < 7 && (
            <button className="btn-next" onClick={onNextStep}>
              <span>Siguiente →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReligiosoFlow
