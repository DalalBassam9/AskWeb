<template>
  <div>
    <div class="py-4 bg-gray-200">
      <div
        class="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"
      >
        <Sidbar />
        <div class="col-span-7">
          <Question></Question>
          <Answer
            v-for="(answer, answerkey) in answers"
            :key="answerkey"
            :question_count="question.answers_count"
            :question="question"
            :answer="answer"
          ></Answer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Question from "../../components/Question";
import Answer from "~/components/Answer";
import Sidbar from "@/components/Sidbar";

export default {
  name: "qu",
  components: {
    Question,
    Sidbar,
    Answer
  },
  layout: 'newLayout',
  head() {
    return {
      title: "question"
    };
  },

  middleware: "auth",
  methods: {

    toggleModal() {
      this.isVisibility = !this.isVisibility;
    }
  },
  data() {
    return {
      isVisibility: false,
    };
  },
  async asyncData({ store, params }) {
    await store.dispatch("questions/fetchQuestion", params.id);
    await store.dispatch("questions/fetchAnswers", params.id);
  },

  computed: {
    ...mapGetters({
      question: 'questions/question',
      answers: "questions/answers"
    })
  }

  
};
</script>

<style scoped></style>
