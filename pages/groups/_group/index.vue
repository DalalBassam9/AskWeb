<template>
  <div>
    <div class="py-4 bg-gray-200">
      <div
        class="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"
      >
        <Sidbar />
        <div class="xl:col-span-6  lg:col-span-9">
          <GroupDetails :group="group" />


          <Article
            :group="group"
            v-for="(article, articleKey) in articles"
            :article="article"
            :key="articleKey"
          >
          </Article>
        </div>

        <aside class="hidden xl:block xl:col-span-4">
          <div class=" top-4 space-y-4">
            <section>
              <div class="bg-white rounded-lg shadow">
                <div class="p-6">
                  <h2
                    id="who-to-follow-heading"
                    class="text-base font-medium text-gray-900"
                  >
                    Users Joins
                  </h2>
                  <div class="flex mt-2">
                    <div
                      class="w-20 h-1 rounded-full bg-Emerald-500 inline-flex"
                    ></div>
                  </div>

                  <div class="mt-6 flow-root">
                    <ul role="list" class="-my-4 divide-y divide-gray-200">
                      <UsersJoinsList
                        v-for="(user, userKey) in users"
                        :key="userKey"
                        :user="user"
                      ></UsersJoinsList>
                    </ul>
                  </div>
                  <div class="mt-6">
                    <button
                     
                      class="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-2xl text-white bg-Emerald-500"
                    >
                      More Load
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </aside>

        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Group from "@/components/Group";
import GroupDetails from "~/components/GroupDetails";
import JoinButton from "~/components/JoinButton";
import AddQuestion from "~/components/AddQuestion";
import QuestionExcerptGroup from "~/components/QuestionExcerptGroup";
import UsersJoinsList from "~/components/UsersJoinsList";
import Article from "~/components/Article";
export default {
  components: {
    Group,
    GroupDetails,
    QuestionExcerptGroup,
    AddQuestion,
    JoinButton,
    UsersJoinsList,
    Article
  },
    layout: 'newLayout',

  middleware: "auth",
  data() {
    return {
      isVisibility: false,
      articles: {}
    };
  },
  async asyncData({ store, params, $axios }) {
    await store.dispatch("groups/fetchGroup", params.group);
    await store.dispatch("groups/fetchUsersJoinsGroup", params.group);
    const { articles } = await $axios.$get(
      "api/group/articles/" + params.group
    );
    return { articles };
  },
  computed: {
    ...mapGetters({
      group: 'groups/group',
      users: "groups/users",
      articles: "articles"
    })
  },
  head() {
    return {
      title: "group " + this.group.name
    };
  },
  methods: {
    toggleModal() {
      this.isVisibility = !this.isVisibility;
    },
   
  }
};
</script>