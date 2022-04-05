<template>
  <div>
    <div class="py-4 bg-gray-200">
      <div
        class="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"
      >
        <Sidbar />

        <div class="space-y-6 mt-5 sm:px-6 lg:px-0 lg:col-span-7">
          <div class="relative py-16 bg-white overflow-hidden">
            <div class="relative px-4 sm:px-6 lg:px-8">
              <div class="text-lg max-w-prose mx-auto">
                <h1>
                  <span
                    class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-Emerald-500 sm:text-4xl"
                    >{{ article.title }}</span
                  >
                </h1>

                <div class="flex space-x-3 my-8">
                  <div class="flex-shrink-0">
                    <img
                      class="h-12  border-2  border-Emerald-500    w-12 rounded-full"
                      :src="article.user.image_profile"
                      alt=""
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <p class="font-medium text-gray-900">
                      <a
                        href="#"
                        class="hover:underline text-md  text-gray-600"
                      >
                        <span>Article by </span>
                        <span>{{ article.user.name }}</span>
                      </a>
                    </p>
                    <p class="text-md text-gray-500">
                      <a href="#" class="hover:underline"
                        >{{ article.create_date }}
                      </a>
                    </p>
                  </div>
                </div>

                <figure>
                  <img
                    class=" h-80 w-full object-cover  border-Emerald-500  border-2  rounded-lg"
                    :src="article.image_article"
                    alt=""
                    width="1310"
                    height="873"
                  />
                </figure>
                <blockquote>
                  <p class="mt-8 text-xl text-gray-500 leading-8">
                    {{ article.body }}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},

  loading: false,
  middleware: "auth",
  data() {
    return {
      loading: false,
      isVisibility: false
    };
  },
  layout: 'newLayout',
  data: () => ({
    article: {}

  }),

  head() {
    return {
      title: "article" +" "+ this.article.title
    };
  },

  async asyncData({ params, $axios }) {
    const { article } = await $axios.$get(
      "api/articles/" + params.id
    );
    return { article };
  }
};
</script>
