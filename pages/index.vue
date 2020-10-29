<template>
  <section class="container">
  <div>
    <h3>Qiita投稿 一覧</h3>
      <div>
        <input type='text' v-model='tag'>
        <button @click="tagsearch">検索</button>
      </div>

    <ul>
      <!-- タイトル、ユーザー名 -->
      <li v-for="item in items" :key="item.id">
        <!-- リストレンダリング、繰り返し表示するディレクティブ -->
        <h4>
          <span>{{item.title}} </span>
          <small>
            <span>by </span>
            <nuxt-link :to="`/users/${item.user.id}`">
              {{item.user.id}} 
            </nuxt-link>
          </small>
        </h4>
        <!-- 記事冒頭 -->
        <div>{{item.body.slice(0, 130)}}… </div>      
        <!-- URL -->
        <p><a target="_blank" :href="item.url">{{item.url}}</a></p>
      </li>
    </ul>
  </div>
  </section>
</template>

<script>
export default {
    async asyncData({ app }){
        const tag = ''
        const items = await app.$axios.$get(`https://qiita.com/api/v2/items?query=tag:${tag}`)
        return {
            items
        }
    },
    data(){
      return {tag : '', items: ''}
    },
    methods: {
      async tagsearch() {
        this.items = await this.$axios.$get(`https://qiita.com/api/v2/items?query=tag:${this.tag}`);
      }
    }

}
</script>

<style>
.container {
  min-height: 100vh;
  padding: 16px;
}

h3 {
  margin: 16px 0;
  padding: 8px 0;
  border-bottom: solid 1px #e5e5e5;
}

li + li {
  margin: 16px 0;
}

p {
  margin: 8px 0;
}
</style>
