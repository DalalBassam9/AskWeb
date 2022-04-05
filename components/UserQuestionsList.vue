<template>
  <div class="pt-2 pb-8 px-4">
    <QuestionExcerptGroup
      v-for="(question, Qkey) in userQuestions"
      :key="Qkey"
      :question="question"
    />
  </div>
</template>
<script>
import QuestionExcerptGroup from "./QuestionExcerptGroup";
import { mapGetters } from "vuex";

export default {
  components: { QuestionExcerptGroup },

  data: () => ({
    loading: false,
    userQuestions: [],
  }),

 async mounted() {
  await this.getUserQuestions();
  },

  methods: {
    async getUserQuestions() {
      this.loading = true;
      try {
        await this.$axios
          .$get("/api/user/questions/" + this.$route.params.id)
          .then((resp) => {
            this.userQuestions = resp.questions;
          });
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
  },


};
</script>
