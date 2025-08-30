/**
 * Admin utilities for viewing form submissions
 */

/**
 * Gets all newsletter submissions from localStorage (for development)
 */
export const getNewsletterSubmissions = () => {
  try {
    const submissions = localStorage.getItem('nieuwsbrief-submissions');
    return submissions ? JSON.parse(submissions) : [];
  } catch (error) {
    console.error('Error getting submissions:', error);
    return [];
  }
};

/**
 * Exports submissions as CSV (for development)
 */
export const exportSubmissionsAsCSV = () => {
  const submissions = getNewsletterSubmissions();
  
  if (submissions.length === 0) {
    console.log('No submissions found');
    return;
  }

  const headers = ['Email', 'Role', 'Timestamp'];
  const csvContent = [
    headers.join(','),
    ...submissions.map(sub => [
      sub.email,
      sub.role || 'Niet opgegeven',
      sub.timestamp
    ].join(','))
  ].join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nieuwsbrief-submissions-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Shows submissions in console (for development)
 */
export const showSubmissions = () => {
  const submissions = getNewsletterSubmissions();
  console.table(submissions);
  return submissions;
};