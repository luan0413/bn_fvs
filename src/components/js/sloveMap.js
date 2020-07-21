import Dictionary from "./Dictionary.js";

//得到图层对象
function getElementLayer(name, objmap) { //获取图层
    let tempLayer = null;
    // 先取图层
    tempLayer = objmap.getLayerByName(name);
    if (!tempLayer) {
        // 图层不存在，构造后使用
        tempLayer = DPS.Factory.createElementLayer(name);
        objmap.addLayer(tempLayer);
    }
    return tempLayer;
}
// 加载面(面填充颜色存在默认样式，输入点时必须闭合)
function drawPolygon(objmap, polygonobj) { //注意，对于面的颜色选择
    let elementPolygon = DPS.Factory.createPolygonElement();
    let geo = DPS.Factory.createGeometry(polygonobj.shape);
    let layer = getElementLayer(polygonobj.wqbm, objmap);
    elementPolygon.setAttributes({ "polygonobj": polygonobj });
    elementPolygon.setGeometry(geo);
    // 正常样式
    let tempNormalSymbol = elementPolygon.getNormalSymbol();
    // 高亮样式
    let tempHighlightSymbol = elementPolygon.getHighlightSymbol();
    tempNormalSymbol.setFillOpacity(1);
    tempNormalSymbol.setOpacity(1);
    tempHighlightSymbol.setFillOpacity(1);
    tempHighlightSymbol.setOpacity(1);
    if (polygonobj.njd <= 100) {
        tempNormalSymbol.setColor("#ff0000");
        tempHighlightSymbol.setColor("#ff0000");
        tempNormalSymbol.setFillColor("#ff0000");
        tempHighlightSymbol.setFillColor("#ff0000");
    } else if (polygonobj.njd > 100 && polygonobj.njd <= 500) {
        tempNormalSymbol.setColor("#ff9900");
        tempHighlightSymbol.setColor("#ff9900");
        tempNormalSymbol.setFillColor("#ff9900");
        tempHighlightSymbol.setFillColor("#ff9900");
    } else if (polygonobj.njd > 500 && polygonobj.njd <= 1000) {
        tempNormalSymbol.setColor("#ffff00");
        tempHighlightSymbol.setColor("#ffff00");
        tempNormalSymbol.setFillColor("#ffff00");
        tempHighlightSymbol.setFillColor("#ffff00");
    } else if (polygonobj.njd > 1000) {
        tempNormalSymbol.setColor("#00ff00");
        tempHighlightSymbol.setColor("#00ff00");
        tempNormalSymbol.setFillColor("#00ff00");
        tempHighlightSymbol.setFillColor("#00ff00");
    }
    layer.addElement(elementPolygon);
    objmap.refresh();
    return elementPolygon
}
/**
 * @method          改变地图导航背景图
 * @param mapObj    地图对象
 */
function changeNavImage(mapObj) {
    const dom = document.getElementsByClassName("navbutton");
    dom[0].className = "navbutton active";
    for (let i = 0; i < dom.length; i++) {
        dom[i].onclick = function() {
            for (let j = 0; j < dom.length; j++) {
                dom[j].className = "navbutton";
            }
            dom[i].className = "navbutton active";
        }
    }
    let callback = (mapObj, eArgs) => {
        if (eArgs._mCurrentTool._mName == "PanTool") { //当地图鼠标状态变为“小手”，时，默认回到漫游选中状态
            const dom = document.getElementsByClassName("navbutton");
            for (let i = 0; i < dom.length; i++) {
                dom[i].className = "navbutton";
            }
            dom[0].className = "navbutton active";
        }
    }
    mapObj.onMapToolChangedEvent(mapObj, callback)
}
// 加载marker对象
function drawMarker(objmap, pointobj) { //地图对象，设备点对象
    let marker = DPS.Factory.createMarkerElement();
    let geo = DPS.Factory.createGeometry(pointobj.shape);
    let layername = ""
    if (pointobj.type == Dictionary.Sblx.Lamp) {
        layername = pointobj.wqbm + '+' + pointobj.kzqbm + '+' + Dictionary.Sblx.Lamp
    } else if (pointobj.type == Dictionary.Sblx.Visibility) {
        layername = pointobj.wqbm + '+' + Dictionary.Sblx.Visibility
    } else if (pointobj.type == Dictionary.Sblx.Controller) {
        layername = pointobj.wqbm + '+' + Dictionary.Sblx.Controller
    } else if (pointobj.type == Dictionary.Sblx.Meteo) {
        layername = pointobj.wqbm + '+' + Dictionary.Sblx.Meteo
    } else if (pointobj.type == Dictionary.Sblx.Horn) {
        layername = pointobj.wqbm + '+' + Dictionary.Sblx.Horn
    } else if (pointobj.type == Dictionary.Sblx.Screen) {
        layername = pointobj.wqbm + '+' + Dictionary.Sblx.Screen
    } else if (pointobj.type == Dictionary.Sblx.Light) {
        layername = pointobj.wqbm + '+' + Dictionary.Sblx.Light
    }
    let layer = getElementLayer(layername, objmap);
    marker.setAttributes({ "pointobj": pointobj, "edit": pointobj.edite });
    marker.setGeometry(geo);
    marker.setTag(pointobj.id)
        // 正常样式
    let tempNormalSymbol = marker.getNormalSymbol();
    tempNormalSymbol.setWidth(11);
    tempNormalSymbol.setHeight(11);
    // 高亮样式
    let tempHighlightSymbol = marker.getHighlightSymbol();
    tempHighlightSymbol.setWidth(11);
    tempHighlightSymbol.setHeight(11);

    // 选中样式
    let tempSelectedSymbol = marker.getSelectedSymbol();
    tempSelectedSymbol.setWidth(11);
    tempSelectedSymbol.setHeight(11);
    const BaseMapUrl = 'http://' + window.config.BaseMapUrl
    if (pointobj.type == 1) { //能见度检测仪
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_select.png");
        }

    } else if (pointobj.type == 2) { //控制器
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_select.png");
        }

    } else if (pointobj.type == 6) { //限速屏
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_select.png");
        }

    } else if (pointobj.type == 4) { //气象仪
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_select.png");
        }


    } else if (pointobj.type == 5) { //号角
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_select.png");
        }
    } else if (pointobj.type == 7) { //警灯
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_select.png");
        }

    } else if (pointobj.type == 3) { //雾灯
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_dis_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_dis_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_dis_select.png");
        } else {
            tempNormalSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_normal.png");
            tempHighlightSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_hover.png");
            tempSelectedSymbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_select.png");
        }

    }

    layer.addElement(marker);
    objmap.refresh();
    return marker
}


