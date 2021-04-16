<template>
  <div>
    <p>
      {{ article }}
    </p>
    <!-- <button @click="clear()">clear</button> -->
  </div>
</template>

<script>
let selectTopic = "WORLD";
export default {
  data() {
    return {
      article: "loading",
    };
  },
  name: "news",
  props: {
    msg: { type: String },
  },
  created() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: selectTopic,
        lang: "jpn",
        before: 2010 / 8 / 30,
      }),
    };
    //https://news.google.com/news/rss/headlines/section/topic/WORLD直接とってくるのはセキュリティ上出来ないのでサーバーをかませる。
    fetch("http://localhost:4000/list/topic", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.article = data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        //this.msg = err
      });
  },
};
// const GoogleNewsRss = require('google-news-rss');
// const googleNews = new GoogleNewsRss();
// googleNews
//    .search('japan')
//    .then(resp => console.log(resp));
</script>

<style>
#TextBox {
  position: fixed;
  top: 100px;
}
</style>
