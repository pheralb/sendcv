export const getDays = (date: string) => {
  const today = new Date();
  const postDate = new Date(date);
  const diffTime = Math.abs(today.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};