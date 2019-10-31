export function timestampFormat(timestamp: string) {
  let result = (Date.now() - Number(timestamp)) / 1000 / 60 / 60 / 24;
  if (result >= 365) {
    if (Math.floor(result / 365) === 1) {
      return 'Posted ' + Math.floor(result / 365) + ' year ago';
    } else if (Math.floor(result / 365) > 1) {
      return 'Posted ' + Math.floor(result / 365) + ' years ago';
    }
  } else if (result >= 31 && result < 365) {
    if (Math.floor(result / 31) === 1) {
      return 'Posted ' + Math.floor(result / 31) + ' month ago';
    } else if (Math.floor(result / 31) > 1) {
      return 'Posted ' + Math.floor(result / 31) + ' months ago';
    }
  } else if (result >= 1 && result < 31) {
    if (Math.floor(result) === 1) {
      return 'Posted ' + Math.floor(result) + ' day ago';
    } else if (Math.floor(result) > 1) {
      return 'Posted ' + Math.floor(result) + ' days ago';
    }
  } else {
    result = result * 24;
    if (result >= 1) {
      if (result === 1) {
        return 'Posted ' + Math.floor(result) + ' hour ago';
      } else if (result > 1) {
        return 'Posted ' + Math.floor(result) + ' hours ago';
      }
    } else {
      result = result * 60;
      if (result >= 1) {
        if (result === 1) {
          return 'Posted ' + Math.floor(result) + ' minute ago';
        } else if (result > 1) {
          return 'Posted ' + Math.floor(result) + ' minutes ago';
        }
      } else {
        result = Math.floor(result * 60);
        if (result >= 1) {
          if (result === 1) {
            return 'Posted ' + Math.floor(result) + ' second ago';
          } else if (result > 1) {
            return 'Posted ' + Math.floor(result) + ' seconds ago';
          }
        }
      }
    }
  }
}
