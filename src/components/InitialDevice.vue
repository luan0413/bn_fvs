<template>
  <div class="initialdevice grid">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.InitialDevice') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form label-width="100px" size="mini">
          <ul class="searchList">
            <li class="w20b">
              <el-form-item :label="$t('message.FogAreaName')" label-width="50px">
                <el-select v-model="wqbm" :placeholder="$t('message.PleaseSelect')" width="100px"
                  @change="changeFogArea">
                  <el-option v-for="item in fogAreas" :key="item.wqbm" :label="item.wqmc" :value="item.wqbm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="能见度配置" name="first">
          <div>
            <div class="gridBox mt20">
              <el-table highlight-current-row height="164px" :data="controllers" border
                @selection-change="selectionControllers">
                <el-table-column align="center" type="selection" width="40"></el-table-column>
                <el-table-column align="center" prop="kzqbsm" :label="$t('message.ControllerNum')" width="200">
                </el-table-column>
                <el-table-column align="center" prop="kzqmc" :label="$t('message.ControllerName')"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="ksdz" :label="$t('message.StartAddress')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="jsdz" :label="$t('message.StopAddress')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" :label="$t('message.Details')" width="80">
                  <template slot-scope="scope">
                    <el-button size="mini" class="tableBtnImg" @click="showControllerDialog(scope.$index, scope.row)">
                      <img src="./img/details.png" :alt="$t('message.Details')" :title="$t('message.Details')">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="gridBox mt20">
              <el-table :height="tableHeight" max-height='359px' :data="visibilities" border>
                <el-table-column align="center" prop="njddj" :label="$t('message.VisibilityGrade')" min-width="40">
                </el-table-column>
                <el-table-column align="center" prop="njddjms" :label="$t('message.VisibilityGradeDescription')"
                  show-overflow-tooltip min-width="50">
                </el-table-column>
                <el-table-column align="center" prop="njdsx" :label="$t('message.VisibilityTop')+'(m)'"
                  show-overflow-tooltip min-width="65">
                </el-table-column>
                <!-- <el-table-column align="center" prop="wdkzsm" :label="$t('message.WorkPattern')" min-width="45" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="wdlddj" :label="$t('message.FoglightLuminanceGread')" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="wdld" :label="$t('message.FoglightLuminance')" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="ldsc" :label="$t('message.LightsONDuration')+'(ms)'" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="mdsc" :label="$t('message.LightsOFFDuration')+'(ms)'" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="hdys" :label="$t('message.RedTimeLengthening')+'(s)'" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="mqys" :label="$t('message.DeadZoneDuration')+'(s)'" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="hsjsdzsl" :label="$t('message.RedLightsNumber')" min-width="60">
                </el-table-column> -->
                <el-table-column align="center" prop="kzclsm" label="控制策略描述" min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="xszsm" :label="$t('message.LEDSpeed')+'(km/h)'" min-width="50">
                </el-table-column>
                <el-table-column align="center" prop="hjyysm" label="号角音乐" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="hjyl" label="号角音量" min-width="45">
                </el-table-column>
                <el-table-column align="center" prop="jsdkgsm" label="警示灯状态" min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="xcxszxx" label="小车限速值下限(km/h)" min-width="65">
                </el-table-column>
                <el-table-column align="center" prop="xcxszsx" label="小车限速值上限(km/h)" min-width="65">
                </el-table-column>
                <el-table-column align="center" prop="dcxszxx" label="大车限速值下限(km/h)" min-width="65">
                </el-table-column>
                <el-table-column align="center" prop="dcxszsx" label="大车限速值上限(km/h)" min-width="65">
                </el-table-column>
                <el-table-column align="center" :label="$t('message.Operation')" width="50">
                  <template slot-scope="scope">
                    <el-button size="mini" class="tableBtnImg" @click="showUpdateDialog(scope.$index, scope.row)">
                      <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="btnBox">
              <el-button type="primary" class="fr" style="padding: 4px 20px;margin: 15px;margin-right: 28px;" plain
                icon="el-icon-refresh" @click="showSetDialog">{{ $t("message.Issue") }}</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="光感配置" name="second">
          <div>
            <el-form :model="lightConfig" :rules="lightConfigRules" ref="lightConfigForm" label-width="150px"
              size="mini">
              <div class="light_top_box">
                <el-form-item label="访问周期(分钟)">
                  <el-input v-model="lightConfig.fwzq" :placeholder="$t('message.PleaseInput')" type="number">
                  </el-input>
                </el-form-item>
                <el-form-item label="确认次数)">
                  <el-input v-model="lightConfig.qrcs" :placeholder="$t('message.PleaseInput')" type="number">
                  </el-input>
                </el-form-item>
                <el-form-item label="开灯阈值">
                  <el-input v-model="lightConfig.kdfz" :placeholder="$t('message.PleaseInput')" type="number">
                  </el-input>
                </el-form-item>
                <el-form-item label="关灯阈值">
                  <el-input v-model="lightConfig.gdfz" :placeholder="$t('message.PleaseInput')" type="number">
                  </el-input>
                </el-form-item>
                <el-form-item label="检查控制器">
                  <el-select v-model="kzqbms" :placeholder="$t('message.PleaseSelect')" multiple clearable
                    collapse-tags>
                    <el-option v-for="item in controllerCode" :key="item.dm" :label="item.dmsm" :value="item.dm">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="light_bottom_box">
                <div class="light_bottom_box_title">开灯控制</div>
                <div class="light_bottom_box_content">
                  <!-- <el-form :model="kd_controller" :rules="visibilityRules" ref="visibilityForm" label-width="150px"
                    size="mini"> -->
                  <div class="bana-informations mt20 hauto">
                    <div class="bana-title">控制策略</div>
                    <div class="bana-information-content">
                      <el-radio-group v-model="kd_kzcl" @change="changeRadioController" style="padding: 20px;">
                        <el-radio v-for="item in StrategiesDatas" :key="item.clbm" :label="item.clbm">{{item.clmc }}
                        </el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                  <div class="bana-informations mt20 hauto"
                    v-if="kd_controller.wdkzxszt||kd_controller.wdlddjxszt||kd_controller.wdldxszt||kd_controller.ssplxszt||kd_controller.zkbxszt||kd_controller.ldscxszt||kd_controller.mdscxszt||kd_controller.hdysxszt||kd_controller.mqysxszt||kd_controller.hsjsdzslxszt">
                    <div class="bana-title">{{ $t('message.SolutionParameter') }}</div>
                    <div class="bana-information-content">
                      <ul class="nameFormBox">
                        <li>
                          <el-form-item :label="$t('message.ControllerPattern')" prop="wdkz"
                            v-if="kd_controller.wdkzxszt">
                            <el-select v-model="lightConfig.kd_wdkz" :placeholder="$t('message.PleaseSelect')">
                              <el-option v-for="item in wdkzs" :key="item.dm" :label="item.dmsm" :value="item.dm">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.LightGread')" prop="wdlddj" v-if="kd_controller.wdlddjxszt">
                            <el-select v-model="lightConfig.kd_wdlddj" :placeholder="$t('message.PleaseSelect')">
                              <el-option v-for="item in lddjCodes" :key="item.dm" :label="item.dm" :value="item.dm">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.FoglightLuminance')" prop="kd_wdld"
                            v-if="kd_controller.wdldxszt">
                            <el-input v-model="lightConfig.kd_wdld" type="number" min="1" max="10" step="1"
                              auto-complete="off">
                            </el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.FlickerFrequency')" v-if="kd_controller.ssplxszt">
                            <el-select v-model="lightConfig.kd_sspl" :placeholder="$t('message.PleaseSelect')">
                              <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                              </el-option>
                              <!-- <el-option label="30次/分钟" value="500"></el-option>
                                <el-option label="60次/分钟" value="250"></el-option>
                                <el-option label="120次/分钟" value="125"></el-option>
                                <el-option label="240次/分钟" value="63"></el-option> -->
                            </el-select>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item label="占空比" v-if="kd_controller.zkbxszt">
                            <el-select v-model="lightConfig.kd_zkb" :placeholder="$t('message.PleaseSelect')">
                              <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.LightsONDuration')+'(ms)'" prop="kd_ldsc"
                            v-if="kd_controller.ldscxszt">
                            <el-input v-model="lightConfig.kd_ldsc" type="number"></el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.LightsOFFDuration')+'(ms)'" prop="kd_mdsc"
                            v-if="kd_controller.mdscxszt">
                            <el-input v-model="lightConfig.kd_mdsc" type="number" auto-complete="off"></el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.RedTimeLengthening')+'(s)'" prop="kd_hdys"
                            v-if="kd_controller.hdysxszt">
                            <el-input v-model="lightConfig.kd_hdys" type="number" auto-complete="off"></el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.DeadZoneDuration')+'(s)'" prop="kd_mqys"
                            v-if="kd_controller.mqysxszt">
                            <el-input v-model="lightConfig.kd_mqys" type="number" auto-complete="off"></el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item :label="$t('message.RedLightsNumber')" prop="kd_hsjsdzsl"
                            v-if="kd_controller.hsjsdzslxszt">
                            <el-input v-model="lightConfig.kd_hsjsdzsl" type="number" auto-complete="off" min="0"
                              max="50">
                            </el-input>
                          </el-form-item>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- </el-form> -->
                </div>
              </div>
            </el-form>
            <div class="btnBox">
              <el-button type="primary" class="fr" style="padding: 4px 20px;margin: 15px;margin-right: 28px;" plain
                icon="el-icon-refresh" @click="saveLightConfig">{{ $t("message.Save") }}</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <!-- 控制器详情弹出框 -->
    <el-dialog :title="$t('message.ControllerDetails')" :visible.sync="controllerVisible" width="70%">
      <div class="wdCons">
        <div class="bana-informations">
          <div class="bana-titles">{{ $t('message.ControllerInf') }}</div>
          <div class="bana-box">{{ $t('message.FogAreaName')+'：' }}<el-button size="mini">{{wqmc}}</el-button>
          </div>
          <div class="bana-box">{{ $t('message.ControllerName')+'：' }}<el-button size="mini">{{kzqmc}}</el-button>
          </div>
          <div class="bana-box">{{ $t('message.ControllerNum')+'：' }}<el-button size="mini">{{kzqbsm}}</el-button>
          </div>
        </div>
      </div>
      <div class="visibleControll">
        <div class="bana-information">
          <div class="bana-title">{{ $t('message.VisibilityInf') }}</div>
          <el-table highlight-current-row height="352px" :data="visibilitiesInController" border tooltip-effect="dark"
            v-model="visibilities">
            <el-table-column align="center" prop="njddj" :label="$t('message.VisibilityGrade')" min-width="81">
            </el-table-column>
            <el-table-column align="center" prop="njdsx" :label="$t('message.VisibilityTop')+'(m)'" min-width="90">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.njdsx == visibilities[scope.$index].njdsx">{{visibilities[scope.$index].njdsx}}</span>
                  <span v-else>{{scope.row.njdsx+'-'+visibilities[scope.$index].njdsx}}</span>
                </span>
                <span v-else>{{scope.row.njdsx}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="wdkzsm" :label="$t('message.WorkPattern')" min-width="90"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.wdkzsm == visibilities[scope.$index].wdkzsm">{{visibilities[scope.$index].wdkzsm}}</span>
                  <span v-else>{{scope.row.wdkzsm+'-'+visibilities[scope.$index].wdkzsm}}</span>
                </span>
                <span v-else>{{scope.row.wdkzsm}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="wdld" :label="$t('message.FoglightLuminance')" min-width="69">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.wdld == visibilities[scope.$index].wdld">{{visibilities[scope.$index].wdld}}</span>
                  <span v-else>{{scope.row.wdld+'-'+visibilities[scope.$index].wdld}}</span>
                </span>
                <span v-else>{{scope.row.wdld}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ldsc" :label="$t('message.LightsONDuration')+'(ms)'" min-width="97">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.ldsc== visibilities[scope.$index].ldsc">{{visibilities[scope.$index].ldsc}}</span>
                  <span v-else>{{scope.row.ldsc+'-'+visibilities[scope.$index].ldsc}}</span>
                </span>
                <span v-else>{{scope.row.ldsc}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="mdsc" :label="$t('message.LightsOFFDuration')+'(ms)'" min-width="97">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.mdsc== visibilities[scope.$index].mdsc">{{visibilities[scope.$index].mdsc}}</span>
                  <span v-else>{{scope.row.mdsc+'-'+visibilities[scope.$index].mdsc}}</span>
                </span>
                <span v-else>{{scope.row.mdsc}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="hdys" :label="$t('message.RedTimeLengthening')+'(s)'" min-width="97">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.hdys== visibilities[scope.$index].hdys">{{visibilities[scope.$index].hdys}}</span>
                  <span v-else>{{scope.row.hdys+'-'+visibilities[scope.$index].hdys}}</span>
                </span>
                <span v-else>{{scope.row.hdys}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="mqys" :label="$t('message.DeadZoneDuration')+'(s)'" min-width="97">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.mqys== visibilities[scope.$index].mqys">{{visibilities[scope.$index].mqys}}</span>
                  <span v-else>{{scope.row.mqys+'-'+visibilities[scope.$index].mqys}}</span>
                </span>
                <span v-else>{{scope.row.mqys}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="hsjsdzsl" :label="$t('message.RedLightsNumber')" min-width="118">
              <template slot-scope="scope">
                <span v-if="comparison">
                  <span
                    v-if="scope.row.hsjsdzsl== visibilities[scope.$index].hsjsdzsl">{{visibilities[scope.$index].hsjsdzsl}}</span>
                  <span v-else>{{scope.row.hsjsdzsl+'-'+visibilities[scope.$index].hsjsdzsl}}</span>
                </span>
                <span v-else>{{scope.row.hsjsdzsl}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="comparison" class="mr20">{{ $t('message.DataComparison') }}</el-checkbox>
        <el-button @click="syncVisibility" type="primary" size="mini">{{ $t('message.IssueDeviceParameter') }}
        </el-button>
        <el-button @click="controllerVisible = false" size="mini">{{ $t('message.OFF') }}</el-button>
      </div>
    </el-dialog>
    <!--下发控制显示界面  -->
    <el-dialog title="下发控制" :visible.sync="controllDialog" width="800px" height="110px">
      <el-table :data="selectedControllers" style="width: 100%" v-loading="controllLoading" :row-style="tableRowStyle">
        <el-table-column prop="wqmc" align="center" :label="$t('message.FogAreaName')" width="180">
        </el-table-column>
        <el-table-column prop="sbmc" align="center" :label="$t('message.ControllerName')" width="180">
        </el-table-column>
        <el-table-column prop="kzqbsm" align="center" :label="$t('message.ControllerNum')" width="180">
        </el-table-column>
        <el-table-column align="center" :label="$t('message.IssueState')" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.sendResult=== sendResult.WaitIssue">{{ $t('message.WaitIssue') }}</span>
            <span v-else-if="scope.row.sendResult=== sendResult.Success">{{ $t('message.Success') }}</span>
            <span v-else-if="scope.row.sendResult=== sendResult.SendFailed">{{ $t('message.SendFailed') }}</span>
            <span v-else-if="scope.row.sendResult=== sendResult.Timeout">{{ $t('message.Timeout') }}</span>
            <span v-else-if="scope.row.sendResult=== sendResult.Disconnection">{{ $t('message.Disconnection') }}</span>
            <span
              v-else-if="scope.row.sendResult=== sendResult.NotFoundSocket">{{ $t('message.NotFoundSocket') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- 确定下发 -->
        <el-button type="primary" @click="setVisibilityScales()" size="mini">{{ $t('message.Sure') }}</el-button>
        <el-button @click="controllDialog = false" size="mini">{{  $t('message.OFF')  }}</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹出框 -->
    <el-dialog :title="$t('message.Update')" :visible.sync="vsVisible" width="1100px">
      <el-form :model="visibility" :rules="visibilityRules" ref="visibilityForm" label-width="150px" size="mini">
        <div class="bana-informations mt10 hauto">
          <div class="bana-title">{{ $t('message.BasicMessage') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.VisibilityGrade')" prop="njddj">
                  <el-input v-model="visibility.njddj" auto-complete="off" disabled></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.VisibilityGradeDescription')" prop="njddms">
                  <el-input v-model="visibility.njddjms" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.VisibilityTop')+'(m)'" prop="njdsx">
                  <el-input v-model="visibility.njdsx" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>

        <div class="bana-informations mt20 hauto">
          <div class="bana-title">设备信息</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item label="号角音乐" prop="hjyy">
                  <el-select v-model="visibility.hjyy" placeholder="请选择" size="mini">
                    <el-option v-for="item in hjCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="是否打开警灯" prop="jsdkg">
                  <el-select v-model="visibility.jsdkg" placeholder="请选择" size="mini">
                    <el-option v-for="item in jdCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="号角音量：" prop="hjyl">
                  <el-select v-model="visibility.hjyl" placeholder="请选择" size="mini">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                    <el-option label="6" value="6"></el-option>
                    <el-option label="7" value="7"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="9" value="9"></el-option>
                    <el-option label="10" value="10"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LEDSpeed')+'(km/h)'" prop="xsz">
                  <el-select v-model="visibility.xsz" placeholder="请选择" size="mini">
                    <el-option v-for="item in xspCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="小车限速值下限(km/h)" prop="xcxszxx">
                  <el-input v-model="visibility.xcxszxx" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="小车限速值上限(km/h)" prop="xcxszsx">
                  <el-input v-model="visibility.xcxszsx" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="大车限速值下限(km/h)" prop="dcxszxx">
                  <el-input v-model="visibility.dcxszxx" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="大车限速值上限(km/h)" prop="dcxszsx">
                  <el-input v-model="visibility.dcxszsx" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>
      </el-form>
      <el-form :model="visibilityItem" :rules="visibilityRules" ref="visibilityForm" label-width="150px" size="mini">
        <div class="bana-informations mt20 hauto">
          <div class="bana-title">控制策略</div>
          <div class="bana-information-content">
            <el-radio-group v-model="radioVisibility" @change="changeRadioVisibility" style="padding: 20px;">
              <el-radio v-for="item in StrategiesData" :key="item.clbm" :label="item.clbm">{{item.clmc }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="bana-informations mt20 hauto"
          v-if="visibilityItem.wdkzxszt||visibilityItem.wdlddjxszt||visibilityItem.wdldxszt||visibilityItem.ssplxszt||visibilityItem.zkbxszt||visibilityItem.ldscxszt||visibilityItem.mdscxszt||visibilityItem.hdysxszt||visibilityItem.mqysxszt||visibilityItem.hsjsdzslxszt">
          <div class="bana-title">{{ $t('message.SolutionParameter') }}</div>
          <div class="bana-information-content">
            <ul class="nameFormBox">
              <li>
                <el-form-item :label="$t('message.ControllerPattern')" prop="wdkz" v-if="visibilityItem.wdkzxszt">
                  <el-select v-model="visibilityItem.wdkz" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in wdkzs" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightGread')" prop="wdlddj" v-if="visibilityItem.wdlddjxszt">
                  <el-select v-model="visibilityItem.wdlddj" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in lddjCodes" :key="item.dm" :label="item.dm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.FoglightLuminance')" prop="wdld" v-if="visibilityItem.wdldxszt">
                  <el-input v-model="visibilityItem.wdld" type="number" min="1" max="10" step="1" auto-complete="off">
                  </el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.FlickerFrequency')" v-if="visibilityItem.ssplxszt">
                  <el-select v-model="visibilityItem.sspl" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                    <!-- <el-option label="30次/分钟" value="500"></el-option>
                    <el-option label="60次/分钟" value="250"></el-option>
                    <el-option label="120次/分钟" value="125"></el-option>
                    <el-option label="240次/分钟" value="63"></el-option> -->
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="占空比" v-if="visibilityItem.zkbxszt">
                  <el-select v-model="visibilityItem.zkb" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightsONDuration')+'(ms)'" prop="ldsc" v-if="visibilityItem.ldscxszt">
                  <el-input v-model="visibilityItem.ldsc" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.LightsOFFDuration')+'(ms)'" prop="mdsc"
                  v-if="visibilityItem.mdscxszt">
                  <el-input v-model="visibilityItem.mdsc" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.RedTimeLengthening')+'(s)'" prop="hdys"
                  v-if="visibilityItem.hdysxszt">
                  <el-input v-model="visibilityItem.hdys" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.DeadZoneDuration')+'(s)'" prop="mqys" v-if="visibilityItem.mqysxszt">
                  <el-input v-model="visibilityItem.mqys" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.RedLightsNumber')" prop="hsjsdzsl" v-if="visibilityItem.hsjsdzslxszt">
                  <el-input v-model="visibilityItem.hsjsdzsl" type="number" auto-complete="off" min="0" max="50">
                  </el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisibilityScale" type="primary" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="vsVisible = false" size="mini" style="margin-right: 10px;">{{ $t('message.Cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import FogArea from "./js/FogArea.js";
  import Controller from "./js/Controller.js";
  import ControlStrategy from './js/ControlStrategy.js'
  import VisibilityScale from "./js/VisibilityScale.js";
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  export default {
    data() {
      return {
        // ControllerWorkModeCustom: [], //自定义下的雾灯工作模式
        kzqbms: [],
        controllerCode: [], //检车控制器
        kd_kzcl: '', //开灯控制策略
        zkbCodes: [],
        lightConfig: {},
        activeName: 'first',
        radioVisibility: 0, //控制策略单选
        StrategiesData: [], //控制策略数据
        StrategiesDatas: [], //控制策略数据
        visibilityXszt: [], //显示状态
        comparison: false, //数据对比
        expands: [], // 要展开的行，数值的元素是row的key值
        contorlls: [], // 雾区下控制器集合
        fogAreas: [], //雾区集合
        controllDialog: false, //下发控制器弹窗状态
        controllLoading: false,
        // ldmdsc:"",
        tableHeight: '',
        // lddjCodes: [],//亮度等级集合
        // lddj: "",//亮度等级
        wdkzs: [], //雾灯控制
        wqbm: '', //当前选中的雾区
        wqmc: '', //雾区名称
        kzqmc: '', //控制器名称
        kzqbsm: '', //控制器标识码
        controllers: [],
        selectedControllers: [],
        selectedController: {},
        visibilities: [], //表格数据
        visibility: {},
        visibilityItem: {},
        kd_controller: {},
        visibilityRules: {
          wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
          mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
          hdys: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'time'),
          xsz: this.filterRules('限速值', true, null, null, 'time'),
          xcxszxx: this.filterRules('小车限速值下限', true, null, null, 'time'),
          xcxszsx: this.filterRules('小车限速值上限', true, null, null, 'time'),
          dcxszxx: this.filterRules('大车限速值下限', true, null, null, 'time'),
          dcxszsx: this.filterRules('大车限速值上限', true, null, null, 'time'),

          // hjyl: this.filterRules('号角音量', true, null, null, 'hjyl'),
        },
        lightConfigRules: {
          kd_wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          kd_ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
          kd_mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
          kd_hdys: this.filterRules('红灯延时', true, null, null, 'time'),
          kd_mqys: this.filterRules('盲区延时', true, null, null, 'time'),
          kd_hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'time'),
        },
        visibilitiesInController: [],
        controllerVisible: false,
        vsVisible: false,
        sendResult: Dictionary.SendResult,
        hjCodes: [],
        jdCodes: [],
        xspCodes: [],

        lddjCodes: [],
        ssplCodes: [],
        zkbCodes: [],
      };
    },
    created() {
      this.loadFogAreas();
      this.tableHeight = window.screen.availHeight - 485 + 'px';
    },
    mounted() {
      this.loadVisibilityScales();
      this.loadLampLevelCodes();
      //   this.loadControllerWorkModeCodes();
      this.loadStrategies();
    },
    methods: {
      //tab切换
      //   handleClick() {},
      //保存光感配置
      saveLightConfig() {
        let controllers = []
        let flag;
        for (let i = 0; i < this.controllerCode.length; i++) {
          flag = false
          for (let j = 0; j < this.kzqbms.length; j++) {
            if (this.controllerCode[i].dm == this.kzqbms[j]) {
              flag = true
            }
          }
          controllers.push({
            kzqbm: this.controllerCode[i].dm,
            jcld: flag
          })
        }
        let {
          wqbm,
          fwzq,
          kdfz,
          gdfz,
          qrcs,
          //   kd_kzcl,
          kd_wdlddj,
          kd_sspl,
          kd_zkb,
          kd_wdkz,
          kd_wdld,
          kd_ldsc,
          kd_mdsc,
          kd_hdys,
          kd_mqys,
          kd_hsjsdzsl,
          //   gd_kzcl,
          //   gd_wdlddj,
          //   gd_sspl,
          //   gd_zkb,
          //   gd_wdkz,
          //   gd_wdld,
          //   gd_ldsc,
          //   gd_mdsc,
          //   gd_hdys,
          //   gd_mqys,
          //   gd_hsjsdzsl
        } = this.lightConfig
        // let data = {...this.lightConfig,...this.kd_controller}
        let data = {
          wqbm,
          fwzq,
          kdfz,
          gdfz,
          qrcs,
          //   kd_kzcl,
          kd_wdlddj,
          kd_sspl,
          kd_zkb,
          kd_wdkz,
          kd_wdld,
          kd_ldsc,
          kd_mdsc,
          kd_hdys,
          kd_mqys,
          kd_hsjsdzsl,
          //   gd_kzcl,
          //   gd_wdlddj,
          //   gd_sspl,
          //   gd_zkb,
          //   gd_wdkz,
          //   gd_wdld,
          //   gd_ldsc,
          //   gd_mdsc,
          //   gd_hdys,
          //   gd_mqys,
          //   gd_hsjsdzsl
        }
        data.kd_kzcl = this.kd_kzcl
        data.controllers = controllers
        FogArea.updateFogAreaLightConfig(data).then(value => {
          this.$refs['lightConfigForm'].validate((valid) => {
            if (valid) {
              if (value.czjg == Dictionary.DatabaseResult.Success) { //返回成功
                this.$alert('操作成功', '感光配置', {
                  confirmButtonText: '确定'
                });
              }
            }
          })

        });
      },
      loadStrategies() {
        var data = {}
        //查询数据
        ControlStrategy.getStrategies(data).then(value => {
            // console.log(value)
          for (let i = 0; i < value.length; i++) {
            // this.StrategiesDatas.push(value[i]);
            if (value[i].clmc != 6) {
              this.StrategiesData.push(value[i]);
            }
            if (value[i].clbm != 5) {
            this.StrategiesDatas.push(value[i]);
            }
          }

        });
      },
      changeRadioVisibility(val) {
        // console.log(val)
        for (let i = 0; i < this.StrategiesData.length; i++) {
          if (this.StrategiesData[i].clbm == val) {
            this.visibilityItem = this.StrategiesData[i];
          }
        }

      },
      changeRadioController(val) {
        this.kd_kzcl = val
        for (let i = 0; i < this.StrategiesDatas.length; i++) {
          if (this.StrategiesDatas[i].clbm == val) {
            let {
              wdkzxszt,
              wdlddjxszt,
              wdldxszt,
              ssplxszt,
              zkbxszt,
              ldscxszt,
              mdscxszt,
              hdysxszt,
              mqysxszt,
              hsjsdzslxszt
            } = this.StrategiesDatas[i];
            this.kd_controller = {
              ...this.kd_controller,
              wdkzxszt,
              wdlddjxszt,
              wdldxszt,
              ssplxszt,
              zkbxszt,
              ldscxszt,
              mdscxszt,
              hdysxszt,
              mqysxszt,
              hsjsdzslxszt
            }
            // console.log(this.kd_controller)
          }
        }
      },
      loadVisibilityScales() {
        VisibilityScale.getVisibilityScales().then(value => { //查询能见度等级
          this.visibilities = value;
        });

      },
      //通过雾区查询
      changeFogArea(wqbm) {
        var queryParameter = {
          wqbm: wqbm
        };
        this.kzqbms = []
        this.controllerCode = []
        Controller.getControllers(queryParameter).then(value => {

          this.controllers = value;
          if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
              this.controllerCode.push({
                dm: value[i].kzqbm,
                dmsm: value[i].kzqmc
              })
              if (value[i].jcld) {
                this.kzqbms.push(value[i].kzqbm)
              }
            }
          }
          // console.log(this.lightConfig)
          // console.log(this.controllerCode)
          //   console.log(this.controllers)

        });
        for (let i = 0; i < this.fogAreas.length; i++) {
          if (this.fogAreas[i].wqbm === wqbm) {
            this.lightConfig = this.fogAreas[i]
            this.kd_controller = this.fogAreas[i]
            this.kd_kzcl = this.fogAreas[i].kd_kzcl
            // this.lightConfig.kd_kzcl = this.fogAreas[i].kd_kzcl
            this.changeRadioController(this.lightConfig.kd_kzcl)
            //   this.controllerCode = this.fogAreas[i].controllers
          }
        }
      },
      //亮度等级
      // changeLampGrade(lddj){
      //   for(let i = 0;i< this.lddjCodes.length; i++){
      //     if(this.lddjCodes[i].dm == this.visibilityItem.wdlddj){
      //       this.lddj = this.lddjCodes[i].dmsm;
      //     }
      //   }
      //   this.visibilityItem.wdld = this.lddj;
      // },

      //读取工作模式字典
      loadLampLevelCodes() {
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

        Code.getCodes({
          dmlb: Dictionary.CodeType.screen,
        }).then(value => {
          this.xspCodes = value.datas;
        });

        Code.getCodes({
          dmlb: Dictionary.CodeType.hornCodes,
        }).then(value => {
          this.hjCodes = value.datas;
        });

        Code.getCodes({
          dmlb: Dictionary.CodeType.LinkedSwitch,
        }).then(value => {
          this.jdCodes = value.datas;
        });

        Code.getCodes({
          dmlb: Dictionary.CodeType.ControllerWorkMode
        }).then(value => {

          for (i = 0; i < value.datas.length; i++) {
            if (value.datas[i].dm == 1 ||
              value.datas[i].dm == 2 ||
              value.datas[i].dm == 3 ||
              value.datas[i].dm == 4) {
              this.wdkzs.push(value.datas[i])
            }
          }

        });
      },
      //读取雾区集合
      loadFogAreas() {
        this.fogAreas = [];
        FogArea.getFogAreas().then(value => {
          for (var i = 0; i < value.length; ++i) {
            value[i].wqbm = value[i].wqbm.toString();
            this.fogAreas.push(value[i]);
          }
          if (value.length > 0) {
            this.wqbm = this.fogAreas[0].wqbm;
            this.changeFogArea(this.wqbm);
          }

        });
      },
      //读取工作模式字典
      //   loadControllerWorkModeCodes() {
      //     var data = {
      //       dmlb: Dictionary.CodeType.ControllerWorkMode,
      //     };
      //     //这里清空
      //     this.wdkzs = [];
      //     Code.getCodes(data).then(value => {

      //       for (i = 0; i < value.datas.length; i++) {
      //         if (value.datas[i].dm == 1 ||
      //           value.datas[i].dm == 2 ||
      //           value.datas[i].dm == 3 ||
      //           value.datas[i].dm == 4) {
      //           this.wdkzs.push(value.datas[i])
      //         }
      //       }

      //     })
      //   },
      //亮灯灭灯时长选择
      // changeLamp(ldmdsc){
      //   this.visibilityItem.ldsc = ldmdsc;
      //   this.visibilityItem.mdsc = ldmdsc*3;
      // },

      selectionControllers(contorlls) {
        this.selectedControllers = contorlls;
      },

      //显示下发框
      showSetDialog() {
        if (this.selectedControllers.length == 0) {
          this.$alert('请先选择控制器', '设备控制', {
            confirmButtonText: '确定'
          }).catch(() => {});
          return;
        }
        this.controllDialog = true;
        let selectedContros = [];
        var data = {
          wqbm: this.selectedControllers.wqbm,
        }
        Controller.getControllers(data).then(value => { //控制器查询
          for (var i = 0; i < value.length; ++i) {
            value[i].sendResult = 6;
            for (var j = 0; j < this.selectedControllers.length; j++) {
              if (value[i].kzqbm === this.selectedControllers[j].kzqbm) {
                selectedContros.push(value[i])
              }
            }
          }
          this.selectedControllers = selectedContros
        }).catch(() => {});
      },
      //确认下发控制器参数
      setVisibilityScales() {

        this.controllLoading = true; //加载loading
        var kzqbsms = [];
        var kzqdks = [];
        for (var i = 0; i < this.selectedControllers.length; ++i) {
          kzqbsms.push(this.selectedControllers[i].kzqbsm);
          kzqdks.push(this.selectedControllers[i].kzqdk);
        }

        var data = {
          kzqbsms: kzqbsms,
          kzqdks: kzqdks,
          visibilityScales: this.visibilities
        }

        // console.log(data)
        Controller.setVisibilityScales(data).then(value => {
          for (var i = 0; i < value.length; ++i) {
            for (var j = 0; j < this.selectedControllers.length; ++j) {
              if (value[i].key == this.selectedControllers[j].kzqbsm) {
                this.selectedControllers[j].sendResult = value[i].czjg;
                break;
              }
            }
          }
          this.controllLoading = false;
        });
      },
      tableRowStyle({
        row,
        rowIndex
      }) {
        if (row.workMode === 1) { //控制器下发状态，不同行显示不同的颜色
          return {
            "background-color": "#f0f9eb"
          }
        } else if (row.workMode === 2) {
          return {
            "background-color": "oldlace"
          }
        }
        return '';
      },
      showControllerDialog(index, row) { //详情页（行数，值）
        this.controllerVisible = true;
        this.selectedController = row;
        this.visibilitiesInController = [];
        this.wqmc = row.wqmc;
        this.kzqmc = row.kzqmc;
        this.kzqbsm = row.kzqbsm;
        // console.log(row);
        Controller.queryVisibilityScales(row).then(value => {
          if (value == null) {
            this.$alert("未找到设备或连接超时，请联系管理员", '控制器信息', {
              confirmButtonText: '确定'
            });
          } else {
            this.visibilitiesInController = value;
          }
        });
      },
      syncVisibility() {
        this.$confirm('是否将数据库数据同步到设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          var data = {
            kzqbsms: [this.selectedController.kzqbsm],
            kzqdks: [this.selectedController.kzqdk],
            visibilityScales: this.visibilities
          }
          console.log(data)
          Controller.setVisibilityScales(data).then(value => {

            if (value[0].czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value[0].czjg == Dictionary.SendResult.SendFailed) {
              this.$alert('操作失败', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value[0].czjg == Dictionary.SendResult.Timeout) {
              this.$alert('与设备通信超时', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value[0].czjg == Dictionary.SendResult.Disconnection) {
              this.$alert('与设备通信连接断开', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value[0].czjg == Dictionary.SendResult.NotFoundSocket) {
              this.$alert('未找到该设备', '设备控制', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => {});
      },
      showUpdateDialog(index, row) {
        if (this.$refs['visibilityForm'] != undefined) {
          this.$refs['visibilityForm'].resetFields();
        }

        this.visibility = {
          njddj: row.njddj,
          njddjms: row.njddjms,
          njdsx: row.njdsx,
          wdkz: row.wdkz,
          wdkzsm: row.wdkzsm,
          wdlddj: row.wdlddj,
          wdld: row.wdld,
          ldsc: row.ldsc,
          mdsc: row.mdsc,
          hdys: row.hdys,
          mqys: row.mqys,
          hsjsdzsl: row.hsjsdzsl,
          xsz: row.xsz,
          hjyy: row.hjyy,
          hjyl: row.hjyl,
          jsdkg: row.jsdkg,
          xcxszxx: row.xcxszxx,
          xcxszsx: row.xcxszsx,
          dcxszxx: row.dcxszxx,
          dcxszsx: row.dcxszsx,
        };
        this.radioVisibility = row.kzcl;
        for (let i = 0; i < this.StrategiesData.length; i++) {

          if (this.StrategiesData[i].clbm == row.kzcl) {
            this.visibilityXszt = this.StrategiesData[i];
          }
        }

        this.visibilityItem = {
          wdkz: row.wdkz,
          wdkzsm: row.wdkzsm,
          wdlddj: row.wdlddj,
          wdld: row.wdld,
          ldsc: row.ldsc,
          mdsc: row.mdsc,
          hdys: row.hdys,
          mqys: row.mqys,
          hsjsdzsl: row.hsjsdzsl,
          kzcl: row.kzcl,
          clmc: row.kzclsm,
          sspl: row.sspl,
          zkb: row.zkb,
          wdlddjxszt: this.visibilityXszt.wdlddjxszt,
          ssplxszt: this.visibilityXszt.ssplxszt,
          zkbxszt: this.visibilityXszt.zkbxszt,
          wdkzxszt: this.visibilityXszt.wdkzxszt,
          wdldxszt: this.visibilityXszt.wdldxszt,
          ldscxszt: this.visibilityXszt.ldscxszt,
          mdscxszt: this.visibilityXszt.mdscxszt,
          hdysxszt: this.visibilityXszt.hdysxszt,
          mqysxszt: this.visibilityXszt.mqysxszt,
          hsjsdzslxszt: this.visibilityXszt.hsjsdzslxszt,
        }

        this.vsVisible = true;
      },
      updateVisibilityScale(formName) { //确定

        let data = {
          njddj: this.visibility.njddj,
          njddjms: this.visibility.njddjms,
          njdsx: this.visibility.njdsx,
          wdkz: this.visibilityItem.wdkz,
          wdkzsm: this.visibilityItem.wdkzsm,
          xsz: this.visibility.xsz,
          hjyy: this.visibility.hjyy,
          hjyl: this.visibility.hjyl,
          jsdkg: this.visibility.jsdkg,
          xcxszxx: this.visibility.xcxszxx,
          xcxszsx: this.visibility.xcxszsx,
          dcxszxx: this.visibility.dcxszxx,
          dcxszsx: this.visibility.dcxszsx,
          wdlddj: this.visibilityItem.wdlddj,
          wdld: this.visibilityItem.wdld,
          ldsc: this.visibilityItem.ldsc,
          mdsc: this.visibilityItem.mdsc,
          hdys: this.visibilityItem.hdys,
          mqys: this.visibilityItem.mqys,
          hsjsdzsl: this.visibilityItem.hsjsdzsl,
          kzcl: this.radioVisibility,
          sspl: this.visibilityItem.sspl,
          zkb: this.visibilityItem.zkb,
        }

        VisibilityScale.updateVisibilityScale(data).then(value => {

          this.$refs['visibilityForm'].validate((valid) => {

            if (valid) {

              if (value.czjg == Dictionary.DatabaseResult.Success) { //返回成功

                //这里从已经得到的字典集合找一下就可以了
                var wdkzsm;
                for (var i = 0; i < this.wdkzs.length; ++i) {
                  if (this.wdkzs[i].dm == this.visibility.wdkz) {
                    wdkzsm = this.wdkzs[i].dmsm;
                  }
                }

                for (var i = 0; i < this.visibilities.length; ++i) {
                  if (this.visibility.njddj == this.visibilities[i].njddj) {
                    this.visibilities[i].njddjms = this.visibility.njddjms;
                    this.visibilities[i].njdsx = this.visibility.njdsx;
                    this.visibilities[i].wdkz = this.visibilityItem.wdkz;
                    this.visibilities[i].wdkzsm = wdkzsm;
                    this.visibilities[i].wdlddj = this.visibilityItem.wdlddj;
                    this.visibilities[i].wdld = this.visibilityItem.wdld;
                    this.visibilities[i].ldsc = this.visibilityItem.ldsc;
                    this.visibilities[i].mdsc = this.visibilityItem.mdsc;
                    this.visibilities[i].hdys = this.visibilityItem.hdys;
                    this.visibilities[i].mqys = this.visibilityItem.mqys;
                    this.visibilities[i].hsjsdzsl = this.visibilityItem.hsjsdzsl;
                    this.visibilities[i].kzcl = this.radioVisibility,
                      this.visibilities[i].kzclsm = this.visibilityItem.clmc,
                      this.visibilities[i].sspl = this.visibilityItem.sspl,
                      this.visibilities[i].zkb = this.visibilityItem.zkb,
                      this.visibilities[i].xsz = this.visibility.xsz;
                    this.visibilities[i].xcxszxx = this.visibility.xcxszxx;
                    this.visibilities[i].xcxszsx = this.visibility.xcxszsx;
                    this.visibilities[i].dcxszxx = this.visibility.dcxszxx;
                    this.visibilities[i].dcxszsx = this.visibility.dcxszsx;
                    for (var j = 0; j < this.xspCodes.length; ++j) {
                      if (this.xspCodes[j].dm == this.visibility.xsz) {
                        this.visibilities[i].xszsm = this.xspCodes[j].dmsm;
                        break;
                      }
                    }
                    this.visibilities[i].hjyy = this.visibility.hjyy;
                    for (var j = 0; j < this.hjCodes.length; ++j) {
                      if (this.hjCodes[j].dm == this.visibility.hjyy) {
                        this.visibilities[i].hjyysm = this.hjCodes[j].dmsm;
                        break;
                      }
                    }
                    this.visibilities[i].hjyl = this.visibility.hjyl;
                    this.visibilities[i].jsdkg = this.visibility.jsdkg;
                    for (var j = 0; j < this.jdCodes.length; ++j) {
                      if (this.jdCodes[j].dm == this.visibility.jsdkg) {
                        this.visibilities[i].jsdkgsm = this.jdCodes[j].dmsm;
                        break;
                      }
                    }
                  }
                }

                this.vsVisible = false;
                this.$alert('操作成功', '能见度等级信息', {
                  confirmButtonText: '确定'
                });
              } else {
                this.$alert("操作失败，请联系管理员", '能见度等级信息', {
                  confirmButtonText: '确定'
                });
              }
            }
          })
        });
      },

    }
  }

</script>
