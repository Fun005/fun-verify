<template>
  <div class="verify3">
    <div class="box">
      <VerifyThree @success="alert('success')" @error="alert('error')" :vType="1"></VerifyThree>
      <VerifyThree @success="alert('success')" @error="alert('error')" :vType="2"></VerifyThree>
      <VerifyThree @success="alert('success')" @error="alert('error')" :vType="3"></VerifyThree>
    </div>
    <div class="box">
      <VerifyThree @success="alert('success')" @error="alert('error')" :vType="4"></VerifyThree>
      <VerifyThree @success="alert('success')" @error="alert('error')" :vType="5"></VerifyThree>
    </div>
  </div>
</template>

<script>
import VerifyThree from '@/components/VerifyThree'
export default {
  name: 'verify3',
  methods: {
    alert (text) {
      console.log(text)
    }
  },
  components: {
    VerifyThree
  }
}
</script>

<style lang="less" scoped>
.verify3 {
  width: 100%;
  .box {
    display: flex;
    justify-content: space-around;
    margin-top: 120px;
  }
}
</style>