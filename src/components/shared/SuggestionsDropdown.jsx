import { useState } from 'react'

const SuggestionsDropdown = ({ categories, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion)
    setIsOpen(false)
  }

  return (
    <div className="suggestions-container">
      <button 
        className="suggestions-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Ocultar Sugerencias' : 'Ver Sugerencias'}
      </button>
      
      {isOpen && (
        <div className="suggestions-dropdown">
          {categories.map((category, index) => (
            <div key={index} className="suggestion-category">
              <h4>{category.name}</h4>
              {category.suggestions.map((suggestion, suggestionIndex) => (
                <div 
                  key={suggestionIndex}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SuggestionsDropdown
