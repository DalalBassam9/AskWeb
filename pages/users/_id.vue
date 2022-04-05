<template>
  <div class="">
    <main class="py-10">
      <div
        class="
          mt-8
          max-w-6xl
          mx-auto
          grid grid-cols-1
          gap-6
          sm:px-6
          lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3
        "
      >
        <section class="lg:col-start-1 lg:col-span-1 max-w-lg xs:max-w-sm">
          <div
            class="
              bg-white
              items-center
              justify-center
              px-4
              py-5
              shadow
              sm:rounded-xl sm:px-6
            "
          >
            <div class="mt-6 text-center">
              <div class="justify-center flex items-center">
                <img
                  class="rounded-full h-44 w-44 border-emerald-500 border-4"
                  :src="user.image_profile"
                />
              </div>

              <p class="my-4">{{ user.name }}</p>

              <div class="flex mx-2 justify-center items-center">
                <span class="border-r-2 h-5 px-2 border-Emerald-500"
                  >Followers
                  <strong class="text-Emerald-500">{{
                    user.followers_count
                  }}</strong></span
                >

                <span class="border-r-2 h-5 px-2 border-Emerald-500"
                  >Following
                  <strong class="text-Emerald-500">
                    {{ user.followings_count }}</strong
                  >
                </span>

                <span class="px-2"
                  >Questions
                  <strong class="text-Emerald-500">{{
                    user.questions_count
                  }}</strong>
                </span>
              </div>
            </div>

            <div class="my-4 mr-4">
              <edit-profile
                v-if="isVisibility"
                :getUser="getUser"
                @toggle-modal="toggleModal"
              ></edit-profile>

              <div class="mt-10 flex flex-col justify-stretch">
                <button
                  v-if="$auth.user.id == user.id"
                  @click.prevent="toggleModal"
                  type="button"
                  class="
                    inline-flex
                    items-center
                    justify-center
                    px-4
                    py-2
                    border border-transparent
                    text-sm
                    font-medium
                    rounded-3xl
                    shadow-sm
                    text-white
                    bg-Emerald-500
                    focus:outline-none
                  "
                >
                  <i
                    class="fa fa-pencil-square-o mr-2 fa-lg text-white"
                    aria-hidden="true"
                  ></i>
                  Edit Profile
                </button>
              </div>

              <div class="flex mt-4 justify-center items-center mx-8">
                <div>
                  <button
                    v-if="!followed && $auth.user.id !== user.id"
                    type="button"
                    @click.prevent="storeFollowing(user)"
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
                    v-if="followed && $auth.user.id !== user.id"
                    type="button"
                    @click.prevent="deleteFollowing(user)"
                    class="
                      inline-flex
                      justify-center
                      bg-white
                      border border-Emerald-500
                      text-Emerald-500
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
              </div>
            </div>
          </div>
        </section>

        <div class="space-y-4 lg:col-span-2">
          <div class="sm:mt-2 rounded-lg bg-white">
            <div class="">
              <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"></div>
              <nav class="-mb-px border-b mx-4 border-gray-200 flex space-x-8">
                <a
                  @click="activeComp = 'Followings'"
                  :class="{
                    barActive: activeComp === 'Followings',
                  }"
                  class="
                    text-gray-600
                    whitespace-nowrap
                    py-4
                    px-1
                    font-medium
                    text-sm
                  "
                  aria-current="page"
                >
                  Following</a
                >

                <a
                  @click="activeComp = 'followers'"
                  :class="{
                    barActive: activeComp === 'followers',
                  }"
                  class="
                    text-gray-600
                    whitespace-nowrap
                    py-4
                    px-1
                    font-medium
                    text-sm
                  "
                  aria-current="page"
                >
                  Followers</a
                >

                <a
                  @click="activeComp = 'UserQuestionsList'"
                  :class="{
                    barActive: activeComp === 'UserQuestionsList',
                  }"
                  class="
                    text-gray-600
                    whitespace-nowrap
                    py-4
                    px-1
                    font-medium
                    text-sm
                  "
                  aria-current="page"
                >
                  My questions</a
                >

                <a
                  @click="activeComp = 'UserSavesList'"
                  :class="{
                    barActive: activeComp === 'UserSavesList',
                  }"
                  class="
                    text-gray-600
                    whitespace-nowrap
                    py-4
                    px-1
                    font-medium
                    text-sm
                  "
                  aria-current="page"
                >
                  Saved</a
                >

                <a
                  @click="activeComp = 'UserSubscriptionList'"
                  :class="{
                    barActive: activeComp === 'UserSubscriptionList',
                  }"
                  class="
                    border-transparent
                    text-gray-500
                    hover:text-gray-700 hover:border-gray-300
                    whitespace-nowrap
                    py-4
                    px-1
                    border-b-2
                    font-medium
                    text-sm
                  "
                >
                  Subscriptions
                </a>
              </nav>

              <component
                :is="activeComp"
                v-bind="currentProperties"
              ></component>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Followings from "@/components/Followings.vue";
import followers from "@/components/followers.vue";
import UserSavesList from "~/components/UserSavesList";
import UserSubscriptionList from "~/components/UserSubscriptionList";
import EditProfile from "~/components/EditProfile";
import UserQuestionsList from "~/components/UserQuestionsList";

import { mapGetters } from "vuex";
export default {
  middleware: "auth",

  layout: "newLayout",

  loading: false,

  components: {
    Followings,
    followers,
    EditProfile,
    UserSavesList,
    UserQuestionsList,
    UserSubscriptionList,
  },

  data: () => ({
    user: [],
    activeComp: "Followings",
    isVisibility: false,
    followed: {},
    followers: {},
    loading: false,
  }),

  async asyncData({ params, $axios}) {
    const { user, groups } = await $axios.$get("api/user/" + params.id);
    const { followed } = await $axios.$get("/api/get-user/" + params.id);

    return { followed, user, groups };
  },

  head() {
    return {
      title: "Profile" + " " + this.user.name,
    };
  },

  methods: {
    toggleModal() {
      this.isVisibility = !this.isVisibility;
    },

    async storeFollowing(user) {
   
      this.loading = true;
      try {
        await this.$axios
          .$post("/api/following/" + user.id)
          .then((res) => {
            this.followed = res.followed;
            this.user.followers_count++;
          });
      } catch (error) {
        console.log(error.res);
      }

      this.loading = false;
    },

    async getUser() {
      this.loading = true;
      try {
          await this.$axios
          .$get("/api/user/" + this.$route.params.id)
          .then((resp) => {
            this.user = resp.user;
          });
      } catch (error) {
        console.log(error.res);
      }
      
      this.loading = false;
    },

    async deleteFollowing(user) {
      this.loading = true;
      try {
          await  this.$axios
          .$post("/api/following/delete/" + user.id)
          .then((res) => {
            this.followed = res.followed;
            this.user.followers_count--;
          });
      } catch (error) {
        console.log(error.res);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.barActive {
  @apply border-Emerald-500 border-b-2 text-Emerald-500;
}
</style>
