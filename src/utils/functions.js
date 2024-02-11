export const parseTitle = (title) => {
  const split = title.split("_");
  return split.join(" ");
};
