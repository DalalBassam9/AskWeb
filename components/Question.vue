<template>
  <div>
    <div class="mt-4 sm:mx-0 mx-4">
      <h1 class="sr-only">Recent questions</h1>
      <ul role="list" class="space-y-4">
        <li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby="question-title-81614">
            <div>
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="question.user.image_profile"
                    alt=""
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#" class="hover:underline text-gray-600">
                      <span>Asked by </span>
                      <span>{{ question.user.name }}</span></a
                    >
                  </p>
                  <p class="text-sm text-gray-500">
                    <a href="#" class="hover:underline">
                      <time datetime="2020-12-09T11:43:00">{{
                        question.created_date
                      }}</time>
                    </a>
                  </p>
                </div>
                <button
                  type="button"
                  @click="addSaveQuestion(question)"
                  :class="[
                    question.saved ? 'border-Emerald-500' : 'border-gray-400',
                  ]"
                  class="
                    flex
                    focus:outline-none
                    border
                    px-4
                    text-center
                    items-center
                    justify-center
                    py-1
                    rounded-2xl
                    space-x-2
                    text-gray-500
                    hover:text-gray-500
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      question.saved ? 'text-Emerald-500' : 'text-gray-400',
                    ]"
                    class="h-5 w-5 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                  <span
                    class="font-medium"
                    :class="[
                      question.saved ? 'text-Emerald-500' : 'text-gray-400',
                    ]"
                  >
                    {{ savesCount() }}</span
                  >
                </button>
              </div>
              <h2
                id="question-title-81614"
                class="my-4 text-base font-medium text-gray-900"
              >
                {{ question.title }}
              </h2>

              <div
                class="
                  my-10
                  overflow-y-visible
                  w-3/4
                  prose
                  max-w-none
                  text-sm text-gray-700
                  space-y-4
                "
              >
                <p>{{ question.body }}</p>
              </div>

              <td class="mb-4 text-lg text-gray-800 font-medium">
                <div class="flex items-center -space-x-2">
                  <span
                    class="flex-shrink-0 text-sm px-4 text-gray-600 font-medium"
                  >
                    {{ upvoteCount() }}</span
                  >
                </div>
              </td>

              <div class="mt-1 flex justify-between border-t border-gray-300">
                <div class="flex space-x-4 mt-2">
                  <div class="flex">
                    <button
                      type="button"
                      @click="
                        $store.dispatch('VoteUnvoteQuestion', question.id)
                      "
                      class="flex text-sm w-full focus:outline-none"
                    >
                      <i
                        class="fa fa-arrow-up fa-lg mt-1"
                        :class="[
                          question.voted ? 'text-Emerald-500' : 'text-gray-600',
                        ]"
                        aria-hidden="true"
                      ></i>

                      <span
                        class="ml-2"
                        :class="
                          question.voted
                            ? 'text-Emerald-500 font-bold'
                            : 'text-gray-600'
                        "
                        >{{ upvoteButtonText() }}</span
                      >
                    </button>
                  </div>

                  <div></div>
                </div>

                <div class="text-Emerald-500 flex mt-1">
                  <svg
                    class="h-5 w-5 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <strong class="ml-1 text-md"> {{ answersCount() }}</strong>
                </div>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>

    <AddAnswer
      v-if="isVisibility"
      :question="question"
      @toggle-modal="toggleModal"
    ></AddAnswer>

    <div class="flex sm:mx-0 mx-4 my-4">
      <button
        @click.prevent="toggleModal"
        class="
          inline-flex
          items-center
          justify-center
          px-2
          py-2
          text-Emerald-500
          shadow-sm
          text-sm
          font-medium
          rounded-3xl
          bg-white
          border border-Emerald-500
          focus:outline-none
        "
      >
        <i
          class="fa fa-pencil-square-o mr-2 fa-lg text-Emerald-500"
          aria-hidden="true"
        ></i>

        <span> Add Answer</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},

  computed: {
    ...mapGetters({
      question: "questions/question",
    }),
  },

  data: () => ({
    isVisibility: false,
    loading : false,
  }),

  methods: {
    str_plural(str, count) {
      return str + (count > 1 ? "s" : "");
    },

    likesCount() {
      if (this.question.likes_count > 0) {
        return (
          this.question.likes_count +
          " " +
          (this.question.likes_count > 1 ? "likes" : "like")
        );
      }
    },

    savesCount() {
      return (
        this.question.save_count +
        " " +
        (this.question.save_count > 1 ? "saves" : "save")
      );
    },

    upvoteButtonText() {
      return this.question.voted ? "upvoted" : "upvote";
    },

    upvoteCount() {
      if (this.question.votes_count > 0) {
        if (this.question.votes_count === 1) {
          return "Someone upvoted question";
        } else if (this.question.votes_count === 2) {
          return "Two people upvoted question ";
        } else {
          return this.question.votes_count + " " + "people upvoted";
        }
      }
    },
    answersCount() {
      return (
        this.question.answers_count +
        " " +
        (this.question.answers_count > 1 ? "Answers" : "Answer")
      );
    },

    async addSaveQuestion(question) {
     await this.$store.dispatch("questions/addSaveQuestion", question);
    },


    toggleModal() {
      this.isVisibility = !this.isVisibility;
    },
  },
};
</script>

<style></style>
