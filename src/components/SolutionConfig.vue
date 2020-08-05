<template>
  <div class="SolutionConfig grid">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.SolutionConfig') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form label-width="100px" size="mini">
          <ul class="searchList">
            <li class="w20b">
              <el-form-item :label="$t('message.FogAreaName')" label-width="70px">
                <el-select v-model="wqbm" :placeholder="$t('message.PleaseSelect')" @change="changeFogArea">
                  <el-option v-for="item in fogAreas" :key="item.wqbm" :label="item.wqmc" :value="item.wqbm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="平台强制定时" name="first">
          <!-- $t('message.RepetitionSolution') -->
          <div>
            <div class="btnBox">
              <el-button type="primary" class="operateBtn" plain icon="el-icon-plus" @click="insertProgram()">
                {{ $t('message.Insert') }}</el-button>
              <el-button type="primary" class="operateBtn" plain icon="el-icon-success" @click="updateStatus(1)">
                {{ $t('message.BatchUsing') }}</el-button>
              <el-button type="danger" class="operateBtn" plain icon="el-icon-error" @click="updateStatus(2)">
                {{ $t('message.BatchForbidden') }}</el-button>
            </div>
            <div class="gridBox">
              <el-table highlight-current-row ref="selutionTable" :data="selutionData" border height="350px"
                tooltip-effect="dark" @selection-change="changeSelectedSelutions">
                <el-table-column align="center" type="selection" min-width="35">
                </el-table-column>
                <el-table-column align="center" prop="famc" :label="$t('message.SolutionName')" min-width="70"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="kssjsm" :label="$t('message.StatrTime')" show-overflow-tooltip
                  min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="jssjsm" :label="$t('message.EndTime')" show-overflow-tooltip
                  min-width="70">
                </el-table-column>
                <!-- <el-table-column align="center" prop="weekText" :label="$t('message.RepetitionRule')" min-width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="wdkzsm" :label="$t('message.ControllerPattern')" min-width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="wdlddj" :label="$t('message.LightGread')" show-overflow-tooltip min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="wdld" :label="$t('message.FoglightLuminance')" show-overflow-tooltip min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="ldsc" :label="$t('message.LightsONDuration')+'(ms)'" show-overflow-tooltip min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="mdsc" :label="$t('message.LightsOFFDuration')+'(ms)'" show-overflow-tooltip min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="hdys" :label="$t('message.RedTimeLengthening')+'(s)'" show-overflow-tooltip min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="mqys" :label="$t('message.DeadZoneDuration')+'(s)'" show-overflow-tooltip min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="hsjsdzsl" :label="$t('message.RedLightsNumber')" min-width="70" show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column align="center" prop="kzclsm" label="控制策略描述" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="sfsysm" :label="$t('message.IsUsing')" min-width="70">
                </el-table-column>
                <el-table-column align="center" width="70" :label="$t('message.Operation')">
                  <template slot-scope="scope">
                    <el-button size="mini" class="tableBtnImg" style="margin-right: 03px;"
                      @click="updateProgram(scope.$index, scope.row)">
                      <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
                    </el-button>
                    <el-button size="mini" class="tableBtnImg" style="margin-left: 3px;"
                      @click="deleteProgram(scope.$index, scope.row)">
                      <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="控制器GPS定时" name="second">
          <div>
            <div class="gridBox mt20 combine-table">
              <!-- @selection-change="selectionControllers" -->
              <el-table highlight-current-row height="403px" :data="queryControllersTimerConfigData" border>
                <el-table-column prop="kzqmc" label="控制器名称" min-width="120" align="center" show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <div style="text-align: center;">
                      {{scope.row.kzqmc ? scope.row.kzqmc : "一"}}
                    </div>
                  </template> -->
                </el-table-column>
                <el-table-column label="时段" align="center" show-overflow-tooltip min-width="100">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        1
                        <!-- {{addZero(scope.row.startHour1)+":"+addZero(scope.row.startMinute1)+"-"+addZero(scope.row.stopHour1)+":"+addZero(scope.row.stopMinute1)}} -->
                        <!-- 18:50-18:50 -->
                      </div>
                      <div class="cell-content">
                        2
                        <!-- {{addZero(scope.row.startHour2)+":"+addZero(scope.row.startMinute2)+"-"+addZero(scope.row.stopHour2)+":"+addZero(scope.row.stopMinute2)}} -->
                      </div>
                      <div class="cell-content">
                        3
                        <!-- {{addZero(scope.row.startHour3)+":"+addZero(scope.row.startMinute3)+"-"+addZero(scope.row.stopHour3)+":"+addZero(scope.row.stopMinute3)}} -->
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="开始时间" align="center" show-overflow-tooltip min-width="80">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (addZero(scope.row.startHour1)+":"+addZero(scope.row.startMinute1)) : ""}}
                        <!-- 18:20 -->
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (addZero(scope.row.startHour2)+":"+addZero(scope.row.startMinute2)) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (addZero(scope.row.startHour3)+":"+addZero(scope.row.startMinute3)) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结束时间" align="center" show-overflow-tooltip min-width="80">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (addZero(scope.row.stopHour1)+":"+addZero(scope.row.stopMinute1)) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (addZero(scope.row.stopHour2)+":"+addZero(scope.row.stopMinute2)) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (addZero(scope.row.stopHour3)+":"+addZero(scope.row.stopMinute3)) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="wdkz" label="雾灯控制" align="center" show-overflow-tooltip min-width="100">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.wdkz1sm) : ""}}
                        <!-- {{(scope.row.wdkz1>=1 && scope.row.wdkz1<=7) ? getwdkzCodes(scope.row.wdkz1) : '一'}} -->
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.wdkz2sm) : ""}}
                        <!-- {{(scope.row.wdkz2>=1 && scope.row.wdkz2<=7) ? getwdkzCodes(scope.row.wdkz2) : '一'}} -->
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.wdkz3sm) : ""}}
                        <!-- {{(scope.row.wdkz3>=1 && scope.row.wdkz3<=7) ? getwdkzCodes(scope.row.wdkz3) : '一'}} -->
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="wdld" label="雾灯亮度" align="center" show-overflow-tooltip min-width="70">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.wdld1) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.wdld2) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.wdld3) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="zkb" label="占空比" align="center" show-overflow-tooltip min-width="70">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.zkb1sm) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.zkb2sm) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.zkb3sm) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="hdys" label="红灯延时" align="center" show-overflow-tooltip min-width="70">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.hdys1) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.hdys2) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.hdys3) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="mqys" label="盲区延时" align="center" show-overflow-tooltip min-width="70">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.mqys1) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.mqys2) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.mqys3) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="hsjsdzsl" label="警示灯组数" align="center" show-overflow-tooltip min-width="90">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.hsjsdzsl1) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.hsjsdzsl2) : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.hsjsdzsl3) : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="sfsyxl" label="是否启用星历" align="center" show-overflow-tooltip min-width="100">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content" style="height: 30px;">
                        {{scope.row.readSuccess1 ? (scope.row.sfsyxl1? '是':'否') : ""}}
                      </div>
                      <div class="cell-content" style="height: 30px;">
                        {{scope.row.readSuccess2 ? (scope.row.sfsyxl2? '是':'否') : ""}}
                      </div>
                      <div class="cell-content" style="height: 30px;">
                        {{scope.row.readSuccess3 ? (scope.row.sfsyxl3? '是':'否') : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="星历参考日期" align="center" show-overflow-tooltip min-width="100">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? (scope.row.sfsyxl1? scope.row.month1+"月"+scope.row.day1+"日":"") : ""}}
                        <!-- 10:10 -->
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? (scope.row.sfsyxl2? scope.row.month2+"月"+scope.row.day2+"日":"") : ""}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? (scope.row.sfsyxl3? scope.row.month3+"月"+scope.row.day3+"日":"") : ""}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="month1" label="读取结果" align="center" show-overflow-tooltip min-width="70">
                  <template slot-scope="scope">
                    <div>
                      <div class="cell-content">
                        {{scope.row.readSuccess1 ? '读取成功' : '读取失败'}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess2 ? '读取成功' : '读取失败'}}
                      </div>
                      <div class="cell-content">
                        {{scope.row.readSuccess3 ? '读取成功' : '读取失败'}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="btnBox">
              <el-button type="primary" class="fr" style="padding: 4px 20px;margin: 15px;margin-right: 28px;" plain
                icon="el-icon-refresh" @click="openGpsDialog">设置</el-button>
              <el-button type="primary" class="fr" style="padding: 4px 20px;margin: 15px;margin-right: 10px;" plain
                icon="el-icon-refresh" @click="getQueryControllersTimerConfig">读取</el-button>
            </div>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane :label="$t('message.OnceSolution')" name="second">
          <div>
            <div class="btnBox">
              <el-button type="primary" class="operateBtn" plain icon="el-icon-plus" @click="insertHoliday()">{{ $t('message.Insert') }}</el-button>
            </div>
            <div class="gridBox">
              <el-table highlight-current-row ref="selutionTable" :data="holidays" border height="350px" tooltip-effect="dark" @selection-change="changeSelectedSelutions">
                <el-table-column align="center" prop="famc" :label="$t('message.SolutionName')" min-width="60" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="kssjsm" :label="$t('message.StatrTime')" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="jssjsm" :label="$t('message.EndTime')" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="wdkzsm" :label="$t('message.ControllerPattern')" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="wdlddj" :label="$t('message.LightGread')" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="wdld" :label="$t('message.FoglightLuminance')" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="ldsc" :label="$t('message.LightsONDuration')+'(ms)'" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="mdsc" :label="$t('message.LightsOFFDuration')+'(ms)'" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="hdys" :label="$t('message.RedTimeLengthening')+'(s)'" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="mqys" :label="$t('message.DeadZoneDuration')+'(s)'" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="hsjsdzsl" :label="$t('message.RedLightsNumber')" show-overflow-tooltip min-width="60">
                </el-table-column>
                <el-table-column align="center" width="100" :label="$t('message.Operation')">
                  <template slot-scope="scope">
                    <el-button size="mini" class="tableBtnImg" @click="updateHoliday(scope.$index, scope.row)">
                      <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
                    </el-button>
                    <el-button size="mini" class="tableBtnImg" @click="deleteHoliday(scope.$index, scope.row)">
                      <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </section>
    <el-dialog :title="title" :visible.sync="programDialog" :close-on-click-modal='false' width="900px">
      <el-form :model="program" :rules="programRules" ref="programForm" label-width="100px" size="mini">
        <div class="bana-information mt10 hauto">
          <div class="bana-title">{{ $t('message.BasicMessage') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.SolutionName')" prop="famc">
                  <el-input v-model="program.famc"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.IsUsing')" prop="sfsy">
                  <el-select v-model="program.sfsy" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in sfsys" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>

              </li>
            </ul>
          </div>
        </div>
        <div class="bana-information mt20 hauto">
          <div class="bana-title">{{ $t('message.SolutionTime') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.StatrTime')" prop="kssjsm">
                  <el-time-picker v-model="program.kssjsm" type="datetime" format="HH:mm" value-format="HH:mm"
                    :placeholder="$t('message.PleaseSelect')">
                  </el-time-picker>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.ContinueTime')" prop="cxsj">
                  <el-input v-model="program.cxsj" :disabled="cxsjDisabled"></el-input>
                </el-form-item>
              </li>
              <li class="wall">
                <el-form-item :label="$t('message.RepetitionRule')" prop="faxqjh">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                    style="padding-left: 5px;">全选</el-checkbox>
                  <el-checkbox-group v-model="program.faxqjh" @change="handleCheckedCitiesChange">
                    <el-checkbox label="1">星期一</el-checkbox>
                    <el-checkbox label="2">星期二</el-checkbox>
                    <el-checkbox label="3">星期三</el-checkbox>
                    <el-checkbox label="4">星期四</el-checkbox>
                    <el-checkbox label="5">星期五</el-checkbox>
                    <el-checkbox label="6">星期六</el-checkbox>
                    <el-checkbox label="7">星期日</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>
      </el-form>
      <!-- <div class="bana-information mt20 hauto">
          <div class="bana-title">工作模式</div>
          <div class="bana-information-content">
            <div style="padding: 10px;">
              <el-button type="primary" @click="contronller" size="mini">控制</el-button>
              <el-button size="mini" @click="reset">重启</el-button>
            </div>
          </div>
        </div> -->

      <el-form :model="programItem" :rules="programItemRules" ref="programItemForm" label-width="100px" size="mini">
        <div class="bana-information mt20 hauto">
          <div class="bana-title">控制策略</div>
          <div class="bana-information-content">
            <!-- <el-menu  :default-active="activeClbm" mode="horizontal" text-color="#323232">
                <el-menu-item v-for="item in StrategiesDatas" :key="item.clbm" :index="item.clbm.toString()">
                  <div slot="title" @click="selectStrategies(item)">{{item.clmc }}</div>
                </el-menu-item>
              </el-menu> -->
            <el-radio-group v-model="radioProgram" @change="changeRadioProgram" style="padding: 20px;">
              <el-radio v-for="item in StrategiesDatas" :key="'radioProgram-'+item.clbm" :label="item.clbm">
                {{item.clmc }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="bana-information mt20 hauto"
          v-if="programItem.wdkzxszt||programItem.wdlddjxszt||programItem.wdldxszt||programItem.ssplxszt||programItem.zkbxszt||programItem.ldscxszt||programItem.mdscxszt||programItem.hdysxszt||programItem.mqysxszt||programItem.hsjsdzslxszt">
          <div class="bana-title">{{ $t('message.SolutionParameter') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.ControllerPattern')" prop="wdkz" v-if="programItem.wdkzxszt">
                  <el-select v-model="programItem.wdkz" :placeholder="$t('message.PleaseSelect')"
                    @change="changeControlProgram">
                    <el-option v-for="item in wdkzs" :key="'wdkz-'+item.dm" :label="item.dmsm" :value="item.dm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightGread')" prop="wdld" v-if="programItem.wdlddjxszt">
                  <el-select v-model="programItem.wdlddj" :placeholder="$t('message.PleaseSelect')"
                    :disabled="controlDisabled">
                    <el-option v-for="item in lddjCodes" :key="'wdlddj-'+item.dm" :label="item.dm" :value="item.dm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.FoglightLuminance')" prop="wdld" v-if="programItem.wdldxszt">
                  <el-input v-model="programItem.wdld" type="number" min="1" max="10" step="1" readonly
                    :disabled="controlDisabled"></el-input>
                </el-form-item>
              </li>

              <li>
                <el-form-item :label="$t('message.FlickerFrequency')" v-if="programItem.ssplxszt">
                  <el-select v-model="programItem.sspl" :placeholder="$t('message.PleaseSelect')"
                    :disabled="controlDisabled">
                    <el-option v-for="item in ssplCodes" :key="'sspl-'+item.dm" :label="item.dmsm" :value="item.dm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="占空比" v-if="programItem.zkbxszt">
                  <el-select v-model="programItem.zkb" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in zkbCodes" :key="'zkb-'+item.dm" :label="item.dmsm" :value="item.dm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightsONDuration')+'(ms)'" prop="ldsc" v-if="programItem.ldscxszt">
                  <el-input v-model="programItem.ldsc" type="number" min="0" :disabled="controlDisabled"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightsOFFDuration')+'(ms)'" prop="mdsc" v-if="programItem.mdscxszt">
                  <el-input v-model="programItem.mdsc" type="number" min="0" :disabled="controlDisabled"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.RedTimeLengthening')+'(s)'" prop="hdys" v-if="programItem.hdysxszt">
                  <el-input v-model="programItem.hdys" type="number" min="0" :disabled="controlDisabled"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.DeadZoneDuration')+'(s)'" prop="mqys" v-if="programItem.mqysxszt">
                  <el-input v-model="programItem.mqys" type="number" min="0" :disabled="controlDisabled"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.RedLightsNumber')" prop="hsjsdzsl" v-if="programItem.hsjsdzslxszt">
                  <el-input v-model="programItem.hsjsdzsl" type="number" :disabled="controlDisabled" min="0" max="50">
                  </el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProgram" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="programDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="holidayDialog" :close-on-click-modal='false' width="900px">
      <el-form :model="holiday" :rules="holidayRules" ref="holidayForm" label-width="100px" size="mini">
        <div class="bana-information mt10 hauto">
          <div class="bana-title">{{ $t('message.BasicMessage') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.SolutionName')" prop="famc">
                  <el-input v-model="holiday.famc"></el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div class="bana-information mt20 hauto">
          <div class="bana-title">{{ $t('message.SolutionTime') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.StatrTime')" prop="kssjsm">
                  <el-date-picker v-model="holiday.kssjsm" type="datetime" format="MM-dd HH:mm"
                    value-format="MM-dd HH:mm" :placeholder="$t('message.PleaseSelect')">
                  </el-date-picker>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.ContinueTime')" prop="cxsj">
                  <el-input v-model="holiday.cxsj" type="number" :disabled="cxsjDisabledHoliday"></el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>
      </el-form>
      <el-form :model="holidayItem" :rules="holidayItemRules" ref="holidayItemForm" label-width="100px" size="mini">
        <div class="bana-information mt20 hauto">
          <div class="bana-title">控制策略</div>
          <div class="bana-information-content">
            <!-- <el-menu  :default-active="activeClbm" mode="horizontal" text-color="#323232">
                <el-menu-item v-for="item in StrategiesDatas" :key="item.clbm" :index="item.clbm.toString()">
                  <div slot="title" @click="selectStrategies(item)">{{item.clmc }}</div>
                </el-menu-item>
              </el-menu> -->
            <el-radio-group v-model="radioHoliday" @change="changeRadioHoliday" style="padding: 20px;">
              <el-radio v-for="item in StrategiesDatas" :key="item.clbm" :label="item.clbm">{{item.clmc }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="bana-information mt20 hauto"
          v-if="holidayItem.wdkzxszt||holidayItem.wdlddjxszt||holidayItem.wdldxszt||holidayItem.ssplxszt||holidayItem.zkbxszt||holidayItem.ldscxszt||holidayItem.mdscxszt||holidayItem.hdysxszt||holidayItem.mqysxszt||holidayItem.hsjsdzslxszt">
          <div class="bana-title">{{ $t('message.SolutionParameter') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.ControllerPattern')" prop="wdkz" v-if="holidayItem.wdkzxszt">
                  <el-select v-model="holidayItem.wdkz" :placeholder="$t('message.PleaseSelect')"
                    @change="changeControlHoliday">
                    <el-option v-for="item in wdkzs" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightGread')" prop="wdld" v-if="holidayItem.wdlddjxszt">
                  <el-select v-model="holidayItem.wdlddj" :placeholder="$t('message.PleaseSelect')"
                    :disabled="controlDisabledHoliday">
                    <el-option v-for="item in lddjCodes" :key="item.dm" :label="item.dm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.FoglightLuminance')" prop="wdld" v-if="holidayItem.wdldxszt">
                  <el-input v-model="holidayItem.wdld" type="number" min="1" max="10" step="1" readonly
                    :disabled="controlDisabledHoliday"></el-input>
                </el-form-item>
              </li>

              <li>
                <el-form-item FlickerFrequency :label="$t('message.FlickerFrequency')" v-if="holidayItem.ssplxszt">
                  <el-select v-model="holidayItem.sspl" :placeholder="$t('message.PleaseSelect')"
                    :disabled="controlDisabledHoliday">
                    <!-- <el-option label="30次/分钟" value="500"></el-option>
                    <el-option label="60次/分钟" value="250"></el-option>
                    <el-option label="120次/分钟" value="125"></el-option>
                    <el-option label="240次/分钟" value="63"></el-option> -->
                    <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="占空比" v-if="holidayItem.zkbxszt">
                  <el-select v-model="holidayItem.zkb" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightsONDuration')+'(ms)'" prop="ldsc" v-if="holidayItem.ldscxszt">
                  <el-input v-model="holidayItem.ldsc" type="number" :disabled="controlDisabledHoliday"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightsOFFDuration')+'(ms)'" prop="mdsc" v-if="holidayItem.mdscxszt">
                  <el-input v-model="holidayItem.mdsc" type="number" :disabled="controlDisabledHoliday"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.RedTimeLengthening')+'(s)'" prop="hdys" v-if="holidayItem.hdysxszt">
                  <el-input v-model="holidayItem.hdys" type="number" :disabled="controlDisabledHoliday"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.DeadZoneDuration')+'(s)'" prop="mqys" v-if="holidayItem.mqysxszt">
                  <el-input v-model="holidayItem.mqys" type="number" :disabled="controlDisabledHoliday"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.RedLightsNumber')" prop="hsjsdzsl" v-if="holidayItem.hsjsdzslxszt">
                  <el-input v-model="holidayItem.hsjsdzsl" type="number" :disabled="controlDisabledHoliday"></el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveHoliday" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="holidayDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="gpsTitle" v-if="gpsDialog" :visible.sync="gpsDialog" :close-on-click-modal='false' width="900px">
      <el-form :model="gps" :rules="gpsRules" ref="gpsForm" label-width="80px" size="mini">
        <div>
          <el-form-item :label="$t('message.Controller')">
            <el-select v-model="gps.kzqbm" :placeholder="$t('message.PleaseSelect')" @change="changeController">
              <el-option v-for="item in controllers" :key="item.kzqbm" :label="item.kzqmc" :value="item.kzqbm">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="bana-information mt10 hauto" style="float: left;width: 32%;">
            <div class="bana-title">时段1</div>
            <div class="bana-information-content">
              <ul class="gpsFormBox">
                <li>
                  <el-form-item label="星历参考月" prop="month1">
                    <el-select v-model="gps.month1" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl1 || gps.sfsyxl1 !== 1">
                      <el-option v-for="item in 12" :key="'month1-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="星历参考日" prop="day1">
                    <el-select
                      v-if="gps.month1==1||gps.month1==3||gps.month1==5||gps.month1==7||gps.month1==8||gps.month1==10||gps.month1==12"
                      v-model="gps.day1" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl1 || gps.sfsyxl1 !== 1">
                      <el-option v-for="item in 31" :key="'day11-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-else-if="gps.month1==4||gps.month1==6||gps.month1==9||gps.month1==11"
                      v-model="gps.day1" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl1 || gps.sfsyxl1 !== 1">
                      <el-option v-for="item in 30" :key="'day12-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-else v-model="gps.day1" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl1 || gps.sfsyxl1 !== 1">
                      <el-option v-for="item in 29" :key="'day13-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="开始时间" prop="startTime1">
                    <el-time-picker v-model="startTime1" :placeholder="$t('message.PleaseSelect')" format="HH:mm"
                      value-format="HH:mm">
                    </el-time-picker>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="结束时间" prop="stopTime1">
                    <el-time-picker v-model="stopTime1" :placeholder="$t('message.PleaseSelect')" format="HH:mm"
                      value-format="HH:mm">
                    </el-time-picker>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="是否启用星历" prop="sfsyxl1">
                    <el-select v-model="gps.sfsyxl1" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in sfsyxlCodes" :key="'sfsyxl1-'+item.dm" :label="item.dmsm"
                        :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="雾灯控制" prop="wdkz1">
                    <el-select v-model="gps.wdkz1" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in wdkzCodes" :key="'wdkz1-'+item.dm" :label="item.dmsm" :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="雾灯亮度" prop="wdld1">
                    <el-input v-model.number="gps.wdld1" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="占空比" prop="zkb1">
                    <!-- <el-input v-model="gps.zkb1"></el-input> -->
                    <el-select v-model="gps.zkb1" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="红灯延时" prop="hdys1">
                    <el-input v-model.number="gps.hdys1" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="盲区延时" prop="mqys1">
                    <el-input v-model.number="gps.mqys1" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="警示灯组数" prop="hsjsdzsl1">
                    <el-input v-model.number="gps.hsjsdzsl1" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <div class="bana-information mt10 hauto" style="float: left;width: 32%;margin-left: 2%;">
            <div class="bana-title">时段2</div>
            <div class="bana-information-content">
              <ul class="gpsFormBox">
                <li>
                  <el-form-item label="星历参考月" prop="month2">
                    <el-select v-model="gps.month2" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl2 || gps.sfsyxl2 !== 1">
                      <el-option v-for="item in 12" :key="'month2-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="星历参考日" prop="day2">
                    <el-select
                      v-if="gps.month2==1||gps.month2==3||gps.month2==5||gps.month2==7||gps.month2==8||gps.month2==10||gps.month2==12"
                      v-model="gps.day2" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl2 || gps.sfsyxl2 !== 1">
                      <el-option v-for="item in 31" :key="'day21-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-else-if="gps.month2==4||gps.month2==6||gps.month2==9||gps.month2==11"
                      v-model="gps.day2" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl2 || gps.sfsyxl2 !== 1">
                      <el-option v-for="item in 30" :key="'day22-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-else v-model="gps.day2" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl2 || gps.sfsyxl2 !== 1">
                      <el-option v-for="item in 29" :key="'day22-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="开始时间" prop="startTime2">
                    <el-time-picker v-model="startTime2" :placeholder="$t('message.PleaseSelect')" format="HH:mm"
                      value-format="HH:mm">
                    </el-time-picker>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="结束时间" prop="stopTime2">
                    <el-time-picker v-model="stopTime2" :placeholder="$t('message.PleaseSelect')" format="HH:mm"
                      value-format="HH:mm">
                    </el-time-picker>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="是否启用星历" prop="sfsyxl2">
                    <el-select v-model="gps.sfsyxl2" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in sfsyxlCodes" :key="'sfsyxl2-'+item.dm" :label="item.dmsm"
                        :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="雾灯控制" prop="wdkz2">
                    <el-select v-model="gps.wdkz2" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in wdkzCodes" :key="'wdkz2-'+item.dm" :label="item.dmsm" :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="雾灯亮度" prop="wdld2">
                    <el-input v-model.number="gps.wdld2" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="占空比" prop="zkb2">
                    <!-- <el-input v-model="gps.zkb2"></el-input> -->
                    <el-select v-model="gps.zkb2" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="红灯延时" prop="hdys2">
                    <el-input v-model.number="gps.hdys2" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="盲区延时" prop="mqys2">
                    <el-input v-model.number="gps.mqys2" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="警示灯组数" prop="hsjsdzsl2">
                    <el-input v-model.number="gps.hsjsdzsl2" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <div class="bana-information mt10 hauto" style="float: left;width: 32%;margin-left: 2%;">
            <div class="bana-title">时段3</div>
            <div class="bana-information-content">
              <ul class="gpsFormBox">
                <li>
                  <el-form-item label="星历参考月" prop="month3">
                    <el-select v-model="gps.month3" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl3 || gps.sfsyxl3 !== 1">
                      <el-option v-for="item in 12" :key="'month3-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="星历参考日" prop="day3">
                    <el-select
                      v-if="gps.month3==1||gps.month3==3||gps.month3==5||gps.month3==7||gps.month3==8||gps.month3==10||gps.month3==12"
                      v-model="gps.day3" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl3 || gps.sfsyxl3 !== 1">
                      <el-option v-for="item in 31" :key="'day31-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-else-if="gps.month3==4||gps.month3==6||gps.month3==9||gps.month3==11"
                      v-model="gps.day3" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl3 || gps.sfsyxl3 !== 1">
                      <el-option v-for="item in 30" :key="'day32-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-else v-model="gps.day3" :placeholder="$t('message.PleaseSelect')" :disabled="!gps.sfsyxl3 || gps.sfsyxl3 !== 1">
                      <el-option v-for="item in 29" :key="'day33-'+item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="开始时间" prop="startTime3">
                    <el-time-picker v-model="startTime3" :placeholder="$t('message.PleaseSelect')" format="HH:mm"
                      value-format="HH:mm">
                    </el-time-picker>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="结束时间" prop="stopTime3">
                    <el-time-picker v-model="stopTime3" :placeholder="$t('message.PleaseSelect')" format="HH:mm"
                      value-format="HH:mm">
                    </el-time-picker>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="是否启用星历" prop="sfsyxl3">
                    <el-select v-model="gps.sfsyxl3" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in sfsyxlCodes" :key="'sfsyxl3-'+item.dm" :label="item.dmsm"
                        :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="雾灯控制" prop="wdkz3">
                    <el-select v-model="gps.wdkz3" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in wdkzCodes" :key="'wdkz3-'+item.dm" :label="item.dmsm" :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="雾灯亮度" prop="wdld3">
                    <el-input v-model.number="gps.wdld3" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="占空比" prop="zkb3">
                    <!-- <el-input v-model="gps.zkb3"></el-input> -->
                    <el-select v-model="gps.zkb3" :placeholder="$t('message.PleaseSelect')">
                      <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="红灯延时" prop="hdys3">
                    <el-input v-model.number="gps.hdys3" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="盲区延时" prop="mqys3">
                    <el-input v-model.number="gps.mqys3" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item label="警示灯组数" prop="hsjsdzsl3">
                    <el-input v-model.number="gps.hsjsdzsl3" type="number" min="0"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setControllersTimerConfig" size="mini">{{ $t('message.Issue') }}</el-button>
        <el-button @click="gpsDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="gpsTableTitle" :visible.sync="gpsTableDialog" :close-on-click-modal='false' width="900px">
      <div class="gridBox">
        <el-table :data="gpsTableData">
          <el-table-column align="center" prop="name" label="控制器名称">
          </el-table-column>
          <el-table-column align="center" prop="czjg" label="结果">
            <template slot-scope="scope">
              {{scope.row.czjg === 0 ? '设置成功' : '设置失败'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeGpsTableDialog" size="mini">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import FogArea from "./js/FogArea.js";
  import Role from "./js/Role.js";
  import ControlStrategy from './js/ControlStrategy.js'
  import Program from './js/Program.js';
  import Holiday from './js/Holiday.js';
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  export default {
    data() {
      //   var checkStartTime1 = (rule, value, callback) => {
      //       console.log(value)
      //     if (!value) {
      //       return callback(new Error('请选择开始时间'));
      //     }
      //   }
      //   var checkStartTime2 = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请选择开始时间'));
      //     }
      //   }
      //   var checkStartTime3 = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请选择开始时间'));
      //     }
      //   }
      //   var checkStopTime1 = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请选择结束时间'));
      //     }
      //   }
      //   var checkStopTime2 = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请选择结束时间'));
      //     }
      //   }
      //   var checkStopTime3 = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请选择结束时间'));
      //     }
      //   }
      var checkProgramCxsj = (rule, value, callback) => {
        let SolutionConfigTimes = "";
        let kssjTimes = "";
        if (!value) {
          return callback(new Error('持续时间不能为空'));
        }
        setTimeout(() => {
          if (this.program.kssjsm != null) {
            kssjTimes = parseInt(this.program.kssjsm.substring(0, 2)) * 60 + parseInt(this.program.kssjsm
              .substring(3, 5));
            SolutionConfigTimes = (24 * 60 - kssjTimes);
            if (value > SolutionConfigTimes) {
              callback(new Error('方案时间超过当日23点59分'));
            } else {
              callback();
            }
          }
        }, 0);
      };
      return {
        disMonth1: false,
        disMonth2: false,
        disMonth3: false,
        disDay1: false,
        disDay2: false,
        disDay3: false,
        controllers: [], //可选控制器集合
        gps: {},
        queryControllersTimerConfigData: [], //GPS定时器列表数据
        // activeClbm: "1",//左侧菜单高亮显示
        StrategiesDatas: [], //控制策略数据
        // Strategies:{},
        radioProgram: 0, //重复使用控制策略单选
        radioHoliday: 0, //单次方案控制策略单选

        controlDisabled: false,
        controlDisabledHoliday: false,
        cxsjDisabled: false,
        cxsjDisabledHoliday: false,
        // weekendList: [],
        programDialog: false,
        holidayDialog: false,
        gpsDialog: false,
        gpsTableDialog: false,
        gpsTableData: [],
        title: '',
        gpsTitle: "",
        gpsTableTitle: "",
        startTime1: '',
        startTime2: '',
        startTime3: '',
        stopTime1: '',
        stopTime2: '',
        stopTime3: '',
        pageSize: 100,
        totalCount: 0,
        currentPage: 1,
        pageSize2: 100,
        totalCount2: 0,
        currentPage2: 1,
        activeName: 'first', //"second", //
        checkAll: false,
        isIndeterminate: false,
        //当前选中雾区
        wqbm: "",
        forArea: {},
        //雾区名称列表
        fogAreas: [],
        //闪烁频率
        ldmdsc: "",
        wdlddj: '',
        wdkzs: [], //雾灯控制
        lddjCodes: [], //亮度等级集合
        ssplCodes: [],
        zkbCodes: [],
        wdkzCodes: [], //wdkz字典
        sfsyxlCodes: [{
          dm: 1,
          dmsm: '是'
        }, {
          dm: 0,
          dmsm: '否'
        }],
        // lddj: "",//亮度等级
        //判断是否为更新
        isUpdating: false,
        //table选中方案
        selectedSolutions: [],
        //table
        selutionData: [],
        holidays: [],
        selecteDatas: [{
            value: 1,
            label: "星期一"
          },
          {
            value: 2,
            label: "星期二"
          },
          {
            value: 3,
            label: "星期三"
          },
          {
            value: 4,
            label: "星期四"
          },
          {
            value: 5,
            label: "星期五"
          },
          {
            value: 6,
            label: "星期六"
          },
          {
            value: 27,
            label: "星期日"
          },
        ],
        //新增，修改表单
        program: {},
        programItem: {},
        programItemXszt: {},
        //新增，修改校验规则
        programRules: {
          famc: this.filterRules('方案名称', true),
          cxsj: this.filterRules('持续时间', true, null, null, 'time'),
          kssjsm: this.filterRules('开始时间', false),
          faxqjh: this.filterRules(null, null, null, null, 'week'),
          cxsj: [{
            validator: checkProgramCxsj,
            trigger: 'blur'
          }]
        },
        programItemRules: {
          wdkz: this.filterRules('控制模式', false),
          wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
          mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
          hdys: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'alarm'),
        },
        gpsRules: {
          month1: this.filterRules('星历参考月', false),
          day1: this.filterRules('星历参考日', false),
          //   startTime1: [{
          //     validator: checkStartTime1,
          //     trigger: 'blur'
          //   }],
          //   stopTime1: [{
          //     validator: checkStopTime1,
          //     trigger: 'blur'
          //   }],
          sfsyxl1: this.filterRules('是否使用星历', false),
          zkb1: this.filterRules('占空比', false),
          wdkz1: this.filterRules('控制模式', false),
          wdld1: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          hdys1: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys1: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl1: this.filterRules('红色警示灯数量', true, null, null, 'alarm'),
          month2: this.filterRules('星历参考月', false),
          day2: this.filterRules('星历参考日', false),
          //   startTime2: [{
          //     validator: checkStartTime2,
          //     trigger: 'blur'
          //   }],
          //   stopTime2: [{
          //     validator: checkStopTime2,
          //     trigger: 'blur'
          //   }],
          sfsyxl2: this.filterRules('是否使用星历', false),
          zkb2: this.filterRules('占空比', false),
          wdkz2: this.filterRules('控制模式', false),
          wdld2: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          hdys2: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys2: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl2: this.filterRules('红色警示灯数量', true, null, null, 'alarm'),
          month3: this.filterRules('星历参考月', false),
          day3: this.filterRules('星历参考日', false),
          //   startTime3: [{
          //     validator: checkStartTime3,
          //     trigger: 'blur'
          //   }],
          //   stopTime3: [{
          //     validator: checkStopTime3,
          //     trigger: 'blur'
          //   }],
          sfsyxl3: this.filterRules('是否使用星历', false),
          zkb3: this.filterRules('占空比', false),
          wdkz3: this.filterRules('控制模式', false),
          wdld3: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          hdys3: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys3: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl3: this.filterRules('红色警示灯数量', true, null, null, 'alarm'),
        },
        gpsForm: {},
        //假日
        //新增，修改表单
        holiday: {},
        holidayItem: {},
        //新增，修改校验规则
        programForm: {
          cxsj: ''
        },
        holidayForm: {
          cxsj: ''
        },
        holidayRules: {
          famc: this.filterRules('方案名称', true),
          cxsj: this.filterRules('持续时间', true, null, null, 'time'),
          kssjsm: this.filterRules('开始时间', false),
          faxqjh: this.filterRules(null, null, null, null, 'week'),
        },
        holidayItemRules: {
          wdkz: this.filterRules('控制模式', false),
          wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
          mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
          hdys: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'alarm')
        },
        sfsys: []
      }
    },
    mounted: function () {
      this.loadFogAreas();
      this.loadLampLevel();
      this.loadControllerWorkMode();
      this.loadProgramEnabled();
      this.loadStrategies();
    },
    methods: {
      //改变GPS弹窗里的控制器选择
      changeController(val) {
        // console.log(val)
        if (this.$refs['gpsForm'] != undefined) {
          this.$refs['gpsForm'].resetFields();
        }
        this.gps = this.queryControllersTimerConfigData[val - 1]
        this.gps.kzqbm = val
        this.intGps(this.gps)
      },
      deleteZero(str) {
        return str.replace(/\b(0+)/gi, "")
      },
      addZero(num) {
        return num < 10 ? '0' + num : num;
      },
      //设置定时参数
      setControllersTimerConfig() {
        this.$refs['gpsForm'].validate((valid) => {
          if (!this.startTime1) {
            this.$alert("时段1开始时间不能为空", '提示', {
              confirmButtonText: '确定',
            });
            return
          }
          if (!this.startTime2) {
            this.$alert("时段2开始时间不能为空", '提示', {
              confirmButtonText: '确定',
            });
            return
          }
          if (!this.startTime3) {
            this.$alert("时段3开始时间不能为空", '提示', {
              confirmButtonText: '确定',
            });
            return
          }
          if (!this.stopTime1) {
            this.$alert("时段1结束时间不能为空", '提示', {
              confirmButtonText: '确定',
            });
            return
          }
          if (!this.stopTime2) {
            this.$alert("时段2结束时间不能为空", '提示', {
              confirmButtonText: '确定',
            });
            return
          }
          if (!this.stopTime3) {
            this.$alert("时段3结束时间不能为空", '提示', {
              confirmButtonText: '确定',
            });
            return
          }
          if (valid) {
            let data = JSON.parse(JSON.stringify(this.gps))
            data.sfsyxl1 = data.sfsyxl1 === 1
            data.sfsyxl2 = data.sfsyxl2 === 1
            data.sfsyxl3 = data.sfsyxl3 === 1
            data.wqbm = this.wqbm
            data.startHour1 = this.deleteZero(this.startTime1.split(':')[0])
            data.startHour2 = this.deleteZero(this.startTime2.split(':')[0])
            data.startHour3 = this.deleteZero(this.startTime3.split(':')[0])
            data.stopHour1 = this.deleteZero(this.stopTime1.split(':')[0])
            data.stopHour2 = this.deleteZero(this.stopTime2.split(':')[0])
            data.stopHour3 = this.deleteZero(this.stopTime3.split(':')[0])
            data.startMinute1 = this.deleteZero(this.startTime1.split(':')[1])
            data.startMinute2 = this.deleteZero(this.startTime2.split(':')[1])
            data.startMinute3 = this.deleteZero(this.startTime3.split(':')[1])
            data.stopMinute1 = this.deleteZero(this.stopTime1.split(':')[1])
            data.stopMinute2 = this.deleteZero(this.stopTime2.split(':')[1])
            data.stopMinute3 = this.deleteZero(this.stopTime3.split(':')[1])
            // console.log(data)
            // return
            FogArea.setControllersTimerConfig(data).then(value => {
              //   console.log(value)
              this.gpsDialog = false
              this.gpsTableDialog = true
              this.gpsTableTitle = "设置定时参数结果"
              this.gpsTableData = value

            })
          }
        })

      },
      closeGpsTableDialog() {
        this.gpsTableDialog = false
        this.getQueryControllersTimerConfig()
      },
      //雾区查询定时参数
      getQueryControllersTimerConfig() {
        if (!this.wqbm) {
          this.$alert("请选择雾区", '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        FogArea.queryControllersTimerConfig({
          wqbm: this.wqbm
        }).then(value => {
          //   console.log(value)
          for (let i = 0; i < value.length; i++) {
            if (value[i].kzqbm === 0) {
              value[i].kzqbm = i + 1
            }
          }
          this.queryControllersTimerConfigData = JSON.parse(JSON.stringify(value))
          this.controllers = []
          this.gps = value.length > 0 ? value[0] : []

          for (let i = 0; i < this.queryControllersTimerConfigData.length; i++) {
            this.controllers.push({
              kzqbm: value[i].kzqbm,
              kzqmc: value[i].kzqmc,
            })
          }
        });
      },
      intGps(gpsData) {
        let gpsDatas = JSON.parse(JSON.stringify(gpsData))
        // gpsData.kzqbm = gpsData.kzqbm == 0 ? 1 : gpsDatas.kzqbm
        if (gpsDatas.readSuccess1) {
          gpsData.sfsyxl1 = gpsData.sfsyxl1 ? 1 : 0
          gpsData.zkb1 = gpsData.zkb1 === 0 ? 1 : gpsDatas.zkb1
          this.startTime1 = gpsData.startHour1 === -1 ? "01:00" : gpsDatas.startHour1 + ":" +
            gpsDatas.startMinute1
          this.stopTime1 = gpsData.startHour1 === -1 ? "01:00" : gpsDatas.stopHour1 + ":" +
            gpsDatas.stopMinute1
          gpsData.month1 = gpsData.month1 === 0 ? 1 : gpsDatas.month1
          gpsData.day1 = gpsData.day1 === 0 ? 1 : gpsDatas.day1
          gpsData.wdkz1 = gpsData.wdkz1 === 0 ? 1 : gpsDatas.wdkz1
        } else {
          gpsData.sfsyxl1 = ""
          gpsData.zkb1 = ""
          this.startTime1 = ""
          this.stopTime1 = ""
          gpsData.month1 = ""
          gpsData.day1 = ""
          gpsData.wdkz1 = ""
          gpsData.wdld1 = ""
          gpsData.hdys1 = ""
          gpsData.mqys1 = ""
          gpsData.hsjsdzsl1 = ""
        }
        if (gpsDatas.readSuccess2) {

          gpsData.sfsyxl2 = gpsData.sfsyxl2 ? 1 : 0
          gpsData.zkb2 = gpsData.zkb2 === 0 ? 1 : gpsDatas.zkb2
          this.startTime2 = gpsData.startHour2 === -1 ? "01:00" : gpsDatas.startHour2 + ":" +
            gpsDatas.startMinute2
          this.stopTime2 = gpsData.startHour2 === -1 ? "01:00" : gpsDatas.stopHour2 + ":" +
            gpsDatas.stopMinute2
          gpsData.month2 = gpsData.month2 === 0 ? 1 : gpsDatas.month2
          gpsData.day2 = gpsData.day2 === 0 ? 1 : gpsDatas.day2
          gpsData.wdkz2 = gpsData.wdkz2 === 0 ? 1 : gpsDatas.wdkz2
        } else {
          gpsData.sfsyxl2 = ""
          gpsData.zkb2 = ""
          this.startTime2 = ""
          this.stopTime2 = ""
          gpsData.month2 = ""
          gpsData.day2 = ""
          gpsData.wdkz2 = ""
          gpsData.wdld2 = ""
          gpsData.hdys2 = ""
          gpsData.mqys2 = ""
          gpsData.hsjsdzsl2 = ""
        }
        if (gpsDatas.readSuccess3) {
          gpsData.sfsyxl3 = gpsData.sfsyxl3 ? 1 : 0
          gpsData.zkb3 = gpsData.zkb3 === 0 ? 1 : gpsDatas.zkb3
          this.startTime3 = gpsData.startHour3 === -1 ? "01:00" : gpsDatas.startHour3 + ":" +
            gpsDatas.startMinute3
          this.stopTime3 = gpsData.startHour3 === -1 ? "01:00" : gpsDatas.stopHour3 + ":" +
            gpsDatas.stopMinute3
          gpsData.month3 = gpsData.month3 === 0 ? 1 : gpsDatas.month3
          gpsData.day3 = gpsData.day3 === 0 ? 1 : gpsDatas.day3
          gpsData.wdkz3 = gpsData.wdkz3 === 0 ? 1 : gpsDatas.wdkz3
        } else {
          gpsData.sfsyxl3 = ""
          gpsData.zkb3 = ""
          this.startTime3 = ""
          this.stopTime3 = ""
          gpsData.month3 = ""
          gpsData.day3 = ""
          gpsData.wdkz3 = ""
          gpsData.wdld3 = ""
          gpsData.hdys3 = ""
          gpsData.mqys3 = ""
          gpsData.hsjsdzsl3 = ""
        }

      },
      //设置定时参数（打开弹窗）
      openGpsDialog() {
        if (this.queryControllersTimerConfigData.length == 0) {
          this.$alert("暂无可设置的控制器", '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        // console.log(this.gps)
        this.intGps(this.gps)
        this.gps.kzqbm = this.controllers[0].kzqbm
        this.gpsDialog = true
        this.gpsTitle = '控制器定时设置'
      },
      //得到雾灯控制说明
      getwdkzCodes(val) {
        return this.wdkzs.find(item => item.dm == val).dmsm;
      },
      loadStrategies() {
        var data = {}
        //查询数据
        ControlStrategy.getStrategies(data).then(value => {

          for (let i = 0; i < value.length; i++) {
            if (value[i].clmc != '自定义模式') {
              this.StrategiesDatas.push(value[i]);
            }
          }

        });
      },
      //切换左侧列表
      // selectStrategies(val){
      //   this.programItem = val;
      //   this.activeClbm = val.clbm.toString();
      // },
      //单选
      changeRadioProgram(val) {

        for (let i = 0; i < this.StrategiesDatas.length; i++) {
          if (this.StrategiesDatas[i].clbm == val) {
            this.programItem = JSON.parse(JSON.stringify(this.StrategiesDatas[i]))
          }
        }

      },
      changeRadioHoliday(val) {

        for (let i = 0; i < this.StrategiesDatas.length; i++) {
          if (this.StrategiesDatas[i].clbm == val) {
            this.holidayItem = this.StrategiesDatas[i];
          }
        }

      },
      changeControlProgram(val) {
        if (val == 4) {
          if (this.$refs['programItemForm'] != undefined) {
            this.$refs['programItemForm'].clearValidate();
          }
          this.controlDisabled = true;
          this.cxsjDisabled = false;
        } else if (val == 6) {
          if (this.$refs['programItemForm'] != undefined) {
            this.$refs['programItemForm'].clearValidate();
          }
          this.program.cxsj = 3;
          this.cxsjDisabled = true;
          this.controlDisabled = true;
        } else {
          this.controlDisabled = false;
          this.cxsjDisabled = false;
        }
      },
      changeControlHoliday(val) {
        if (val == 4) {
          if (this.$refs['holidayItemForm'] != undefined) {
            this.$refs['holidayItemForm'].clearValidate();
          }
          this.controlDisabledHoliday = true;
          this.cxsjDisabledHoliday = false;
        } else if (val == 6) {
          if (this.$refs['holidayItemForm'] != undefined) {
            this.$refs['holidayItemForm'].clearValidate();
          }
          this.holiday.cxsj = 3;
          this.cxsjDisabledHoliday = true;
          this.controlDisabled = true;
        } else {
          this.controlDisabledHoliday = false;
          this.cxsjDisabledHoliday = false;
        }
      },

      //contronller
      // contronller(){
      //   this.controlDisabled = false;
      // },
      //reset
      // reset(){
      //   if (this.$refs['programForm'] != undefined) {
      //     this.$refs['programForm'].resetFields();
      //   }
      //   this.controlDisabled = true;
      // },
      //tab点击事件
      handleClick(tab, event) {
        if (tab.$el.id == "pane-first") {
          this.loadPrograms();
        } else if (tab.$el.id == "pane-second") {
          this.loadHolidays();
        }
      },

      //亮度等级
      // changeLampGrade(lddj,obj){
      //   if(obj == 'program'){
      //     for(let i = 0;i< this.lddjCodes.length; i++){
      //       if(this.lddjCodes[i].dm == this.programItem.wdlddj){
      //         this.lddj = this.lddjCodes[i].dmsm;
      //       }
      //     }
      //     this.programItem.wdld = this.lddj;
      //   }else if(obj == 'holiday'){
      //     for(let i = 0;i< this.lddjCodes.length; i++){
      //       if(this.lddjCodes[i].dm == this.holidayItem.wdlddj){
      //         this.lddj = this.lddjCodes[i].dmsm;
      //       }
      //     }
      //     this.holidayItem.wdld = this.lddj;
      //   }
      // },
      //读取工作模式字典
      loadControllerWorkMode() {

        var data = {
          dmlb: Dictionary.CodeType.ControllerWorkMode
        };
        //这里清空
        this.wdkzs = [];
        this.wdkzCodes = [];
        Code.getCodes(data).then(value => {
          for (i = 0; i < value.datas.length; i++) {
            if (value.datas[i].dm == 1 ||
              value.datas[i].dm == 2 ||
              value.datas[i].dm == 3 ||
              value.datas[i].dm == 4 ||
              value.datas[i].dm == 6) {
              this.wdkzs.push(value.datas[i])
            }
            if (value.datas[i].dm == 1 ||
              value.datas[i].dm == 2 ||
              value.datas[i].dm == 3) {
              this.wdkzCodes.push(value.datas[i])
            }
          }
        })
      },
      //读取占空比，闪烁频率，雾灯亮度
      loadLampLevel() {
        Code.getCodes({
          dmlb: Dictionary.CodeType.LampLevel,
        }).then(value => {
          this.lddjCodes = value.datas;
        });
        Code.getCodes({
          dmlb: Dictionary.CodeType.ssplCode,
        }).then(value => {
          this.ssplCodes = value.datas;
        });
        Code.getCodes({
          dmlb: Dictionary.CodeType.zkbCode,
        }).then(value => {
          this.zkbCodes = value.datas;
        });
      },
      //读取工作模式字典
      loadProgramEnabled() {
        var data = {
          dmlb: Dictionary.CodeType.ProgramEnabled
        };
        Code.getCodes(data).then(value => {
          this.sfsys = value.datas;
        })
      },
      //初始化雾区列表
      loadFogAreas() {
        FogArea.getFogAreas().then(value => {
          this.fogAreas = value;
          if (this.fogAreas.length > 0) {
            this.fogArea = this.fogAreas[0];
            this.wqbm = this.fogAreas[0].wqbm;
            this.changeFogArea(this.fogAreas[0].wqbm);
          }
        });
      },
      //通过雾区查询
      changeFogArea(value) {
        this.wqbm = value
        if (value) {
          this.queryControllersTimerConfigData = []
        }
        for (var i = 0; i < this.fogAreas.length; ++i) {
          if (this.fogAreas[i].wqbm == value) {
            this.fogArea = this.fogAreas[i];
            break;
          }
        }
        this.loadPrograms();
        this.loadHolidays();
      },
      //固定方案
      loadPrograms() {

        let data = {
          wqbm: this.wqbm
        }
        Program.getPrograms(data).then(value => {
          if (value != null) {

            for (let i = 0; i < value.length; i++) {

              let week = value[i].faxq;
              var weekText = "";

              if ((week & 0x01) != 0) {
                weekText += "星期一,";
              }
              if ((week & 0x02) != 0) {
                weekText += "星期二,";
              }
              if ((week & 0x04) != 0) {
                weekText += "星期三,";
              }
              if ((week & 0x08) != 0) {
                weekText += "星期四,";
              }
              if ((week & 0x10) != 0) {
                weekText += "星期五,";
              }
              if ((week & 0x20) != 0) {
                weekText += "星期六,";
              }
              if ((week & 0x40) != 0) {
                weekText += "星期日,";
              }
              if (weekText != "") {
                weekText = weekText.substring(0, weekText.length - 1);
              }
              value[i].weekText = weekText;
            }
          }
          this.selutionData = value;
        })
      },
      //亮灯灭灯时长选择
      // changeLamp(ldmdsc) {
      //   this.programItem.ldsc = ldmdsc;
      //   this.programItem.mdsc = ldmdsc * 3;
      // },
      //增
      insertProgram() {
        this.cxsjDisabled = false;
        this.controlDisabled = false;
        if (this.wqbm == "") {
          return;
        }

        if (this.$refs['programForm'] != undefined) {
          this.$refs['programForm'].resetFields();
        }
        if (this.$refs['programItemForm'] != undefined) {
          this.$refs['programItemForm'].resetFields();
        }
        this.programDialog = true;
        this.title = "新增";
        this.isUpdating = false;
        this.ldmdsc = "";
        this.checkAll = false;
        this.isIndeterminate = false;

        this.program = {
          wqbm: this.wqbm,
          famc: '',
          sfsy: this.sfsys[0].dm,
          sfsysm: this.sfsys[0].dmsm,
          kssjsm: '',
          cxsj: '',
          faxqjh: [],
        };
        this.radioProgram = 0;
        this.programItem = {
          wdkz: '',
          wdlddj: '',
          wdld: '',
          ldsc: '',
          mdsc: '',
          hdys: '',
          mqys: '',
          hsjsdzsl: '',
          zkb: "",
          sspl: "",

        }
      },
      //显示修改弹窗
      updateProgram(index, row) {
        this.programDialog = true;
        this.title = "修改";
        this.isUpdating = true;
        if (row.wdkz == 4) {
          this.controlDisabled = true;
          this.cxsjDisabled = false;
        } else if (row.wdkz == 6) {
          this.controlDisabled = true;
          this.cxsjDisabled = true;
        } else {
          this.cxsjDisabled = false;
          this.controlDisabled = false;
        }
        if (this.$refs['programForm'] != undefined) {
          this.$refs['programForm'].resetFields();
        }
        if (this.$refs['programItemForm'] != undefined) {
          this.$refs['programItemForm'].resetFields();
        }
        this.program = {
          wqbm: this.wqbm,
          fabm: row.fabm,
          famc: row.famc,
          sfsy: row.sfsy,
          sfsysm: row.sfsysm,
          kssjsm: row.kssjsm,
          cxsj: row.cxsj,
          faxqjh: [],
        };
        this.radioProgram = row.kzcl;
        for (let i = 0; i < this.StrategiesDatas.length; i++) {

          if (this.StrategiesDatas[i].clbm == row.kzcl) {
            this.programItemXszt = this.StrategiesDatas[i];
          }
        }
        // console.log(row)
        this.programItem = {
          wdkz: row.wdkz,
          wdlddj: row.wdlddj,
          wdld: row.wdld,
          ldsc: row.ldsc,
          mdsc: row.mdsc,
          hdys: row.hdys,
          mqys: row.mqys,
          hsjsdzsl: row.hsjsdzsl,
          sspl: row.sspl,
          zkb: row.zkb,
          clbm: row.kzcl,
          wdlddjxszt: this.programItemXszt.wdlddjxszt,
          ssplxszt: this.programItemXszt.ssplxszt,
          zkbxszt: this.programItemXszt.zkbxszt,
          wdkzxszt: this.programItemXszt.wdkzxszt,
          wdldxszt: this.programItemXszt.wdldxszt,
          ldscxszt: this.programItemXszt.ldscxszt,
          mdscxszt: this.programItemXszt.mdscxszt,
          hdysxszt: this.programItemXszt.hdysxszt,
          mqysxszt: this.programItemXszt.mqysxszt,
          hsjsdzslxszt: this.programItemXszt.hsjsdzslxszt,
        }

        // this.ldmdsc = "";
        for (var i = 0; i < row.faxqjh.length; ++i) {
          this.program.faxqjh.push(row.faxqjh[i].toString());
        }
        if (row.faxqjh.length == 0) {
          this.isIndeterminate = false;
        } else if (row.faxqjh.length > 0 && row.faxqjh.length < 7) {
          this.isIndeterminate = true;
        } else if (row.faxqjh.length == 7) {
          this.checkAll = true;
        }
      },
      //表单验证
      formValidate(formName) {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              resolve();
            }
          })
        })
      },
      //保存
      saveProgram(index, row) {
        let validate = [];
        // console.log(this.programItem.clbm)
        if (this.programItem.clbm == undefined) {
          this.$alert("请选择控制策略", '提示', {
            confirmButtonText: '确定',
          });
          return;
        }
        this.program.kssj = this.program.kssjsm + ":00";
        let data = {
          fabm: this.program.fabm,
          wqbm: this.program.wqbm,
          famc: this.program.famc,
          sfsy: this.program.sfsy,
          sfsysm: this.program.sfsysm,
          kssj: this.program.kssj,
          cxsj: this.program.cxsj,
          faxqjh: this.program.faxqjh,
          wdkz: this.programItem.wdkz,
          wdlddj: this.programItem.wdlddj,
          wdld: this.programItem.wdld,
          ldsc: this.programItem.ldsc,
          mdsc: this.programItem.mdsc,
          hdys: this.programItem.hdys,
          mqys: this.programItem.mqys,
          hsjsdzsl: this.programItem.hsjsdzsl,
          zkb: this.programItem.zkb,
          sspl: this.programItem.sspl,
          kzcl: this.programItem.clbm,
        };

        if (data.wdkz == 4 || data.wdkz == 6) {
          let validate1 = this.formValidate('programForm');
          validate = [validate1];
        } else {
          let validate1 = this.formValidate('programForm');
          let validate2 = this.formValidate('programItemForm');
          validate = [validate1, validate2];
        }

        Promise.all([validate]).then(() => {
          // console.log(valid)
          // return
          if (this.isUpdating) {
            Program.updateProgram(data).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                this.loadPrograms();
                this.programDialog = false;
                this.$alert('操作成功', '方案信息', {
                  confirmButtonText: '确定',
                });
              } else {
                this.$alert("操作失败，请联系管理员", '方案信息', {
                  confirmButtonText: '确定',
                });
              }
            })
          } else {

            Program.insertProgram(data).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                this.loadPrograms();
                this.programDialog = false;
                this.$alert('操作成功', '方案信息', {
                  confirmButtonText: '确定',
                });
              } else {
                this.$alert("操作失败，请联系管理员", '方案信息', {
                  confirmButtonText: '确定',
                });
              }
            })
          }
        })
      },
      //删
      deleteProgram(index, row) {
        this.$confirm('是否删除方案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
        }).then(() => {

          Program.deleteProgram(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              if (this.selutionData.length == 1 && this.currentPage > 1) {
                this.currentPage -= 1;
              } else {
                this.loadPrograms();
              }
              this.$alert('操作成功', '方案信息', {
                confirmButtonText: '确定',
              });
            } else {
              this.$alert("操作失败，请联系管理员", '方案信息', {
                confirmButtonText: '确定',
              });
            }
          })
        }, () => {});
      },
      //批量启用禁用方案
      updateStatus(flag) {
        if (this.selectedSolutions.length == 0) {
          this.$alert('请选择要改变使用状态的方案', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          }).catch(function (error) {
            console.log(error);
          });
          return;
        } else {
          this.$confirm('是否改变选中方案使用状态?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
          }).then(() => {
            let data;
            let arrData = [];
            for (let i = 0; i < this.selectedSolutions.length; i++) {
              data = {
                fabm: this.selectedSolutions[i].fabm,
                sfsy: flag,
              }
              arrData.push(data);
            }
            Program.updateProgramsStatus(arrData).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                this.$alert('操作成功', '方案信息', {
                  confirmButtonText: '确定',
                });
                this.loadPrograms();
              } else {
                this.$alert("操作失败，请联系管理员", '方案信息', {
                  confirmButtonText: '确定',
                });
              }
            })
          }, () => {

          });
        }
      },
      //改变页码
      // changeProgram(val) {
      //   this.currentPage = val;
      //   this.loadPrograms()
      // },
      //全选
      handleCheckAllChange(val) {
        this.program.faxqjh = val ? ["1", "2", "3", "4", "5", "6", "7"] : [];
        this.isIndeterminate = false;
      },
      //改变复选框选中状态
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === 7;
        this.isIndeterminate = checkedCount > 0 && checkedCount < 7;
      },
      //选中行
      changeSelectedSelutions(val) {
        this.selectedSolutions = val;
      },
      //假日方案
      loadHolidays() {
        let data = {
          wqbm: this.wqbm
        }
        Holiday.getHolidays(data).then(value => {
          this.holidays = value;
        })

      },
      //假日方案新增
      insertHoliday() {
        this.cxsjDisabledHoliday = false;
        this.controlDisabledHoliday = false;
        if (this.wqbm == "") {
          return;
        }

        if (this.$refs['holidayForm'] != undefined) {
          this.$refs['holidayForm'].resetFields();
        }
        if (this.$refs['holidayItemForm'] != undefined) {
          this.$refs['holidayItemForm'].resetFields();
        }
        this.holidayDialog = true;
        this.title = "新增";
        this.isUpdating = false;
        this.ldmdsc = "";

        this.holiday = {
          wqbm: this.wqbm,
          famc: '',
          kssjsm: '',
          cxsj: '',
        }
        this.radioHoliday = 0;
        this.holidayItem = {
          wdkz: '',
          wdlddj: '',
          wdld: '',
          ldsc: '',
          mdsc: '',
          hdys: '',
          mqys: '',
          hsjsdzsl: ''
        };
      },
      //假日方案修改
      updateHoliday(index, row) {
        this.holidayDialog = true;
        this.title = "修改";
        this.isUpdating = true;
        if (row.wdkz == 4) {
          this.controlDisabledHoliday = true;
          this.cxsjDisabledHoliday = false;
        } else if (row.wdkz == 6) {
          this.controlDisabledHoliday = true;
          this.cxsjDisabledHoliday = true;
        } else {
          this.cxsjDisabledHoliday = false;
          this.controlDisabledHoliday = false;
        }
        if (this.$refs['holidayForm'] != undefined) {
          this.$refs['holidayForm'].resetFields();
        }
        if (this.$refs['holidayItemForm'] != undefined) {
          this.$refs['holidayItemForm'].resetFields();
        }
        this.holiday = {
          wqbm: this.wqbm,
          fabm: row.fabm,
          famc: row.famc,
          kssjsm: row.kssjsm,
          cxsj: row.cxsj,
        }

        this.radioHoliday = row.kzcl;
        for (let i = 0; i < this.StrategiesDatas.length; i++) {

          if (this.StrategiesDatas[i].clbm == row.kzcl) {
            this.holidayItemXszt = this.StrategiesDatas[i];
          }
        }
        this.holidayItem = {
          wdkz: row.wdkz,
          wdlddj: row.wdlddj,
          wdld: row.wdld,
          ldsc: row.ldsc,
          mdsc: row.mdsc,
          hdys: row.hdys,
          mqys: row.mqys,
          hsjsdzsl: row.hsjsdzsl,
          sspl: row.sspl,
          zkb: row.zkb,
          wdlddjxszt: this.holidayItemXszt.wdlddjxszt,
          ssplxszt: this.holidayItemXszt.ssplxszt,
          zkbxszt: this.holidayItemXszt.zkbxszt,
          wdkzxszt: this.holidayItemXszt.wdkzxszt,
          wdldxszt: this.holidayItemXszt.wdldxszt,
          ldscxszt: this.holidayItemXszt.ldscxszt,
          mdscxszt: this.holidayItemXszt.mdscxszt,
          hdysxszt: this.holidayItemXszt.hdysxszt,
          mqysxszt: this.holidayItemXszt.mqysxszt,
          hsjsdzslxszt: this.holidayItemXszt.hsjsdzslxszt,
        }

      },
      //假期方案的新增，修改
      saveHoliday(index, row) {
        let validate = [];
        if (this.holidayItem.clbm == undefined) {
          this.$alert("请选择控制策略", '提示', {
            confirmButtonText: '确定',
          });
          return;
        }
        this.holiday.kssj = "2018-" + this.holiday.kssjsm.substr(0, 5) + "T" + this.holiday.kssjsm.substr(6, 5) +
          ":00.000+0800";

        let data = {
          fabm: this.holiday.fabm,
          wqbm: this.holiday.wqbm,
          famc: this.holiday.famc,
          kssj: this.holiday.kssj,
          cxsj: this.holiday.cxsj,
          wdkz: this.holidayItem.wdkz,
          wdlddj: this.holidayItem.wdlddj,
          wdld: this.holidayItem.wdld,
          ldsc: this.holidayItem.ldsc,
          mdsc: this.holidayItem.mdsc,
          hdys: this.holidayItem.hdys,
          mqys: this.holidayItem.mqys,
          hsjsdzsl: this.holidayItem.hsjsdzsl,
          kzcl: this.holidayItem.clbm,
          sspl: this.holidayItem.sspl,
          zkb: this.holidayItem.zkb,
        };
        if (data.wdkz == 4 || data.wdkz == 6) {
          let validate1 = this.formValidate('holidayForm');
          validate = [validate1]
        } else {
          let validate1 = this.formValidate('holidayForm');
          let validate2 = this.formValidate('holidayItemForm');
          validate = [validate1, validate2];
        }

        Promise.all(validate).then(() => {

          if (this.isUpdating == true) {
            Holiday.updateHoliday(data).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                this.loadHolidays();
                this.holidayDialog = false;
                this.$alert('操作成功', '方案信息', {
                  confirmButtonText: '确定',
                });
              } else {
                this.$alert("操作失败，请联系管理员", '方案信息', {
                  confirmButtonText: '确定',
                });
              }
            })
          } else {
            Holiday.insertHoliday(data).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {

                this.loadHolidays();
                this.holidayDialog = false;
                this.$alert('操作成功', '方案信息', {
                  confirmButtonText: '确定',
                });
              } else {
                this.$alert("操作失败，请联系管理员", '方案信息', {
                  confirmButtonText: '确定',
                });
              }
            })

          }

        })
      },
      //单条删除
      deleteHoliday(index, row) {
        this.$confirm('是否删除方案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
        }).then(() => {

          Holiday.deleteHoliday(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              if (this.holidays.length == 1 && this.currentPage2 > 1) {
                this.currentPage2 -= 1;
              } else {
                this.loadHolidays();
              }
              this.$alert('操作成功', '方案信息', {
                confirmButtonText: '确定',
              });
            } else {
              this.$alert("操作失败，请联系管理员", '方案信息', {
                confirmButtonText: '确定',
              });
            }
          })

        }, () => {

        });
      },
      //改变页码
      changeHoliday(val) {
        this.currentPage2 = val;
        this.loadHolidays()
      },
      //亮灯灭灯时长选择
      // changeLamp2(ldmdsc) {
      //   this.holidayItem.ldsc = ldmdsc;
      //   this.holidayItem.mdsc = ldmdsc * 3;
      // },
    }
  }

</script>
