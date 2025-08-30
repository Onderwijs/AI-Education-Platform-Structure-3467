/**
 * Utility functions for handling file downloads
 */

/**
 * Initiates a file download from a URL
 * @param {string} url - The URL of the file to download
 * @param {string} filename - Optional custom filename for the download
 */
export const downloadFile = (url, filename = null) => {
  // Create a link element
  const link = document.createElement('a');
  
  // Set the href attribute to the file URL
  link.href = url;
  
  // Set download attribute with filename if provided
  if (filename) {
    link.setAttribute('download', filename);
  } else {
    link.setAttribute('download', '');
  }
  
  // Append to body (required for Firefox)
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
};

/**
 * Downloads the AI Startersgids PDF
 */
export const downloadStartersgids = () => {
  const fileUrl = '/downloads/ai-startersgids-complete.pdf';
  const filename = 'AI-Complete-Startersgids-50-Tools.pdf';
  downloadFile(fileUrl, filename);
};

/**
 * Maps lesson titles to their corresponding PDF files
 */
export const lessonFileMap = {
  // Featured lesson - Updated to match new content
  "Wetenschappelijk Onderzoek met AI": "/lessons/programmeren-met-ai-copilot.pdf",
  
  // PO lessons
  "Wat is Kunstmatige Intelligentie?": "/lessons/ai-in-po.pdf",
  "AI in Ons Dagelijks Leven": "/lessons/ai-in-po.pdf", 
  "Vriendelijke Robots": "/lessons/vriendelijke-robots.pdf",
  "Introductie tot AI voor Kinderen": "/lessons/ai-in-po.pdf",
  "AI Kunstproject": "/lessons/ai-in-po.pdf",
  
  // VO lessons
  "AI en Ethiek": "/lessons/ai-ethics-vo.pdf",
  "ChatGPT voor Onderzoek": "/lessons/ai-ethics-vo.pdf",
  "AI in de Creatieve Vakken": "/lessons/ai-ethics-vo.pdf",
  "AI in de Geschiedenis": "/lessons/ai-ethics-vo.pdf", 
  "AI Ethics Debat": "/lessons/ai-ethics-vo.pdf",
  "AI-Geassisteerd Creatief Schrijven": "/lessons/ai-creatief-schrijven.pdf",
  "AI voor Taalonderwijs": "/lessons/ai-ethics-vo.pdf",
  
  // MBO/HBO lessons
  "Datavisualisatie met AI": "/lessons/datavisualisatie-met-ai.pdf",
  "Programmeren met AI Copilot": "/lessons/programmeren-met-ai-copilot.pdf",
  
  // Default fallback
  "default": "/lessons/ai-creatief-schrijven.pdf"
};

/**
 * Gets the file URL for a lesson title
 * @param {string} lessonTitle - The title of the lesson
 * @returns {string} The URL of the lesson PDF
 */
export const getLessonFileUrl = (lessonTitle) => {
  return lessonFileMap[lessonTitle] || lessonFileMap["default"];
};

/**
 * Initiates a lesson download by title
 * @param {string} lessonTitle - The title of the lesson to download
 */
export const downloadLesson = (lessonTitle) => {
  const fileUrl = getLessonFileUrl(lessonTitle);
  const filename = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  downloadFile(fileUrl, filename);
};