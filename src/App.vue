<template>
  <div>
    <div id="outputArea">
      <myheader></myheader>
      <ul>
        <p>TOPIC:{{ topicName }}</p>
        <li v-for="item in displayItems" :key="item.title">
          {{ item.pubDate }}<br />
          <a v-bind:href="item.link">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div id="inputArea">
      <input type="range" min="0" max="11" v-model="range" />
      <pulldownMenu :topicName.sync="topicName"></pulldownMenu>
      <pulldownMenuLang :topicLang.sync="topicLang"></pulldownMenuLang>
    </div>
  </div>
</template>

<script>
import myheader from "./components/myheader";
import pulldownMenu from "./components/pulldown_menu";
import pulldownMenuLang from "./components/pulldown_menu_lang";

export default {
  components: {
    myheader,
    pulldownMenu,
    pulldownMenuLang
  },
  data() {
    return {
      items: [],
      range: 2,
      topicName: "WORLD",
      topicLang: "jpn"
    };
  },
  computed: {
    displayItems: function () {
      return this.items.slice(0, this.range);
    },
  },
  watch: {
    topicName: function(newValue){
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: newValue, lang: this.topicLang }),
      };
      fetch("http://localhost:4000/list/topic", requestOptions)
        .then((response) => response.json())
        .then((items) => (this.items = items));
    },
    topicLang: function(newValue){
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: this.topicName, lang: newValue}),
      };
      fetch("http://localhost:4000/list/topic", requestOptions)
        .then((response) => response.json())
        .then((items) => (this.items = items));
    }
  },
  created() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: this.topicName, lang: this.topicLang }),
    };
    fetch("http://localhost:4000/list/topic", requestOptions)
      .then((response) => response.json())
      .then((items) => (this.items = items));
  },
  methods: {
    getNews() {
      console.log("change");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: this.topicName, lang: "jpn" }),
      };
      fetch("http://localhost:4000/list/topic", requestOptions)
        .then((response) => response.json())
        .then((items) => (this.items = items));
    },
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