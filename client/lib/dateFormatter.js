/**
 * Date Formatting Utility - All dates in admin panel use dd/mm/yyyy format
 */

/**
 * Format date to dd/mm/yyyy format
 * @param {string|Date} date - Date string or Date object
 * @param {boolean} includeTime - Whether to include time (HH:mm)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    if (includeTime) {
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date to dd/mm/yyyy HH:mm:ss format
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date-time string
 */
export const formatDateTime = (date) => {
  return formatDate(date, true) + ':' + String(new Date(date).getSeconds()).padStart(2, '0');
};

/**
 * Format date for input fields (yyyy-mm-dd ISO format)
 * @param {string|Date} date - Date string or Date object
 * @returns {string} ISO date format for input type="date"
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Parse dd/mm/yyyy format to Date object
 * @param {string} dateStr - Date string in dd/mm/yyyy format
 * @returns {Date} Date object
 */
export const parseDateFromDDMMYYYY = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null;
  
  const [day, month, year] = dateStr.split('/').map(Number);
  
  if (!day || !month || !year) return null;
  
  return new Date(year, month - 1, day);
};

/**
 * Get date range label (e.g., "01/01/2026 - 31/01/2026")
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

/**
 * Get relative date label (e.g., "Today", "Yesterday", "2 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative date label
 */
export const getRelativeDate = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dateFormatted = dateObj.toDateString();
  const todayFormatted = today.toDateString();
  const yesterdayFormatted = yesterday.toDateString();
  
  if (dateFormatted === todayFormatted) {
    return 'Today';
  } else if (dateFormatted === yesterdayFormatted) {
    return 'Yesterday';
  } else {
    const diffTime = Math.abs(today - dateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  }
};
