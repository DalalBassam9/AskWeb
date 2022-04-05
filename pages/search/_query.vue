<template>
  <div>
    <div class="py-2 bg-gray-200">
      <div
        class="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"
      >
        <Sidbar />

        <div class="space-y-6 sm:px-6  mt-6 lg:col-span-10 ">
          <div v-if="results.questions.length > 0">
            <ul
              class="grid grid-cols-1 gap-6 sm:grid-cols-1  lg:grid-cols-2"
            >
              <QuestionExcerptGroup
                v-for="question in results.questions"
                :question="question"
              ></QuestionExcerptGroup>
            </ul>
          </div>

          <div v-if="results.groups.length > 0">
            <div
              class="mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none"
            >
              <Group v-for="group in results.groups" :group="group"></Group>
            </div>
          </div>

          <div v-if="results.users.length > 0">
            <ul
              class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              <User v-for="user in results.users" :user="user">{{
                user.name
              }}</User>
            </ul>
          </div>

          <div
            class="mt-4"
            v-if="
              results.questions.length == 0 &&
                results.users.length == 0 &&
                results.groups.length == 0
            "
          >
            <h3>No search results</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuestionExcerptGroup from "../../components/QuestionExcerptGroup";
import User from "@/components/User";
import Group from "@/components/Group";
export default {
  components: { QuestionExcerptGroup, Group, User },

  loading: false,
  middleware: "auth",
  data() {
    return {
      loading: false,
      results: [],
    };
  },
    layout: 'newLayout',
  
   head() {
    return {
      title: this.$route.params.query
    };
  },

  async asyncData({ store, params, $axios }) {
    const { results } = await $axios.$get("api/results/" + params.query);
    return { results };
  }
};
</script>
