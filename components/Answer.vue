<template>
  <div>
    <div class="mt-4 sm:mx-0 mx-4">
      <h1 class="sr-only">Recent questions</h1>
      <ul role="list" class="space-y-4">
        <li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby="question-title-81614">
            <div>
              <div class="flex space-x-3">
                <div class="min-w-0 flex-1">
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="answer.user.image_profile"
                        alt=""
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900">
                        <span class="text-gray-600">
                          <span> Answered by</span>
                          <span class="">{{ answer.user.name }}</span>
                        </span>
                      </p>
                      <p class="text-sm text-gray-500">
                        <a href="#" class="hover:underline">
                          <time datetime="2020-12-09T11:43:00">{{
                            answer.created_date
                          }}</time>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  v-if="$auth.user.id === answer.user.id"
                  class="flex-shrink-0 self-center flex"
                >
                  <div class="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        @click="showDropDown = !showDropDown"
                        class="
                          -m-2
                          p-2
                          rounded-full
                          flex
                          items-center
                          text-gray-400
                          hover:text-gray-600
                        "
                        id="options-menu-0-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span class="sr-only">Open options</span>
                        <!-- Heroicon name: solid/dots-vertical -->
                        <svg
                          class="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      v-if="showDropDown"
                      class="
                        origin-top-right
                        absolute
                        right-0
                        mt-2
                        w-56
                        rounded-md
                        shadow-lg
                        bg-white
                        ring-1 ring-black ring-opacity-5
                        focus:outline-none
                      "
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu-0-button"
                      tabindex="-1"
                    >
                      <div class="py-1" role="none">
                        <EditAnswer
                          v-if="isVisibility"
                          @toggle-modal="toggleModal"
                          :answer="answer"
                          :question="question"
                        ></EditAnswer>
                        <a
                          href="#"
                          @click.prevent="toggleModal"
                          class="text-gray-700 flex px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="options-menu-0-item-0"
                        >
                          <svg
                            class="mr-2 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                          <span>Edit</span>
                        </a>

                        <a
                          href="#"
                          @click="deleteAnswer(answer)"
                          class="text-gray-700 flex px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="options-menu-0-item-1"
                        >
                          <!-- Heroicon name: solid/code -->
                          <svg
                            class="
                              mr-2
                              h-5
                              w-5
                              text-gray-400
                              group-hover:text-gray-500
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-x-3 my-4">
                <div class="flex-shrink-0 mx-4"></div>
                <div class="bg-Emerald-100 px-2 py-2 mt-6">
                  {{ answer.body }}
                </div>
              </div>
              <div class="border-t border-gray-300">
                <Accept :answer="answer"></Accept>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import EditAnswer from "~/components/EditAnswer";
import Accept from "~/components/Accept";
import axios from "axios";

export default {
  components: {
    EditAnswer,
    Accept,
  },

  props: ["answer", "question", "question_count"],

  data: () => ({
    isVisibility: false,
    showDropDown: false,
  }),

  methods: {
    str_plural(str, count) {
      return str + (count > 1 ? "s" : "");
    },

    toggleModal() {
      this.isVisibility = !this.isVisibility;
    },
    upvoteUnupvoteAnswer(answer) {
      this.$store.dispatch("upvoteUnupvoteAnswer", {
        answer_user: answer,
        question: this.question,
        answerKey: key,
      });
    },

    upvoteButtonText() {
      return this.answer.data.attributes.votes.user_upvoted_answer
        ? "upvoted"
        : "upvote";
    },

    upvoteCount() {
      if (this.answer.data.attributes.votes.votes_count > 0) {
        if (this.answer.data.attributes.votes.votes_count === 1) {
          return "Someone upvoted answer";
        } else if (this.answer.data.attributes.votes.votes_count === 2) {
          return "Two people upvoted answer ";
        } else {
          return (
            this.answer.data.attributes.votes.votes_count + "people upvoted"
          );
        }
      }
    },
    deleteAnswer(answer) {
      this.loading = true;

      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10B981",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.$store
            .dispatch("deleteAnswer", {
              question: this.question,
              answer: answer,
            })
            .then(() => {
              this.$swal("Deleted!", "Your Answer has been deleted.", "success");
            })
            .catch(() => {
              this.$swal("Failed!", "There was something wronge.", "warning");
            });
        }
      });

      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
