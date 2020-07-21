import {template } from './const.js'

export function getParameters(data) {

    return template('parameter/getParameters.do',data)
}

export function updateParameter(data) {

    return template('parameter/updateParameter.do',data)
}

export default {
    getParameters,
    updateParameter
}
