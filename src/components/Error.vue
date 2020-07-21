<template>
  <div class="Error">
    <div class="content">
      <h1>500</h1>
      <h3>{{ $t('message.PleacceCallAdmin') }}</h3>
      <button @click="away">{{ $t('message.BackIndex') }}</button>
    </div>
  </div>
</template>
<script>
  export default {
      methods: {
          away() {//点击返回的方法
            this.$router.push('/')
          }
      }
  }

</script>
<style scoped>
  .Error {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(./img/login_bg.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .Error .content {
    width: 300px;
    height: 400px;
    position: absolute;
    left: 40%;
    top: 15%;
    display: block;
  }
  .Error .content h1 {
    font-size: 90px;
    display: block;
    margin-left: 60px;
    margin-bottom: 30px;
    color: white;
  }
  .Error .content h3 {
    font-size: 50px;
    display: block;
    margin-bottom: 60px;
    color: white;
  }
  .Error .content button {
    display: block;
    width: 160px;
    font-size: 25px;
    margin-left: 70px;
    cursor: pointer;
    text-align: center;
    background: rgba(58, 212, 247, 0);
    border: none;
    color: white;
  }
  .Error .content button:hover {
    color: orange;
    font-size: 30px;
  }
</style>
