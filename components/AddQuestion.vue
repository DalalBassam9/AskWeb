<template>
  <div>
    <div class="bg-white rounded shadow w-full mt-2 p-4">
      <div class="flex justify-between items-center">
        <main class="w-full">
          <div class="bg-white w-full rounded shadow my-4 p-4">
            <div class="flex border-b border-gray-300 justify-between">
              <h3 class="py-2 border-b">Add Question</h3>
              <i
                class="fa fa-pencil-square-o mr-2 fa-lg text-Emerald-500"
                aria-hidden="true"
              ></i>
            </div>

            <form @submit.prevent="addQuestion">
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
                    id="comment"
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
                    placeholder="Add Question "
                  ></textarea>
                </div>
              </div>
              <div class="error-feedback" v-if="errors.body">
                <strong>{{ errors.body[0] }}</strong>
              </div>

              <div class="flex-shrink-0 mt-2">
                <button
                  type="submit"
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

                  <span class="mr-1"> Add Question</span>
                </button>
              </div>
            </form>
          </div>
        </main>
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
      body: "",
    };
  },

  methods: {

    
    async addQuestion() {
      this.errors = "";
      this.loading = true;

      try {
        await this.$store.dispatch("questions/addQuestion", {
          body: this.body,
        });
        this.body = "";
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
.has-error {
  border-style: solid;
  border-color: red;
}
.error-feedback {
  color: red;
}
</style>