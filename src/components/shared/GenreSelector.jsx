import { useState } from 'react'

const GenreSelector = ({ genres, selected, onSelection }) => {
  const handleGenreToggle = (genre) => {
    const newSelected = selected.includes(genre)
      ? selected.filter(g => g !== genre)
      : [...selected, genre]
    onSelection(newSelected)
  }

  return (
    <div className="genre-selector">
      <div className="genres-grid">
        {genres.map((genre) => (
          <div 
            key={genre}
            className={`genre-item ${selected.includes(genre) ? 'selected' : ''}`}
            onClick={() => handleGenreToggle(genre)}
          >
            <input 
              type="checkbox" 
              checked={selected.includes(genre)}
              onChange={() => handleGenreToggle(genre)}
            />
            <span>{genre}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenreSelector
