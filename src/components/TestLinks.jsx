const TestLinks = () => {
  const baseUrl = window.location.origin + window.location.pathname

  const testLinks = [
    {
      code: '111111',
      name: 'María González',
      event: 'Boda',
      description: 'Flujo completo de Boda'
    },
    {
      code: '222222',
      name: 'Sofía Rodríguez',
      event: 'XV Años',
      description: 'Flujo completo de XV Años'
    },
    {
      code: '333333',
      name: 'Carlos López',
      event: 'Cumpleaños',
      description: 'Flujo de Cumpleaños'
    },
    {
      code: '444444',
      name: 'Ana Martínez',
      event: 'Corporativo',
      description: 'Flujo Corporativo'
    },
    {
      code: '555555',
      name: 'Roberto Silva',
      event: 'Religioso',
      description: 'Flujo Religioso'
    }
  ]

  const handleLinkClick = (code) => {
    const link = `${baseUrl}?client=${code}`
    navigator.clipboard.writeText(link)
    alert(`Enlace copiado: ${link}`)
  }

  return (
    <div className="test-links">
      <h3>🔗 Enlaces de Prueba Directos</h3>
      <p>Haz clic en cualquier enlace para copiarlo y probar el flujo directamente:</p>
      
      <div className="links-grid">
        {testLinks.map((link) => (
          <div key={link.code} className="test-link-item">
            <div className="link-info">
              <h4>{link.name} - {link.event}</h4>
              <p>{link.description}</p>
              <span className="link-code">Código: {link.code}</span>
            </div>
            <button 
              className="btn-copy-link"
              onClick={() => handleLinkClick(link.code)}
            >
              📋 Copiar Enlace
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestLinks
