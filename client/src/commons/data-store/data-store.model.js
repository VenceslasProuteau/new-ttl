import _ from 'lodash';
import { getObject, setObject } from './localstorage.service';

const setLocalStorage = (id, value) => setObject(id, value);
const getLocalStorage = (id) => getObject(id);

/* istanbul ignore file */
export class DataStore {
  constructor(id) {
    this.id = id;
    this.store = getLocalStorage(this.id) || {}; // do not use directly, no private property in JS
  }

  get() {
    const store = _.isEmpty(this.store) ? getLocalStorage(this.id) : this.store;
    this.store = store;

    return { ...this.store };
  }

  set(newStore, isSaved) {
    this.store = { ...this.store, ...newStore };
    isSaved && setLocalStorage(this.id, this.store);
  }

  reset() {
    this.store = {};
    setLocalStorage(this.id, this.store);
  }
}