/**
 * @method        添加雾区数据
 * @param shape     点坐标值
 * @param pointObj  绘制的元素对象
 * @param flag  (true or false针对设备和设施)
 */
function addFogarea(shape, wqbm) {
    return new Promise((resolve, reject) => {
        let mapData = new VD.MapData({
            serviceMethod: "insert",
            returnType: 1,
            layerName: "base_fvs_fogarea",
            wktStr: shape,
            fields: "WQBM",
            fieldValues: `${wqbm}`,
            chartset: document.charset
        });
        mapData.sendRequest((data, config) => {
            resolve(data)
        });
    })
}
/**
 * @method        修改雾区数据
 * @param shape     点坐标值
 * @param pointObj  绘制设备元素对象
 * @param flag  (true or false针对设备和设施)
 */
function updateFogarea(shape, wqbm) {
    return new Promise((resolve, reject) => {
        let mapData = new VD.MapData({
            serviceMethod: "update",
            returnType: 1,
            sqlWhere: `WQBM=${wqbm}`,
            layerName: "base_fvs_fogarea",
            wktStr: shape,
            fields: "WQBM",
            fieldValues: `${wqbm}`,
            chartset: document.charset
        });
        mapData.sendRequest((data, config) => {
            resolve(data)
        });
    })
}

// 根据点缩放定位
function zoomToPoint(objmap) {
    let dataPoint = null;
    // 构造点
    dataPoint = DPS.Factory.createPoint();
    dataPoint.putCoords(12659003.7561987, 4300015.231622557499996);
    //定位
    objmap.zoomToGeometry(dataPoint);
    // 闪烁
    objmap.flashGeometry(dataPoint, 100)
    objmap.refresh();
}

//放大
function zoomInCommand(objmap) {
    objmap.zoomInCommand();
}

// 缩小
function zoomOutCommand(objmap) {
    objmap.zoomOutCommand();
}

// 查询
function selectinfo(layername) {
    var mapData = new VD.MapData({
        serviceMethod: "search",
        returnType: 1,
        layerName: layername,
        colList: "all",
        beginRecord: 0,
        featureLimit: 1000000000,
        returnCoordType: -1,
        chartset: document.charset
    });
    return mapData
}
/**
 * @method          删除地图上单一元素
 * @param mapObj    地图对象
 * @param pointObj  绘制的元素对象
 *  @param flag  (true or false针对设备和设施)
 */
function deleteElement(mapObj, pointObj) {
    let layerName = `${pointObj.wqbm}`
    let layer = getElementLayer(layerName, mapObj);
    let elements = layer.getAllElement();
    let flag = false;
    if (elements.length > 1) {
        flag = true;
    }
    for (let i = 0; i < elements.length; i++) {
        let infoObj = elements[i].getAttributes().polygonobj;
        if (infoObj.wqbm == pointObj.wqbm) {
            layer.removeElement(elements[i])
            mapObj.refresh()
            if (flag) {
                deleteElement(mapObj, pointObj)
            } else {
                return
            }
            // return
        }
    }
    mapObj.refresh()
}
//查询所有点
export default {
    getElementLayer,
    drawMarker,
    drawPolygon,
    zoomToPoint,
    zoomOutCommand,
    zoomInCommand,
    selectinfo,
    updateFogarea,
    addFogarea,
    deleteElement,
    changeNavImage
    // loadKMLService
}