import axios from 'axios'


export const state = {
    followers: {},
};


export const getters = {

followers:state=>{

    return state.followers;
},

};

export const actions = {
  async  fetchFollowers({ commit},followId) {
    try {
   const response = await this.$axios.$get(
      "api/followers/" + followId
    );
      await commit('setFollowers', response.followers);
    } catch (e) {
      console.log(e.res);
    }

  },

};
export const mutations = {

  setFollowers(state, followers) {
        state.followers =followers;
    },
  };
