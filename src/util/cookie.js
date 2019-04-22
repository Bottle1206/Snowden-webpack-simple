const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; };

const setSinglecookie = function setSinglecookie(name, value) {
  const expires = new Date();
  expires.setTime(expires.getTime() + 86400 * 1000);
  document.cookie = name + '=' + escape(value) + '; expires=' + expires.toGMTString() + '; path=/';
};

export const setCookie = function setCookie(a, b) {
  if (b) {
    setSinglecookie(a, b);
  } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
    for (const key in a) {
      setSinglecookie(key, a[key]);
    }
  }
  return true;
};

export const getCookie = function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
};

const delSinglecookie = function delSinglecookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString() + '; path=/';
  }
};

export const delCookie = function delCookie(a) {
  if (a instanceof Array) {
    a.forEach(function (val) {
      delSinglecookie(val);
    });
  } else {
    delSinglecookie(a);
  }
  return true;
};
