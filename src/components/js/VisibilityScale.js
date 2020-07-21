import {template } from './const.js'

export function getVisibilityScales() {

    return template('scale/getVisibilityScales.do',null)
}

export function updateVisibilityScale(data) {

    return template('scale/updateVisibilityScale.do',data)
}

export function updateVisibilityScales(data) {

    return template('scale/updateVisibilityScales.do',data)
}

export default {
    getVisibilityScales,
    updateVisibilityScale,
    updateVisibilityScales,
}
