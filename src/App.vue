<template>
  <div>
    <myheader></myheader>
    <news v-bind:msg="WORLD"></news>
  </div>
</template>

<script>
import myheader from "./components/myheader";
import news from "./components/news";

export default {
  components: {
    myheader,
    news,
  },
  data() {
    return {
      msg: "WORLD",
    };
  },
};
</script>

<style>
#TextBox {
  position: fixed;
  top: 100px;
}
</style>
