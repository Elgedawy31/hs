/**
 * Extracts a name from an email address by taking the part before the @ symbol
 * and replacing dots with spaces.
 * 
 * @param {string} email - The email address to extract the name from
 * @returns {string} The extracted name
 * 
 * @example
 * // returns "mo gad"
 * extractName("mo.gad@devglobal.io")
 */
export const extractName = (email) => {
  if (!email || typeof email !== 'string') {
    return '';
  }
  
  // Extract the part before the @ symbol
  const localPart = email.split('@')[0];
  
  // Replace dots with spaces
  const name = localPart.replace(/\./g, ' ');
  
  return name;
};

export default extractName;
