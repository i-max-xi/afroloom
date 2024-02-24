export const parseTitle = (title) => {
  const split = title.split("_");
  return split.join(" ");
};


export const isEmpty = (data) => {
  if (data == null || typeof data === 'undefined' || data === '') return true;
  return false;
};