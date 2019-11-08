export function provinceFormat(province: string) {
  let result = province;
  return result
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}
