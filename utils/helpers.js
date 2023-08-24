export const generateAuthToken = () => {
  const randomString = Math.random().toString(36).substring(7);
  return randomString;
};
