export default (content, wordlimit) => {
  let filter = content.replace(/\s+/g, ' '); // You can add more filters here
  let wordsarr = filter.split(' ');

  if (wordsarr.length < wordlimit) {
    return content;
  } else {
    let result = '';

    for (var i = 0; i < wordlimit; i++) {
      result = result + ' ' + wordsarr[i] + ' ';
    }

    return result;
  }
};
