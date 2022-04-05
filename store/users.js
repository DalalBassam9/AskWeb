
export const state = {
    users: [],
    user: {},
   
};


export const getters = {


    users: state => {
        return state.users;
      },
    
      user: state => {
        return state.user;
      },
    
    

};

export const actions = {
   
    async fetchAllUsers({ commit }) {
        try {
          const data = await this.$axios.$get('api/users')
          await commit('setAllUsers', data.users);
    
        } catch (e) {
          console.log(e);
        }
    
      },
    
      async fetchLatestUsers({ commit }) {
        try {
          const data = await this.$axios.$get('api/latest/users')
          await commit('setLatestUsers', data.users);
    
        } catch (e) {
          console.log(e);
        }
    
      },
    


};
export const mutations = {

  
    setAllUsers(state, users) {
        state.users = users;
    
      },
    
      setLatestUsers(state, users) {
        state.users = users;
    
      },
    



};
