<template>
  <div class="comment__all">
    <div class="shere__container">
      <h2>コメント</h2>
      <div class="shere__list" v-if="tPost">
        <div class="shere__content">
          <p class="user__name">{{ tPost.user.name }}</p>
          <img src="~/assets/heart.png" class="like__button"  @click="counter(tPost)">
          <p allLike__count>{{ tPost.like.length }}</p>
          <img src="~assets/cross.png" class="shere__delete" @click="postDelete(tPost.id, index)">
        </div>
        <div class="shere__text">
          <p>{{ tPost.post }}</p>
        </div>
      </div>
      <CommentList />
    </div>
    <InputText />
  </div>
</template>

<script>
import axios from 'axios'
import InputText from '~/components/InputText.vue'
export default {
  components: { InputText },
  props: ['Login'],
  layout() {
    return 'home'
  },
  data() {
    return {
      getUser: this.$route.query.user_obj,
      posts: [],
      tPost: null,
      findPost: [],
      likes: [],
      post: [],
      like: [],
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
      console.log(setLike)
      let postId = localStorage.saveKey;
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
            axios.get('http://127.0.0.1:8000/api/post/' + postId).then((response) => this.tPost = response.data.data))
            return true
          } else {
            return false
          }
        })
        if(value === false) {
          axios.post('http://127.0.0.1:8000/api/like', setLike)
          .then((response) =>
          axios.get('http://127.0.0.1:8000/api/post/' + postId).then((response) => this.tPost = response.data.data))
        }
      })
    }
  },
  async mounted() {
    let postId = localStorage.saveKey;
    await axios.get("http://127.0.0.1:8000/api/post/" + postId)
    .then((response) => {
      this.tPost = response.data.data
    })
  },
}
</script>

<style>
  .shere__container {
    border: 1px solid white;
    color: white;
  }
  .shereh__container h2 {
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
  .shere__text {
    padding-top: 10px;
  }
  ul {
    list-style: none;
    padding: 10px;
  }
</style>
