class Animal {
  events
  methods
  params
  name
  move (distance) {
    console.log(`Animal moved ${distance}m`);
  }
}

class Dog extends Animal {
  name = 'dog'
  constructor(props) {
    super(props)
  }

  get name () {
    return this.name
  }

  setName (name) {
    this.name = name
  }
}

const a = new Dog();
a.setName('Jim');
console.log(a);
console.log(a.name);


