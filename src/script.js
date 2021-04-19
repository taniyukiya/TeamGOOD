import myheader from "./components/myheader";

export default {
  components: {
    myheader,
  },
  data() {
    return {
      items: [],
      range: 5,
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
  created() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: "WORLD", lang: "jpn" }),
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
      });5
    },
    sortBy(key) {
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },
  },
};