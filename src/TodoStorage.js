class TodoItem {
  constructor (id, message, done) {
    this.id = id;
    this.message = message;
    this.done = done;
  }
}

class TodoStorage {
  constructor (key = 'todo') {
    this._key = key;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        this._data = JSON.parse(data);
      } catch (_) {
        this._data = [];
      }
    } else {
      this._data = [];
      this._save();
    }
  }

  _save () {
    try {
      localStorage.setItem(this._key, JSON.stringify(this._data));
    } catch (_) {}
  }

  select () {
    return [...this._data];
  }

  insert (message) {
    const todoItem = new TodoItem(+new Date(), message, false);
    this._data.unshift(todoItem);
    this._save();
  }

  update (id, message, done) {
    for (const item of this._data) {
      if (item.id === id) {
        item.message = message;
        item.done = done;
        break;
      }
    }
    this._save();
  }

  delete (id) {
    for (let i = 0; i < this._data.length; i++) {
      if (this._data[i].id === id) {
        this._data.splice(i, 1);
        break;
      }
    }
    this._save();
  }
}

export default TodoStorage;
