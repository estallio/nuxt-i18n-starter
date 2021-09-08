export const state = () => ({
  posts: [],
})
export const mutations = {
  STORE_POSTS(state, posts) {
    state.posts = posts
  },
}
export const actions = {
  nuxtServerInit({ commit }) {
    const posts = new Date()
      .toTimeString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
    commit('STORE_POSTS', posts)
  },
}
