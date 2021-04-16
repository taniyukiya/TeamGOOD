<template>
  <div>
    <p v-if="msg.length>0">
      {{msg}}
    </p>
    <p v-else>Please input more than 1 length</p>
    <input id="TextBox" type="text" v-model="msg">
    <button @click="clear()">clear</button>
    <!-- <button @click="created()">create</button> -->
  </div>
</template>



<script>

export default{

    name: 'news',
    props:{
        msg: String
    },

  methods:{
    clear(){
      this.msg = ''
    }
  },
  created(){

    const requestOptions = {
    method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({topic: "WORLD",lang:"jpn",before:2010/8/30})
    };
        //https://news.google.com/news/rss/headlines/section/topic/WORLD直接とってくるのはセキュリティ上出来ないのでサーバーをかませる。
    fetch('http://localhost:4000/list/topic',requestOptions)
    .then(response => {
      return response.json()
    })
    .then( data => {
    this.msg = data;
    console.log(data)
    })
    .catch( (err) => {
      console.log(err);
    //this.msg = err
    });
  }
}
// const GoogleNewsRss = require('google-news-rss');
// const googleNews = new GoogleNewsRss();
// googleNews
//    .search('japan')
//    .then(resp => console.log(resp));
</script>

<style>
  #TextBox{
    position: fixed;
    top: 100px;
  }
</style>