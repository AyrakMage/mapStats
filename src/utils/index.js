export const convertSnakeCaseToTitleCase = (text) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle camelCase to space
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };