/**
 name:名称（必填）（必填项验证）
 flag:触发行为（bulr---失去焦点----true；change---值改变----true）
 type：类型（用于格式校验）
 minLength：最小长度
 maxLength：最大长度
 * * */
/*
demo：
密码校验（密码长度一般设置为16）： this.filterRules('密码', true, 16, 1),
设备名称（长度设置为50）: this.filterRules('设备名称', true, 50, 1),
*/

let filterRules = (name, flag, maxLength, minLength, type) => {
    let rules = [];
    if (name) {
        if (flag) {
            rules.push({ required: true, message: '请输入' + name, trigger: 'blur' })
        } else {
            rules.push({ required: true, message: '请选择' + name, trigger: 'change' })
        }

    }
    if (maxLength) {
        rules.push({ min: 1, max: maxLength, message: '最多输入' + maxLength + '个字符!', trigger: 'blur' })

    }
    if (minLength && maxLength) {
        rules.push({ min: minLength, max: maxLength, message: '字符长度在' + minLength + '至' + maxLength + '之间!', trigger: 'blur' })

    }
    if (type) {
        switch (type) {
            case 'email': //邮箱
                rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' });
                break;
            case 'ip': //ip
                rules.push({ pattern: /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/, message: '请输入正确的IP地址', trigger: 'blur' });
                break;
            case 'time': //时长，例如红灯延时，亮灯时长
                rules.push({ pattern: /^([0-9]{1,5})$/, message: name + '必须在0-99999之间', trigger: 'blur' });
                break;
            case 'wdld': //雾灯亮度
                // rules.push({ pattern: /^(10|[0-9])$/, message: '雾灯亮度必须在0-10之间', trigger: 'blur' });
                rules.push({ pattern: /^([0-9]{1,3})$/, len: 3, message: '雾灯亮度必须在1-99之间', trigger: 'blur' })
                break;
            case 'hjyl': //号角音量
                rules.push({ pattern: /^(10|[0-9])$/, message: '号角音量必须在0-10之间', trigger: 'blur' });
                break;
            case 'alarm': //警示灯
                // rules.push({ pattern: /^(110|10\d|[1-9]\d|\d)$/, message: '警示灯数量必须在0-99之间', trigger: 'blur' });
                rules.push({ pattern: /^([0-9]|[1-4]\d|50)$/, message: '警示灯数量组必须在0-50之间', trigger: 'blur' });
                break;
            case 'fz': //阀值
                rules.push({ pattern: /^([0-9]{1,5})$/, message: '阀值必须在0-99999之间', trigger: 'blur' });
                break;
            case 'jdq': //继电器
                rules.push({ pattern: /^([0-9]{1,5})$/, message: '继电器标识码必须在0-99999之间', trigger: 'blur' });
                break;
            case 'xsz': //限速值
                rules.push({ pattern: /^[0-9]{1,4}$/, message: '限速值必须在0-9999之间', trigger: 'blur' });
                break;
            case 'intervalTime': //巡检间隔
                rules.push({ pattern: /^([0-9]{1,3})$/, message: '巡检间隔必须在0-999之间', trigger: 'blur' });
                break;
            case 'kzqbsm': //控制器标识码
                rules.push({ pattern: /^[0-9]{1,4}$/, message: '控制器标识码必须在0-9999之间', trigger: 'blur' });
                break;
            case 'address': //地址（开始或者结束）
                rules.push({ pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: name + '必须在1~65535之间', trigger: 'blur' });
                break;
            case 'week': //星期
                rules.push({ type: 'array', required: true, message: '请至少选择一个星期', trigger: 'blur,change' });
                break;
            case 'port': //端口
                rules.push({ pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '端口必须在1~65535之间', trigger: 'blur' });
                break;
            default:
                rules.push({});
                break;
        }
    }
    return rules;
};
export default filterRules