import { template } from './const.js'

export function getSocketLogs(data) {

    return template('log/getSocketLogs.do', data)
}

export function getSystemLogs(data) {

    return template('log/getSystemLogs.do', data)
}

export function getBytesLogs(data) {

    return template('log/getBytesLogs.do', data)
}

export function querySocketLogs(data) {

    return template('log/querySocketLogs.do', data)
}

export default {
    getSocketLogs,
    getSystemLogs,
    getBytesLogs,
    querySocketLogs,
}