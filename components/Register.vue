<template>
  <div class="register">
    <h2>新規登録</h2>
    <form>
      <input type="text" name="name" v-model="newName" placeholder="ユーザーネーム">
      <input type="email" name="e-mail" v-model="newEmail" placeholder="メールアドレス">
      <input type="password" name="password" v-model="newPassword" placeholder="パスワード">
    </form>
    <button @click="register">新規登録</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      newName: '',
      newEmail: '',
      newPassword: ''
    }
  },
  methods: {
    register() {
      if(!this.newName || !this.newEmail || !this.newPassword) {
        alert('名前もしくはメールアドレスまたはパスワードが入力されていません')
        return
      }
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.newEmail, this.newPassword)
      .then(() => {
        const sendData = {
          name: this.newName,
          email: this.newEmail,
          password: this.newPassword,
        };
        this.$axios
        .post("http://127.0.0.1:8000/api/user", sendData);
      })
      .then(() => { this.$router.replace('/login')})
      .catch((error) => {
        switch (error.code) {
          case 'auth/name-already-in-use':
            alert('この名前はすでに使われています')
            break
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います')
            break
          case 'auth/email-already-in-use':
            alert('このメールアドレスはすでに使われています')
            break
          case 'auth/weak-password':
            alert('パスワードは6文字以上で入力してください')
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください')
            break
        }
      });
    }
  }
}
</script>

<style>
  .register {
    width: 400px;
    text-align: center;
    background: white;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h2 {
    text-align: center;
    margin: 10px 0;
  }
  input {
    display: flex;
    width: 350px;
    margin: 10px auto;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #222;
    border-radius: 5px;
  }
  input:not(:first-of-type) {
    margin-top: 20px;
  }
  button {
    width: 150px;
    margin: 10px auto;
    padding: 10px;
    background: darkviolet;
    border-radius: 30px;
    font-weight: bold;
    color: white;
    border: none;
  }
</style>