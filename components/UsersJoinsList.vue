<template>
  <div>
    <li class="flex items-center py-4 space-x-3">
      <div class="flex-shrink-0 ml-2">
        <img
          class="h-8 w-8 rounded-full"
          :src="user.image_profile"
          alt="user image"
        />
      </div>
      <div class="min-w-0 ml-8 flex-1">
        <p class="text-sm font-medium text-gray-900">
          <a href="#">{{ user.name }}</a>
        </p>
      </div>
      <div class="flex-shrink-0">
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
    </li>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Group from "@/components/Group";

export default {
  loading: false,

  props: ["user"],
};
</script>
