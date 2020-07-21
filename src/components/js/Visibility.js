import {template } from './const.js'

export function getVisibilities(data) {

    return template('visibility/getVisibilities.do',data)
}

export function insertVisibility(data) {

    return template('visibility/insertVisibility.do',data)
}


export function updateVisibility(data) {

    return template('visibility/updateVisibility.do',data)
}


export function deleteVisibility(data) {

    return template('visibility/deleteVisibility.do',data)
}

export default {
    getVisibilities,
    insertVisibility,
    updateVisibility,
    deleteVisibility
}
