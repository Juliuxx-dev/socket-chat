class Users {
  constructor() {
    this.persons = [];
  }

  addPerson(id, name, room) {
    let person = { id, name, room };
    this.persons.push(person);

    return this.persons;
  }

  getPerson(id) {
    let person = this.persons.filter(person => person.id === id)[0];

    return person;
  }

  getPersons() {
    return this.persons;
  }

  getPersonsByRoom(room, filter) {
    let persons = this.persons.filter(person => {
      if (filter) {
        let regExp = new RegExp(filter, "gi");

        return person.room === room && person.name.match(regExp);
      } else {
        return person.room === room
      }
    });

    return persons;
  }

  removePersonFromRoom(id) {
    let removedPerson = this.getPerson(id);

    this.persons = this.persons.filter(person => person.id !== id);

    return removedPerson;
  }
}

module.exports = {
  Users
}