import {
  template
} from './const.js';


export function getFogAreas() {

  return template('fogArea/getFogAreas.do', null);
}


export function queryFogAreas(data) {

  return template('fogArea/queryFogAreas.do', data);
}

export function insertFogArea(data) {

  return template('fogArea/insertFogArea.do', data);
}

export function updateFogArea(data) {

  return template('fogArea/updateFogArea.do', data);
}

export function deleteFogArea(data) {

  return template('fogArea/deleteFogArea.do', data);
}

export function getDevices(data) {

  return template('fogArea/getDevices.do', data);
}

export function getDeviceConnections(data) {

  return template('fogArea/getDeviceConnections.do', data);
}

export function setRelayMain(data) {

  return template('fogArea/setRelayMain.do', data);
}

export function setRelayBak(data) {

  return template('fogArea/setRelayBak.do', data);
}

export function setRelayOff(data) {

  return template('fogArea/setRelayOff.do', data)
}

export function setControllersConfig(data) {

  return template('fogArea/setControllersConfig.do', data);
}

export function queryControllersConfig(data) {

  return template('fogArea/queryControllersConfig.do', data);
}

export function getVisibilityStatistics(data) {

  return template('fogArea/getVisibilityStatistics.do', data);
}

export function setLeds(data) {

  return template('fogArea/setLeds.do', data);
}

export function setLights(data) {

  return template('fogArea/setLights.do', data);
}

export function setHorns(data) {

  return template('fogArea/setHorns.do', data);
}

export function setCameras(data) {

  return template('fogArea/setCameras.do', data);
}

export function getDeviceStatistics(data) {

  return template('fogArea/getDeviceStatistics.do', data);
}
export function setVisibility(data) {

  return template('fogArea/setVisibility.do', data);
}
export function updateFogAreaTimer(data) {

  return template('fogArea/updateFogAreaTimer.do', data);
}
//更新感光配置
export function updateFogAreaLightConfig(data) {

  return template('fogArea/updateFogAreaLightConfig.do', data);
}
//查询定时参数
export function queryControllersTimerConfig(data) {

  return template('fogArea/queryControllersTimerConfig.do', data);
}
//设置定时参数
export function setControllersTimerConfig(data) {

  return template('fogArea/setControllersTimerConfig.do', data);
}
export default {
  getFogAreas,
  queryFogAreas,
  insertFogArea,
  updateFogArea,
  deleteFogArea,
  getDevices,
  getDeviceConnections,
  setRelayMain,
  setRelayBak,
  setRelayOff,
  setControllersConfig,
  queryControllersConfig,
  getVisibilityStatistics,
  getDeviceStatistics,
  setLeds,
  setLights,
  setHorns,
  setCameras,
  setVisibility,
  updateFogAreaTimer,
  updateFogAreaLightConfig,
  queryControllersTimerConfig,
  setControllersTimerConfig
}
