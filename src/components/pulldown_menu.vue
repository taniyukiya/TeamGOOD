<template>
  <div>
    <select v-model="selectedTopic" @change="changeFromChild">
      <option disabled value="">Topic</option>
      <option
        v-for="topic in optionTopics"
        v-bind:value="topic.name"
        v-bind:key="topic.id"
      >
        {{ topic.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["topicName"],
  data() {
    return {
      selectedTopic: "WORLD",
      optionTopics: [
        { id: 1, name: "WORLD" },
        { id: 2, name: "NATION" },
        { id: 3, name: "BUSINESS" },
        { id: 4, name: "TECHNOLOGY" },
        { id: 5, name: "ENTERTAINMENT" },
        { id: 6, name: "SPORTS" },
        { id: 7, name: "SCIENCE" },
      ],
    };
  },
  created: function () {
    this.$parent.topicName = this.selectedTopic;
  },
  methods: {
    changeTopicName() {
      this.$parent.topicName = this.selectedTopic;
    },
    changeFromChild() {
      this.$emit("update:topicName", this.selectedTopic);
    },
  },
};
</script>
