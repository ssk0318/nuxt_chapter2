import Vuex from 'vuex'

const store = {
    //コンポーネントの親子間で受け渡したいものを定義
    state: {
        items: [],
        users: {},
        userItems: {},
        tags: {}
    },
    getters: {
        items: (state) => state.items,
        users: (state) => state.users,
        userItems: (state) => state.userItems,
        tags: (state) => state.tags
    },
    //state の持つ変数に値をセットする Setter
    mutations: {
        setItems (state, { items }) {
            state.items = items
        },
        setUser (state, {　user　}) {
            state.users[user.id] = user
        },
        setUserItems(state, { user, items }) {
            state.userItems[user.id] = items
        },
        setTag (state, { tag }) {
            state.tags[tag.id] = tag
        }
    },
    //Qiita の API を呼び、そのレスポンスを mutations の commit を使って state にセット
    actions: {
        async fetchItems({ commit }) {
            const items =
                await this.$axios.$get('https://qiita.com/api/v2/items?query=tag:nuxt.js')
            commit('setItems', { items })
        },
    
        async fetchUserInfo({ commit }, { id }) {
            const [user, items] = await Promise.all([
                this.$axios.$get(`https://qiita.com/api/v2/users/${id}`),
                this.$axios.$get(`https://qiita.com/api/v2/items?query=user:${id}`)
        ])
        commit('setUser', { user })
        commit('setUserItems', { user, items })
        },

        async fetchTagInfo({ commit }) {
            const tags =
                await this.$axios.$get(`https://qiita.com/api/v2/items?query=tag:${tag}`)
            commit('setTags', { tags })
        },
    }
}


export default () => new Vuex.Store(store)