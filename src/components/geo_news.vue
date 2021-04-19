<template>
    <div id="geoArea">
        <p>Geo News</p>
        <div id="geoOutputArea">
            <li v-for="item in displayItems" :key="item.title">
            {{ item.pubDate }}<br />
            <a v-bind:href="item.link">{{ item.title }}</a>
            </li> 
        </div>
        <div id="geoInputArea">
                <input type="text" v-model="geoName">
                <input type="button" value="search" @click="getNews()">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items: [],
            range: 10,
            geoName: "Japan"
        }
    },
    computed: {
        displayItems: function() {
            return this.items.slice(0, this.range);
        },
    },
    created() {
        const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ geo: this.geoName, lang: "jpn" }),
        };
        fetch("http://localhost:4000/list/geo", requestOptions)
        .then((response) => response.json())
        .then((items) => (this.items = items));
        //.then((items)=>(items.isoDate = items.isoDate.replace('-','/')));
    },
    methods: {
        getNews(){
            const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ geo: this.geoName, lang: "jpn" }),
        };
        fetch("http://localhost:4000/list/geo", requestOptions)
        .then((response) => response.json())
        .then((items) => (this.items = items));
        }
    }

}
</script>

<style>
#geoArea{
    display: flex;
    flex-direction: column;
    align-items: left;
}
#geoOutputArea{
    height: 75vh;
    overflow: scroll;
}
li{
    margin: 10px;
}

</style>