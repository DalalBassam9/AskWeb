<template>
  <div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div
          @click.prevent="close"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>

        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-lg
            px-4
            pt-5
            pb-4
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
          "
        >
          <div class="bg-white flex">
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                @click.prevent="close"
                type="button"
                class="
                  bg-white
                  rounded-md
                  text-gray-400
                  hover:text-gray-500
                  focus:outline-none
                "
              >
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="sm:flex sm:items-start">
              <div class="flex flex-col py-6 sm:px-6 lg:px-20">
                <div class="mx-auto max-w-sm lg:w-80">
                  <div class="border-b border-gray-300">
                    <h2
                      class="
                        mt-2
                        pb-7
                        text-2xl text-center
                        font-extrabold
                        text-gray-700
                      "
                    >
                      Edit Question

                      <i
                        class="
                          fa fa-pencil-square-o
                          mr-2
                          fa-lg
                          text-Emerald-500
                        "
                        aria-hidden="true"
                      ></i>
                    </h2>
                  </div>

                  <form @submit.prevent="editQuestion">
                    <div class="space-y-1">
                      <label
                        for="name"
                        class="block my-4 text-sm font-medium text-gray-700"
                      >
                        body
                      </label>
                      <div class="mt-2">
                        <textarea
                          id="about"
                          v-model="body"
                          name="body"
                          :class="{
                            'has-error': errors.body,
                          }"
                          rows="3"
                          class="
                            shadow-sm
                            resize-none
                            px-3
                            py-3
                            focus:ring-0
                            focus:ring-offset-0
                            focus:border-Emerald-500
                            focus
                            mt-1
                            block
                            w-full
                            sm:text-sm
                            border border-gray-300
                            rounded-3xl
                          "
                        ></textarea>

                        <span class="error-feedback" v-if="errors.body">
                          <strong>{{ errors.body[0] }}</strong>
                        </span>
                      </div>
                    </div>

                    <div class="flex">
                      <button
                        type="submit"
                        class="
                          w-full
                          flex
                          justify-center
                          items-center
                          my-5
                          py-2
                          px-4
                          border border-transparent
                          rounded-2xl
                          shadow-sm
                          text-sm
                          font-medium
                          text-Emerald-500
                          bg-white
                          border-Emerald-500
                          focus:outline-none
                        "
                      >
                        <svg
                          class="mr-2 h-5 w-5 text-Emerald-500"
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
                      </button>
                      <button
                        type="button"
                        @click="close"
                        class="
                          w-full
                          mx-2
                          flex
                          justify-center
                          items-center
                          my-5
                          py-2
                          px-4
                          border border-transparent
                          rounded-2xl
                          shadow-sm
                          text-sm
                          font-medium
                          text-white
                          bg-Emerald-500
                          focus:outline-none
                        "
                      >
                        <i class="fa fa-times mr-2" aria-hidden="true"></i>

                        <span>Canel</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      errors: {},
      loading: false,
      body: this.question.body,
    };
  },

  props: ["question"],

  methods: {
    close() {
      this.$emit("toggle-modal");
    },

    async editQuestion() {
      this.errors = "";
      this.loading = true;

      try {
        await this.$store.dispatch("questions/editQuestion", {
          body: this.body,
          questionId: this.question.id,
        });

        this.body = "";
        this.close();

        this.loading = false;
      } catch (error) {
        if (error.response.status == 422) {
          this.errors = error.response.data.errors;
        }
      } finally {
        this.$store.dispatch("search");
      }
    },
  },
};
</script>

<style scoped>
.has-error {
  border-style: solid;
  border-color: red;
}
.error-feedback {
  color: red;
}
</style>