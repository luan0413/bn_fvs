import {template } from './const.js'

export function getLinkDevices(data) {

    return template('linkdevice/getLinkDevices.do',data)
}

export function insertLinkDevice(data) {

    return template('linkdevice/insertLinkDevice.do',data)
}

export function updateLinkDevice(data) {

    return template('linkdevice/updateLinkDevice.do',data)
}

export function deleteLinkDevice(data) {

    return template('linkdevice/deleteLinkDevice.do',data)
}

export default {
    getLinkDevices,
    insertLinkDevice,
    updateLinkDevice,
    deleteLinkDevice
}
