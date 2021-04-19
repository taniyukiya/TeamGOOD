<template>
  <div>
    <div id="outpuArea">
      <myheader></myheader>
      <ul>
        <li v-for="item in displayItems" :key="item">
          {{ item.pubDate }}<br>
          <a v-bind:href="item.link">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div id="inputArea">
      <input type="range" min="0" max="11" v-model="range">
    </div>
  </div>
</template>

<script>
import myheader from "./components/myheader";

export default {
  components: {
    myheader,
  },
  data() {
    return {
      items: [],
      range: 5,
    };
  },
  computed: {
    displayItems: function () {
      return this.items.slice(0, this.range);
    },
  },
  created() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: "WORLD", lang: "jpn" }),
    };
    fetch("http://localhost:4000/list/topic", requestOptions)
      .then((response) => response.json())
      .then((items) => (this.items = items));
  },
  methods: {
    
  },
};
</script>

<style>
#inputArea {
  position: fixed;
  align-items: center;
  bottom: 0;
}
#outputArea {
  display: block;
  flex-direction: colomn;
  align-items: left;
}
#outputTextArea {
  resize: none;
  position: absolute;
  height: 70vh;
  width: 80vw;
}
</style>