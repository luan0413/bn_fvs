import {template } from './const.js'

export function getHolidays(data) {

    return template('holiday/getHolidays.do',data)
}

export function insertHoliday(data) {

    return template('holiday/insertHoliday.do',data)
}

export function updateHoliday(data) {

    return template('holiday/updateHoliday.do',data)
}

export function deleteHoliday(data) {

    return template('holiday/deleteHoliday.do',data)
}

export default {

    getHolidays,
    insertHoliday,
    updateHoliday,
    deleteHoliday
}
