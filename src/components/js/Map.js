// 地图对象

// var _mMap=null;
// 页面打开
function onLoad(_mMap) {
    if (typeof _mMap == "undefined") {
        window.setTimeout("onLoad(_mMap)", 10);
        return;
    }
    // 得到地图的div对象
    _mMap = new DPS.Map(document.getElementById('map'));
    // 缩放等级
    _mMap.showZoomBarControl();
    // 鹰眼
    _mMap.showOverviewMap();
    // 地图类型
    // _mMap.showMapTypeControl();
    // 比例尺
    _mMap.showScaleControl();
    // 工具栏
    // _mMap.showToolBarControl();
    // 版权
    _mMap.showCopyright();
    //隐藏工具条
    // _mMap.hideToolBarControl();
    // 地图加载完成事件

    //_mMap.onViewLoadEvent(_mMap, testonViewLoadEvent);
    return _mMap;
}

function testonViewLoadEvent(sender, eArgs) {
    //初始化默认的地图层级
    //let me=sender;
    //let centerPoint=me.getMapCenterPoint()
    //me.zoomByLevelCenter(15, centerPoint)
}



export default {
    onLoad,
    testonViewLoadEvent
}