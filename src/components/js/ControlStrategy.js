import { template } from './const.js'

export function getStrategies(data) {
    return template('strategy/getStrategies.do', data);
}
export function updateStrategy(data) {
    return template('strategy/updateStrategy.do', data);
}

export default {
    getStrategies,
    updateStrategy,
}