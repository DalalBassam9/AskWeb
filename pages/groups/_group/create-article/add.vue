<template>
  <div>
    <div>
      <div class="py-4 bg-gray-200">
        <div
          class="
            max-w-3xl
            mx-auto
            sm:px-6
            lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8
          "
        >
          <Sidbar />

          <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-7">
            <form
              @submit.prevent="addArticle"
              method="POST"
              enctype="multipart/form-data"
            >
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <div
                      class="
                        flex
                        border-1 border-b
                        h-10
                        border-gray-200
                        justify-between
                      "
                    >
                      <h3 class="text-lg leading-6 font-medium text-gray-800">
                        Add New Article
                      </h3>

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
                  </div>

                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-2 sm:col-span-2">
                      <label
                        for="company-website"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <div class="mt-2">
                        <input
                          id="email"
                          v-model="title"
                          :class="{
                            'has-error': errors.title,
                          }"
                          name="title"
                          type="text"
                          class="
                            appearance-none
                            block
                            w-full
                            px-6
                            py-2
                            border border-gray-300
                            rounded-3xl
                            shadow-sm
                            placeholder-gray-400
                            focus:ring-0
                            focus:ring-offset-0
                            focus:border-Emerald-500
                            sm:text-sm
                          "
                        />
                        <span class="error-feedback" v-if="errors.title">
                          <strong>{{ errors.title[0] }}</strong>
                        </span>
                      </div>
                    </div>

                    <div class="col-span-2">
                      <label
                        for="about"
                        class="block text-sm font-medium text-gray-700"
                      >
                        body
                      </label>
                      <div class="mt-1">
                        <textarea
                          :class="{
                            'has-error': errors.body,
                          }"
                          id="body"
                          v-model="body"
                          name="body"
                          rows="10"
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

                    <div class="col-span-2">
                      <label class="block text-sm font-medium text-gray-700">
                        Article Image</label
                      >
                      <div
                        class="
                          mt-1
                          border-2 border-gray-300 border-dashed
                          rounded-md
                          px-6
                          pt-5
                          pb-6
                          flex
                          justify-center
                        "
                      >
                        <div class="space-y-1 text-center">
                          <div class="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              class="
                                relative
                                cursor-pointer
                                bg-white
                                rounded-md
                                font-medium
                                text-Em text-Emerald-600
                                hover:text-Emerald-500
                                focus-within:outline-none
                                focus-within:ring-2
                                focus-within:ring-offset-2
                                focus-within:ring-Emerald-500
                              "
                            >
                              <div v-if="!imagepreview">
                                <svg
                                  class="mx-auto h-12 w-12 text-gray-400"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <span>Upload Image</span>
                              </div>

                              <img
                                v-if="imagepreview"
                                :src="imagepreview"
                                class="h-52 w-48 rounded"
                              />

                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                @change="imageSelected"
                                class="sr-only"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="px-4 py-3 sm:px-6">
                    <button
                      type="submit"
                      class="
                        flex
                        justify-end
                        items-end
                        rounded-2xl
                        text-white
                        t
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errors: {},
      article: {},
      loading: false,
      title: null,
      body: null,
      image: null,
      imagepreview: null,
    };
  },

  head() {
    return {
      title: "Add Article",
    };
  },
  layout: "newLayout",
  props: ["group"],

  methods: {
    imageSelected(e) {
      this.image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (e) => {
        this.imagepreview = e.target.result;
      };
    },

  

    async addArticle() {
    
      this.loading = true;

      let data = new FormData();
      data.append("image", this.image);
      data.append("title", this.title);
      data.append("body", this.body);

      try {
          this.errors = "";
             await this.$axios.$post(
          "/api/group/add-article/" + this.$route.params.group,
          data
        );

        this.title = "";
        this.body = "";
        this.image = null;
        this.imagepreview = null;

        this.$toast.success("Your article has been submitted successfully");
        this.$router.push({
          path: "/groups/" + this.$route.params.group,
        });
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
