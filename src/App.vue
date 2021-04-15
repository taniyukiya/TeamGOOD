<template>
  <div>
    <div id="outpuArea">
      <myheader></myheader>
      <textarea v-model="msg"></textarea>
      <p id="outputHTML" v-html="topicMsg + topicNum + '<br/>' + msg.replace(/\n/g,'<br/>')"></p>
    </div>
    <div id="inputArea">
      <input id="TopickNumBox" type="text" v-model="topicNum">
      <input id="TextBox" type="text" v-model="inputText">
      <button id="Button" @click="addText(), addTopicNum()">click here</button>
    </div>
  </div>
</template>

<script>
import myheader from "./components/myheader"

export default{
  components: {
    myheader
  },
  data(){
    return {
      msg: "input text is apear here!\n",
      topicMsg: "TopicNum: ",
      topicNum: 0,
      inputText: ""
    }
  },
  methods: {
    clear(){
      this.msg = ""
    },
    addText(){
      console.log("click");   
      if (this.inputText !== ""){
        this.msg += "TopicNum: " + this.topicNum + "///" + this.inputText + "\n";
      }else{
        this.msg += "textbox is empty \n";
      }
    },
    addTopicNum(){
      
    }
  }  
}
</script>

<style>
  #inputArea{
    position: fixed;
    align-items: center;
    bottom: 0;
  }
  #outputArea{
    display: block;
    flex-direction: colomn;
    align-items: left
  }
  #TextBox{
    width: 80vw;
  }
  textarea{
    position: absolute;
    height: 40vh;
    width: 80vw;
  }
  #outputHTML{
    position: absolute;
    bottom: 0;
    height: 50vh;
  }
</style>



