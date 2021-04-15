<template>
  <div>
    <myheader></myheader>
     <myheader></myheader>
    <p v-if="msg.length>0">
      {{msg}}
      </p>
    <p v-else>Please input more than 1 length</p>
    <input id="TextBox" type="text" v-model="msg">
    <button @click="clear()">clear</button>
  </div>
</template>

<script>
import myheader from './components/myheader'

export default{
  components:{
    myheader
  },
  data(){
    return {
      msg: "Hello World!"
    }
  },
  methods:{
    clear(){
      this.msg = ''
    }
  },
/*created(){
  fetch('https://news.google.com/news/rss/headlines/section/topic/WORLD')
  .then(response => {
    return response.json()
  })
  .then( data => {
    this.msg = data;
  })
  .catch( (err) => {
    this.msg = err
    });
  }*/
}
const GoogleNewsRss = require('google-news-rss');
const googleNews = new GoogleNewsRss();
googleNews
   .search('japan')
   .then(resp => console.log(resp));
</script>

<style>
  #TextBox{
    position: fixed;
    top: 100px;
  }
</style>