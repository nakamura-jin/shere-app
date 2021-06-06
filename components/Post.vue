<template>
  <div class="post">
    <p>シェア</p>
    <form>
      <textarea class="post__area" name="post" cols="40" rows="10" v-model="shereText"></textarea>
    </form>
    <button class="button__shere" @click="shere">シェアする</button>
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
      shereText: [],
      setPost: []
    }
  },
  methods: {
    shere() {
      var jsonObj = localStorage.getItem('user');
      var jsObj = JSON.parse(jsonObj);
      const sendText = {post: this.shereText, user_id: jsObj.user_id}
      this.$axios
      .$post('http://127.0.0.1:8000/api/post', sendText)
      .then((response) => {
        this.sendText = response.data
        this.$nuxt.$emit('sendText', this.sendText);
        this.shereText = ''
      })
    }
  },
}
</script>

<style>
  .post {
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
  }
  .post p {
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
  }
  .post__area {
    width: 100%;
    padding: 10px;
    background: #000033;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
  }
  .button__shere {
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