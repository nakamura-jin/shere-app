<template>
  <div class="comment__all">
    <h2 class="comment__title">コメント</h2>
    <div class="comment__list" v-for="(comment, index) in comments" :key="comment.id">
      <div class="comment__content">
        <p class="user__name">{{ comment.user.name }}</p>
        <img src="~assets/cross.png" class="shere__delete" @click="commentDelete(comment.id, index)">
      </div>
      <div class="comment__text">
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Login from '~/components/Login'
export default {
  layout() {
    return 'home'
  },
  props: ['Comment', 'InputText'],
  data() {
    return {
      getUser: this.$route.query.user_obj,
      comments: [],
      getPost: [],
      cId: [],
      getComments: []
    }
  },
  async mounted() {
    let postId = localStorage.saveKey;
    await axios.get('http://127.0.0.1:8000/api/post/' + postId)
    .then((response) => {
      let getPost = response.data.data[0]
      axios.get('http://127.0.0.1:8000/api/comment')
      .then((response) => {
        let getComments = response.data.data
        this.comments = getComments.filter(c => c.post_id == postId)
      })
    })
    this.$nuxt.$on('sendComment', (value) => {
      axios.get('http://127.0.0.1:8000/api/comment/' + value.id)
      .then((response) => {
        this.tComments = response.data.data
        console.log(value.id)
      })
      .then(() => {
        this.comments.push(this.tComments)
      })
    })
  },
  methods: {
    commentDelete(id, index) {
      this.$axios.delete("http://127.0.0.1:8000/api/comment/" + id)
      this.comments.splice(index,1)
    }
  }
}
</script>

<style>
  .comment__title {
    font-size: 18px;
    margin: 0;
    text-align: center;
    color: white;
  }
  .comment__list {
    border: 1px solid white;
    color: white;
    padding: 10px;
  }
  .comment__content{
    display: flex;
  }
  .user__name {
    font-size: 20px;
    font-weight: bold;
  }
  .like__button, .comment__delete{
    width: 20px;
    margin: 0 10px;
  }
  .post__list{
    display: flex;
    font-size: 20px;
    font-weight: bold;
  }
  .comment__detail-link {
    width: 20px;
    margin-left: 50px;
  }
  .comment__text {
    padding-top: 10px;
  }
  ul {
    list-style: none;
    padding: 10px;
  }
</style>
