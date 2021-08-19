<template>
  <div class="login">
    <h2>ログイン</h2>
    <form>
      <input type="email" class="login__user-email" name="e-mail" v-model="Email" placeholder="メールアドレス">
      <input type="password" class="login__user-password" name="password" v-model="Password" placeholder="パスワード">
    </form>
    <button @click="login">ログイン</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import axios from 'axios'
export default {
  data() {
    return {
      Email: '',
      Password: '',
      user: '',
      tUser: ''
    }
  },
  methods: {
    login() {
      if(!this.Email || !this.Password) {
        alert('メールアドレスまたはパスワードが入力されていません')
        return
      };
      firebase
      .auth()
      .signInWithEmailAndPassword(this.Email, this.Password)
      .then(() => {
        axios.get('http://127.0.0.1:8000/api/v1/users/user/' + this.Email)
        .then((response) => {
          let tUser = response.data.data
          console.log(tUser)
          var obj = {
            user_id : tUser.id,
            name : tUser.name
          };
          var obj = JSON.stringify(obj);
          localStorage.setItem('user', obj);
          this.$router.push({path:'shere',query:{user_obj: tUser}})
          });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
            break
          case 'auth/user-disablr':
            alert('ユーザーが無効になってます。')
            break
          case 'auth/user-not-found':
            alert('ユーザーが存在しません')
            break
          case 'auth/wrong-passworc':
            alert('パスワードが間違っております')
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
  .login {
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
  .login__user-email,
  .login__user-password {
    display: flex;
    width: 350px;
    margin: 10px auto;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #222;
    border-radius: 5px;
  }
  .login__user-email {
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


  /* sp版 */
  @media screen and (max-width:480px) {
    .login {
      width: 90%;
      height: 44%;
    }
    .login__user-email,
    .login__user-password {
      width: 90%;
    }
  }
</style>