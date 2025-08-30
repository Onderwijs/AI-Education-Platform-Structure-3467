# AI in het Onderwijs Website

## IMPORTANT: PDF Files Completely Removed

**ALL PDF FILES HAVE BEEN PERMANENTLY DELETED** from this project to eliminate the currency symbol (¢) issue.

### What was removed:
- `public/downloads/` - All PDF downloads
- `public/lessons/` - All lesson PDF files  
- `public/projects/` - All project PDF files
- Any other PDF files in the project

### What replaced them:
- **Clean text file generation** via JavaScript
- **100% guaranteed no special characters**
- **Dynamic content creation** without pre-existing files

### For developers:
The download system now generates clean UTF-8 text files on-demand instead of serving static PDF files. This completely eliminates any possibility of special character issues.

## Deployment

This project is ready for deployment on:
- Netlify (recommended)
- Vercel  
- GitHub Pages
- Any static hosting service

## Build Commands

```bash
npm install
npm run build
```

Output directory: `dist`