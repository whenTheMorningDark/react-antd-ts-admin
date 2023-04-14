function generateUid() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${timestamp}${random}`;
}
export {
  generateUid
};