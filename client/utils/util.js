import find from 'lodash/find';
import flatten from 'lodash/flatten';
import map from 'lodash/map';

export function buildActionNames(module, actionList) {
  const appName = 'gh';

  const collection = actionList.reduce(
    (acc, cur) =>
      Object.assign({}, acc, { [cur]: `${appName}/${module}/${cur}` }),
    {}
  );

  return collection;
}

export function buildClassName(array, item, prefix) {
  if (array.includes(item)) {
    return `${prefix}--${item}`;
  }

  return false;
}

export function resetPageView() {
  const pageContent = document.getElementById('content');

  pageContent.scrollIntoView();
  pageContent.focus();
}

export function findDeep(collection, obj) {
  if (find(collection, obj)) {
    return [collection];
  }

  return flatten(
    map(collection, function(v) {
      return typeof v === 'object' ? findDeep(v, obj) : [];
    }),
    true
  );
}

export function containsDeep(collection, obj) {
  const result = findDeep(collection, obj);

  return Boolean(result.length);
}

export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();

  return {
    android: userAgent.indexOf('android') > -1,
    iOS: /ip(ad|hone|od)/.test(userAgent)
  };
}

export function downloadFile(data, filename, mime) {
  const blob = new Blob([data], { type: mime || 'application/octet-stream' });
  const blobURL = window.URL.createObjectURL(blob);

  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const tempLink = document.createElement('a');

    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
}

export function getCookies() {
  var cookies = {};

  for (const cookie of document.cookie.split('; ')) {
    const [name, value] = cookie.split('=');

    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

export function getCookie(name) {
  const cookies = getCookies();
  let cookie = cookies.hasOwnProperty(name) ? cookies[name] : null;

  if (cookie) {
    try {
      cookie = JSON.parse(cookie);
    } catch (err) {
      // Catch any errors
    }
  }

  return cookie;
}
