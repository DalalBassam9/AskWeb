import axios from 'axios'



export const state = {
    questions: [],
    myquestions: {},
    question: {},
    saves: [],
    users: [],
    answer: [],
    answers: [],

};

export const getters = {



    questions: state => {
        return state.questions;
    },
    question: state => {
        return state.question;
    },

    users: state => {
        return state.users;
    },


    saves: state => {
        return state.saves;
    },

    answers: state => {
        return state.answers;
    },
    answer: state => {
        return state.answer;
    },



};

export const actions = {


    async search({ commit }, queryString) {
        try {
            const res = await this.$axios.$get(`api/search?${queryString}`)
            await commit('setQuestions', res.all_questions);

        } catch (e) {
            console.log(e);
        }

    },



    async fetchQuestion({ commit }, questionId) {
        try {
            const res = await this.$axios.$get('/api/question/' + questionId)
            await commit('SET_QUESTION', res.question);

        } catch (e) {
            console.log(e);
        }

    },


    async getQuestionsUser({ commit }, userId) {
        try {
            const { res } = await this.$axios.$get('/api/user/questions/' + userId)
            await commit('setQuestionsUser', res.questions);
        } catch (e) {
            console.log(e);
        }
    },



    async addQuestion({ commit }, { body }) {
        const { data } = await this.$axios.post('/api/question/add/', { body })
        await commit('pushQuestion', data.question);

    },

    async deleteQuestion({ commit }, question) {
        try {
            const { data } = await this.$axios.post('/api/question/delete/' + question.id)
            await commit('deleteQuestion', question);

        } catch (err) {
            console.log(err.data);
        }

    },


    async editQuestion({ commit }, { body, questionId }) {
        const { data } = await this.$axios.post('/api/question/' + questionId, { body })

    },


    async addSaveQuestion({ commit }, question) {
        try {
            const { data } = await this.$axios.post('/api/question/save/' + question.id)
            await commit('pushSave', data.saved);
        } catch (err) {
            console.log(err);
        }
    },



    async getSaveQuestion({ commit }, userId) {
        try {
            const { res } = await this.$axios.$get('/api/user/saves/' + userId)
            await commit('setSaves', res.saves);
        } catch (err) {
            console.log(err);
        }
    },



    async VoteUnvoteQuestion({ commit }, question) {
        try {
            const { data } = await this.$axios.post('/api/question/' + question + '/vote-unvote')
            await commit('pushVote', data.voted);
            await commit('pushUserVote', data.user_name, data.voted);
        } catch (err) {
            console.log(err);
        }
    },



    async fetchAnswers({ commit }, questionId) {

        try {
            const res = await this.$axios.$get('/api/question/' + questionId + '/answers')
            await commit('setAnswers', res.answers);
        } catch (e) {
            console.log(e.res);
        }

    },


    async addAnswer({ commit }, { question, body }) {
        const { data } = await this.$axios.post('/api/question/' + question.id + '/answer/add/', { body })
        commit('pushAnswer', data.answer);


    },



    async editAnswer({ commit }, { answer, question, body }) {

        const { data } = await this.$axios.post('/api/questions/' + question.id + '/answers/' + answer.id, { body })
        await commit('editAnswer', body);

    },


    async deleteAnswer({ commit }, { answer, question }) {
        try {
            const { data } = await this.$axios.post('/api/question/' + question.id + '/answer/delete/' + answer.id)
            await commit('deleteAnswer', answer);

        } catch (err) {
            console.log(err);
        }

    },





    async accept({ commit }, { answerBest, answerId }) {

        try {
            const res = await this.$axios.$get('/api/answers/' + answerId + '/accept')
            await commit('setBest', answerBest, res.is_best);

        } catch (e) {
            console.log(e);
        }

    },





};

export const mutations = {

    setQuestions(state, questions) {
        state.questions = questions;
    },


    SET_QUESTION(state, question) {
        state.question = question;
    },


    setQuestionsUser(state, questions) {
        state.questions = questions;
    },


    pushQuestion(state, question) {
        state.questions.unshift(question);
    },


    deleteQuestion(state, question) {
        state.questions.splice(state.questions.indexOf(question), 1);

    },


    setSaves(state, saves) {
        state.saves = saves;
    },

    pushSave(state, saved) {
        state.question.saved = saved;
        saved ? state.question.save_count++ :
            state.question.save_count--;
    },


    pushVote(state, voted) {
        state.question.voted = voted;
        voted ? state.question.votes_count++ :
            state.question.votes_count--;
    },

    pushUserVote(state, user_name) {
        if (user_name) {
            state.question.votes.unshift(user_name);
        }
        if (!user_name) {
            state.question.votes.splice(state.question.votes.indexOf(user_name), 1);
        }
    },

    setAnswers(state, answers) {
        state.answers = answers;

    },

    pushAnswer(state, answer) {
        state.answers.unshift(answer);
        state.question.answers_count++;
    },


    deleteAnswer(state, answer) {
        state.answers.splice(state.answers.indexOf(answer), 1);
        state.question.answers_count--;
    },

    setBest(answerBest, best) {
        answerBest = best;
    },


};
