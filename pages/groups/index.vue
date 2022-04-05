<template>
  <div>
    <div class="py-4">
      <div
        class="
          max-w-3xl
          mx-auto
          sm:px-6
          lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8
        "
      >
        <Sidbar />
        <div class="col-span-8">
          <nav
            class="bg-white border-b mt-2 border-gray-200 flex"
            aria-label="Breadcrumb"
          >
            <ol
              role="list"
              class="
                max-w-screen-xl
                w-full
                mx-auto
                px-4
                flex
                space-x-4
                sm:px-6
                lg:px-8
              "
            >
              <li class="flex">
                <div class="flex items-center">
                  <a href="#" class="text-gray-400 hover:text-gray-500">
                    <svg
                      class="flex-shrink-0 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                      />
                    </svg>
                    <span class="sr-only">Home</span>
                  </a>
                </div>
              </li>

              <li class="flex">
                <div class="flex items-center">
                  <svg
                    class="flex-shrink-0 w-6 h-full text-gray-200"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  <a
                    href="#"
                    class="
                      ml-4
                      text-xl
                      font-medium
                      text-Emerald-500
                      hover:text-gray-700
                    "
                    >Groups</a
                  >
                </div>
              </li>
            </ol>
          </nav>

          <div class="">
            <div class="">
              <div class="text-center"></div>
              <div
                class="
                  mt-2
                  grid
                  gap-x-8 gap-y-6
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                "
              >
                <Group
                  v-for="(group, groupkey) in groups"
                  :key="groupkey"
                  :group="group"
                ></Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { mapGetters, mapState } from 'vuex';

import Group from "@/components/Group";
import Sidbar from "~/components/Sidbar.vue";
export default {
  components: { Group, Sidbar },

  middleware: "auth",
  head() {
    return {
      title: "Groups",
    };
  },
  layout: "newLayout",
  async asyncData({ store }) {
    await store.dispatch("groups/fetchGroups");
  },

  computed: {
      ...mapGetters({
         groups: 'groups/groups'
      }),

  },
};
</script>
