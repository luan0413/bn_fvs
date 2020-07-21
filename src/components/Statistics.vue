<template>
  <div>
    <Head activeIndex="3" />
    <div class="content">
      <nav class="nav">
        <div class="navBox" v-show="sideflag">
          <!--统计分析左侧列表-->
          <div class="leftMenuBox">
            <div class="leftMenuTitle"><i class="el-icon-document"></i>{{ $t('message.StatisticalAnalysis') }}</div>
            <div class="leftTreeBox">
              <el-tree :data="treeDatas" :props="defaultProps" default-expand-all ref="tree" node-key="id" @node-click="changeRouter">
              </el-tree>
            </div>
          </div>
        </div>
        <div class="navBoxBar" @click="side" ref="navbox"><img src="./img/right.png" alt="" v-if="!sideflag"><img src="./img/left.png" alt="" v-else></div>
      </nav>
      <div ref="contentbox" style="width: 100%;">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>
<script>
  import Head from '@/components/Head'
  import User from './js/User.js';
  import Function from './js/Function.js';
  import FogArea from "./js/FogArea.js";

  export default {
    components: {
      Head
    },
    data() {
      return {
        sideflag: true,//左侧状态数据
        //左侧树
        treeDatas: [],
        //树映射
        defaultProps: {
          children: 'children',
          label: 'gnmc'
        },
      }
    },
    mounted() {
      this.loadUser();
    },
    methods: {
      side() {//左侧边栏显示
        this.sideflag = !this.sideflag;
        let windowWidth =  window.screen.availWidth;
        if (this.sideflag) {
          this.$refs.contentbox.style.width = windowWidth - 240 + 'px';
        } else {
          this.$refs.contentbox.style.width = windowWidth + 'px';
        }
      },
      //读取用户权限
      loadUser(){
        var parameter = {
          yhmc: this.$cookies.get('yhmc')
        };
        User.getUser(parameter).then(value => {
          var deviceNode = null;
          var fogareaNode = null;
          for (var i = 0; i < value.functions.length; ++i){
            var router = Function.StatisticsRouters[value.functions[i].gnbm];
            if (value.functions[i].gnbm == "01030100" ||
              value.functions[i].gnbm == "01030200")
            {
              if (deviceNode == null)
              {
                deviceNode={
                  gnmc: '设备状态分析',
                  children: [],
                  router:""
                };
              }
              value.functions[i].router = router;
              deviceNode.children.push(value.functions[i]);

            }
            else if (value.functions[i].gnbm == "01030300" )
            {
              if (fogareaNode == null) {
                fogareaNode = {
                  gnmc: '雾区能见度分析',
                  children: [],
                  router: ""
                };
              }
              value.functions[i].router = router;
              fogareaNode.children.push(value.functions[i]);

            }

          }
          //这里在向tree中push数据保证节点顺序
          if (deviceNode != null)
          {
            this.treeDatas.push(deviceNode);
          }
          if (fogareaNode != null)
          {
            this.treeDatas.push(fogareaNode);
          }

        });
      },
      //点击左侧节点切换对应组件
      changeRouter(data, node, tree) {
        if(data.router != ""){
          this.$router.push('/statistics' + data.router);
        }
      },
      getPath(){
        let paths = this.$route.fullPath.substring(11); //获取当前路径
        let trees = [];
        let treess = []; //用户权限页面
        for(let i=0;i<this.treeDatas.length;i++){
          trees.push(this.treeDatas[i].children)
        }
        //将路由转成小写
        for(let i=0;i<trees.length;i++){
          for(let j = 0;j<trees[i].length;j++){
            treess.push(trees[i][j].router.toLowerCase())
          }
        }
        if(treess.indexOf(paths.toLowerCase()) !=-1){//判断路由是否存在
          this.$router.push('/statistics'+paths)
        }else{
          this.$router.push('/4399')
          this.$message({
            type: 'error',
            message: '对不起，您没有权限',
          });
        }
      }

    },
    watch: {
      "$route":"getPath"  //监听路由
    },
  }
</script>

