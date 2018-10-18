exports.run = async (client, string) => {
  if (!string) return false;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.help = {
  name: "capitalizeFirstLetter",
  category: "main"
}
exports.config = {
  enable: true
}
