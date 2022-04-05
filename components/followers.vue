<template>
  <div>
    <div v-for="(follow, follKey) in followers" :key="follKey">
      <li class="flex items-center py-4 space-x-3 mx-4 justify-between">
        <div class="flex-shrink-0 ml-2">
          <img
            class="h-8 w-8 rounded-full"
            :src="follow.image_profile"
            alt="user image"
          />
        </div>
        <div class="min-w-0 ml-8 flex-1">
          <p class="text-sm font-medium text-gray-900">
            <nuxt-link :to="'/users/' + follow.id">{{ follow.name }}</nuxt-link>
          </p>
        </div>
        <div class="flex-shrink-0">
          <button
            v-if="!follow.following && $auth.user.id !== follow.id"
            type="button"
            @click.prevent="storeFollowing(follow)"
            :disabled="loading"
            class="
              inline-flex
              bg-Emerald-500
              text-white
              items-center
              focus:outline-none
              px-3
              py-2
              rounded-2xl
              text-sm
              font-medium
            "
          >
            <svg
              class="mr-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
              />
            </svg>
            <span class="pr-1"> follow </span>
          </button>

          <button
            v-if="follow.following && $auth.user.id !== follow.id"
            type="button"
            @click.prevent="deleteFollowing(follow)"
            :disabled="loading"
            class="
              inline-flex
              bg-white
              border border-Emerald-500
              text-Emerald-500
              justify-center
              items-center
              focus:outline-none
              px-3
              py-2
              rounded-2xl
              text-sm
              font-medium
            "
          >
            <i class="fa fa-user-times mr-1" aria-hidden="true"></i>
            <span class="pr-1"> unfollow </span>
          </button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "auth",
  loading: false,

  data() {
    return {
      loading: false,
      followers: [],
      user: {},
      userAuth: {},
    };
  },

  created() {
    this.getFollowers();
    this.getUser();
  },

  methods: {
    async getFollowers() {
      this.loading = true;
      try {
        await this.$axios
          .$get("api/followers/" + this.$route.params.id)
          .then((res) => {
            this.followers = res.followers;
          });
      } catch (err) {
        console.log(err.res);
      }

      this.loading = false;
    },

    getUser() {
      this.$axios
        .$get("/api/user/" + this.$route.params.id)
        .then((resp) => {
          this.user = resp.user;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async storeFollowing(follow) {
      this.loading = true;
      try {
        await this.$axios.$post("/api/following/" + follow.id).then((res) => {
          follow.following = res.followed;

          this.user.followers_count++;
        });
      } catch (err) {
        console.log(err.res);
      }

      this.loading = false;
    },

    async deleteFollowing(follow) {
      try {
        await this.$axios
          .$post("/api/following/delete/" + follow.id)
          .then((res) => {
            follow.following = res.followed;
            this.user.followers_count--;
          });
      } catch (err) {
        console.log(err.res);
      }
    },
  },
};
</script>
<style>
.m-t-5 {
  margin-top: 5px;
}
</style>
