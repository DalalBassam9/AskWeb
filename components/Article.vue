<template>
  <div>
    <div class="mt-6">
      <div class="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-2xl">
        <div
          v-if="$auth.user.id === article.user.id"
          class="flex-shrink-0 self-center flex justify-end"
        >
          <div class="relative inline-block text-left">
            <div>
              <button
                type="button"
                @click="showDropDown = !showDropDown"
                class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
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
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu-0-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <nuxt-link
                  :to="group.name + '/article/' + article.id + '/edit/'"
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
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="flex">
          <span class="font-light text-gray-600 mx-6 mb-4">{{
            article.create_date
          }}</span>
        </div>

        <div class="mt-2 flex  h-32 w-38">
          <div class="mx-6">
            <img :src="article.image_article" class="w-full h-full rounded-xl" />
          </div>

          <div>
            <a
              href="#"
              class="text-2xl font-bold text-gray-600 hover:underline"
              >{{ article.title }}</a
            >
            <p class="mt-2 text-gray-600"></p>
            {{ article.body | substring(20) }}
          </div>
        </div>

        <div class="flex  items-center justify-between mt-4 mx-8">
          <nuxt-link
            :to="group.name + '/article/' + article.id"
            class="text-Emerald-500 hover:underline"
            >Read more</nuxt-link
          >
          <div>
            <a href="#" class="flex items-center"
              ><img
                :src="article.user.image_profile"
                alt="avatar"
                class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <h1 class="font-bold text-gray-700 hover:underline">
                {{ article.user.name }}
              </h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["article", "group"],

  data: () => ({
    isVisibility: false,
    showDropDown: false
  }),

  toggleModal() {
    this.isVisibility = !this.isVisibility;
  },

  filters: {
    substring: function(value) {
      if (value && value.length > 20) {
        value = value.substring(0, 110) + "....";
      }
      return value;
    }
  }
};
</script>
