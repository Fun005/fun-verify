<template>
  <div class="char">
    <div id="char_container" class="char-container"></div>
    <el-input type="text" id="code_input" v-model="inputCode" class="code-input" placeholder="请输入验证码" />
    <el-button id="submit_button" type="primary" @click="validateCode">验证</el-button>
  </div>
</template>

<script>
import { getAllLetter, randomNum, randomColor } from '@/utils/util'
export default {
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    validate: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      inputCode: '',
      defaultOptions: { //默认options参数值
        id: "#char_container", //容器Id
        canvasId: "verifyCanvas", //canvas的ID
        width: 400, //默认canvas宽度
        height: 200, //默认canvas高度
        type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
        code: "",
        codeNum: 4,
        lineNum: 20, // 干扰线数量
        pointNum: 100,
      },
      config: {}
    }
  },
  mounted () {
    this.imageVerify(this.config)
  },
  methods: {
    imageVerify () { //创建一个图形验证码对象，接收options对象为参数
      if (Object.prototype.toString.call(this.options) == "[object Object]") {//判断传入参数类型
        // for (let i in config) { //根据传入的参数，修改默认参数值
        //   this.options[i] = config[i];
        // }

        this.config = { ...this.defaultOptions, ...this.options }
      } else {
        return
      }
      console.log('%c 🥘 final config: ', 'font-size:20px;background-color: #465975;color:#fff;', this.config);


      this.config.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
      this.config.letterArr = getAllLetter();

      this.initCharVerify();
      this.refresh();
    },

    /**初始化方法**/
    initCharVerify: function () {
      const charBox = document.querySelector(this.config.id);
      const canvas = document.createElement("canvas");
      this.config.width = charBox.offsetWidth > 0 ? charBox.offsetWidth : "100";
      this.config.height = charBox.offsetHeight > 0 ? charBox.offsetHeight : "30";
      canvas.id = this.config.canvasId;
      canvas.width = this.config.width;
      canvas.height = this.config.height;
      canvas.style.cursor = "pointer";
      canvas.innerHTML = "您的浏览器版本不支持canvas";
      charBox.appendChild(canvas);
      const _this = this;
      canvas.onclick = function () {
        _this.refresh();
      }
    },

    /**生成验证码**/
    refresh: function () {
      this.config.code = "";
      const canvas = document.getElementById(this.config.canvasId);
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
      } else {
        return;
      }

      ctx.textBaseline = "middle";

      ctx.fillStyle = randomColor(180, 240);
      ctx.fillRect(0, 0, this.config.width, this.config.height);
      let txtArr
      if (this.config.type == "blend") { //判断验证码类型
        txtArr = this.config.numArr.concat(this.config.letterArr);
      } else if (this.config.type == "number") {
        txtArr = this.config.numArr;
      } else {
        txtArr = this.config.letterArr;
      }

      for (let i = 1; i <= this.config.codeNum; i++) {
        let txt = txtArr[randomNum(0, txtArr.length)];
        this.config.code += txt;
        ctx.font = randomNum(this.config.height / 2, this.config.height) + 'px SimHei'; //随机生成字体大小
        ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色        
        ctx.shadowOffsetX = randomNum(-3, 3);
        ctx.shadowOffsetY = randomNum(-3, 3);
        ctx.shadowBlur = randomNum(-3, 3);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        let x = this.config.width / (this.config.codeNum + 1) * i;
        let y = this.config.height / 2;
        let deg = randomNum(-30, 30);
        /**设置旋转角度和坐标原点**/
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);
        /**恢复旋转角度和坐标原点**/
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }

      /**绘制干扰线**/
      for (let i = 0; i < this.config.lineNum; i++) {
        ctx.strokeStyle = randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(randomNum(0, this.config.width), randomNum(0, this.config.height));
        ctx.lineTo(randomNum(0, this.config.width), randomNum(0, this.config.height));
        ctx.stroke();
      }

      const pn = this.config.pointNum || this.config.width / 4
      /**绘制干扰点**/
      for (let i = 0; i < pn; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(randomNum(0, this.config.width), randomNum(0, this.config.height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    },

    /**验证验证码**/
    validateCode () {
      let i_code = this.inputCode.toLowerCase();
      let v_code = this.config.code.toLowerCase();
      if (i_code !== v_code) {
        this.inputCode = ''
        this.refresh();
        return this.$message.error('验证失败，请输入正确的验证码')
      }
      console.log({
        resultCode: this.config.code,
        inputCode: this.inputCode,
        validateRes: i_code === v_code
      });
      this.validate({
        resultCode: this.config.code,
        inputCode: this.inputCode,
        success: i_code === v_code
      })

      // let code = code.toLowerCase();
      // let v_code = this.config.code.toLowerCase();
      // if (code == v_code) {
      //   return true;
      // } else {
      //   this.refresh();
      //   return false;
      // }
    },
    getCharCode () {
      return this.config.code
    }
  }
}
</script>

<style>
.char-container {
  width: 500px;
  height: 200px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
}
.code-input {
  width: 200px;
}
</style>