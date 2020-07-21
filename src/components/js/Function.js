import { template } from './const.js'

export function getFunctions(data) {
    return template('function/getFunctions.do', data);
}

export const FunctionRouters = {
    "01040100": "/config",
    "01040200": "/initialdevice",
    "01040300": "/solutionconfig",
    // "01040400": "/querydevices",
    "01040400": "/user",
    "01040500": "/function",
    "01040600": "/role",
    "01040700": "/parameter",
    "01040800": "/code",
    "01040900": "/department",
    "01041000": "/person",
    "01041200": "/operationlog",
    "01041100": "/systemlog",
    "01041300": "/controlstrategy",
    "01041400": "/serialport",
};
export const StatisticsRouters = {
    "01030100": "/querydevices",
    "01030200": "/devicestatistics",
    "01030300": "/fogareastatistics",
}

export default {
    getFunctions,
    FunctionRouters,
    StatisticsRouters
}