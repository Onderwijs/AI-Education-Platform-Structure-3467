import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for Dynamic Metadata in SPA
 * Ensures unique titles, descriptions and canonical links per route.
 */
const SEO = ({ title, description, schema }) => {
  const location = useLocation();
  const siteName = 'Onderwijs.AI';
  const fullTitle = title.includes(siteName) ? title : `${title} – ${siteName}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    const url = `https://onderwijs.ai${location.pathname}`.replace('/#', '');
    linkCanonical.setAttribute('href', url);

    // 4. Inject Page-specific Schema
    if (schema) {
      const scriptId = 'page-schema';
      let script = document.getElementById(scriptId);
      if (script) script.remove();
      
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": url,
        ...schema
      });
      document.head.appendChild(script);
    }
  }, [fullTitle, description, schema, location]);

  return null;
};

export default SEO;