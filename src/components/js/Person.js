import {template } from './const.js'


export function getPersons(data) {

  return template('person/getPersons.do', data)
}

export function insertPerson(data) {

  return template('person/insertPerson.do', data)
}

export function updatePerson(data) {

  return template('person/updatePerson.do', data)
}

export function deletePerson(data) {

  return template('person/deletePerson.do', data)
}

export default {
  getPersons,
  insertPerson,
  updatePerson,
  deletePerson,
}
