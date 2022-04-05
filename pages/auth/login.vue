


<template>
  <div class="">
    <div class="flex justify-center self-center z-10">
      <div class="p-12 bg-white my-44 mx-auto rounded-2xl w-100">
        <div class="mb-4">
          <h3 class="font-semibold text-2xl text-center text-gray-800">
            Login
          </h3>
        </div>

        <form @submit.prevent="login" class="">
          <div class="flex flex-col mt-3" v-if="errors">
            <span class="text-Emerald-500 italic">{{ errors }}</span>
          </div>

          <div class="space-y-2">
            <label
              for="email"
              class="text-sm font-medium text-gray-700 tracking-wide"
              >Email</label
            >
            <input
              class="
                w-full
                text-base
                px-4
                py-2
                border border-gray-300
                rounded-2xl
                focus:ring-0 focus:ring-offset-0 focus:border-Emerald-500
              "
              v-model="form.email"
              type="text"
              placeholder="Email"
            />
          </div>

          <div class="space-y-2 mt-3">
            <label
              for="password"
              class="text-sm font-medium text-gray-700 tracking-wide"
              >Password</label
            >
            <input
              class="
                w-full
                text-base
                px-4
                py-2
                border border-gray-300
                rounded-2xl
                focus:ring-0 focus:ring-offset-0 focus:border-Emerald-500
              "
              v-model="form.password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div class="text-center mt-6">
            <button
              class="
                w-full
                focus:outline-none
                flex
                justify-center
                bg-Emerald-500
                text-gray-100
                p-3
                rounded-2xl
                tracking-wide
                font-semibold
                shadow-lg
                cursor-pointer
              "
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "guest",

  head() {
    return {
      title: "Login",
    };
  },

  data: () => ({
    form: {
      email: "",
      password: "",
    },
    errors: "",
  }),
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelSanctum", { data: this.form });
      } catch (err) {
        if ((err.response.status = 422)) {
          this.errors = "Could not sign you in with those credentials.";
        }
      }
    },
  },
};
</script>
