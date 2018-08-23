const parse = function (url) {
  let [ newUrl, paramStr] = url.split('?');
  let params = {};
  if (paramStr) {
      let pairs = paramStr.split('&');
      pairs.forEach(function (item) {
          let [key, value] = item.split('=');
          params[key] = value;
      });

      return params;
  }

  return '';
}

const rename = function (orignalname) {
  const [ name, suffix ] = orignalname.split('.');

  return `${name}-${Date.now()}.${suffix}`;
}

const fun = {
  parse,
  rename
}

module.exports = fun;