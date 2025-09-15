import React from 'react'

function ToolCard({ tool }) {
  const getPricingClass = (pricing) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'pricing-free'
      case 'paid':
        return 'pricing-paid'
      case 'freemium':
        return 'pricing-freemium'
      default:
        return ''
    }
  }

  return (
    <div className="tool-card">
      <div className="tool-header">
        <h3 className="tool-name">{tool.name}</h3>
        <span className="tool-category">{tool.category}</span>
      </div>
      
      <p className="tool-description">
        {tool.description}
      </p>
      
      <div className="tool-footer">
        <span className={`tool-pricing ${getPricingClass(tool.pricing)}`}>
          {tool.pricing}
        </span>
        <a 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="learn-more-btn"
        >
          Learn More
        </a>
      </div>
    </div>
  )
}

export default ToolCard