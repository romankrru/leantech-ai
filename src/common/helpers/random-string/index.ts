export const randomString = (len: number) => {
  let result = "";
  const chars = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
