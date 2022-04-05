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

            <div class="bg-white rounded shadow w-full mt-8 p-4">
              <div class="flex justify-between items-center">
                <main class="w-full">
                  <div class="bg-white w-full rounded shadow my-4 p-4">
                    <div class="flex border-b border-gray-300 justify-between">
                      <h3 class="py-2">Add Answer</h3>

                      <i
                        class="
                          fa fa-pencil-square-o
                          mr-2
                          fa-lg
                          text-Emerald-500
                        "
                        aria-hidden="true"
                      ></i>
                    </div>

                    <div
                      class="
                        flex
                        justify-between
                        my-2
                        border-b border-gray-300
                        items-center
                      "
                    >
                      <div class="mb-6">
                        <img
                          :src="$auth.user.image_profile"
                          alt="profile image for user"
                          class="w-10 h-10 rounded-full"
                        />
                      </div>

                      <div class="flex-1 w-full mt-4 flex mx-4">
                        <textarea
                          v-model="body"
                          type="text"
                          rows="3"
                          name="body"
                        
                          class="
                            block
                            w-full
                            pt-3
                            pb-2
                            resize-none
                            focus:outline-none
                            border-none
                            focus:ring-0 focus:ring-offset-0
                            sm:text-sm
                          "
                          placeholder="add answer "
                        ></textarea>
                      </div>
                    </div>
                    <div class="error-feedback" v-if="errors.body">
                      <strong>{{ errors.body[0] }}</strong>
                    </div>
                  </div>

                  <div class="flex-shrink-0 mt-2">
                    <button
                      @click="addAnswer"
                      class="
                        flex
                        justify-center
                        rounded-2xl
                        text-white
                        items-center
                        w-full
                        px-4
                        py-2
                        border border-transparent
                        text-sm
                        font-medium
                        shadow-sm
                        bg-Emerald-500
                        focus:outline-none
                      "
                    >
                      <svg
                        class="-ml-1 mr-0.5 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span class="mr-1">Add</span>
                    </button>
                  </div>
                </main>
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
      showEdit: false,
      errors: {},
      loading: false,
      body: "",
    };
  },
  props: ["question"],

  methods: {
    close() {
      this.$emit("toggle-modal");
    },

    async addAnswer() {
      this.errors = "";
      this.loading = true;
      try {
        await this.$store.dispatch("questions/addAnswer", {
          body: this.body,
          question: this.question,
        });
        this.$toast.success("Your Answer has been submitted successfully");
        this.body = "";
        this.close();
      } catch (error) {
        if (error.response.status == 422) {
          this.errors = error.response.data.errors;
        }
      }
        this.loading = false;
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>