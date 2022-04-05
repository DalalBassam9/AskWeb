<template>
  <div>

        <div class="flex flex-col   max-w-md w-44  mx-auto sm:max-w-md
            rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0">
                <img
                    class="h-40 w-full object-cover"
                    :src="group.image"
                    alt=""
                />
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col ">
                <div class="flex-1">
                    <p class="text-xl font-medium text-gray-800 ">
                        <nuxt-link
                            :to="'groups/' + group.name"
                            class="hover:underline"
                        >
                            {{ group.name }}
                        </nuxt-link>

                    </p>
                    <span class="text-gray-600">

                         {{membersCount()}}
                        </span>

                </div>

                <div class="mt-6 mx-auto ">
                    <nuxt-link :to="'groups/' + group.name">
                        <button
                            class="inline-flex items-center  bg-white justify-center px-4 py-2  text-Emerald-500 border border-Emerald-500 shadow-sm text-sm font-medium rounded-3xl   focus:outline-none "
                        >
                            <svg
                                class="h-6 w-6 "
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
                            Visit group
                        </button>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JoinButton from "~/components/JoinButton";

export default {
    props: ["group"],

    middleware: "auth",

    components: { JoinButton },
    methods: {
 
   membersCount() {
            return (
                this.group.joins_count +
                " " +
                (this.group.joins_count > 1 ? "Members" : "Member")
            );
   },
 
    }
};
</script>
