import {template } from './const.js'

import axios from 'axios'

export function login(data) {

    return template('login/login.do',data,null)
}

export function validate() {

    return template('login/validate.do',null)
}

export default {
    login,
    validate
}
