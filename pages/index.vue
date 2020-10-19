<template>
  <section class="container">
  <div>
    <h3>Nuxt.jsのタグが付けられた投稿の一覧</h3>
    <!-- 検索機能 -->
    <p><input type="text" name="content" v-model="content" @focus="set_flg"/></p>
    <div>
      <button @click="find">検索 </button>
    </div>
    <!-- リスト内容 -->
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
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store }) {
    if (store.getters['items'].length) {
      return {
      content: '',
      find_flg: false
      }
    }
    await store.dispatch('fetchItems')
  },
  computed: {
    ...mapGetters(['items']),
    display_items: function() {
      if(this.find_flg) {
        var arr = [];
        var data = this.items;
        data.forEach(element => {
          if(element.content.toLowerCase() == this.content.toLowerCase()) {
            arr.push(element);
          }
        });
        return arr;
      } else {
        return this.items;
      }
    }
  },
  methods: {
    find: function() {
    this.find_flg = true;
    },
    set_flg: function() {
      if(this.find_flg) {
        this.find_flg = false;
        this.content = '';
      }
    },
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
