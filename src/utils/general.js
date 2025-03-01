// Helper function to convert seconds to hours
export const secondsToHours = (seconds) => {
  if (!seconds) return "0";
  return (seconds / 3600).toFixed(2);
};

export const getSenderName = (from) => {
  // console.log(from);
  const match = from.match(/^(?:"([^"]+?)"\s)?<?([^>]+?)>?$/);
  if (match) {
    return {
      name: match[1],
      email: match[2],
    };
  }
  return {
    name: "UNKNOWN",
    email: "UNKNOWN",
  };
};

export const parseRecipients = (args) => {
  const arr = args.split(",").map((arg) => {
    arg = arg.trim();
    return getSenderName(arg);
  });
  return arr;
};
