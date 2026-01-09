import React, { useEffect } from 'react';

const SEO = ({ title, description, jsonLd, schemaType = "WebPage" }) => {
  useEffect(() => {
    // Voorzorgsmaatregel: Alleen uitvoeren op toegestane statische routes
    const forbiddenPaths = ['/tools', '/sociogram', '/klassenplattegrond'];
    if (forbiddenPaths.some(path => window.location.hash.includes(path))) return;

    // Update Title
    const prevTitle = document.title;
    document.title = title ? `${title} | Onderwijs.ai` : "Onderwijs.ai | Verantwoord AI-gebruik in het Onderwijs";

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    const prevDescription = metaDescription.getAttribute('content');
    metaDescription.setAttribute('content', description || "Onderwijs.ai biedt didactische kaders en tools voor verantwoord AI-gebruik in het basisonderwijs, voortgezet onderwijs en hoger onderwijs.");

    // Injecteer JSON-LD indien aanwezig
    let scriptTag = null;
    if (jsonLd) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptTag);
    }

    return () => {
      document.title = prevTitle;
      if (metaDescription) metaDescription.setAttribute('content', prevDescription || "");
      if (scriptTag) document.head.removeChild(scriptTag);
    };
  }, [title, description, jsonLd]);

  return null; // Render niets in de DOM
};

export default SEO;