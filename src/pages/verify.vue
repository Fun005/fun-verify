import script from 'scriptjs';
<template>
  <div class="verify">
    <div class="button" @click="toggleVerify('char')">字符串验证码</div>
    <div class="button" @click="toggleVerify('operation')">运算验证码</div>
    <div class="button" @click="toggleVerify('slide')">滑动验证码</div>
    <div class="box">
      <char-verify v-if="verifyType==='char'" :options="charVerifyOption" :validate="charValidate" ref="charVerifyRef"></char-verify>

      <operation-verify v-if="verifyType==='operation'"></operation-verify>

      <slide-verify v-if="verifyType==='slide'" ref="slideblock" @success="onSuccess" @again="onAgain" @fulfilled="onFulfilled" @fail="onFail" @refresh="onRefresh" :slider-text="text" :imgs="imgs" :accuracy="accuracy"></slide-verify>
    </div>
    <div v-if="verifyType==='slide'">{{msg}}</div>
  </div>
</template>
<script>
import CharVerify from '../components/CharVerify'
import OperationVerify from '../components/OperationVerify'
import SlideVerify from '../components/SlideVerify'
import img0 from '../assets/slide-varify/img.jpg';
import img1 from '../assets/slide-varify/img1.jpg';
import img2 from '../assets/slide-varify/img2.jpg';
import img3 from '../assets/slide-varify/img3.jpg';
import img4 from '../assets/slide-varify/img4.jpg';
import img5 from '../assets/slide-varify/img5.jpg';
export default {
  data () {
    return {
      verifyType: 'char',
      msg: '',
      text: '向右滑动->',
      imgs: [
        img0,
        img1,
        img2,
        img3,
        img4,
        img5,
      ],
      accuracy: 1, // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      charVerifyOption: {
        width: 400,
        height: 200,
        type: 'blend'
      }
    }
  },
  mounted () { },
  methods: {
    toggleVerify (type) {
      console.log(type);
      this.verifyType = type
    },

    // =======slide verfiy start ========
    onSuccess (times) {
      console.log('验证通过');
      this.msg = `success, 耗时${(times / 1000).toFixed(1)}s`;
    },
    onFail () {
      console.log('验证不通过');
      this.msg = ''
    },
    onRefresh () {
      console.log('点击了刷新小图标');
      this.msg = ''
    },
    onFulfilled () {
      console.log('刷新成功啦！');
    },
    onAgain () {
      console.log('检测到非人为操作的哦！');
      this.msg = 'try again';
      // 刷新
      this.handleClick();
    },
    handleClick () {
      this.$refs.slideblock.reset();
      this.msg = ''
    },
    // ======= slide verfiy end ========

    // ======= char verify start =======
    charValidate (res) {
      // let code = this.$refs.charVerifyRef.getResultCode()
      if (res.success) {
        this.$message.success('验证通过')
      }
    },
    // ======= char verify end =======
  },
  components: {
    CharVerify,
    OperationVerify,
    SlideVerify
  }
}
</script>
<style scope>
.box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #409eff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 24px;
  margin: 0 20px 20px 0;
  font-size: 28px;
  border-radius: 8px;
  color: #fff;
  background-color: #409eff;
}
</style>