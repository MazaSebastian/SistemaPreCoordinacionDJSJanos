const TextInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  multiline = false, 
  rows = 4 
}) => {
  return (
    <div className="text-input">
      {label && <label>{label}</label>}
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

export default TextInput
