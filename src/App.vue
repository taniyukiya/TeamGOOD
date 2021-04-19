<template>
  <div>
    <myheader></myheader>
    
    <div id="outputArea">
            <ul>
              <li v-for="item in displayItems" :key="item.title">
                {{ item.pubDate }}<br />
                <a v-bind:href="item.link">{{ item.title }}</a>
              </li>
              <p>TOPIC:{{ topicName }}</p>
            </ul>
    </div>
    <div id="inputArea">
      <input type="range" min="0" max="11" v-model="range" />
      <pulldownMenu :topicName.sync="topicName"></pulldownMenu>
      <pulldownMenuLang :topicLang.sync="topicLang"></pulldownMenuLang>
      <button @click="sortBy('title')">title</button>
      <button @click="sortBy('isoDate')">isoDate</button>
      <p>現在のソート：{{ sort_key }}{{ sort_asc ? "昇順" : "降順" }}</p>
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

*{
  padding: 0;
  margin:0;
}

body{
  
  background-color: #CEE5F2;
}

button {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #f7f7f7;
  border-left: solid 6px #ff7c5c;/*左線*/
  color: #ff7c5c;/*文字色*/
  font-weight: bold;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
}
button:active {
  box-shadow: inset 0 0 2px rgba(128, 128, 128, 0.1);
  transform: translateY(2px);
}

#inputArea {
  position: fixed;
  align-items: center;
  bottom: 5px;
  width: 100%;
  padding: 10px;
  background-color: #ACCBE1;
}
#outputArea {
  display: block;
  flex-direction: colomn;
  align-items: left;
  margin:5%;
}
#outputTextArea {
  resize: none;
  position: absolute;
  height: 70vh;
  width: 80vw;
}


/*フリー素材*/
ul, ol {
  padding: 0;
  position: relative;
}

ul li, ol li {
  color: #2d8fdd;
  border-left: solid 6px #2d8fdd;/*左側の線*/
  background: #f1f8ff;/*背景色*/
  margin-bottom: 3px;/*下のバーとの余白*/
   line-height: 1.5;
  padding: 0.5em;
  list-style-type: none!important;/*ポチ消す*/
}

li a{
  color:#007A74;
  text-decoration:none;
}

li a:hover{
  opacity: 0.5;
  transition: 0.3s;
}

</style>
