import {template } from './const.js'

export function getRoles(data) {

    return template('role/getRoles.do',data)
}

export function insertRole(data) {

    return template('role/insertRole.do',data)
}

export function updateRole(data) {

    return template('role/updateRole.do',data)
}

export function deleteRole(data) {

    return template('role/deleteRole.do',data)
}

export default {

    getRoles,
    insertRole,
    updateRole,
    deleteRole,
}
