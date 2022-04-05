<template>
    <div>
        <div class=" items-center bg-white  shadow-xl  p-6  space-x-5">
            <div class="flex   justify-between">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <div class="relative">
                            <img
                                class="h-16 w-16 rounded-full"
                                :src="group.image"
                                alt=""
                            />
                        </div>
                    </div>

                    <div class="mx-4">
                        <h1 class="text-2xl font-bold pb-2 text-gray-900">
                            {{ group.name }}
                        </h1>
                        <p class="text-sm font-medium text-gray-500">
                            {{ group.description }}
                        </p>
                        <div>
                            <i
                                class="fa fa-users  text-Emerald-500 fa-lg mt-4  "
                                aria-hidden="true"
                            ></i>
                            <span class="text-Emerald-500 font-bold my-4">
                                {{ membersCount() }}</span
                            >
                        </div>
                    </div>
                </div>

                <div class="my-4 mx-4">
                    <join-button :group="group"></join-button>
                </div>
            </div>
  </div>

          <nuxt-link v-if="group.joined" :to="group.name + '/create-article/add'" class="my-4">
            <button
              class="inline-flex items-center justify-center px-2 py-2 mt-4  text-Emerald-500  shadow-sm text-sm font-medium rounded-3xl  bg-white border border-Emerald-500 focus:outline-none "
            >
              <i
                class="fa fa-pencil-square-o mr-2 fa-lg text-Emerald-500"
                aria-hidden="true"
              ></i>
              <span>Add Article</span>
            </button>
          </nuxt-link>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import JoinButton from "~/components/JoinButton";
export default {
    components: { JoinButton },


    props: ["group"],

    data() {
        return {
          //  users: [],
            isVisibility: false
        };
    },

    methods: {
        membersCount() {
            return (
                this.group.joins_count +
                " " +
                (this.group.joins_count > 1 ? "Members" : "Member")
            );
        }
    }
};
</script>
