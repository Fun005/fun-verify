<template>
  <div class="home">
    <div class="box">
      <router-link to="verify1" class="button">verify1</router-link>
      <router-link to="verify2" class="button">verify2</router-link>
      <router-link to="verify3" class="button">verify3</router-link>
      <router-link to="login" class="button">login</router-link>
      <router-link to="demo" class="button">demo</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted () { },
  methods: {}
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.box {
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
