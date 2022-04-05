<template>
  <div>
    <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8"
        >
          <div
            class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2"
          >
            <div class="flex-shrink-0 flex items-center">
              <router-link :to="'/questions'">
                <h3 class="text-xl text-Emerald-500">ASK WEB</h3>
              </router-link>
            </div>
          </div>
          <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div
              class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0"
            >
              <div class="w-full">
                <label for="search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
                  >
                    <svg
                      class="h-5 w-5 text-Emerald-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    @change="Search"
                    v-model="search.query"
                    name="search"
                    class="block w-full bg-Emerald-100  border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400     focus:ring-0 focus:ring-offset-0 focus:border-Emerald-500     sm:text-sm"
                    placeholder="Search for question , user , group"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4"
          >
            <a
              href="#"
              @click.prevent="logout"
              class="hover:text-teal-200   text-Emerald-500  "
              >LOGOUT</a
            >
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: {
      query: ""
    }

  }),

  methods: {
    logout() {
      this.$auth.logout();
    },

    Search() {
      this.$router.push({
        path: "/search/" + this.search.query
      });
    }
  }
};
</script>
<style scoped>
.font{
font-family: cursive;
}
</style>
