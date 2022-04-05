
export const state = {
  saves: [],
  questions: [],
  myquestions: {},
  users: [],
  answer: [],
  answers: [],
  question: {},

 
};

export const getters = {


  saves: state => {
    return state.saves;
  },


  questions: state => {
    return state.questions;
  },

  users: state => {
    return state.users;
  },


  answers: state => {
    return state.answers;
  },
  answer: state => {
    return state.answer;
  },

  question: state => {
    return state.question;
  },


};

export const actions = {

 

  async getQuestionsUser({ commit }, userId) {
    try {
      const { res } = await this.$axios.$get('/api/user/questions/' + userId)
      await commit('setQuestionsUser', res.questions);
    } catch (e) {
      console.log();
    }
  },


  async search({ commit }, queryString) {
    try {
      const res = await this.$axios.$get(`api/search?${queryString}`)
      await commit('setQuestions', res.all_questions);

    } catch (e) {
      console.log(e.res);
    }

  },


  async fetchQuestion({ commit }, questionId) {
    try {
      const res = await this.$axios.$get('/api/question/' + questionId)
      await commit('SET_QUESTION', res.question);

    } catch (e) {
      console.log(e.res);
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

 async fetchAnswers({ commit }, questionId) {

    try {
      const res = await this.$axios.$get('/api/question/' + questionId + '/answers')
      await commit('setAnswers', res.answers);
    } catch (e) {
      console.log(e.res);
    }

  },


  async deleteAnswer({ commit }, { answer, question }) {
    try {
      const { data } = await this.$axios.post('/api/question/' + question.id + '/answer/delete/' + answer.id)
      await commit('deleteAnswer', answer);

    } catch (err) {
      console.log(err);
    }

  },

  async editAnswer({ commit }, { answer, question, body }) {

    const { data } = await this.$axios.post('/api/questions/' + question.id + '/answers/' + answer.id, { body })
    await commit('editAnswer', body);

  },



  async addAnswer({ commit }, { question, body }) {
    const { data } = await this.$axios.post('/api/question/' + question.id + '/answer/add/', { body })
    commit('pushAnswer', data.answer);


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





 


};

export const mutations = {
  setSaves(state, saves) {
    state.saves = saves;
  },

  setBest(state, answerBest, best) {
    answerBest = best;
  },
 
  deleteQuestion(state, question) {
    state.questions.splice(state.questions.indexOf(question), 1);

  },

  deleteAnswer(state, answer) {
    state.answers.splice(state.answers.indexOf(answer), 1);
    state.question.answers_count--;
  },



  setAnswers(state, answers) {
    state.answers = answers;

  },

  pushAnswer(state, answer) {
    state.answers.unshift(answer);
    state.question.answers_count++;
  },

  setQuestions(state, questions) {
    state.questions = questions;
  },

  setQuestionsUser(state, questions) {
    state.questions = questions;
  },

  editQuestion(state, data) {

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

  pushQuestion(state, question) {
    state.questions.unshift(question);
  },
  SET_QUESTION(state, question) {
    state.question = question;
  },

};
