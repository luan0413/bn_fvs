//字典代码
export const CodeType = {
    //性别
    PersonSex: "00001",
    //人员类型
    PersonType: "00002",
    //编制类型
    OrganizationType: '00003',
    //人员管理 行政级别
    PolAdministrationLevel: '00004',
    //警衔
    PoliceRank: '00005',
    //机构类型
    InstitutionalType: '00006',
    //控制器操作
    OperationLog: "00007",
    //系统日志操作模式
    SystemLog: '00008',
    //雾灯工作模式
    FogAreaWorkMode: "01001",
    //设备类型
    DeviceType: '01003',
    //设备厂家
    DeviceManufacturers: '01006',
    //雾灯控制状态
    ControllerWorkMode: "01007",
    //能见度统计时间级别
    VisibilityStatisticsLevel: "01008",
    //工作模式
    WorkPattern: '01015',
    //是否使用雾灯报警
    LampAlarm: "01016",
    //是否使用雷达
    UseRadar: '01017',
    //联动开关状态
    LinkedSwitch: '01012',
    //继电器控制模式
    RelayControlMode: '01019',

    //雾灯亮度等级
    LampLevel: "01021",
    //雾灯地址段类型
    LampAddressType: "01023",
    //重复方案是否启用
    ProgramEnabled: "01024",
    //警灯
    screen: "01025",
    //号角
    hornCodes: "01026",
    ssplCode: "01029", //闪烁频率
    zkbCode: "01030", //占空比
};

export const Sbzt = {
    Normal: 1,
    Error: 2
};

//雾区工作模式
export const FogAreaWorkMode = {
    Auto: 1,
    Manual: 2,
    Fixed: 3,
    Temp: 4,
    Conflict: 5
};

//雾灯控制模式
export const ControllerWorkMode = {

    FlashRed: 1,
    FlashYellow: 2,
    Detection: 3,
    Off: 4,
    Auto: 5

};

//雾灯地址段类型
export const LampAddressType = {
    AB: 0,
    A: 1,
    B: 2
};

//设备类型
export const Sblx = {

    Visibility: 1,
    Controller: 2,
    Lamp: 3,
    Meteo: 4,
    Horn: 5,
    Screen: 6,
    Light: 7,
    Relay: 8,
    FogArea: 9,
    Camera: 10,
};

//发送设备消息结果
export const SendResult = {

    //发送成功
    Success: 0,
    //发送失败
    SendFailed: 1,
    //超时
    Timeout: 2,
    //找到了设备，但是没连接上
    Disconnection: 3,
    //没有找到设备连接
    NotFoundSocket: 4,
    //设置控制器特有的错误，表示现场正在使用屏幕或遥控器操作控制雾灯
    Controller: 5,
    //等待下发
    WaitIssue: 6,
};

//数据库存储
export const DatabaseResult = {
    Success: 0,
    Failed: 1
};


//雾灯开关状态
export const LampSwitchStatus = {
    Close: 0,
    Open: 1
};


//雾灯报警状态
export const LampWarningStatus = {
    Open: 0,
    Close: 1
};

//雾灯雷达状态
export const LampRadarStatus = {
    Close: 0,
    Open: 1
};

//雾灯地址段类型
export const VisibilityStatisticsLevel = {
    Day: 1,
    Month: 2
};

//继电器控制模式
export const RelayControlMode = {
    Main: 1,
    Bak: 2,
    Off: 3,
    Error: 4
};

//部门编号的特殊标识
export const DepartmentTag = {
    All: 0,
    None: -1
};

export default {
    CodeType,
    SendResult,
    DatabaseResult,
    FogAreaWorkMode,
    ControllerWorkMode,
    LampAddressType,
    Sblx,
    Sbzt,
    LampWarningStatus,
    LampSwitchStatus,
    LampRadarStatus,
    VisibilityStatisticsLevel,
    RelayControlMode,
    DepartmentTag
}