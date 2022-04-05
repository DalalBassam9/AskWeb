<template>
  <div class="my-4 mx-4">
    <button
      @click.prevent="JoinUnjoinGroup"
      :class="
        group.joined
          ? 'bg-Emerald-500  text-white'
          : 'bg-white border text-Emerald-500 border-Emerald-500'
      "
      class="
        inline-flex
        items-center
        justify-center
        px-4
        py-2
        shadow-sm
        text-sm
        font-medium
        rounded-3xl
        focus:outline-none
      "
    >
      <i
        v-if="group.joined"
        class="fa fa-sign-out fa-lg mr-1"
        aria-hidden="true"
      ></i>

      <svg
        v-if="!group.joined"
        class="-ml-1 mr-1 h-5 w-5"
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
      {{ joinButtonText() }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["group"],


  methods: {
 async JoinUnjoinGroup() {
  await this.$store.dispatch("groups/JoinUnjoinGroup", this.group.id).then(() => {
       this.$store.dispatch("groups/fetchUsersJoinsGroup", this.group.name);
      });
    },
    joinButtonText() {
      return this.group.joined ? "Leavet" : "Join";
    },
  },
};
</script>
