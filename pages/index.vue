<template>
  <section class="container">
  <div>
    <h3>Nuxt.jsのタグが付けられた投稿の一覧</h3>
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
        <!-- コンテンツ -->
        <div>{{item.body.slice(0, 130)}}… </div>      
        <!-- URL -->
        <p><a target="_blank" :href="item.url">{{item.url}}</a></p>
        <!-- タグ -->
        <!-- el-tag size="mini" type="info" class="tab-style" v-for="(tag, index) in element.tags" :key="index">{{ tag.name }}</el-tag> -->
        
        <h5>
          <span>{{item.tag}} </span>
          <nuxt-link :to="`/tags/${item.tag}`">
            {{item.tag}} 
          </nuxt-link>
        </h5>
           
      </li>
    </ul>
  </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store }) {
    if (store.getters['items'].length) {
      return
    }
    await store.dispatch('fetchItems')
  },
  computed: {
    ...mapGetters(['items'])
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
