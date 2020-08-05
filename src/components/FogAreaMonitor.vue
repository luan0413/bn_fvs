<template>
  <div>

    <Head :activeIndex="actives" />
    <div class="content FogAreaMonitor">
      <nav class="nav">
        <div class="navBox" v-show="sideflag">
          <!--设备监控左侧列表-->
          <div class="leftMenuBox">
            <div class="leftMenuTitle">
              <i class="el-icon-document"></i>{{ $t('message.FogAreaList') }}
            </div>
            <div class="leftMenuContent">
              <el-menu :default-active="activeWqbm" @select="selectFogArea">
                <el-menu-item :index="data.wqbm" v-for="data in fogAreas" v-bind:key="data.wqbm">
                  <div class="imgBox"></div>
                  <div class="text">{{data.wqmc}}</div>
                </el-menu-item>
              </el-menu>

            </div>
          </div>
        </div>
        <div class="navBoxBar" @click="side" ref="navbox"><img src="./img/right.png" alt="" v-if="!sideflag"><img
            src="./img/left.png" alt="" v-else></div>
      </nav>
      <section class="section">
        <div class="connmand">
          <input type="button" @click=" jog" class="navbutton" :title="$t('message.Roam')" ref="jog" />
          <input type="button" @click=" zoomInCommand" class="navbutton" :title="$t('message.Amplification')" />
          <input type="button" @click="zoomOutCommand" class="navbutton" :title="$t('message.Shrink')" />
          <input type="button" @click="fullScreen" class="navbutton" :title="$t('message.FullScreen')" ref="full" />
          <input type="button" @click="measure" class="navbutton" :title="$t('message.MeasureDistance')" />
          <input type="button" @click="area" class="navbutton" :title="$t('message.MeasureArea')" />
          <input type="button" @click="fogareaLable" class="navbutton" :title="$t('message.FogAreaLable')" />
        </div>
        <div class="map-box-kong"></div>
        <div class="map-box" ref="mapbox">
          <Map></Map>
        </div>
        <div class="tab-box">
          <div class="tabBox" v-show="showtabbar" ref="showtabbar">
            <!--雾灯控制，控制器参数查询，下发按钮-->
            <el-button :style="{display: disController}" :title="$t('message.SearchControllerParameter')" size="mini"
              class="tableBtnImg" icon="el-icon-printer" @click="showSyncDialog()"></el-button>
            <!-- <el-button :style="{display: disRubNumber}" title="设置摩擦指数联动控数" size="mini" class="tableBtnImg" icon="el-icon-setting" @click="showTabRub()"></el-button> -->
            <el-tabs v-model="activeTabName" @tab-click="handleClick">
              <el-tab-pane :label="$t('message.FogAreaMessage')" name="tabFogArea">
                <div class="first">
                  <div class="bana-information">
                    <div class="bana-title">{{ $t("message.BasicMessage") }}</div>
                    <div class="bana-information-content">
                      <ul class="inf readonly">
                        <li>
                          <span>{{ $t('message.FogAreaName') }}：</span><input type="text" readonly
                            v-model="fogArea.wqmc" :title="fogArea.wqmc" />
                        </li>

                        <li>
                          <span>{{ $t('message.VisibilityGrade') }}：</span><input type="text" readonly
                            v-model="fogArea.njddj" />
                        </li>
                        <li>
                          <span>能见度等级上限：</span><input type="text" readonly v-model="fogArea.njdsx" />
                          <span class="unit">m</span>
                        </li>
                        <li>
                          <span>能见度等级下限：</span><input type="text" readonly v-model="fogArea.njdxx" />
                          <span class="unit">m</span>
                        </li>
                      </ul>
                      <ul class="inf readonly">
                        <li>
                          <span>{{ $t('message.Visibility') }}：</span><input type="text" readonly
                            v-model="fogArea.njd" />
                          <span class="unit">m</span>
                        </li>
                        <li>
                          <span>{{ $t('message.VisibilityDescription') }}：</span><input type="text" readonly
                            v-model="fogArea.njddjms" />
                        </li>
                        <li>
                          <span>{{ $t('message.FogAreaWeather') }}：</span><input type="text" readonly
                            v-model="fogArea.lmzt" />
                        </li>
                        <li>
                          <span>工作模式：</span><input type="text" readonly v-model="fogArea.gzmssm" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('message.FogLampsControl')" name="tabLamp">
                <div class="second">
                  <div class="fogAreaBox">
                    <div class="workState">
                      <div class="bana-information">
                        <div class="bana-title">{{ $t('message.WorkState') }}</div>
                        <div class="bana-information-content">
                          <div class="contentBox">
                            <div class="imgBox">
                              <img :src="lampImg" />
                            </div>
                            <div class="textBox">
                              <el-form :model="fogArea" size="mini">
                                <ul>
                                  <li>
                                    <el-form-item :label="$t('message.WorkPattern')+'：'">
                                      <el-input readonly v-model="fogArea.gzmssm" :title="fogArea.gzmssm"></el-input>
                                    </el-form-item>
                                  </li>
                                  <li>
                                    <el-form-item label="当前策略：">
                                      <el-input readonly v-model="fogArea.kzclsm" :title="fogArea.kzclsm"></el-input>
                                    </el-form-item>
                                  </li>
                                  <li>
                                    <el-form-item :label="$t('message.FoglightState')+'：'">
                                      <el-input readonly v-model="fogArea.wdkzsm" :title="fogArea.wdkzsm"></el-input>
                                    </el-form-item>
                                  </li>
                                </ul>
                              </el-form>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="workState manual" v-if="fogArea.gzms==5">
                      <div class="bana-information">
                        <div class="bana-title">手动干预</div>
                        <div class="bana-information-content ">
                          <div class="textBox">

                            <el-form :model="fogArea" size="mini">
                              <ul>
                                <li>
                                  <el-form-item label="开始时间：">
                                    <el-input readonly v-model="fogArea.kssj"></el-input>
                                    <!-- <span class="unit">{{ $t('message.Minute') }}</span> -->
                                  </el-form-item>
                                </li>
                                <li>
                                  <el-form-item label="干预时长：">
                                    <el-input readonly v-model="fogArea.cxsj"></el-input>
                                    <span class="unit" style="padding-left: 10px;">{{ $t('message.Minute') }}</span>
                                  </el-form-item>
                                </li>
                                <li>
                                  <el-form-item label="倒 计 时 ：">
                                    <el-input readonly v-model="djs"></el-input>
                                  </el-form-item>
                                </li>
                              </ul>
                            </el-form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="TimingSolution" v-else-if="fogArea.gzms==3">
                      <div class="bana-information">
                        <div class="bana-title">{{ $t('message.TimingSolution') }}</div>
                        <div class="bana-information-content ">
                          <el-form :model="fogArea" size="mini">
                            <ul>
                              <li>
                                <el-form-item :label="$t('message.SolutionName')+'：'">
                                  <el-input readonly v-model="fogArea.famc" :title="fogArea.famc"></el-input>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.StatrTime')+'：'">
                                  <el-input readonly v-model="fogArea.kssj"></el-input>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.ContinueTime')+'：'">
                                  <el-input readonly v-model="fogArea.cxsj"></el-input>
                                  <span class="unit">{{ $t('message.Minute') }}</span>
                                </el-form-item>
                              </li>
                            </ul>
                          </el-form>
                        </div>
                      </div>
                    </div>
                    <div class="RunConfig">
                      <div class="bana-information">
                        <div class="bana-title">{{ $t('message.RunConfig') }}</div>
                        <div class="bana-information-content">
                          <el-form :model="fogArea" size="mini">
                            <ul class="lampReadonly">
                              <li>
                                <el-form-item :label="$t('message.LightGread')+'：'" prop="wdlddj"
                                  v-if="lamp.wdlddjxszt">
                                  <el-input readonly v-model="fogArea.wdlddj"></el-input>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.FoglightLuminance')+'：'" prop="wdld"
                                  v-if="lamp.wdldxszt">
                                  <el-input readonly v-model="fogArea.wdld"></el-input>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.LightsONDuration')+'：'" prop="ldsc"
                                  v-if="lamp.ldscxszt">
                                  <el-input readonly v-model="fogArea.ldsc"></el-input>
                                  <span class="unit">ms</span>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.LightsOFFDuration')+'：'" prop="mdsc"
                                  v-if="lamp.mdscxszt">
                                  <el-input readonly v-model="fogArea.mdsc"></el-input>
                                  <span class="unit">ms</span>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.FlickerFrequency')+'：'" v-if="lamp.ssplxszt"
                                  :title="fogArea.ssplsm">
                                  <!-- <el-select v-model="fogArea.sspl" :placeholder="$t('message.PleaseSelect')" readonly>
                                    <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">{{item.dmsm}}</el-option>
                                  </el-select> -->
                                  <el-input readonly v-model="fogArea.ssplsm"></el-input>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item label="占空比：" v-if="lamp.zkbxszt">
                                  <!-- <el-select v-model="fogArea.zkb" :placeholder="$t('message.PleaseSelect')" readonly :title="fogArea.zkbsm">
                                    <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                                  </el-select> -->
                                  <el-input readonly v-model="fogArea.zkbsm"></el-input>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.RedTimeLengthening')+'：'" prop="hdys"
                                  v-if="lamp.hdysxszt">
                                  <el-input readonly v-model="fogArea.hdys"></el-input>
                                  <span class="unit">s</span>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.DeadZoneDuration')+'：'" prop="mqys"
                                  v-if="lamp.mqysxszt">
                                  <el-input readonly v-model="fogArea.mqys"></el-input>
                                  <span class="unit">s</span>
                                </el-form-item>
                              </li>
                              <li>
                                <el-form-item :label="$t('message.RedLightsNumber')+'：'" prop="hsjsdzsl"
                                  label-width="108px" v-if="lamp.hsjsdzslxszt">
                                  <el-input readonly v-model="fogArea.hsjsdzsl" min="0" max="50"></el-input>
                                  <span class="unit">{{ $t("message.Ge") }}</span>
                                </el-form-item>
                              </li>

                              <!-- </ul>
                            <ul class="lampReadonly"> -->
                            </ul>
                          </el-form>
                        </div>
                      </div>
                    </div>
                    <div class="wdBtn">
                      <!-- 下发控制 -->
                      <span class="el-switch__label el-switch__label--left">定时器</span>
                      <el-switch v-model="sfds" active-color="#13ce66" inactive-color="#ff4949"
                        @change="updateFogAreaTimer"></el-switch>
                      <el-button type="primary" style="width: 80px" icon="el-icon-refresh" :disabled="!isFlag"
                        @click="showSetDialog(2)">手动干预</el-button>
                      <el-button type="primary" style="width: 80px" icon="el-icon-refresh" :disabled="isFlag"
                        @click="showSetDialog(1)">取消干预</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="气象数据" name="tabWeather">
                <div class="weather">
                  <div class="bana-information">
                    <div class="bana-title">{{fogArea.wqmc}}</div>
                    <div class="bana-information-content">
                      <ul class="inf">
                        <li>
                          <span>风向：</span><input type="text" readonly v-model="fogArea.fx" :title="fogArea.wqmc" />
                          <span class="unit">°</span>
                        </li>
                        <li>
                          <span>风速：</span><input type="text" readonly v-model="fogArea.fs" />
                          <span class="unit">m/s</span>
                        </li>
                        <li>
                          <span>温度：</span><input type="text" readonly v-model="fogArea.wd" />
                          <span class="unit">℃</span>
                        </li>
                      </ul>
                      <ul class="inf">
                        <li>
                          <span>湿度：</span><input type="text" readonly v-model="fogArea.sd" />
                          <span class="unit">%</span>
                        </li>
                        <li>
                          <span>气压：</span><input type="text" readonly v-model="fogArea.qy" />
                          <span class="unit">KPa</span>
                        </li>
                        <li>
                          <span>雨量：</span><input type="text" readonly v-model="fogArea.yl" />
                          <span class="unit">mm</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="光感数据" name="tabLightController">
                <div class="weather">
                  <div class="bana-information">
                <div class="bana-title">{{fogArea.wqmc}}</div>
                    <div class="bana-information-content">
                      <ul class="inf" style="margin-top: 0 !important;">
                        <li style="height: 30px !important">
                          <span>光感综合数据：</span><input type="text" readonly v-model="fogArea.ggsz" />
                        </li>
                        <li style="height: 30px !important">
                          <span>开灯阀值：</span><input type="text" readonly v-model="fogArea.kdfz" />
                        </li>
                        <li style="height: 30px !important">
                          <span>关灯阀值：</span><input type="text" readonly v-model="fogArea.gdfz" />
                        </li>
                      </ul>
                      <ul class="inf">
                        <!--  style="width: 16% !important;" -->
                        <li v-for="(item,index) in fogArea.controllers" :key="index" style="height: 30px !important">
                          <!--  style="width:50% !important;padding-right: 5px;" -->
                          <span styla="padding-right: 5px;">{{item.kzqmc+"："}}</span>
                          <!-- <input type="text" readonly v-model="item.kzqbm" /> -->
                          <span
                            style="padding: 0 5px;text-align: left;border: 1px solid #ddd;display: inline-block;width: 50% !important;border-radius: 3px;">{{item.jcld ? (item.ggsz === -1 ? "读取失败" : item.ggsz):"一"}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="遥感数据" name="tabRemote">
                <div class="weather">
                  <div class="bana-information">
                    <div class="bana-title">{{fogArea.wqmc}}</div>
                    <div class="bana-information-content">
                      <ul class="inf">
                        <li>
                          <span>地面温度：</span><input type="text" readonly v-model="fogArea.dmwd" />
                          <span class="unit">℃</span>
                        </li>
                        <li>
                          <span>水膜厚度：</span><input type="text" readonly v-model="fogArea.bhd" />
                          <span class="unit">mm</span>
                        </li>
                        <li>
                          <span>地表冰度：</span><input type="text" readonly v-model="fogArea.smhd" />
                          <span class="unit">mm</span>
                        </li>
                      </ul>
                      <ul class="inf">
                        <li>
                          <span>地表积雪：</span><input type="text" readonly v-model="fogArea.xhd" />
                          <span class="unit">mm</span>
                        </li>
                        <li>
                          <span>湿滑系数：</span><input type="text" readonly v-model="fogArea.shxs" />
                        </li>
                        <li>
                          <span>路面状态：</span><input type="text" readonly v-model="fogArea.lmzt" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('message.ControllerChange')" name="tabRelay">
                <div class="bana-information" style="width: 50%;">
                  <div class="bana-title">{{ $t('message.WorkState') }}</div>
                  <div class="bana-information-content" style="display: flex;">
                    <ul class="controllerChange">
                      <li>
                        <span>{{ $t('message.WorkState')+'：' }}</span><input type="text" readonly
                          v-model="fogArea.jdqgzmssm">
                      </li>
                    </ul>
                    <div class="controllerTable">
                      <span>{{ $t('message.ControllerList')+'：' }}</span>
                      <span>
                        <el-table :data="controllArray" border :show-header=false height="80px" style="width: 143px">
                          <el-table-column prop="kzqmc" align="left" :label="$t('message.ControllerName')+'：'">
                          </el-table-column>
                        </el-table>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="bana-information" style="width: 48%;margin-left: 2%;">
                  <div class="bana-title">{{ $t('message.DeviceControl') }}</div>
                  <div class="bana-information-content mt20">
                    <el-button type="primary" icon="el-icon-circle-check-outline" :disabled="disMain"
                      @click="mainController">{{$t('message.mainController')}}</el-button>
                    <el-button type="primary" icon="el-icon-circle-check-outline" :disabled="disStandby"
                      @click="standbyController">{{$t('message.standbyController')}}</el-button>
                    <el-button type="danger" icon="el-icon-circle-close-outline" :disabled="disOff" @click="allBreak">
                      {{$t('message.allBreak')}}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <!--郑州项目没用先注释-->
              <!--<el-tab-pane label="能见度检测仪控制" name="tabVisibility">
                <div class="third">
                  <div class="bana-information">
                    <div class="bana-title">{{ $t("message.BasicMessage") }}</div>
                    <div class="bana-information-content">
                      <div>
                        <span class="unit">工作模式：</span>
                        <el-radio-group v-model="jcykz">
                          <el-radio label="15Sec">{{ $t("message.FifteenSecondAutomaticUploadData") }}</el-radio>
                          <el-radio label="1Min">{{ $t("message.OneMinuteAutomaticUploadData") }}</el-radio>
                          <el-radio label="Auto">{{ $t("message.PassiveMode") }}</el-radio>
                        </el-radio-group>
                      </div>
                      <div class="visibility">
                        <el-form :model="visibilityForm" :rules="visibilityRules" ref="visibilityForm" size="mini">

                          <span class="text">{{ $t("message.AlarmThreshold") }}：{{ $t("message.LowerLimit") }}</span>
                          <el-form-item label="" prop="bjfzx" class="first-input">
                            <el-input v-model="visibilityForm.bjfzxx"></el-input>
                          </el-form-item>
                          <span class="text">m ~ {{ $t("message.UpperLimit") }}</span>
                          <el-form-item label="" prop="bjfzsx" class="first-input">
                            <el-input v-model="visibilityForm.bjfzsx"></el-input>
                          </el-form-item>
                          <span class="text">m</span>
                        </el-form>
                      </div>
                      <el-button type="primary" icon="el-icon-refresh" @click="setVisibilityConfig">{{ $t("message.Issue") }}</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>-->
              <el-tab-pane label="限速屏控制" name="tabScreen">
                <div class="fourth tabScreen">
                  <div class="xspBox">
                    <div class="xspimg">
                      <div>{{fogArea.xszsm}}</div>
                    </div>
                    <div class="bana-information" style="width: 93%;flex-grow: 1;">
                      <div class="bana-title">{{ $t("message.DeviceMonitor") }}</div>
                      <div class="bana-information-content">
                        <div class="fl mt20">
                          <div class="screen">开关屏：</div>
                          <el-select v-model="xsz" placeholder="请选择" size="mini" class="device">
                            <el-option v-for="item in xszCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                            </el-option>
                          </el-select>
                        </div>
                        <div class="fl ml50 mt20">
                          <div class="workModel">工作模式：</div>
                          <el-input readonly v-model="fogArea.xspgzmssm" size="mini" />
                        </div>
                        <div class="fl ml50 mt20">
                          <el-button type="primary" icon="el-icon-refresh" @click="setLeds(2)">{{ $t("message.Issue") }}
                          </el-button>
                          <el-button type="primary" :disabled="disLedAuto" icon="el-icon-rank" @click="setLeds(1)">自动
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="号角控制" name="tabHorn">
                <div class="fifth tabHorn">
                  <div class="bana-information">
                    <div class="bana-title">{{ $t("message.DeviceMonitor") }}</div>
                    <div class="fl mt20">
                      <div class="hornMusic">号角音乐：</div>
                      <el-select v-model="hjyy" placeholder="请选择" size="mini" class="device">
                        <el-option v-for="item in hjCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="fl ml50 mt20">
                      <div class="hornSound">号角音量：</div>
                      <el-select v-model="hjyl" placeholder="请选择" size="mini" class="device">
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
                    </div>
                    <div class="fl ml50 mt20">
                      <div class="workModel">工作模式：</div>
                      <el-input readonly v-model="fogArea.hjgzmssm" size="mini" />
                    </div>
                    <div class="fl ml50 mt20">
                      <el-button type="primary" class="fl" icon="el-icon-refresh" @click="setHorns(2)">
                        {{ $t("message.Issue") }}</el-button>
                      <el-button type="primary" class="fl" icon="el-icon-rank" :disabled="disHornAuto"
                        @click="setHorns(1)">自动</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="警灯控制" name="tabLight">
                <div class="sixth tabLight">
                  <div class="jdBox">
                    <div class="jdimg">
                      <div>
                        <img :src="jsdUrl" />
                      </div>
                    </div>
                    <div class="bana-information" style="width: 93%;flex-grow: 1;">
                      <div class="bana-title">{{ $t("message.DeviceMonitor") }}</div>

                      <div class="fl mt20">
                        <div class="pliLamp">是否开启警示灯：</div>
                        <el-select v-model="jsdkg" placeholder="请选择" size="mini" class="device">
                          <el-option v-for="item in jdCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="fl ml50 mt20">
                        <div class="workModel">工作模式：</div>
                        <el-input readonly v-model="fogArea.jsdgzmssm" size="mini" />
                      </div>
                      <div class="fl ml50 mt20">
                        <el-button type="primary" icon="el-icon-refresh" @click="setLights(2)">{{ $t("message.Issue") }}
                        </el-button>
                        <el-button type="primary" icon="el-icon-rank" @click="setLights(1)" :disabled="disLightAuto">自动
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="相机控制" name="tabCamera">
                <div class="bana-information tabCamera">
                  <div class="bana-title">{{ $t("message.DeviceMonitor") }}</div>
                  <div class="fl mt10">
                    <div class="car">小车限速值：</div>
                    <div class="limit">下限：</div>
                    <el-input v-model="xcxszxx" size="mini" />
                    <div class="limit">上限：</div>
                    <el-input v-model="xcxszsx" size="mini" />
                  </div>
                  <div class="fl ml20 mt10">
                    <el-checkbox v-model="bigCarIsUse" @change="changeIsUse">大车限速是否可用</el-checkbox>
                  </div>
                  <div class="fl ml50 mt10">
                    <div class="car">大车限速值：</div>
                    <div class="limit">下限：</div>
                    <el-input v-model="dcxszxx" :disabled="bigCarDis" size="mini" />
                    <div class="limit">上限：</div>
                    <el-input v-model="dcxszsx" :disabled="bigCarDis" size="mini" />
                  </div>
                  <div class="fl ml50 mt10">
                    <div class="workModel">工作模式：</div>
                    <el-input readonly v-model="fogArea.xjgzmssm" size="mini" :title="fogArea.xjgzmssm" />
                  </div>
                  <div class="fl mt10 ml50">
                    <el-button type="primary" class="fl" icon="el-icon-refresh" @click="setCameras(2)">
                      {{ $t("message.Issue") }}</el-button>
                    <el-button type="primary" class="fl" icon="el-icon-rank" :disabled="disCameraAuto"
                      @click="setCameras(1)">自动</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="模拟能见度数据" name="tabVisibility">
                <div class="bana-information tabVisibility" style="width: 100%;flex-grow: 1;">
                  <div class="bana-title">设备监控</div>

                  <div class="fl mt20">
                    <div class="visibilityLabel">能见度(m)：</div>
                    <el-input size="mini" v-model="testNjd" />
                  </div>

                  <div class="fl ml50 mt20">
                    <el-button type="primary" @click="setVisibilityDialog" icon="el-icon-refresh">
                      {{ $t("message.Issue") }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="摩擦指数联动控数" v-if="disRubNumberTab" name="tabRub">
                <div class="bana-information" style="width: 100%;flex-grow: 1;">
                  <div class="bana-title">设备监控</div>
                  <div class="fl mt20">
                    <span>是否联动：</span>
                    <el-checkbox v-model="rubChecked"></el-checkbox>
                  </div>
                </div>
              </el-tab-pane> -->
            </el-tabs>
          </div>
          <div class="tabBoxBar" @click="showtab"><img src="./img/top.png" alt="" v-if="!showtabbar"><img
              src="./img/bottom.png" alt="" v-else></div>
        </div>
      </section>
      <!-- 按钮弹窗 -->
      <el-dialog :title="$t('message.FogAreaController')" :visible.sync="setdialog" :close-on-click-modal='false'
        width="1100px">
        <template>
          <el-row>
            <el-col :span="24">
              <div class="wdCons">
                <div class="bana-informations" v-loading="loading"
                  :element-loading-text="$t('message.Synchronization')">
                  <div class="bana-titles">{{ $t('message.DeviceParameter') }}</div>
                  <div class="bana-information-contents">
                    <div class="wukzqBox">
                      <el-table :data="controllers" border tooltip-effect="dark" highlight-current-row>
                        <el-table-column align="center" prop="kzqmc" :label="$t('message.ControllerName')"
                          min-width="90" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="kzqbsm" align="center" :label="$t('message.ControllerNum')"
                          min-width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="wdkzsm" :label="$t('message.FoglightControl')"
                          min-width="90" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column align="center" prop="wdld" :label="$t('message.FoglightLuminance')"
                          min-width="70">
                        </el-table-column>
                        <el-table-column align="center" prop="ldsc" :label="$t('message.LightsONDuration')+'(ms)'"
                          min-width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="mdsc" :label="$t('message.LightsOFFDuration')+'(ms)'"
                          min-width="100">
                        </el-table-column>
                        <el-table-column align="center" prop="hdys" :label="$t('message.RedTimeLengthening')+'(s)'"
                          min-width="90">
                        </el-table-column>
                        <el-table-column align="center" prop="mqys" :label="$t('message.DeadZoneDuration')+'(s)'"
                          min-width="90">
                        </el-table-column>
                        <el-table-column align="center" prop="hsjsdzsl" :label="$t('message.RedLightsNumber')"
                          min-width="118">
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
        <span slot="footer" class="dialog-footer mt10">
          <el-button @click="setdialog = false" size="mini">{{$t('message.OFF')}}</el-button>
        </span>
      </el-dialog>
      <!--下发控制显示界面  -->
      <el-dialog :title="controllDialogTitle" class="fogAreaMonitor" :visible.sync="controllDialog" width="1000px"
        :close-on-click-modal='false'>
        <div class="fogAreaBox" v-if="controllDialogTop">
          <div class="fogArea_lamp_con parameter" style="height: 80px;">
            <div class="bana-information" style="height: 80px;">
              <div class="bana-title">当前策略</div>
              <div class="bana-information-content ">
                <el-radio-group :disabled="lampControlDisabled" v-model="kzcl" @change="shortcut">
                  <el-radio v-for="item in StrategiesDatas" :key="item.clbm" :label="item.clbm">{{item.clmc }}
                  </el-radio>
                </el-radio-group>
                <div class="mt10" style="display: flex;">
                  <span>策略描述：</span>
                  <input v-model="clms" type="textarea" readonly style="color: #666;flex-grow: 1;" />
                </div>
              </div>
            </div>
          </div>
          <div class="fogArea_lamp_inf mt20 lampInput">
            <div class="bana-information" style="height: auto !important;margin-bottom: 20px;"
              v-if="lampZt.wdkzxszt||lampZt.wdlddjxszt||lampZt.wdldxszt||lampZt.ssplxszt||lampZt.zkbxszt||lampZt.ldscxszt||lampZt.mdscxszt||lampZt.hdysxszt||lampZt.mqysxszt||lampZt.hsjsdzslxszt">
              <div class="bana-title">{{ $t('message.ParamAdjustment') }}</div>
              <div class="bana-information-content">
                <el-form :disabled="lampConfigDisabled" :model="lampDialog" :rules="lampRules" ref="lampForm"
                  size="mini" label-width="120px">
                  <ul class="lamp">
                    <li>
                      <el-form-item :label="$t('message.LightGread')+'：'" prop="wdlddj" v-if="lampZt.wdlddjxszt">
                        <el-select v-model="lampDialog.wdlddj" :placeholder="$t('message.PleaseSelect')"
                          v-if="lamp.sspl != 1">
                          <el-option v-for="item in lddjCodes" :key="item.dm" :label="item.dm" :value="item.dm">
                          </el-option>
                        </el-select>
                        <el-select v-model="lampDialog.wdlddj" :placeholder="$t('message.PleaseSelect')" v-else>
                          <el-option v-for="item in lddjCodes1" :key="item.dm" :label="item.dm" :value="item.dm">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="$t('message.FoglightLuminance')+'：'" prop="wdld" v-if="lampZt.wdldxszt">
                        <el-input v-model.number="lampDialog.wdld" type="number" min="1" max="99" step="1"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="$t('message.FlickerFrequency')+'：'" v-if="lampZt.ssplxszt">
                        <el-select v-model="lampDialog.sspl" :placeholder="$t('message.PleaseSelect')">
                          <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                            {{item.dmsm}}</el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="占空比：" v-if="lampZt.zkbxszt">
                        <el-select v-model="lampDialog.zkb" :placeholder="$t('message.PleaseSelect')">
                          <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="$t('message.LightsONDuration')+'：'" prop="ldsc" v-if="lampZt.ldscxszt">
                        <el-input v-model.number="lampDialog.ldsc" type="number" min="1" max="99999" step="1"></el-input>
                        <span class="unit">ms</span>
                      </el-form-item>
                    </li>

                    <li>
                      <el-form-item :label="$t('message.LightsOFFDuration')+'：'" prop="mdsc" v-if="lampZt.mdscxszt">
                        <el-input v-model.number="lampDialog.mdsc" type="number" min="1" max="99999" step="1"></el-input>
                        <span class="unit">ms</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="$t('message.RedTimeLengthening')+'：'" prop="hdys" v-if="lampZt.hdysxszt">
                        <el-input v-model.number="lampDialog.hdys" type="number" min="1" max="99999" step="1"></el-input>
                        <span class="unit">s</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="$t('message.DeadZoneDuration')+'：'" prop="mqys" v-if="lampZt.mqysxszt">
                        <el-input v-model.number="lampDialog.mqys" type="number" min="1" max="99999" step="1"></el-input>
                        <span class="unit">s</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="$t('message.RedLightsNumber')+'：'" prop="hsjsdzsl"
                        v-if="lampZt.hsjsdzslxszt">
                        <el-input v-model.number="lampDialog.hsjsdzsl" type="number" min="0" max="50" step="1"></el-input>
                        <span class="unit">{{ $t('message.Ge') }}</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="雾灯状态：" v-if="kzcl == 6">
                        <el-select v-model="lampDialog.wdkz" :placeholder="$t('message.PleaseSelect')">
                          <el-option v-for="item in ControllerWorkModeCustom" :key="item.dm" :label="item.dmsm"
                            :value="item.dm"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                  </ul>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="controllDialogTop">
          <!-- 确定下发（雾灯） -->
          <div style="margin-left: 600px;">
            <span class="el-form-item__label" style="line-height: 24px;">干预时长:</span>
            <el-input v-model.number="cxsj" size="mini" type="number" min="0" max="99999" step="1"></el-input>
            <span class="el-form-item__label" style="line-height: 24px;">分钟</span>
          </div>
          <el-button type="primary" @click="setControllersConfig" size="mini" style="padding: 7px 15px;">
            {{$t('message.Sure')}}</el-button>
          <el-button @click="close" size="mini" style="padding: 7px 15px;">{{$t('message.OFF')}}</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="controllDialogSureTitle" class="fogAreaMonitor" :visible.sync="controllDialogSure"
        width="1000px" :close-on-click-modal='false' :show-close="false">
        <el-table :data="controllArray" style="width: 100%;" border v-loading="controllLoading" :fit="true"
          :row-style="tableRowStyle">
          <el-table-column prop="kzqbsm" align="center" :label="$t('message.ControllerNum')">
          </el-table-column>
          <el-table-column prop="kzqmc" align="center" :label="$t('message.ControllerName')">
          </el-table-column>
          <el-table-column align="center" :label="$t('message.IssueState')">
            <template slot-scope="scope">
              <span v-if="scope.row.sendResult=== sendResult.WaitIssue">等待下发</span>
              <span v-else-if="scope.row.sendResult=== sendResult.Success">操作成功</span>
              <span v-else-if="scope.row.sendResult=== sendResult.SendFailed">操作失败</span>
              <span v-else-if="scope.row.sendResult=== sendResult.Timeout">与设备通信超时</span>
              <span v-else-if="scope.row.sendResult=== sendResult.Disconnection">与设备通信连接断开</span>
              <span v-else-if="scope.row.sendResult=== sendResult.NotFoundSocket">未找到该设备</span>
              <span v-else-if="scope.row.sendResult=== sendResult.Controller">现场正在使用屏幕或遥控器操作控制雾灯</span>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer" v-if="controllDialogSureTop">
          <el-button @click="controllDialogSure = false" size="mini" style="padding: 7px 15px;">{{$t('message.OFF')}}
          </el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-else>
          <!-- 确定下发（能见度检测仪） -->
          <el-button type="primary" @click="setVisibility" size="mini" style="padding: 7px 15px;">{{$t('message.Sure')}}
          </el-button>
          <el-button @click="controllDialogSure = false" size="mini" style="padding: 7px 15px;">{{$t('message.OFF')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import FogArea from "./js/FogArea.js";
  import Login from "./js/Login.js";
  import Controller from "./js/Controller.js";
  import ControlStrategy from './js/ControlStrategy.js'
  import Map from '@/components/Map'
  import Head from '@/components/Head'
  import sloveMap from './js/sloveMap.js'
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";

  export default {
    name: 'FogAreaMonitor',
    components: {
      Map,
      Head
    },
    data() {
      return {
        clms: "", //控制策略描述
        StrategiesDatas: [], //当前策略数据
        bigCarIsUse: false, //大车限速是否可用
        bigCarDis: true,
        markerPointFlag: false,
        actives: '1',
        controllerWorkModeCodes: [], //雾灯工作模式字典数组
        controllerWorkModeMap: {}, //雾灯工作模式字典map
        controllDialog: false, //下发控制器显示状态
        controllDialogTop: true,
        controllDialogTitle: '',
        controllDialogSure: false,
        controllDialogSureTop: true,
        controllDialogSureTitle: '',
        controllArray: [], //控制器集合
        title: "", //下发控制器标题
        controllLoading: false, //加载状态
        loading: false,

        //继电器按钮状态
        disMain: false,
        disStandby: false,
        disOff: false,
        //   rubChecked: false,//是否联动
        disController: 'none', //控制器查询下发按钮显示状态
        //   disRubNumber: 'block',//摩擦指数控制tab显示状态
        //   disRubNumberTab: false,//摩擦指数控制tab显示状态的按钮
        automationDis: false, //自动控制按钮状态
        controllers: [], //雾区下控制器
        setdialog: false, //雾区控制器弹窗
        inputurl: require("./img/full.jpg"),
        fullflag: false, //全屏状态数据
        sideflag: true, //左侧状态数据
        showtabbar: true, //底部状态数据

        labelFlag: false,
        visibilityWs: null, //webscoket对象
        programWs: null, //webscoket对象
        activeTabName: 'tabFogArea', //当前高亮的tab名称
        //地图对象
        mapobj: null,
        forflage: true, //截流
        loadflag: false, //地图加载成功状态
        //包含坐标信息的各设备数据
        vis: [], //能见度检测仪
        speed: [], //限速屏
        horn: [], //号角
        foglamp: [], //雾灯
        alarmlamp: [], //警灯
        controll: [], //控制器
        meteorological: [], //气象仪
        pointserach: [], //图层中搜索到的总数据点
        gisLayername: { //gis存储图层名
          fogArea: "base_fvs_fogarea", //雾区图层
        },
        //当前选中的雾区编码
        activeWqbm: "",
        //雾区集合
        fogAreas: [],
        fogArea: {
          wqmc: "",
          jdqgzmssm: ""
        },
        ControllerWorkModeCustom: [], //自定义下的雾灯工作模式
        wdkz: Dictionary.ControllerWorkMode.FlashRed,
        lampControlDisabled: false, //雾灯控制，设备监控是否可编辑
        lampConfigDisabled: false, //雾灯控制，参数调整是否可编辑
        lamp: {}, //雾灯参数
        lampZt: {}, //弹窗里的雾灯状态
        lampDialog: {}, //弹窗里根据控制策略配置的雾灯参数
        lampImg: "", //雾灯gif

        kzcl: "", //当前策略

        lddjCodes: [], //亮度等级集合  1-10
        lddjCodes1: [], //1-5
        ssplCodes: [],
        zkbCodes: [],

        playMusicText: "暂停",
        playMusicFlag: 1,
        playMusicUrl: require("./img/pause_hover.png"),

        //雾灯参数校验
        lampRules: {
          wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
          ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
          mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
          hdys: this.filterRules('红灯延时', true, null, null, 'time'),
          mqys: this.filterRules('盲区延时', true, null, null, 'time'),
          hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'alarm')
        },

        cxsj: "90", //干预时长
        sfds: false, //是否定时
        djs: "", //倒计时

        timer: null, //倒计时定时器

        xszCodes: [], //限速屏开关字典
        hjCodes: [], //号角字典
        jdCodes: [], //警灯字典
        lampXszt: [], //雾灯参数显示状态

        jsdkg: 0, //警灯
        hjyy: 0, //号角音乐
        hjyl: 0, //号角音量
        xsz: 0, //限速屏开关状态
        xcxszxx: 0,
        xcxszsx: 0,
        dcxszxx: 0,
        dcxszsx: 0,
        xspgzmssm: "",
        hjgzmssm: "",
        jsdgzmssm: "",
        xjgzmssm: "",
        jsdUrl: "", //警示灯地址
        fogAreaWorkModeMap: {},
        relayControlModeMap: {},
        linkedSwitchMap: {},
        sendResult: Dictionary.SendResult,
        disLedAuto: false,
        disLightAuto: false,
        disHornAuto: false,
        disCameraAuto: false,
        gzms: 0,
        isFlag: true, //取消干预按钮是否可用
        testNjd: 0,

        closeLamp: [], //如果关闭弹窗时，未保存，则恢复之前状态
        controllersConfigGzms: 2, //手动模式传的工作模式
      };
    },
    created() {

    },
    mounted: function () {
      //通过vuex，获取地图对象
      this.mapobj = this.$store.state.mapobj;
      this.lampImg = require('./img/lamp_red.gif');
      this.init();
      this.loadStrategies();
    },
    methods: {
      loadStrategies() {
        var data = {}
        //查询数据
        ControlStrategy.getStrategies(data).then(value => {

          this.StrategiesDatas = value;

        });
      },
      setVisibilityDialog() {
        if (this.activeWqbm == "") {
          this.$alert('请先选择雾区', '设备控制', {
            confirmButtonText: '确定'
          });
          return;
        }
        this.controllArray = [];
        this.controllDialogSure = true;
        this.controllDialogSureTop = false;
        this.controllDialogSureTitle = "能见度检测仪控制";
        var data = {
          wqbm: this.activeWqbm,
        };
        Controller.getControllers(data).then(value => { //控制器查询
          for (var i = 0; i < value.length; ++i) {
            value[i].sendResult = 6;
          }
          this.controllArray = value;
        });

      },
      setVisibility() {
        var data = {
          wqbm: this.fogArea.wqbm,
          njd: this.testNjd
        };
        this.controllLoading = true;
        FogArea.setVisibility(data).then(value => {
          for (var i = 0; i < value.length; ++i) {
            for (var j = 0; j < this.controllArray.length; ++j) {
              if (value[i].key == this.controllArray[j].kzqbsm) {
                this.controllArray[j].sendResult = value[i].czjg;
                break;
              }
            }
          }
          this.controllLoading = false;
        })

      },
      //初始化方法
      init() {
        Code.getCodes({
          dmlb: Dictionary.CodeType.ControllerWorkMode
        }).then(value => {

          for (i = 0; i < value.datas.length; i++) {
            if (value.datas[i].dm == 1 ||
              value.datas[i].dm == 2 ||
              value.datas[i].dm == 3 ||
              value.datas[i].dm == 4 ||
              value.datas[i].dm == 6) {
              this.controllerWorkModeCodes.push(value.datas[i])
            }
          }

        });
        //ControllerWorkModeCustom
        Code.getCodes({
          dmlb: Dictionary.CodeType.ControllerWorkMode
        }).then(value => {

          for (i = 0; i < value.datas.length; i++) {
            if (value.datas[i].dm == 1 ||
              value.datas[i].dm == 2 ||
              value.datas[i].dm == 3 ||
              value.datas[i].dm == 4) {
              this.ControllerWorkModeCustom.push(value.datas[i])
            }
          }

        });
        Code.getCodeMap({
            dmlb: Dictionary.CodeType.ControllerWorkMode
          },
          this.$cookies.get('token')).then(value => {
          this.controllerWorkModeMap = value;
        });

        Code.getCodeMap({
          dmlb: Dictionary.CodeType.RelayControlMode,
        }).then(value => {

          this.relayControlModeMap = value;

        });

        Code.getCodeMap({
          dmlb: Dictionary.CodeType.LinkedSwitch,
        }).then(value => {

          this.linkedSwitchMap = value;

        });

        Code.getCodeMap({
          dmlb: Dictionary.CodeType.FogAreaWorkMode,
        }).then(value => {

          this.fogAreaWorkModeMap = value;
          this.initWebSocket();
          this.loadFogAreas();
          this.mapLevelchange();

        });

        Code.getCodes({
          dmlb: Dictionary.CodeType.screen,
        }).then(value => {
          this.xszCodes = value.datas;
        });

        Code.getCodes({
          dmlb: Dictionary.CodeType.hornCodes,
        }).then(value => {
          this.hjCodes = value.datas;
        });

        Code.getCodes({
          dmlb: Dictionary.CodeType.LinkedSwitch
        }).then(value => {
          this.jdCodes = value.datas;
        });
        Code.getCodes({
          dmlb: Dictionary.CodeType.LampLevel,
        }).then(value => {
          this.lddjCodes = value.datas;

          for (let i = 0; i < value.datas.length; i++) {
            if (value.datas[i].dm <= 5) {
              this.lddjCodes1.push(value.datas[i])
            }
          }
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
      playMusic() {
        if (this.playMusicFlag == 1) {
          this.playMusicText = "播放"
          this.playMusicFlag = 2;
          this.playMusicUrl = require('./img/play_hover.png');
        } else if (this.playMusicFlag == 2) {
          this.playMusicText = "暂停";
          this.playMusicFlag = 1;
          this.playMusicUrl = require('./img/pause_hover.png');
        }
      },
      //大车限速是否可用
      changeIsUse(val) {

        this.bigCarDis = !val;

      },
      //雾灯控制，控制器查询下发
      handleClick(tab, event) {
        if (tab.name == "tabLamp") {
          this.disController = 'block';
          //     this.disRubNumber = 'none';
          //     this.disRubNumberTab = false;
          //   } else if (tab.name == "tabFogArea") {
          //     this.disController = 'none';
          //     this.disRubNumber = 'block';
          //     this.disRubNumberTab = false;
          //   } else if (tab.name == "tabRub") {
          //     this.disRubNumber = 'block';
          //     this.disController = 'none';
          //     this.disRubNumberTab = true;
        } else {
          // this.disRubNumber = 'none';
          this.disController = 'none';
          // this.disRubNumberTab = false;
        }
      },
      //是否显示摩擦指数联动控数
      // showTabRub(){
      // this.activeTabName = this.disRubNumberTab ? 'tabFogArea' : 'tabRub'
      // this.disRubNumberTab = !this.disRubNumberTab
      // if(!this.disRubNumberTab){
      //     this.disRubNumberTab = true;
      //     this.activeTabName = 'tabRub'
      // }else{
      //     this.disRubNumberTab = false;
      //     this.activeTabName = 'tabFogArea'
      // }

      // },
      //快捷参数选择
      shortcut(val) {

        for (let i = 0; i < this.StrategiesDatas.length; i++) {
          if (this.StrategiesDatas[i].clbm == val) {
            this.clms = this.StrategiesDatas[i].clms;
            // console.log(this.StrategiesDatas[i])
            this.lampDialog = {
              wdlddj: this.StrategiesDatas[i].wdlddj,
              wdld: this.StrategiesDatas[i].wdld,
              ldsc: this.StrategiesDatas[i].ldsc,
              mdsc: this.StrategiesDatas[i].mdsc,
              hdys: this.StrategiesDatas[i].hdys,
              mqys: this.StrategiesDatas[i].mqys,
              hsjsdzsl: this.StrategiesDatas[i].hsjsdzsl,
              wdkz: this.StrategiesDatas[i].wdkz,

              sspl: this.StrategiesDatas[i].sspl,
              ssplsn: this.StrategiesDatas[i].ssplsm,
              zkb: this.StrategiesDatas[i].zkb,
              zkbsm: this.StrategiesDatas[i].zkbsm,
              wdlddjxszt: this.lampXszt.wdlddjxszt,
              ssplxszt: this.lampXszt.ssplxszt,
              zkbxszt: this.lampXszt.zkbxszt,
              wdkzxszt: this.lampXszt.wdkzxszt,
              wdldxszt: this.lampXszt.wdldxszt,
              ldscxszt: this.lampXszt.ldscxszt,
              mdscxszt: this.lampXszt.mdscxszt,
              hdysxszt: this.lampXszt.hdysxszt,
              mqysxszt: this.lampXszt.mqysxszt,
              hsjsdzslxszt: this.lampXszt.hsjsdzslxszt,
            }
            // console.log(this.StrategiesDatas[i].wdlddj)
            // console.log(this.lddjCodes)
            // console.log(this.fogArea.wdlddj)
            this.lampZt = {
              wdlddjxszt: this.StrategiesDatas[i].wdlddjxszt,
              ssplxszt: this.StrategiesDatas[i].ssplxszt,
              zkbxszt: this.StrategiesDatas[i].zkbxszt,
              wdkzxszt: this.StrategiesDatas[i].wdkzxszt,
              wdldxszt: this.StrategiesDatas[i].wdldxszt,
              ldscxszt: this.StrategiesDatas[i].ldscxszt,
              mdscxszt: this.StrategiesDatas[i].mdscxszt,
              hdysxszt: this.StrategiesDatas[i].hdysxszt,
              mqysxszt: this.StrategiesDatas[i].mqysxszt,
              hsjsdzslxszt: this.StrategiesDatas[i].hsjsdzslxszt,
            }

          }
        }

      },
      //读取雾区集合
      loadFogAreas() {
        this.fogAreas = [];
        FogArea.queryFogAreas(this.$cookies.get('token')).then(value => {
          this.fogAreas = value;

          for (var i = 0; i < value.length; ++i) {
            this.fogAreas[i].wqbm = this.fogAreas[i].wqbm.toString();
          }

          if (this.fogAreas.length > 0) {
            this.selectFogArea(this.fogAreas[0].wqbm);
          }

          this.mapobj.onViewLoadEvent(this.mapobj, this.fogareasonViewLoadEvent); //地图加载完成事件
          if (!this.loadflag) {
            this.fogareasonViewLoadEvent()
          }

        });
      },
      //得到雾区控制器集合前六个
      getControllers(controllerList) {
        let controllers = []
        if (controllerList && controllerList.length > 6) {
          for (let i = 0; i < controllerList.length; i++) {
            if (i < 6) {
              controllers.push(controllerList[i])
            }
          }
        }else{
            controllers = controllerList
        }
        // console.log(controllers)
        return controllers
      },
      //选择雾区
      selectFogArea(key) {

        this.showtabbar = true;
        this.activeWqbm = key;

        if (this.loadflag) { //确保地图加载成功
          this.search(this.activeWqbm)
        }

        for (var i = 0; i < this.fogAreas.length; ++i) {

          if (this.fogAreas[i].wqbm == key) {
            //基本信息
            this.fogArea = this.fogAreas[i];
            // console.log(this.fogArea)
            // console.log(this.fogArea.controllers)
            this.fogArea.controllers = this.getControllers(this.fogArea.controllers)


            if (this.fogArea.jsdkg == 0) {
              this.jsdUrl = require('./img/alarm_close.png');
            } else if (this.fogArea.jsdkg == 1) {
              this.jsdUrl = require('./img/jd.png');
            }

            this.changBtnDisable(this.fogArea.gzms);

            if (this.fogArea.jdqgzms == Dictionary.RelayControlMode.Main) {
              this.disMain = true;
              this.disStandby = false;
              this.disOff = false;
            } else if (this.fogArea.jdqgzms == Dictionary.RelayControlMode.Bak) {
              this.disMain = false;
              this.disStandby = true;
              this.disOff = false;
            } else if (this.fogArea.jdqgzms == Dictionary.RelayControlMode.Off) {
              this.disMain = false;
              this.disStandby = false;
              this.disOff = true;
            } else if (this.fogArea.jdqgzms == Dictionary.RelayControlMode.Error) { //失联
              this.disMain = true;
              this.disStandby = true;
              this.disOff = true;
            }

            if (this.fogArea.xspgzms == Dictionary.FogAreaWorkMode.Auto) {
              this.disLedAuto = true;
            } else {
              this.disLedAuto = false;
            }
            this.xsz = this.fogArea.xsz;

            if (this.fogArea.xjgzms == Dictionary.FogAreaWorkMode.Auto) {
              this.disCameraAuto = true;
            } else {
              this.disCameraAuto = false;
            }
            this.xcxszxx = this.fogArea.xcxszxx;
            this.xcxszsx = this.fogArea.xcxszsx;
            this.dcxszxx = this.fogArea.dcxszxx;
            this.dcxszsx = this.fogArea.dcxszsx;

            if (this.fogArea.jsdgzms == Dictionary.FogAreaWorkMode.Auto) {
              this.disLightAuto = true;
            } else {
              this.disLightAuto = false;
            }
            this.jsdkg = this.fogArea.jsdkg;

            if (this.fogArea.hjgzms == Dictionary.FogAreaWorkMode.Auto) {
              this.disHornAuto = true;
            } else {
              this.disHornAuto = false;
            }
            this.hjyy = this.fogArea.hjyy;
            this.hjyl = this.fogArea.hjyl;

            this.changeLampImage(this.fogArea.wdkz);

            this.wdkz = this.fogArea.wdkz;

            this.sfds = this.fogArea.sfds;

            this.kssj = this.fogArea.kssj;

            if (this.fogArea.gzms != 2 && this.fogArea.gzms != 5) {
              this.sjd = "-";
            }

            if (this.fogArea.kssj != '-') {
              let StatrTime = new Date().getTime();
              let yearTime = new Date().getFullYear().toString();
              let date = new Date(yearTime + "-" + this.fogArea.kssj); //东八区开始时间
              date = date.getTime(); //东八区时间变成毫秒
              date = date + this.fogArea.cxsj * 60 * 1000; //东八区毫秒 + 持续时间
              let endTime = date;
              let times = (endTime - StatrTime) / 1000;

              this.getTime(times, this.fogArea.gzms);

            }

            // this.kzcl = this.fogArea.kzcl;
            if (this.kzcl == 0) {
              this.lamp = {
                wdlddjxszt: false,
                ssplxszt: false,
                zkbxszt: false,
                wdkzxszt: false,
                wdldxszt: false,
                ldscxszt: false,
                mdscxszt: false,
                hdysxszt: false,
                mqysxszt: false,
                hsjsdzslxszt: false,
              }
            }

            let xszt = [];
            for (let j = 0; j < this.StrategiesDatas.length; j++) {
              if (this.StrategiesDatas[j].clbm == this.fogArea.kzcl) {
                xszt = this.StrategiesDatas[j];
              }
            }

            this.lamp = {
              wdlddj: xszt.wdlddj,
              wdld: xszt.wdld,
              ldsc: xszt.ldsc,
              mdsc: xszt.mdsc,
              hdys: xszt.hdys,
              mqys: xszt.mqys,
              hsjsdzsl: xszt.hsjsdzsl,
              sspl: xszt.sspl,
              ssplsm: xszt.ssplsm,
              zkb: xszt.zkb,
              zkbsm: xszt.zkbsm,

              wdlddjxszt: xszt.wdlddjxszt,
              ssplxszt: xszt.ssplxszt,
              zkbxszt: xszt.zkbxszt,
              wdkzxszt: xszt.wdkzxszt,
              wdldxszt: xszt.wdldxszt,
              ldscxszt: xszt.ldscxszt,
              mdscxszt: xszt.mdscxszt,
              hdysxszt: xszt.hdysxszt,
              mqysxszt: xszt.mqysxszt,
              hsjsdzslxszt: xszt.hsjsdzslxszt,
            };

            this.loadController(this.fogArea.wqbm);
            break;
          }
        }

      },
      countDown(times, gzms) {
        let that = this;
        if (gzms == 2 || gzms == 5) {
          that.timer = setInterval(function () {
            let day = 0,
              hour = 0,
              minute = 0,
              second = 0;

            if (times > 0) {
              day = Math.floor(times / (60 * 60 * 24));
              hour = Math.floor(times / (60 * 60)) - (day * 24);
              minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
              second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
              if (day <= 9) day = '0' + day;
              if (hour <= 9) hour = '0' + hour;
              if (minute <= 9) minute = '0' + minute;
              if (second <= 9) second = '0' + second;
              that.djs = hour + ":" + minute + ":" + second;
              times--;
            } else if (times <= 0) {
              that.djs = "正在切换";
              clearInterval(that.timer);
            }

          }, 1000);
        } else {
          that.djs = "-";
        }

      },
      getTime(times, gzms) {
        clearInterval(this.timer);
        this.countDown(times, gzms);
      },
      initWebSocket() { //初始化weosocket

        var that = this;

        this.fogAreaWs = new WebSocket('ws://' + window.config.BaseHttpUrl + '/bana_fvs/websocket' + '/fogArea');

        this.fogAreaWs.onmessage = function (evt) { //收到服务器信息的回调函数
          var fogArea = JSON.parse(evt.data);
          //当前雾区需要改变的页面布局
          if (that.fogArea.wqbm == fogArea.wqbm) {
            that.changeLampImage(fogArea.wdkz);
            that.changBtnDisable(fogArea.gzms);

            // console.log(fogArea)

            if (fogArea.gzms != 2 && fogArea.gzms != 5) {
              this.djs = "-";
            }

            that.sfds = fogArea.sfds;
            that.fogArea.kssj = fogArea.kssj;
            that.fogArea.cxsj = fogArea.cxsj;
            

            if (fogArea.kssj != "-") {
              let yearTime = new Date().getFullYear().toString();
              let date = new Date(yearTime + "-" + fogArea.kssj); //东八区开始时间
              date = date.getTime(); //东八区时间变成毫秒
              date = date + fogArea.cxsj * 60 * 1000; //东八区毫秒 + 持续时间
              let endTime = date;
              let StatrTime = new Date().getTime();
              let times = (endTime - StatrTime) / 1000;
              that.getTime(times, fogArea.gzms);
            }
            that.fogArea.ggsz = fogArea.ggsz;
            that.fogArea.kdfz = fogArea.kdfz;
            that.fogArea.gdfz = fogArea.gdfz;
            // that.fogArea.controllers = fogArea.controllers;
            that.fogArea.controllers = that.getControllers(fogArea.controllers)
            // console.log(that.getControllers(fogArea.controllers))


            that.fogArea.gzms = fogArea.gzms;
            that.fogArea.gzmssm = fogArea.gzmssm;

            that.fogArea.njddj = fogArea.njddj;
            that.fogArea.njdsx = fogArea.njdsx;
            that.fogArea.njdxx = fogArea.njdxx;
            that.fogArea.njd = fogArea.njd;
            that.fogArea.njddjsm = fogArea.njddjsm;
            that.fogArea.lmzt = fogArea.lmzt;
            that.fogArea.njdyfz = fogArea.njdyfz;


            that.fogArea.wdkzsm = fogArea.wdkzsm;
            that.fogArea.kzclsm = fogArea.kzclsm;

            // that.fogArea.kzclsm = fogArea.kzclsm;
            that.fogArea.wdld = fogArea.wdld;
            that.fogArea.wdlddj = fogArea.wdlddj;
            that.fogArea.ldsc = fogArea.ldsc;
            that.fogArea.mdsc = fogArea.mdsc;
            that.fogArea.hdys = fogArea.hdys;
            that.fogArea.mqys = fogArea.mqys;
            that.fogArea.hsjsdzsl = fogArea.hsjsdzsl;
            that.fogArea.sspl = fogArea.sspl;
            that.fogArea.ssplsm = fogArea.ssplsm;
            that.fogArea.zkb = fogArea.zkb;
            that.fogArea.zkbsm = fogArea.zkbsm;


            that.fogArea.fx = fogArea.fx;
            that.fogArea.fs = fogArea.fs;
            that.fogArea.wd = fogArea.wd;
            that.fogArea.sd = fogArea.sd;
            that.fogArea.qy = fogArea.qy;
            that.fogArea.yl = fogArea.yl;
            that.fogArea.dmwd = fogArea.dmwd;
            that.fogArea.smhd = fogArea.smhd;
            that.fogArea.bhd = fogArea.bhd;
            that.fogArea.xhd = fogArea.xhd;
            that.fogArea.shxs = fogArea.shxs;
            that.fogArea.lmzt = fogArea.lmzt;


            let xszt = [];

            for (let j = 0; j < that.StrategiesDatas.length; j++) {
              if (that.StrategiesDatas[j].clbm == fogArea.kzcl) {
                xszt = that.StrategiesDatas[j];
                that.lamp = {
                  wdlddjxszt: xszt.wdlddjxszt,
                  ssplxszt: xszt.ssplxszt,
                  zkbxszt: xszt.zkbxszt,
                  wdkzxszt: xszt.wdkzxszt,
                  wdldxszt: xszt.wdldxszt,
                  ldscxszt: xszt.ldscxszt,
                  mdscxszt: xszt.mdscxszt,
                  hdysxszt: xszt.hdysxszt,
                  mqysxszt: xszt.mqysxszt,
                  hsjsdzslxszt: xszt.hsjsdzslxszt,
                }
                return;
              } else {
                that.lamp = {
                  wdlddjxszt: false,
                  ssplxszt: false,
                  zkbxszt: false,
                  wdkzxszt: false,
                  wdldxszt: false,
                  ldscxszt: false,
                  mdscxszt: false,
                  hdysxszt: false,
                  mqysxszt: false,
                  hsjsdzslxszt: false,
                }

              }

            }

            that.lamp = {
              wdkz: xszt.wdkz,
              wdkzsm: xszt.wdkzsm,
              wdld: xszt.wdld,
              wdlddj: xszt.wdlddj,
              ldsc: xszt.ldsc,
              mdsc: xszt.mdsc,
              hdys: xszt.hdys,
              mqys: xszt.mqys,
              hsjsdzsl: xszt.hsjsdzsl,
              sspl: xszt.sspl,
              ssplsm: xszt.ssplsm,
              zkb: xszt.zkb,
              zkbsm: xszt.zkbsm,
            }

          }
        //   console.log(that.fogArea.controllers)
          for (var i = 0; i < that.fogAreas.length; ++i) {

            if (that.fogAreas[i].wqbm == fogArea.wqbm) {

              //模式
              that.fogAreas[i].gzms = fogArea.gzms;
              that.fogAreas[i].gzmssm = fogArea.gzmssm;

              //方案
              that.fogAreas[i].famc = fogArea.fact ? "方案冲突" : fogArea.famc;
              that.fogAreas[i].kssj = fogArea.kssj;
              that.fogAreas[i].cxsj = fogArea.cxsj;

              //控制参数
              that.fogAreas[i].wdkz = fogArea.wdkz;
              that.fogAreas[i].wdkzsm = fogArea.wdkzsm;
              that.fogAreas[i].wdld = fogArea.wdld;
              that.fogAreas[i].wdlddj = fogArea.wdlddj;
              that.fogAreas[i].ldsc = fogArea.ldsc;
              that.fogAreas[i].mdsc = fogArea.mdsc;
              that.fogAreas[i].hdys = fogArea.hdys;
              that.fogAreas[i].mqys = fogArea.mqys;
              that.fogAreas[i].hsjsdzsl = fogArea.hsjsdzsl;
              that.fogAreas[i].sspl = fogArea.sspl;
              that.fogAreas[i].ssplsm = fogArea.ssplsm;
              that.fogAreas[i].zkb = fogArea.zkb;
              that.fogAreas[i].zkbsm = fogArea.zkbsm;

              //能见度
              that.fogAreas[i].njd = fogArea.njd;
              that.fogAreas[i].njdyfz = fogArea.njdyfz;
              that.fogAreas[i].lmzt = fogArea.lmzt;
              that.fogAreas[i].njddj = fogArea.njddj;
              that.fogAreas[i].njdsx = fogArea.njdsx;
              that.fogAreas[i].njdxx = fogArea.njdxx;
              that.fogAreas[i].njddjms = fogArea.njddjms;

              //天气
              that.fogAreas[i].wqtq = fogArea.wqtq;

              //干预时间
              that.fogAreas[i].kssj = fogArea.kssj;
              that.fogAreas[i].kssj = fogArea.kssj;
              that.fogAreas[i].cxsj = fogArea.cxsj;

              break;
            }
          }
        };
      },
      //关闭手动干预弹窗
      close() {
        this.controllDialog = false;
        this.controllDialogSure = false;
        this.lamp = this.closeLamp;
        for (let i = 0; i < this.StrategiesDatas.length; i++) {
          if (this.StrategiesDatas[i].clbm == this.closeLamp.kzcl) {
            this.fogArea.kzclsm = this.StrategiesDatas[i].clmc;
          }
        }
      },
      //下发控制器弹出框显示
      showSetDialog(gzms) {

        if (gzms == 1) {

          this.$confirm('此操作将取消手动干预, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning'
          }).then(() => {
            var data = {
              wqbm: this.fogArea.wqbm,
              gzms: gzms,
              wdkz: this.wdkz,
              cxsj: this.cxsj,
              sfds: this.sfds,
              wdlddj: this.lamp.wdlddj,
              wdld: this.lamp.wdld,
              ldsc: this.lamp.ldsc,
              mdsc: this.lamp.mdsc,
              hdys: this.lamp.hdys,
              mqys: this.lamp.mqys,
              hsjsdzsl: this.lamp.hsjsdzsl,
              sspl: this.lamp.sspl,
              zkb: this.lamp.zkb,
              kzcl: this.kzcl,
            };

            FogArea.setControllersConfig(data).then(value => {
              for (var i = 0; i < value.length; ++i) {
                for (var j = 0; j < this.controllArray.length; ++j) {
                  if (value[i].key == this.controllArray[j].kzqbsm) {
                    this.controllDialogSure = true;
                    this.controllDialogSureTitle = '手动干预';
                    this.controllArray[j].sendResult = value[i].czjg;
                    this.controllLoading = false;
                    break;
                  }
                }
              }

              this.isFlag = true;
            });
          }).catch(() => {});

        } else if (gzms == 2) {

          if (this.activeWqbm == "") {
            this.$alert('请先选择雾区', '设备控制', {
              confirmButtonText: '确定'
            });
            return;
          }

          for (let i = 0; i < this.StrategiesDatas.length; i++) {
            if (this.StrategiesDatas[i].clbm == this.fogArea.kzcl) {
              this.lampXszt = this.StrategiesDatas[i];
              this.clms = this.StrategiesDatas[i].clms;
            } else if (this.fogArea.kzcl == 7) {
              this.lampXszt = [];
              this.clms = '-';
            }
          }
          this.kzcl = this.fogArea.kzcl;
          this.lampDialog = JSON.parse(JSON.stringify(this.fogArea))
          
          this.lamp = {
            wdkz: this.lampXszt.wdkz,
            wdlddj: this.lampXszt.wdlddj,
            wdld: this.lampXszt.wdld,
            ldsc: this.lampXszt.ldsc,
            mdsc: this.lampXszt.mdsc,
            hdys: this.lampXszt.hdys,
            mqys: this.lampXszt.mqys,
            hsjsdzsl: this.lampXszt.hsjsdzsl,
            sspl: this.lampXszt.sspl,
            zkb: this.lampXszt.zkb,
            kzcl: this.lampXszt.kzcl,
            wdlddjxszt: this.lampXszt.wdlddjxszt,
            ssplxszt: this.lampXszt.ssplxszt,
            zkbxszt: this.lampXszt.zkbxszt,
            wdkzxszt: this.lampXszt.wdkzxszt,
            wdldxszt: this.lampXszt.wdldxszt,
            ldscxszt: this.lampXszt.ldscxszt,
            mdscxszt: this.lampXszt.mdscxszt,
            hdysxszt: this.lampXszt.hdysxszt,
            mqysxszt: this.lampXszt.mqysxszt,
            hsjsdzslxszt: this.lampXszt.hsjsdzslxszt,
          }
          this.lampZt = {
            wdlddjxszt: this.lampXszt.wdlddjxszt,
            ssplxszt: this.lampXszt.ssplxszt,
            zkbxszt: this.lampXszt.zkbxszt,
            wdkzxszt: this.lampXszt.wdkzxszt,
            wdldxszt: this.lampXszt.wdldxszt,
            ldscxszt: this.lampXszt.ldscxszt,
            mdscxszt: this.lampXszt.mdscxszt,
            hdysxszt: this.lampXszt.hdysxszt,
            mqysxszt: this.lampXszt.mqysxszt,
            hsjsdzslxszt: this.lampXszt.hsjsdzslxszt,
          }
          this.closeLamp = this.lamp;
          // console.log(this.lamp)
          // this.changeConfigEnabled(this.wdkz);

          this.controllArray = [];
          this.controllDialog = true;
          this.controllDialogTop = true;
          this.controllDialogTitle = "手动干预";
          var data = {
            wqbm: this.activeWqbm,
          };
          Controller.getControllers(data).then(value => { //控制器查询
            for (var i = 0; i < value.length; ++i) {
              value[i].sendResult = 6;
            }
            this.controllArray = value;
          });
        }

      },
      //是否定时
      updateFogAreaTimer() {
        let data = {
          wqbm: this.fogArea.wqbm,
          sfds: this.sfds,
        }

        FogArea.updateFogAreaTimer(data).then(value => {
          if (value.czjg == 0) {
            this.fogArea.sfds = this.sfds;
          }
        })
      },

      //下发控制器参数
      setControllersConfig() {

        if (this.kzcl == 7) {
          this.$alert("请选择当前策略", '提示', {
            confirmButtonText: '确定',
          });
          return;
        } else if (this.kzcl == 5) {
          this.setControllers();
        } else {
          this.$refs['lampForm'].validate((valid) => {
            if (valid) {
              this.setControllers();
            }
          })
        }

      },
      setControllers() {
        if (this.controllArray.length == 0) {
          this.$alert('雾区中至少需要有一个控制器设备', '设备控制', {
            confirmButtonText: '确定'
          });
          return;
        }
        // if (this.wdkz == 1 || this.wdkz == 2 || this.wdkz == 3) {
        //   if (this.lamp.wdld == 0) {
        //     this.$alert('雾灯亮度不能为0', '设备控制', {
        //       confirmButtonText: '确定'
        //     });
        //     return;
        //   }
        //   if (this.lamp.ldsc == 0) {
        //     this.$alert('亮灯时长不能为0', '设备控制', {
        //       confirmButtonText: '确定'
        //     });
        //     return;
        //   }
        // }
        // if(this.wdkz == 5 || this.wdkz == 7){
        //   this.$alert('请选择雾灯闪烁状态', '设备控制', {
        //     confirmButtonText: '确定'
        //   });
        //   return;
        // }
        ///^[0-9]*[1-9][0-9]*$/
        if (this.cxsj != '') { //
          if (!/^(\-|\+)?\d+(\.\d+)?$/.test(this.cxsj)) {
            this.$alert('手动时长必须为整数', '设备控制', {
              confirmButtonText: '确定'
            });
            return;
          }
        } else {
          this.$alert('请输入干预时长', '设备控制', {
            confirmButtonText: '确定'
          });
          return;
        }
        this.controllLoading = true;

        var data = {
          wqbm: this.fogArea.wqbm,
          gzms: this.controllersConfigGzms,
          wdkz: this.lampDialog.wdkz,
          cxsj: this.cxsj,
          sfds: this.sfds,
          wdlddj: this.lampDialog.wdlddj,
          wdld: this.lampDialog.wdld,
          ldsc: this.lampDialog.ldsc,
          mdsc: this.lampDialog.mdsc,
          hdys: this.lampDialog.hdys,
          mqys: this.lampDialog.mqys,
          hsjsdzsl: this.lampDialog.hsjsdzsl,
          sspl: this.lampDialog.sspl,
          zkb: this.lampDialog.zkb,
          kzcl: this.kzcl,
        };

        // console.log(this.lampDialog)
        // console.log(data)
        FogArea.setControllersConfig(data).then(value => {
          for (var i = 0; i < value.length; ++i) {
            for (var j = 0; j < this.controllArray.length; ++j) {
              if (value[i].key == this.controllArray[j].kzqbsm) {
                this.controllDialog = false;
                this.controllDialogSure = true;
                this.controllDialogSureTitle = '手动干预';
                this.controllArray[j].sendResult = value[i].czjg;
                this.controllLoading = false;
                break;
              }
            }
          }
        });
      },
      //取消干预按钮是否可用
      changBtnDisable(value) {
        if (value == 2 || value == 5) {
          this.isFlag = false;
        } else {
          this.isFlag = true;
        }
      },
      //雾区控制，雾灯gif
      changeLampImage(value) {

        if (value == "1" || value == "3" || value == "5") {
          this.lampImg = require('./img/lamp_red.gif');
        } else if (value == "2") {
          this.lampImg = require('./img/lamp_yellow.gif');
        } else if (value == "4" || value == "7") {
          this.lampImg = require('./img/lamp_close.png');
        }
      },
      //控制器查询
      loadController(wqbm) {
        var data = {
          wqbm: this.activeWqbm,
        };
        Controller.getControllers(data).then(value => {
          this.controllArray = value;
        });
      },
      //切换到主控制器
      mainController() {
        this.$confirm('是否切换到主控制器?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          FogArea.setRelayMain(this.fogArea).then(value => {

            if (value.czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disMain = true;
              this.disStandby = false;
              this.disOff = false;
              this.fogArea.jdqgzms = Dictionary.RelayControlMode.Main;
              this.fogArea.jdqgzmssm = this.relayControlModeMap[Dictionary.RelayControlMode.Main.toString()];
            } else if (value.czjg == Dictionary.SendResult.SendFailed) {
              this.$alert('操作失败', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Timeout) {
              this.$alert('与设备通信超时', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Disconnection) {
              this.$alert('与设备通信连接断开', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.NotFoundSocket) {
              this.$alert('未找到该设备', '设备控制', {
                confirmButtonText: '确定'
              });
            }
          })
        }).catch(() => {});


      },
      //切换到备用控制器
      standbyController() {

        this.$confirm('是否切换到备用控制器?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {
          FogArea.setRelayBak(this.fogArea).then(value => {

            if (value.czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disMain = false;
              this.disStandby = true;
              this.disOff = false;
              this.fogArea.jdqgzms = Dictionary.RelayControlMode.Bak;
              this.fogArea.jdqgzmssm = this.relayControlModeMap[Dictionary.RelayControlMode.Bak.toString()];
            } else if (value.czjg == Dictionary.SendResult.SendFailed) {
              this.$alert('操作失败', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Timeout) {
              this.$alert('与设备通信超时', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Disconnection) {
              this.$alert('与设备通信连接断开', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.NotFoundSocket) {
              this.$alert('未找到该设备', '设备控制', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => {});
      },
      //全部断开
      allBreak() {
        this.$confirm('是否断开雾区下所有控制器', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {
          FogArea.setRelayOff(this.fogArea).then(value => {

            if (value.czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disMain = false;
              this.disStandby = false;
              this.disOff = true;
              this.fogArea.jdqgzms = Dictionary.RelayControlMode.Off;
              this.fogArea.jdqgzmssm = this.relayControlModeMap[Dictionary.RelayControlMode.Off.toString()];
            } else if (value.czjg == Dictionary.SendResult.SendFailed) {
              this.$alert('操作失败', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Timeout) {
              this.$alert('与设备通信超时', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Disconnection) {
              this.$alert('与设备通信连接断开', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.NotFoundSocket) {
              this.$alert('未找到该设备', '设备控制', {
                confirmButtonText: '确定'
              });
            }
          })
        }).catch(() => {});
      },

      changeConfigEnabled(value) {
        this.lampConfigDisabled = value == Dictionary.ControllerWorkMode.Off || value == Dictionary.ControllerWorkMode
          .Auto;
      },

      showSyncDialog() {
        this.controllers = [];
        this.setdialog = true;
        FogArea.queryControllersConfig(this.fogArea).then(value => {
          this.controllers = value;
        });
      },
      syncControllerConfig(index, row) {

        this.$confirm('是否同步控制器参数?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          var data = {
            kzqbsm: row.kzqbsm,
            wdkz: this.fogArea.wdkz,
            wdld: this.fogArea.wdld,
            ldsc: this.fogArea.ldsc,
            mdsc: this.fogArea.mdsc,
            hdys: this.fogArea.hdys,
            mqys: this.fogArea.mqys,
            hsjsdzsl: this.fogArea.hsjsdzsl
          };

          Controller.setControllerConfig(data).then(value => {
            if (value.czjg == Dictionary.SendResult.Success) {

              row.wdkz = this.fogArea.wdkz;
              if (row.wdkz == Dictionary.ControllerWorkMode.FlashRed ||
                row.wdkz == Dictionary.ControllerWorkMode.FlashYellow ||
                row.wdkz == Dictionary.ControllerWorkMode.Detection) {
                row.wdld = this.fogArea.wdld;
                row.ldsc = this.fogArea.ldsc;
                row.mdsc = this.fogArea.mdsc;
                row.hdys = this.fogArea.hdys;
                row.mqys = this.fogArea.mqys;
                row.hsjsdzsl = this.fogArea.hsjsdzsl;
              }

              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.SendFailed) {
              this.$alert('操作失败', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Timeout) {
              this.$alert('与设备通信超时', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Disconnection) {
              this.$alert('与设备通信连接断开', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.NotFoundSocket) {
              this.$alert('未找到该设备', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Controller) {
              this.$alert('现场正在使用屏幕或遥控器操作控制雾灯', '设备控制', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => {});

      },
      setLeds(gzms) {
        var msg = gzms == Dictionary.FogAreaWorkMode.Auto ? "是否恢复自动模式？" : "是否下发限速屏信息？";
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          var data = {
            wqbm: this.fogArea.wqbm,
            xspgzms: gzms,
            xsz: this.xsz
          };
          FogArea.setLeds(data).then(value => {
            if (value.length == 0) {
              this.$alert('未找到任何限速屏', '设备控制', {
                confirmButtonText: '确定'
              });
              return;
            }
            if (value[0].czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disLedAuto = gzms == Dictionary.FogAreaWorkMode.Auto;
              this.fogArea.xsz = this.xsz;
              for (var i = 0; i < this.xszCodes.length; ++i) {
                if (this.xszCodes[i].dm == this.fogArea.xsz) {
                  this.fogArea.xszsm = this.xszCodes[i].dmsm;
                  break;
                }
              }
              this.fogArea.xspgzms = gzms;
              this.fogArea.xspgzmssm = this.fogAreaWorkModeMap[this.fogArea.xspgzms];

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
      setCameras(gzms) {
        var msg = gzms == Dictionary.FogAreaWorkMode.Auto ? "是否恢复自动模式？" : "是否设置抓拍相机限速信息？";
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          var data = {
            wqbm: this.fogArea.wqbm,
            xjgzms: gzms,
            xcxszxx: this.xcxszxx,
            xcxszsx: this.xcxszsx,
            dcxszxx: this.bigCarIsUse ? this.dcxszxx : 0,
            dcxszsx: this.bigCarIsUse ? this.dcxszsx : 0
          };
          FogArea.setCameras(data).then(value => {
            if (value.length == 0) {
              this.$alert('未找到任何抓拍相机', '设备控制', {
                confirmButtonText: '确定'
              });
              return;
            }
            if (value[0].czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disCameraAuto = gzms == Dictionary.FogAreaWorkMode.Auto;
              this.fogArea.xcxszxx = this.xcxszxx;
              this.fogArea.xcxszsx = this.xcxszsx;
              this.fogArea.dcxszxx = this.bigCarIsUse ? this.dcxszxx : 0;
              this.fogArea.dcxszsx = this.bigCarIsUse ? this.dcxszsx : 0;

              this.fogArea.xjgzms = gzms;
              this.fogArea.xjgzmssm = this.fogAreaWorkModeMap[this.fogArea.xjgzms];

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
      setLights(gzms) {
        var msg = gzms == Dictionary.FogAreaWorkMode.Auto ? "是否恢复自动模式？" : "是否操作警示灯？";
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          var data = {
            wqbm: this.fogArea.wqbm,
            jsdgzms: gzms,
            jsdkg: this.jsdkg
          };
          FogArea.setLights(data).then(value => {

            if (value.length == 0) {
              this.$alert('未找到任何警示灯', '设备控制', {
                confirmButtonText: '确定'
              });
              return;
            }
            if (value[0].czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disLightAuto = gzms == Dictionary.FogAreaWorkMode.Auto;
              this.fogArea.jsdkg = this.jsdkg;
              this.fogArea.jsdgzms = gzms;
              this.fogArea.jsdgzmssm = this.fogAreaWorkModeMap[this.fogArea.jsdgzms];

              if (this.fogArea.jsdkg == 0) {
                this.jsdUrl = require('./img/alarm_close.png');
              } else if (this.fogArea.jsdkg == 1) {
                this.jsdUrl = require('./img/jd.png');
              }

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
      setHorns(gzms) {
        var msg = gzms == Dictionary.FogAreaWorkMode.Auto ? "是否恢复自动模式？" : "是否下发号角语音信息？";
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          var data = {
            wqbm: this.fogArea.wqbm,
            hjgzms: gzms,
            hjyy: this.hjyy,
            hjyl: this.hjyl
          };
          FogArea.setHorns(data).then(value => {
            if (value.length == 0) {
              this.$alert('未找到任何号角', '设备控制', {
                confirmButtonText: '确定'
              });
              return;
            }
            if (value[0].czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
              this.disHornAuto = gzms == Dictionary.FogAreaWorkMode.Auto;
              this.fogArea.hjyy = this.hjyy;
              this.fogArea.hjyl = this.hjyl;
              this.fogArea.hjgzms = gzms;
              this.fogArea.hjgzmssm = this.fogAreaWorkModeMap[this.fogArea.hjgzms];

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

      // 查询雾区所属设备
      search(wqbm) {

        for (let i = 0; i < this.fogAreas.length; i++) {
          // 定位至指定雾区
          let layer = sloveMap.getElementLayer(this.fogAreas[i].wqbm, this.mapobj);
          layer.unselectAllElement();
          if (this.fogAreas[i].wqbm == wqbm && this.fogAreas[i].num == 1) {
            let geoArray = [];
            let color = "";
            let geo = DPS.Factory.createGeometry(this.fogAreas[i].shape);
            this.mapobj.zoomToGeometry(geo);
            this.mapobj.flashGeometryByColor([geo], 'RGB(0,0,255)', 5) //闪烁显示
            this.mapobj.zoomByLevel(11)
            let CenterPoint = this.mapobj.getMapCenterPoint()
            this.mapobj.zoomByLevelCenter(11, CenterPoint)
            this.mapobj.refresh();

          }
        }

      },
      side() { //左侧边栏显示
        this.sideflag = !this.sideflag;
        if (this.sideflag) {
          this.$refs.mapbox.style.left = 240 + 'px';
        } else {
          this.$refs.mapbox.style.left = 0 + 'px';
          this.mapobj.refresh()
        }
      },
      showtab() { //底部显示

        this.showtabbar = !this.showtabbar;
        if (this.showtabbar) {
          this.$refs.mapbox.style.bottom = 181 + 'px'
        } else {
          this.$refs.mapbox.style.bottom = 0 + 'px'
          this.mapobj.refresh()
        }
      },
      zoomInCommand() { //放大
        sloveMap.zoomInCommand(this.mapobj)
      },
      zoomOutCommand() { //缩小
        sloveMap.zoomOutCommand(this.mapobj)
      },
      fullScreen() { //全屏
        this.fullflag = !this.fullflag;
        if (this.fullflag) {
          this.showtabbar = false;
          this.sideflag = false;
          this.$refs.mapbox.style.bottom = 0 + 'px';
          this.$refs.mapbox.style.left = 0 + 'px';
          this.$refs.full.title = "退出全图"
          this.mapobj.refresh()
        } else {
          this.showtabbar = true;
          this.sideflag = true;
          this.$refs.mapbox.style.bottom = 181 + 'px'
          this.$refs.mapbox.style.left = 240 + 'px';
          this.$refs.full.title = "全图"
        }

      },
      goleft() { //左移
        this.mapobj.leftPanMapCommand()

      },
      goright() { //右移
        this.mapobj.rigthPanMapCommand()
      },
      jog() { //漫游
        this.mapobj.panTool();
        this.drawArea()
      },
      area() { //面积测量
        this.mapobj.measureAreaTool();
        this.drawArea()
      },
      measure() { //距离测量
        this.mapobj.measureLengthTool();
        this.drawArea()
      },
      drawArea() {
        // this.showtab();
        if (this.fogArea.num == 1 && this.labelFlag) {
          sloveMap.drawPolygon(this.mapobj, this.fogArea)
        }
      },

      fogareaLable() { //绘制雾区
        if (this.fogAreas.length > 0) {
          if (this.markerPointFlag) { //判断当前标注阶段所处比例尺
            this.$alert("<strong>开始绘制后，将鼠标移动到地图边缘可以平移地图</strong>", "提示框", {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              type: "warning",
              callback: action => {
                this.$refs.mapbox.style.bottom = 0 + 'px';
                this.showtabbar = false;
                this.labelFlag = true,
                  this.mapobj.refresh();
                var symbol = DPS.Factory.createPolygonSymbol();
                symbol.setFillOpacity(1);
                symbol.setOpacity(1);
                if (this.fogArea.njd <= 100) {
                  symbol.setColor("#ff0000");
                  symbol.setFillColor("#ff0000");
                } else if (this.fogArea.njd > 100 && this.fogArea.njd <= 500) {
                  symbol.setColor("#ff9900");
                  symbol.setFillColor("#ff9900");
                } else if (this.fogArea.njd > 500 && this.fogArea.njd <= 1000) {
                  symbol.setColor("#ffff00");
                  symbol.setFillColor("#ffff00");
                } else if (this.fogArea.njd > 1000) {
                  symbol.setColor("#00ff00");
                  symbol.setFillColor("#00ff00");
                }
                sloveMap.deleteElement(this.mapobj, this.fogArea)
                let trackPolygonResult = async (mapObj, eArgs) => { //绘制标记点回调函数
                  let shape = eArgs.getGeoPolygon().generateWKTString();
                  let insertResult = null;
                  if (this.fogArea.num == 0) {
                    insertResult = await sloveMap.addFogarea(shape, this.fogArea.wqbm); //调用添加点接口
                  } else if (this.fogArea.num == 1) {

                    insertResult = await sloveMap.updateFogarea(shape, this.fogArea.wqbm); //调用修改点接口
                  }
                  this.showtab();
                  if (insertResult && insertResult.Result == 'Success') { //标注成功（数据存储成功）
                    this.labelFlag = false;
                    this.fogArea.shape = shape;
                    this.fogArea.num = 1;
                    sloveMap.drawPolygon(mapObj, this.fogArea)
                    for (let i = 0; i < this.fogAreas.length; i++) {
                      if (this.fogAreas[i].wqbm == this.fogArea.wqbm) {
                        this.fogAreas[i].num = 1;
                        this.fogAreas[i].shape = shape;
                        break
                      }
                    }

                  } else { //出现异常
                    this.$alert("<strong>雾区绘制失败！</strong>", '提示框', {
                      confirmButtonText: '确定',
                      type: 'error',
                      dangerouslyUseHTMLString: true,
                      callback: action => {
                        this.labelFlag = false;
                        if (this.fogArea.num == 1) { //恢复初始状态，重新绘制
                          sloveMap.drawPolygon(mapObj, this.fogArea)
                        }
                      }
                    });
                  }
                  mapObj.refresh();

                }
                this.mapobj.trackPolygonBySymbol(this.mapobj, symbol, trackPolygonResult); //绘制标记点回调
              }
            });

            // if()

          } else {
            this.$alert("<strong>请放大地图至17级进行绘制</strong>", "提示框", {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              type: "warning",
              callback: action => {
                this.mapobj.panTool();
              }
            });
          }
        } else {
          this.$alert("<strong>雾区不存在，无法绘制</strong>", "提示框", {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            type: "warning",
            callback: action => {
              this.mapobj.panTool();
            }
          });
        }

      },
      drawpolygon(polygonobj) { //绘制雾区面
        if (polygonobj.num == 1) {
          sloveMap.drawPolygon(this.mapobj, polygonobj)
        }
      },
      //地图元素单击事件
      onHighlightElementClick(mapObj, eArgs) {
        let info = eArgs.getAttributes().polygonobj;
        this.activeWqbm = info.wqbm;
        this.selectFogArea(this.activeWqbm);
      },
      fogareasonViewLoadEvent(sender, eArgs) { //地图加载完
        sloveMap.changeNavImage(this.mapobj)
        this.mapobj.onHighlightElementClickEvent(this.mapobj, this.onHighlightElementClick); //地图单击事件绑定
        let that = this;
        this.loadflag = true;
        let searchfogarea = sloveMap.selectinfo(this.gisLayername.fogArea);
        searchfogarea.sendRequest(function (data, config) { //面信息查询
          let rowList = data.length > 0 ? data[0].rowList : [];
          // console.log(rowList)
          if (rowList.length == 0) {

            return;
          }
          for (let j = 0; j < that.fogAreas.length; j++) {
            that.fogAreas[j].num = 0 //标记雾区是否有值
            for (let i = 0; i < rowList.length; i++) { //遍历绘制
              if (that.fogAreas[j].wqbm == rowList[i].values.WQBM) {
                that.fogAreas[j].num = 1;
                that.fogAreas[j].shape = rowList[i].values.SHAPE
              }
            }
            that.drawpolygon(that.fogAreas[j]);
          }
          if (that.fogAreas.length != 0) {
            let geo = DPS.Factory.createGeometry(that.fogAreas[0].shape);
            that.mapobj.zoomByLevel(13)
            that.mapobj.zoomToGeometry(geo);
            that.mapobj.zoomByLevel(11)
            that.mapobj.flashGeometryByColor([geo], 'RGB(0,0,255)', 5) //闪烁显示
            that.mapobj.refresh()
          }


        });

        this.$refs.jog.focus();
        this.mapobj.onMouseDoubleClickEvent(this.mapobj, this.doubleEvent);

      },
      doubleEvent(sender, eArgs) { //鼠标双击之后的事件
        this.$refs.jog.focus()
      },
      mapLevelchange() { //地图层级变化，雾区尺寸变化

        this.mapobj.onMapLevelChangedEvent(this.mapobj, changeLevel);
        let that = this;

        function changeLevel(sender, eArgs) {
          that.drawArea();
          let level = eArgs.getLevel();
          if (level >= 17) {
            that.markerPointFlag = true;
          } else {
            that.markerPointFlag = false;
            that.mapobj.panTool();
            that.mapobj.refresh()
          }
          for (let i = 0; i < that.fogAreas.length; i++) { //为图层中每个元素设值
            let layer = sloveMap.getElementLayer(that.fogAreas[i].wqbm, that.mapobj)
            if (that.fogAreas[i].num == 1) {
              let elements = layer.getAllElement();
              for (let j = 0; j < elements.length; j++) {
                let tempNormalSymbol = elements[j].getNormalSymbol();
                let tempHighlightSymbol = elements[j].getHighlightSymbol();
                tempNormalSymbol.setFillOpacity(1);
                tempNormalSymbol.setOpacity(1);
                tempHighlightSymbol.setFillOpacity(1);
                tempHighlightSymbol.setOpacity(1);
                if (level == 16) {
                  tempNormalSymbol.setWidth(2.3);
                  tempHighlightSymbol.setWidth(2.3);
                } else if (level == 15) {
                  tempNormalSymbol.setWidth(4);
                  tempHighlightSymbol.setWidth(4);
                } else if (level == 14) {
                  tempNormalSymbol.setWidth(3.5);
                  tempHighlightSymbol.setWidth(3.5);
                } else if (level == 13) {
                  tempNormalSymbol.setWidth(5);
                  tempHighlightSymbol.setWidth(5);
                } else if (level == 12) {
                  tempNormalSymbol.setWidth(5);
                  tempHighlightSymbol.setWidth(5);
                } else if (level == 11) {
                  tempNormalSymbol.setWidth(5);
                  tempHighlightSymbol.setWidth(5);
                } else if (level <= 10) {
                  tempNormalSymbol.setFillOpacity(0);
                  tempNormalSymbol.setOpacity(0);
                  tempHighlightSymbol.setFillOpacity(0);
                  tempHighlightSymbol.setOpacity(0);
                }
              }
              that.mapobj.refresh()
            }
          }
        }
      },
      changeColor(fogAreas) { //改变雾区颜色
        for (let i = 0; i < fogAreas.length; i++) {
          let layer = sloveMap.getElementLayer(fogAreas[i].wqbm, this.mapobj);
          let njd = fogAreas[i].njd;
          let elements = layer.getAllElement();
          for (let j = 0; j < elements.length; j++) {
            let tempHighlightSymbol = elements[j].getHighlightSymbol();
            let tempNormalSymbol = elements[j].getNormalSymbol();
            if (njd <= 100) {
              tempNormalSymbol.setColor("#ff0000");
              tempHighlightSymbol.setColor("#ff0000");
              tempNormalSymbol.setFillColor("#ff0000");
              tempHighlightSymbol.setFillColor("#ff0000");
            } else if (njd > 100 && njd <= 500) {
              tempNormalSymbol.setColor("#ff9900");
              tempHighlightSymbol.setColor("#ff9900");
              tempNormalSymbol.setFillColor("#ff9900");
              tempHighlightSymbol.setFillColor("#ff9900");
            } else if (njd > 500 && njd <= 1000) {
              tempNormalSymbol.setColor("#ffff00");
              tempHighlightSymbol.setColor("#ffff00");
              tempNormalSymbol.setFillColor("#ffff00");
              tempHighlightSymbol.setFillColor("#ffff00");
            } else if (njd > 1000) {
              tempNormalSymbol.setColor("#00ff00");
              tempHighlightSymbol.setColor("#00ff00");
              tempNormalSymbol.setFillColor("#00ff00");
              tempHighlightSymbol.setFillColor("#00ff00");
            }
          }
          this.mapobj.refresh()
        }
      },

      // 弹窗按钮同步
      synchro() {
        if (this.controllers == '') {
          this.$alert('该雾区没有控制器', '设备控制', {
            confirmButtonText: '确定'
          });
          return;
        }
        this.loading = true;
        let lamp = this.lamp;
        for (let i = 0; i < this.controllers.length; i++) {
          this.controllers[i].wdld = lamp.wdld
          this.controllers[i].ldsc = lamp.ldsc
          this.controllers[i].mdsc = lamp.mdsc
          this.controllers[i].hdys = lamp.hdys
          this.controllers[i].mqys = lamp.mqys
          this.controllers[i].hsjsdzsl = lamp.hsjsdzsl
        }
        setTimeout(() => {
          this.loading = false;
          this.$message({
            type: 'success',
            message: '同步成功!',
          });
        }, 2000)

      },
      loadFogAreas1() {
        this.fogAreas = [];
        FogArea.queryFogAreas(this.$cookies.get("token")).then(value => {
          this.fogAreas = value;
          for (var i = 0; i < value.length; ++i) {
            this.fogAreas[i].wqbm = this.fogAreas[i].wqbm.toString();
          }
          // 清除地图上点数据
          for (let i = 1; i < this.mapobj.getLayerCount(); i++) {
            //将所有图层元素清除
            this.mapobj.getLayerByIndex(i).removeAllElement();
          }
          let that = this;

          let searchfogarea = sloveMap.selectinfo(this.gisLayername.fogArea);
          searchfogarea.sendRequest(function (data, config) {
            //面信息查询

            //   let rowList = data[0].rowList;
            let rowList = data.length > 0 ? data[0].rowList : [];

            if (rowList.length == 0) {

              return;
            }
            for (let j = 0; j < that.fogAreas.length; j++) {
              that.fogAreas[j].num = 0; //标记雾区是否有值
              for (let i = 0; i < rowList.length; i++) {
                //遍历绘制
                if (that.fogAreas[j].wqbm == rowList[i].values.WQBM) {
                  that.fogAreas[j].num = 1;
                  that.fogAreas[j].shape = rowList[i].values.SHAPE;
                }
              }
              that.drawpolygon(that.fogAreas[j]);
            }
            let geo = DPS.Factory.createGeometry(that.fogAreas[0].shape);
            that.mapobj.zoomByLevel(13);
            that.mapobj.zoomToGeometry(geo);
            that.mapobj.zoomByLevel(11);
            that.mapobj.flashGeometryByColor([geo], "RGB(0,0,255)", 5); //闪烁显示
            that.mapobj.refresh();
          });

          this.$refs.jog.focus();
          this.mapobj.onMouseDoubleClickEvent(this.mapobj, this.doubleEvent);
        });
      },
    },
    watch: {
      fogAreas: {
        deep: true,
        handler: function (newval, oldVal) {
          this.changeColor(newval)
        },
        immediate: true
      }
    },
    activated() {
      this.actives = "1";
      this.loadFogAreas1();
    },
    deactivated() {
      this.actives = "";
      if (this.fogAreas.length > 0) {
        this.activeWqbm = this.fogAreas[0].wqbm;
      } else {
        this.activeWqbm = "";
      }
    },

  }

</script>
