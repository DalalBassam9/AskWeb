import axios from 'axios'


export const state = {
    groups: {},
    users: [],
    group:{},
};


export const getters = {

    groups: state => {
        return state.groups;
    },
    group: state => {
        return state.group;
    },

    users: state => {
        return state.users;
      },
    

};

export const actions = {
    async fetchGroups({ commit }) {
        try {
            const res = await this.$axios.$get('/api/groups')
            await commit('set_groups', res.groups);

        } catch (e) {
            console.log(e.res);
        }

    },

    async fetchGroup({ commit }, groupId) {
        try {
            const res = await this.$axios.$get('/api/group/' + groupId)

            await commit('set_group', res.group);

        } catch (e) {
            console.log(e.res);
        }

    },

    async fetchLatestGroups({ commit }) {
        try {
            const data = await this.$axios.$get('api/latest/groups')
            await commit('setLatestGroups', data.groups);

        } catch (e) {
            console.log(e);
        }

    },


    async fetchUsersJoinsGroup({ commit }, groupId) {

        try {
            const res = await this.$axios.$get('/api/users/' + groupId)
            await commit('setUsers', res.joins.data);

        } catch (e) {
            console.log(e);
        }

    },


    async JoinUnjoinGroup({ commit }, groupId) {
        try {
            const { data } = await this.$axios.post('/api/group/join-unjoin/' + groupId)
            await commit('pushGroupJoined', data.joined);
        } catch (err) {
            console.log(err);
        }
    },



};
export const mutations = {

    set_groups(state, groups) {
        state.groups = groups;
    },

    set_group(state, group) {
        state.group = group;
    },


    setLatestGroups(state, groups) {

        state.groups = groups;
    },

    setUsers(state, users) {
        state.users = users;
    },

    pushGroupJoined(state, joined) {
        state.group.joined = joined;
        joined ? state.group.joins_count++ :
            state.group.joins_count--;


    },



};
