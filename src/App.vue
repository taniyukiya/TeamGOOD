<template>
  <div>
    <myheader></myheader>
    <news v-bind:selectTopic="WORLD"></news>
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
      selectTopic:"WORLD"

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
