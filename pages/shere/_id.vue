<template>
  <div class="shere__all">
    <h2>ホーム</h2>
    <div class="shere__list" v-for="(post, index) in posts" :key="post.id">
      <div class="shere__content">
        <p class="user__name">{{ post.user.name }}</p>
        <img src="~/assets/heart.png" class="like__button"  @click="counter(post)">
        <p allLike__count>{{ post.like.length }}</p>
        <img src="~assets/cross.png" class="shere__delete" @click="postDelete(post.id, index)">
        <img src="~assets/detail.png" class="shere__detail-link" @click="editPost(post.id)">
      </div>
      <div class="shere__text">
        <p>{{ post.post }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['Login'],
  layout() {
    return 'home'
  },
  data() {
    return {
      getUser: this.$route.query.user_obj,
      posts: [],
      t_post: [],
      findPost: [],
      likes: [],
      post: [],
      like: [],
      setCommentItem: []
    }
  },
  methods: {
    async postDelete(id, index) {
      await this.$axios.delete("http://127.0.0.1:8000/api/post/" + id)
      this.posts.splice(index,1)
    },
    async counter(post){
      var jsonObj = localStorage.getItem('user');
      var likeObj = JSON.parse(jsonObj);
      const setLike = {
        user_id: likeObj.user_id,
        post_id: post.id,
        like_id: ''
      }
      axios.get('http://127.0.0.1:8000/api/like')
      .then((response) => {
        let likes = response.data.data
        let value =
        likes.some(like => {
          let setPost = setLike.user_id === like.user_id && setLike.post_id === like.post_id
          if(setPost) {
            const likeId = like.id
            axios.delete('http://127.0.0.1:8000/api/like/' + likeId)
            .then((response) =>
            axios.get('http://127.0.0.1:8000/api/post').then((response) => this.posts = response.data.data))
            return true
          } else {
            return false
          }
        })
        if(value === false) {
          axios.post('http://127.0.0.1:8000/api/like', setLike)
          .then((response) =>
          axios.get('http://127.0.0.1:8000/api/post').then((response) => this.posts = response.data.data))
        }
      })
    },
    editPost(id) {
      localStorage.saveKey = id;
      this.$router.push({path: 'comment'})
    }
  },
  async mounted() {
    await axios.get("http://127.0.0.1:8000/api/post")
    .then((response) => {
      this.posts = response.data.data
    })
    this.$nuxt.$on('sendText', (value) => {
      axios.get('http://127.0.0.1:8000/api/post')
      .then((respons) => {
        this.posts = respons.data.data
      })
    })
  },
}
</script>

<style>
  .shere__all {
    border: 1px solid white;
    color: white;
  }
  .shere__all h2 {
    padding: 10px;
    text-align: left;
    color: white;
  }
  .shere__list {
    border: 1px solid white;
    color: white;
    padding: 10px;
  }
  .shere__content{
    display: flex;
  }
  .user__name {
    font-size: 20px;
    font-weight: bold;
  }
  .like__button, .shere__delete{
    width: 20px;
    margin: 0 10px;
  }
  .post__list{
    display: flex;
    font-size: 20px;
    font-weight: bold;
  }
  .shere__detail-link {
    width: 20px;
    margin-left: 50px;
  }
  ul {
    list-style: none;
    padding: 10px;
  }
</style>
