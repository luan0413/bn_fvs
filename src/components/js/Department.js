import {template } from './const.js'


export function getDepartmentTree() {

  return template('department/getDepartmentTree.do', null)
}

export function insertDepartment(data) {

  return template('department/insertDepartment.do', data)
}

export function updateDepartment(data) {

  return template('department/updateDepartment.do', data)
}

export function deleteDepartment(data) {

  return template('department/deleteDepartment.do', data)
}

export default {
  getDepartmentTree,
  insertDepartment,
  updateDepartment,
  deleteDepartment,
}
