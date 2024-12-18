const API_KEY = "AIzaSyD3wevS66YyT9IOrDqDwkQwEwLyc2KWEU4";

export const value_converter = (value) => {
  if (value >= 1_000_000) {
    return Math.floor(value / 1_000_000) + "M";
  } else if (value >= 1_000) {
    return Math.floor(value / 1_000) + "K";
  } else return value;
};

export default API_KEY;
