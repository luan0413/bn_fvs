import {template } from './const.js'

export function getPrograms(data) {

    return template('program/getPrograms.do',data)
}

export function insertProgram(data) {

    return template('program/insertProgram.do',data)
}

export function updateProgram(data) {

    return template('program/updateProgram.do',data)
}

export function updateProgramsStatus(data) {

    return template('program/updateProgramsStatus.do',data)
}

export function deleteProgram(data) {

    return template('program/deleteProgram.do',data)
}

export default {
    getPrograms,
    insertProgram,
    updateProgram,
    deleteProgram,
    updateProgramsStatus
}
