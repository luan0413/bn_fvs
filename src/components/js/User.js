import {template } from './const.js'

export function getUser(data) {

    return template('user/getUser.do',data)
}

export function getUsers(data) {

    return template('user/getUsers.do',data)
}

export function insertUser(data) {

    return template('user/insertUser.do',data)
}

export function updateUser(data) {

    return template('user/updateUser.do',data)
}

export function updatePasswordByUser(data) {

    return template('user/updatePasswordByUser.do',data)
}

export function updatePasswordByAdmin(data) {

    return template('user/updatePasswordByAdmin.do',data)
}

export function deleteUser(data) {

    return template('user/deleteUser.do',data)
}


export default {
    getUser,
    getUsers,
    insertUser,
    updateUser,
    updatePasswordByUser,
    updatePasswordByAdmin,
    deleteUser,
}
