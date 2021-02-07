
class Dep {
  constructor() {
    this.deps = new Set();
  }

  depend () {
    if (Dep.target && Dep.target.update) {
      this.deps.add(Dep.target);
    }
  }

  notify () {
    this.deps.forEach(watcher => {
      watcher.update();
    })
  }
}

function defineReactive (data, key) {
  let val = data[key];
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get () {
      dep.depend();
      return val;
    },

    set (newVal) {
      val = newVal;
      dep.notify();
    },
  })

  if (isObject(val)) {
    defineReactive(val);
  }
}