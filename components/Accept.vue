<template>
  <div>
    <div class="flex mx-4 mt-2">
      <span class="text-Emerald-500 font-bold" v-if="answer.is_best"
        >Accepted</span
      >
      <span v-else class="font-bold text-gray-500">Accept</span>

      <i
        @click="accept"
        :class="[answer.is_best ? 'text-Emerald-500' : 'text-gray-600']"
        class="fa fa-check fa-lg mt-1 ml-2"
        aria-hidden="true"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["answer"],

  methods: {
    async accept() {
      await this.$store.dispatch("accept", {
        answerId: this.answer.id,
        answerBest: this.answer.is_best,
      });
    },
  },
};
</script>
