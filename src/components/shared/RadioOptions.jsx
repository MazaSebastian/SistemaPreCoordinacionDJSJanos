const RadioOptions = ({ name, options, onSelection, selected }) => {
  return (
    <div className="radio-options">
      {options.map((option) => (
        <div 
          key={option.value}
          className={`option-item ${selected === option.value ? 'selected' : ''}`}
          onClick={() => onSelection(option.value)}
        >
          <input 
            type="radio" 
            name={name} 
            value={option.value}
            checked={selected === option.value}
            onChange={() => onSelection(option.value)}
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  )
}

export default RadioOptions
