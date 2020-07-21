import {template } from './const.js'

export function getCodes(data) {

    return template('code/getCodes.do',data)
}

export function getCodeMap(data) {

  return template('code/getCodeMap.do',data)
}

export function getCodeTypes(data) {

    return template('code/getCodeTypes.do',data)
}
export function insertCode(data) {

    return template('code/insertCode.do',data)
}
export function updateCode(data) {

    return template('code/updateCode.do',data)
}
export function deleteCode(data) {

    return template('code/deleteCode.do',data)
}

export default {
    getCodes,
    getCodeTypes,
    insertCode,
    updateCode,
    deleteCode,
    getCodeMap,
}
