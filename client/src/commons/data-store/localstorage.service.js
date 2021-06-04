function isLocalStorageEnabled() {
  let mod;
  try {
    window.localStorage.setItem(mod, mod);
    window.localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

function maybeJSONParse(val) {
  if (val === undefined) {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (error) {
    return null;
  }
}

function removeItem(key) {
  if (isLocalStorageEnabled()) {
    return window.localStorage.removeItem(key);
  }
}

function getObject(key) {
  if (isLocalStorageEnabled()) {
    return maybeJSONParse(localStorage.getItem(key));
  }
}

function setObject(key, object) {
  if (object === undefined) {
    return removeItem(key);
  }
  if (isLocalStorageEnabled()) {
    window.localStorage.setItem(key, JSON.stringify(object));
  }
}

function getItem(key) {
  if (isLocalStorageEnabled()) {
    return window.localStorage.getItem(key);
  }
}

function setItem(key, item) {
  if (isLocalStorageEnabled()) {
    window.localStorage.setItem(key, item);
  }
}

function cleanSaveItem(key, item) {
  item ? setItem(key, item) : removeItem(key);
}

export {
  getObject, setObject, getItem, setItem, removeItem, cleanSaveItem,
};
