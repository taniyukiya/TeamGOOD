<template>
  <div>
    <p>{{msg}}</p>
    <input id="TextBox" type="text" v-model="msg">
  </div>
</template>

<script>
export default{
  data(){
    return {
      msg: "Hello World!"
    }
  }
}
</script>

<style>
  #TextBox{
    position: fixed;
    top: 100px;
  }
</style>