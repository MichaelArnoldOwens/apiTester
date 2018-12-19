// Takes a string and title-cases it without preserving whitespace
export function titleCase(str) {
  const splitStr = str.split(' ');
  let result = [];
  splitStr.forEach(word => result.push(word[0].toUpperCase() + word.substring(1)))
  return result.join(' ')
}
