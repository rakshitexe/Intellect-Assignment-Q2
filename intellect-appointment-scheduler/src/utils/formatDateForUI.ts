export const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const getDayNumber = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate().toString().padStart(2, "0");
};