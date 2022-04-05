<template>
  <div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        v-if="!loading"
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
                  <div>
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
                        Edit Profile

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
                  </div>

                  <form
                    @submit.prevent="editProfile"
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div>
                      <label
                        for="email"
                        class="block my-4 text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div class="mt-2">
                        <input
                          id="email"  
                           required
                          v-model="email"
                          :class="{
                            'has-error': errors.email,
                          }"
                          name="email"
                          type="email"
                          autocomplete="email"
                        
                          class="
                            appearance-none
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            rounded-3xl
                            shadow-sm
                            placeholder-gray-400
                            focus:outline-none
                            focus:ring-0
                            focus:ring-offset-0
                            focus:border-Emerald-500
                            sm:text-sm
                          "
                        />
                        <span class="error-feedback" v-if="errors.email">
                          <strong>{{ errors.email[0] }}</strong>
                        </span>
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label
                        for="name"
                        class="block my-4 text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div class="mt-2">
                        <input
                          id="password"
                          required
                          v-model="name"
                          :class="{
                            'has-error': errors.name,
                          }"
                          name="name"
                          type="text"
                          autocomplete="current-password"
                      
                          class="
                            appearance-none
                            block
                            w-full
                            px-3
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
                        <span class="error-feedback" v-if="errors.name">
                          <strong>{{ errors.name[0] }}</strong>
                        </span>
                      </div>
                    </div>

                    <p
                      for="name"
                      class="block my-4 text-sm font-medium text-gray-700"
                    >
                      Change Photo
                    </p>

                    <div class="flex mt-4 text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="
                          relative
                          cursor-pointer
                          bg-white
                          border-Emerald-500 border-4
                          rounded-full
                          font-medium
                          text-Emerald-600
                          hover:text-Emerald-500
                          focus-within:outline-none
                          focus-within:ring-2
                          focus-within:ring-offset-2
                          focus-within:ring-Emerald-500
                        "
                      >
                        <img
                          v-if="!imagepreview"
                          :src="image"
                          class="h-32 w-32 rounded-full"
                        />

                        <img
                          v-if="imagepreview"
                          :src="imagepreview"
                          class="
                            h-32
                            w-32
                            rounded-full
                            relative
                            focus:ring-0 focus:ring-offset-0
                          "
                        />

                        <button
                          class="
                            absolute
                            bottom-5
                            right-28
                            left-24
                            bg-Emerald-500
                            rounded-full
                            h-8
                            w-8
                            text-2xl
                            mx-2
                            py-4
                            px-4
                            text-white
                            border-2 border-white
                            flex
                            justify-center
                            items-center
                          "
                        >
                          <i class="fa fa-camera" aria-hidden="true"></i>
                        </button>

                        <input
                          @change="imageSelected"
                          id="file-upload"
                          type="file"
                          class="
                            focus:border-Emerald-500
                            focus
                            focus:ring-0
                            focus:ring-offset-0
                            sr-only
                          "
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      class="
                        w-full
                        flex
                        justify-center
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
                      Edit
                    </button>
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

export default {


 // loading: false,

  props: ["getUser"],

  data() {
    return {
      errors: {},
      loading: false,
      user: {},
      imagepreview: null,
      name: "",
      email: "",
      image: "",
    };
  },

  async mounted() {
  this.loading = true;

    try {
      await this.$axios.$get("/api/user-auth").then((res) => {
        this.user = res.userAuth;
        this.name = this.user.name;
        this.email = this.user.email;
        this.image = this.user.image_profile;
      });
    } catch (error) {
      console.log(error.res);
     
    }
   this.loading = false;
  },

  methods: {
    close() {
      this.$emit("toggle-modal");
    },

    imageSelected(e) {
      this.image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (e) => {
        this.imagepreview = e.target.result;
      };
    },

    async editProfile() {

     this.loading = true;
     
      let data = new FormData();
      data.append("image", this.image);
      data.append("email", this.email);
      data.append("name", this.name);

      try {
         this.errors = {};
          let response = await this.$axios.$post("/api/edit-profile", data).then((response) => {
          this.name = "";
          this.image = "";
          this.email = "";
          this.close();
          this.$toast.success("your profile has been updated successfully");
        });
      } catch (error) {
        if (error.response.status == 422) {
          this.errors = error.response.data.errors;
        }
      } finally {
        this.getUser();
        this.loading = false;
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
