import {template } from './const.js'

export function getControllers(data) {

    return template('controller/getControllers.do',data)
}

export function queryControllers(data) {

  return template('controller/queryControllers.do', data)
}

export function getLamps(data) {

    return template('controller/getLamps.do',data)
}

export function insertController(data) {

    return template('controller/insertController.do',data)
}

export function updateController(data) {

    return template('controller/updateController.do',data)
}

export function deleteController(data) {

    return template('controller/deleteController.do',data)
}

export function setControllerConfig(data) {

    return template('controller/setControllerConfig.do',data)
}

export function queryController(data) {

    return template('controller/queryController.do',data)
}

export function setController(data) {

    return template('controller/setController.do',data)
}

export function setVisibilityScales(data) {

    return template('controller/setVisibilityScales.do',data)
}

export function queryVisibilityScales(data) {

  return template('controller/queryVisibilityScales.do',data)
}

export function restartController(data) {

    return template('controller/restartController.do',data)
}

export function queryLamp(data) {

  return template('controller/queryLamp.do', data)
}

export function sendCommand(data) {

  return template('controller/sendCommand.do', data)
}

export default {
    getControllers,
    queryControllers,
    getLamps,
    insertController,
    updateController,
    deleteController,
    setControllerConfig,
    queryController,
    setController,
    setVisibilityScales,
    queryVisibilityScales,
    restartController,
    queryLamp,
    sendCommand,
}
