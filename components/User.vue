<template>
  <li
    class="
      col-span-1
      flex flex-col
      text-center
      bg-white
      w-56
      mx-auto
      sm:w-full
      rounded-xl
      shadow-xl
    "
  >
    <div class="flex-1 flex flex-col p-2">
      <img
        class="
          w-32
          border-4 border-Emerald-500
          h-32
          flex-shrink-0
          mx-auto
          rounded-full
        "
        :src="user.image_profile"
        alt=""
      />
      <nuxt-link :to="'/users/' + user.id"
        ><h3 class="mt-2 text-gray-900 text-sm font-medium hover:underline">
          {{ user.name }}
        </h3></nuxt-link
      >
    </div>

    <div class="flex my-4 justify-center items-center mx-8">
      <nuxt-link :to="'/users/' + user.id">
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
            class="h-5 w-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            />
          </svg>
          View profile
        </button>
      </nuxt-link>
    </div>

    <div></div>
  </li>
</template>
<script>
import Sidbar from "~/components/Sidbar.vue";

import { mapGetters } from "vuex";
export default {


  components: {
    Sidbar,
  },

  props: ["user"],
};
</script>
