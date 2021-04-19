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
      <button @click="sortBy('title')">title</button>
      <button @click="sortBy('isoDate')">isoDate</button>
      <p>"現在のソート："{{ sort_key }}:{{ sort_asc ? "昇順" : "降順" }}</p>
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
      topicLang: "jpn",
      sort_key: "",
      sort_name:"",
      sort_asc: true,
    };
  },
  computed: {
    displayItems: function() {
      this.sort_items();
      return this.items.slice(0, this.range);
    },

    reversItems() {
      return this.items.slice().reverse();
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
    //.then((items)=>(items.isoDate = items.isoDate.replace('-','/')));
  },
  methods: {
    sort_items() {
      console.debug("sort_items", this.sort_key);
      if (this.sort_key === "") {
        return;
      }
      let set = 1;
      this.sort_asc ? (set = 1) : (set = -1);
      this.items.sort((a, b) => {
        if (a[this.sort_key] < b[this.sort_key]) return -1 * set;
        if (a[this.sort_key] > b[this.sort_key]) return 1 * set;
        return 0;
      });
    },
    sortBy(key) {
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
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
