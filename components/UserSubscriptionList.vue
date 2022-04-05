<template>
  <div class="pt-4 pb-8 px-4">
    <div class="top-4 space-y-4">
      <section>
        <div class="bg-white rounded-lg shadow-2xl">
          <div class="p-6">
            <div class="mt-6 flow-root">
              <ul role="list" class="-my-4 divide-y divide-gray-200">
                <div v-for="(group, groupKey) in groups" :key="groupKey">
                  <li class="flex items-center py-4 space-x-3">
                    <div class="flex-shrink-0 ml-2">
                      <img
                        class="h-16 w-16 rounded-full"
                        :src="group.image"
                        alt="user image"
                      />
                    </div>
                    <div class="min-w-0 ml-8 flex-1">
                      <p class="text-sm font-medium text-gray-900">
                        <a href="#">{{ group.name }}</a>
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <nuxt-link :to="'groups/' + group.id">
                        <button
                          class="
                            inline-flex
                            items-center
                            bg-white
                            justify-center
                            px-4
                            py-2
                            text-Emerald-500
                            border border-Emerald-500
                            shadow-sm
                            text-sm
                            font-medium
                            rounded-3xl
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
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          Visit group
                        </button>
                      </nuxt-link>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  loading: false,

  data: () => ({
    groups: [],
  }),

  async mounted() {
    await this.getUserJoins();
  },
  methods: {
    async getUserJoins() {
      this.loading = true;
      try {
        await this.$axios
          .$get("/api/user/" + this.$route.params.id + "/groups")
          .then((resp) => {
            this.groups = resp.groups;
          });
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
  },
};
</script>
