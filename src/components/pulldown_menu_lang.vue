<template>
  <div>
    <select v-model="selectedLang" @change="changeFromChild">
      <option disabled value="">Topic</option>
      <option
        v-for="lang in optionLanguage"
        v-bind:value="lang.name"
        v-bind:key="lang.id"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["topicName"],
  data() {
    return {
      selectedLang: "jpn",
      optionLanguage: [
        { id: 1, name: "jpn" },
        { id: 2, name: "eng" },
      ],
    };
  },
  created: function () {
    this.$parent.topicLang = this.selectedLang;
  },
  methods: {
    changeFromChild() {
      this.$emit("update:topicLang", this.selectedLang);
    },
  },
};
</script>