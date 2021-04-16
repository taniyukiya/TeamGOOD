<template>
  <div>
    <div id="outpuArea">
      <myheader></myheader>
      <!-- <textarea id="outputTextArea" v-model="titleText"></textarea> -->
      <ul>
        <li v-for="item in displayItems" :key="item.title">
          {{ item.title }}
        </li>
      </ul>
      <input type="range" min="0" max="11" v-model="range" />
      <!-- <p id="outputHTML" v-html="titleText.replace(/\n/g,'<br/>')"></p> -->
    </div>
    <div id="inputArea">
      <input id="TopickNumBox" type="text" v-model="topicNum" />
      <input id="TextBox" type="text" v-model="inputText" />
      <button id="Button" @click="asyncAddText()">click here</button>
      <!-- <button id="FetchButton" @click="created()">fetch</button> -->
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
      msg: "input text is apear here!\n",
      topicMsg: "TopicNum: ",
      topicNum: 10,
      inputText: "",
      titleText: "",
      titleList: [],
      linkList: [],
      dateList: [],
      items: [],
      range: 10,
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
    // fetch("http://localhost:4000/list/topic", requestOptions)
    //   .then((response) => response.json())
    //   .then((json) => this.getNewsTitleList(json))
    //   .catch((err) => console.log(err));
    fetch("http://localhost:4000/list/topic", requestOptions)
      .then((response) => response.json())
      .then((items) => (this.items = items));
  },
  methods: {
    clear() {
      this.msg = "";
    },
    addText() {
      console.log("click");
      if (this.inputText !== "") {
        this.msg +=
          "TopicNum: " + this.topicNum + "///" + this.inputText + "\n";
        this.titleText = "";
      } else {
        this.msg += "textbox is empty \n";
      }
      console.log("titleList:" + this.titleList.length);
      for (var i = 0; i < this.topicNum; i++) {
        this.titleText += this.dateList[i] + "\n";
        this.titleText += this.titleList[i] + "\n";
        this.titleText += this.linkList[i] + "\n\n";
      }
    },
    promiseGetJson() {
      const jsonObj = new Promise(function (resolve) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: "WORLD", lang: "jpn" }),
        };
        fetch(
          "http://localhost:4000/list/topic",
          requestOptions
        ).then((response) => resolve(response.json()));
      });
      return jsonObj;
    },
    promiseGetInfoFromJson(jsonObj) {
      const jsonInfo = new Promise(function (resolve) {
        var titleList = [];
        jsonObj.forEach((obj) => titleList.push(obj["title"]));
        resolve(titleList);
      });
      return jsonInfo;
    },
    async asyncAddText() {
      var jsonObj = await this.promiseGetJson();
      var title = await this.promiseGetInfoFromJson(jsonObj);
      this.titleList = title;

      this.titleText = "";
      for (var i = 0; i < this.topicNum; i++) {
        this.titleText += this.titleList[i] + "\n\n";
      }
    },

    getNewsTitleList(obj) {
      obj.forEach((jsonObj) => this.pushList(jsonObj));
    },
    pushList(obj) {
      this.titleList.push(obj["title"]);
      this.linkList.push(obj["link"]);
      this.dateList.push(obj["isoDate"]);
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
#TextBox {
  width: 80vw;
}
#outputHTML {
  position: absolute;
  height: 50vh;
}
</style>