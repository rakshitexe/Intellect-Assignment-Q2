// Returns the short weekday name (e.g., "Mon") from a date string
export const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

// Returns the two-digit day number (e.g., "01") from a date string
export const getDayNumber = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate().toString().padStart(2, "0");
};
