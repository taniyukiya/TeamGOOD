<template>
  <div>
    <p v-if="msg.length>0">{{msg}}</p>
    <p v-else>dead</p>
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