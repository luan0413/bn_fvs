import Vue from 'vue'
import Router from 'vue-router'
import SystemConfig from '@/components/SystemConfig'
import Login from '@/components/Login'
import Error from '@/components/Error'
import Role from '@/components/Role'
import User from '@/components/User'
import Function from '@/components/Function'
import Code from '@/components/Code'
import Config from '@/components/Config'
import QueryDevices from '@/components/QueryDevices'
import InitialDevice from '@/components/InitialDevice'
import Parameter from '@/components/Parameter'
import SolutionConfig from '@/components/SolutionConfig'
import OperationLog from '@/components/OperationLog'
import SystemLog from '@/components/SystemLog'
import ControlStrategy from '@/components/ControlStrategy'
import Statistics from '@/components/Statistics'
import FogAreaStatistics from '@/components/FogAreaStatistics'
import DeviceStatistics from '@/components/DeviceStatistics'
import Department from '@/components/Department'
import Person from '@/components/Person'
import DeviceMonitor from '@/components/DeviceMonitor'
import FogAreaMonitor from '@/components/FogAreaMonitor.vue'
import SerialPort from '@/components/SerialPort'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            component: Login,
        },
        {
            path: '/devicemonitor',
            name: 'DeviceMonitor',
            component: DeviceMonitor,
            // meta: {
            //     keepAlive: true // 需要被缓存
            //   }
        },
        {
            path: '/fogareamonitor',
            name: 'FogAreaMonitor',
            component: FogAreaMonitor,
            // meta: {
            //     keepAlive: true // 需要被缓存
            //   }
        },
        {
            path: '/statistics',
            component: Statistics,
            children: [{
                    path: 'querydevices',
                    component: QueryDevices,
                }, {
                    path: 'fogareastatistics',
                    component: FogAreaStatistics,
                },
                {
                    path: 'devicestatistics',
                    component: DeviceStatistics,
                }
            ],
        },
        {
            path: '/systemconfig',
            component: SystemConfig,
            children: [{
                    path: 'user',
                    component: User,
                },
                {
                    path: 'role',
                    component: Role,
                },
                {
                    path: 'function',
                    component: Function,
                },
                {
                    path: 'parameter',
                    component: Parameter,
                },
                {
                    path: 'code',
                    component: Code,
                },
                {
                    path: 'operationlog',
                    component: OperationLog,
                },
                {
                    path: 'config',
                    component: Config,
                },
                {
                    path: 'querydevices',
                    component: QueryDevices,
                },
                {
                    path: 'initialdevice',
                    component: InitialDevice,
                },
                {
                    path: 'solutionconfig',
                    component: SolutionConfig,
                },
                {
                    path: 'controlstrategy',
                    component: ControlStrategy,
                },
                {
                    path: 'systemlog',
                    component: SystemLog,
                },
                {
                    path: 'department',
                    component: Department,
                },
                {
                    path: 'person',
                    component: Person,
                },
                {
                    path: 'serialport',
                    component: SerialPort,
                },
            ]
        },
        {
            path: '/4399',
            component: Error,
        }
    ]
})

export default router