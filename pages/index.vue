<template>
  <div>
    <div class="bg-gray-100">
      <div class="min-h-full">
        <div class="py-4">
          <div
            class="
              max-w-3xl
              mx-auto
              sm:px-6
              lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8
            "
          >
            <Sidbar />

            <div class="px-3 lg:col-span-6">
              <div class="mb-4 mt-1 mx-4">
                <AddQuestion></AddQuestion>
              </div>

              <section
                class="
                  shadow-xl
                  h-28
                  justify-center
                  items-center
                  rounded-xl
                  flex
                  bg-white
                "
              >
                <div class="flex mx-4">
                  <div class="mt-2 text-sm sm:text-lg mx-4">Sort By:</div>
                  <div>
                    <select
                      id="location"
                      v-model="filters.orderBy"
                      @change="search"
                      name="location"
                      class="
                        sm:max-w-lg
                        w-44
                        sm:mt-0
                        mt-2
                        block
                        py-2
                        focus:ring-green-500 focus:border-green-500
                        w-full
                        shadow-sm
                        sm:max-w-xs sm:text-sm
                        text-xs
                        border-gray-300
                        bg-gray-100
                        rounded-md
                      "
                    >
                      <option class="text-sm" value="latest" selected>
                        Latest First
                      </option>
                      <option class="text-sm" value="views">
                        Most view First
                      </option>
                    </select>
                  </div>

                  <div class="sm:mx-4 mx-2 mt-1">
                    <input
                      type="checkbox"
                      class="focus:ring-0 focus:ring-offset-0 text-emerald-500"
                      id="hasAnswers"
                      true-value="1"
                      false-value="0"
                      @change="search"
                      v-model="filters.has_answers"
                    />
                    <label class="h-10" for="hasComments">Has Answers</label>
                  </div>

                  <div class="sm:mx-4 mx-2 mt-1">
                    <input
                      type="checkbox"
                      class="focus:ring-0 focus:ring-offset-0 text-emerald-500"
                      id="hasVotes"
                      true-value="1"
                      false-value="0"
                      @change="search"
                      v-model="filters.has_votes"
                    />
                    <label class="h-10 text-xs sm:text-md" for="hasComments"
                      >Has votes</label
                    >
                  </div>
                </div>
              </section>

              <QuestionExcerptGroup
                v-for="(question, Qukey) in questions"
                :key="Qukey"
                :question="question"
              ></QuestionExcerptGroup>
            </div>
            <aside class="hidden xl:block xl:col-span-4">
              <LatestUsers />
              <div class="my-6">
                <LatestGroups />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JoinButton from "~/components/JoinButton";
import LatestUsers from "~/components/LatestUsers";
import LatestGroups from "~/components/LatestGroups";
import AddQuestion from "~/components/AddQuestion";
import Sidbar from "@/components/Sidbar";
import { mapGetters } from "vuex";
import axios from "axios";
import QuestionExcerptGroup from "../components/QuestionExcerptGroup";

export default {
  name: "qu",
  components: Sidbar,
  JoinButton,
  LatestUsers,
  LatestGroups,
  QuestionExcerptGroup,
  AddQuestion,
  middleware: "auth",

  layout: "newLayout",

  async asyncData({ store, $axios }) {
    await store.dispatch("questions/search");
    await store.dispatch("groups/fetchLatestGroups");
    await store.dispatch("users/fetchLatestUsers");
  },

  methods: {
    toggleModal() {
      this.isVisibility = !this.isVisibility;
    },
    async search() {
      await this.$store.dispatch("search", this.queryString);
    },
  },

  data() {
    return {
      filters: {
        has_answers: 0,
        has_votes: 0,
        orderBy: "views",
      },
      isVisibility: false,
    };
  },
  head() {
    return {
      title: "Questions",
    };
  },
  computed: {
    queryString() {
      return Object.keys(this.filters)
        .map((k) => `${k}=${this.filters[k]}`)
        .join("&");
    },

    ...mapGetters({
      questions: "questions/questions",
    }),
  },

  beforeMount() {
    this.search();
  },
};
</script>

<style scoped>
::selection {
  background-color: red;
  color: white;
}
</style>
