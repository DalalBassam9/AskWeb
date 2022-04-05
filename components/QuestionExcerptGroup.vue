<template>
    <div>
        <div class="mt-6" >
            <h1 class="sr-only">Recent questions</h1>
            <ul role="list" class="space-y-4">
                <li class="bg-white w-96 mx-auto sm:w-full px-4 py-6 shadow-2xl sm:p-6 sm:rounded-lg">
                    <article aria-labelledby="question-title-81614">
                        <div>
                            <div class="flex space-x-3">
                                <div class="flex-shrink-0">
                                    <img
                                        class="h-10 w-10 rounded-full"
                                        :src="question.user.image_profile"
                                        alt=""
                                    />
                                </div>
                                <div class="min-w-0 flex-1">
                                    <p
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        <a href="#" class="hover:underline">
                                            <span class="text-Emerald-500"
                                                >Asked by
                                            </span>
                                            <span class="text-gray-700">{{
                                                question.user.name
                                            }}</span></a
                                        >
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        <a href="#" class="hover:underline">
                                            <time
                                                datetime="2020-12-09T11:43:00"
                                                >{{
                                                    question.created_date
                                                }}</time
                                            >
                                        </a>
                                    </p>
                                </div>
                                <div v-if="$auth.user.id === question.user.id" class="flex-shrink-0 self-center flex">
                                    <div
                                        class="relative inline-block text-left"
                                    >
                                        <div>
                                            <button
                                                type="button"
                                                @click="
                                                    showDropDown = !showDropDown
                                                "
                                                class="-m-2 p-2 rounded-full focus:outline-none flex items-center text-gray-600 hover:text-gray-600"
                                                id="options-menu-0-button"
                                                aria-expanded="false"
                                                aria-haspopup="true"
                                            >
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
                                                <EditQuestion
                                                    v-if="isVisibility"
                                                    @toggle-modal="toggleModal"
                                                    :question="question"
                                                ></EditQuestion>
                                         
                                                <a
                                                    href="#"
                                                    @click.prevent="toggleModal"
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
                                                </a>


                                                <a
                                                    href="#"
                                                    @click="
                                                        deleteQuestion(question)
                                                    "
                                                    class="text-gray-700 flex px-4 py-2 text-sm"
                                                    role="menuitem"
                                                    tabindex="-1"
                                                    id="options-menu-0-item-1"
                                                >
                                                    <svg
                                                        class="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <span>Delete</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nuxt-link :to="'/questions/' + question.id">
                                <h2
                                    id="question-title-81614"
                                    class="mt-4 hover:underline text-base font-medium text-gray-900"
                                >
                                    {{ question.body }}
                                </h2></nuxt-link
                            >
                        </div>

                        <div class="mt-6 flex justify-between space-x-8">
                            <div class="flex space-x-6">
                                <span class="inline-flex items-center text-sm">
                                    <button
                                        type="button"
                                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                    >
               <i
                        class="fa fa-arrow-up fa-lg  "

                        aria-hidden="true"
                      ></i>



                                              <span class="font-medium  text-gray-900">
                                            <strong>{{
                                                question.votes_count
                                            }}</strong>
                                            {{
                                                str_plural(
                                                    "vote",
                                                    question.votes_count
                                                )
                                            }}</span
                                        >
                                    </button>
                                </span>
                                <span class="inline-flex items-center text-sm">
                                    <button
                                        type="button"
                                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <svg
                                            class="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span    v-if="question.views_count > 0"   class="font-medium text-gray-900">
                                            <strong>{{
                                                question.answers_count
                                            }}</strong>
                                            {{
                                                str_plural(
                                                    "answer",
                                                    question.answers_count
                                                )
                                            }}</span
                                        >

                                        <strong class="font-medium text-gray-900" v-else> 0 answer</strong>
                                    </button>
                                </span>
                                <span class="inline-flex items-center text-sm">
                                    <button
                                        type="button"
                                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <svg
                                            class="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span    v-if="question.views_count > 0"   class="font-medium text-gray-900">
                                            {{
                                                question.views_count +
                                                    " " +
                                                    str_plural(
                                                        "view",
                                                        question.views_count
                                                    )
                                            }}</span
                                        >
                                        <strong class="font-medium text-gray-900" v-else>  0 view</strong>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </article>
                </li>

            </ul>
        </div>
    
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditQuestion from "./EditQuestion";
import AddQuestion from "./AddQuestion";

export default {
    components: {
        EditQuestion,
        AddQuestion
    },

    props: ["question"],

    data: () => ({
        isVisibility: false,
        showDropDown: false
    }),

    methods: {
        str_plural(str, count) {
            return str + (count > 1 ? "s" : "");
        },

        toggleModal() {
            this.isVisibility = !this.isVisibility;
        },

      async deleteQuestion(question) {
             await this.$store.dispatch("questions/deleteQuestion", question);
        },
      
    }
};
</script>
