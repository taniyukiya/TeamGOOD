<template>
  <div>
    <ul>
        <li v-for="items in displayRange" :key="items">
      {{items.title}}{{items.pubDate}}
      <!-- {{items}} -->
        </li>
        <br><br>
    </ul>
   <tr id="range">
   <td><input type='range' min="0" max="30" step="1" v-model="rangeNum"/></td>
   <td><p>{{rangeNum}}</p></td>
   <button @click="sortBy('title')">title</button>
      <button @click="sortBy('isoDate')">pubDate</button><p>"現在のソート："{{sort_key}}</p>
   </tr>
    
    <!-- <button @click="clear()">clear</button> -->
  </div>
</template>

<script>
let selectTopic = "WORLD";
export default {
data() {
        return {
      article: "loading",
      sort_key:"",
      items:[],
      rangeNum: 30,
      selectTopic:"WORLD"
      };
    }, 

  computed:{
    displayRange: function(){
        return this.items.slice(0,this.rangeNum);
    },

    // sort_items(){
    //   if (this.sort_key != "")
    //   {
    //      this.title.sort((a,b)=> {
    //     if (a[this.sort_key]<b[this.sort_key]) return -1;
    //     if (a[this.sort_key]<b[this.sort_key]) return 1;
    //       return 0;
    //   });
    //   return this.title;
    // }else {
    //   return this.title;
    //   }
    // },

  },

  methods:{
    sortBy(key){
      this.sort_key= key;
    },
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
                    lang: "jpn",}),
                };
        //https://news.google.com/news/rss/headlines/section/topic/WORLD直接とってくるのはセキュリティ上出来ないのでサーバーをかませる。
        fetch("http://localhost:4000/list/topic", requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((items) => (this.items = items))
        // .catch((err) => {
        //     //console.log(err);
        //     alert(err);
        //     //this.msg = err
        // });
  },
};
</script>

<style>
#TextBox {
  position: fixed;
  top: 100px;
}
#range{
  position:fixed;
  bottom :0%;
}
</style>
