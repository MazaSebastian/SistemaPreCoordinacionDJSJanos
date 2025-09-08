const RadioOptions = ({ name, options, onSelection, selected }) => {
  const handleClick = (value) => {
    console.log(`RadioOptions clicked - name: ${name}, value: ${value}`)
    onSelection(value)
  }

  return (
    <div className="radio-options">
      {options.map((option) => (
        <div 
          key={option.value}
          className={`option-item ${selected === option.value ? 'selected' : ''}`}
          onClick={() => handleClick(option.value)}
        >
          <input 
            type="radio" 
            name={name} 
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleClick(option.value)}
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  )
}

export default RadioOptions
