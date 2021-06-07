text<template>
  <div class="text">
    <form>
      <input class="comment__area" name="text" v-model="postComment">
    </form>
    <button class="button__text" @click="pushComment">コメント</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['Login'],
  data() {
    return {
      getUser: localStorage.saveKey,
      user: '',
      postComment: [],
      text: '',
    }
  },
  methods: {
    pushComment() {
      var jsonObj = localStorage.getItem('user');
      var likeObj = JSON.parse(jsonObj);
      let postId = localStorage.saveKey;
      const sendComment = {
        user_id: likeObj.user_id,
        post_id: postId,
        comment: this.postComment
      }
      this.$axios.$post('http://127.0.0.1:8000/api/comment', sendComment)
      .then((response) => {
        this.sendComment = response.data
        this.$nuxt.$emit('sendComment', this.sendComment);
        this.postComment = ''
      })
    }
  },
}
</script>

<style>
  .text {
    margin-top: 30px;
  }
  .comment__area {
    width: 100%;
    padding: 10px;
    background: #000033;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
  }
  .button__text {
    display: block;
    margin: 10px 0 0 auto;
    padding: 10px;
    background: darkviolet;
    border-radius: 30px;
    font-weight: bold;
    color: white;
    border: none;
  }
</style>