<template>
  <div>

    <div v-for="(following, follKey) in followings" :key="follKey">
      <div>
        <li class="flex py-4 space-x-3 mx-6">
          <div class="flex-shrink-0 ml-2">
            <img
              class="h-8 w-8 rounded-full"
              :src="following.image_profile"
              alt="user image"
            />
          </div>
          <div class=" ml-8 flex-1">
            <p class="text-sm font-medium text-gray-900">
              <a href="#">
                {{ following.name }}
              </a>
            </p>
          </div>

          <div class="flex-shrink-0">
            <button
              type="button"
              v-if="following.following && $auth.user.id !== following.id"
              @click.prevent="deleteFollowing(following)"
              :disabled="loading"
              class="inline-flex items-center focus:outline-none px-3 py-2 rounded-2xl bg-white border border-Emerald-500 text-sm font-medium text-Emerald-500"
            >

              <i class="fa fa-user-times mr-1" aria-hidden="true"></i>
              <span class="pr-1">
                unfollow
              </span>
            </button>

            <button
              type="button"
              v-if="!following.following && $auth.user.id !== following.id"
              @click.prevent="storeFollowing(following)"
              :disabled="loading"
              class="inline-flex bg-Emerald-500 text-white  items-center focus:outline-none px-3 py-2 rounded-2xl text-sm font-medium "
            >
               <svg   class="mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
              <span class="pr-1">
                follow
              </span>
            </button>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  loading:false,

  data() {
    return {
      followings: [],
      user: {},

    };
  },

  created() {
    this.getUser();
  },

  async fetch() {
    const response = await this.$axios.$get(
      "api/followings/" + this.$route.params.id
    );
    this.followings = response.followings;
  },

  methods: {
    getUser() {
      this.$axios
        .$get("/api/get-user/" + this.$route.params.id)
        .then(resp => {
          this.user = resp.user;
        })
        .catch(err => {
          console.log(err);
        });
    },
   async storeFollowing(following) {
  
       this.loading = true;
     try { await this.$axios
        .$post("/api/following/" + following.id)
        .then(res => {
          following.following = res.followed;
        
        })
     }
        catch(err){
          console.log(err.res);
        }

         this.loading = false;


    },

   async  deleteFollowing(following) {
     
       this.loading = true;
       try { await this.$axios
        .$post("/api/following/delete/" + following.id)
        .then(res => {
          this.followings.splice(this.followings.indexOf(following));
          this.$notify.success({
            message: res.message
          });
        })
       }
        catch(err){
          console.log(err.res);
        }
         this.loading = false;

    }
  }


};
</script>
<style>
.m-t-5 {
  margin-top: 5px;
}
</style>
