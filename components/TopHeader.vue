<template>
  <div class="header">
    <div class="site__logo">
      <Nuxt-link to="/"><img src="~/assets/logo.png" /></Nuxt-link>
    </div>
    <div class="link">
      <Nuxt-link to="/" class="link__top">新規登録</Nuxt-link>
      <Nuxt-link to="/login" class="link__login">ログイン</Nuxt-link>
    </div>
  </div>
</template>

<style>
  .header {
    display: flex;
    justify-content: space-between;
  }
  .link {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  .link__top {
    margin-right: 30px;
  }
  img{
    width: 250px;
  }



  /* sp版 */
  @media screen and (max-width:480px) {
    .header {
      width: 90%;
      margin: 20px auto 0;
    }
    .site__logo {
      width: 40%;
    }
    img {
      width: 100%;
    }
    .link {
      width: 50%;
      margin: 0%;
    }
    .link__top,
    .link__login {
      text-align: center;
      width: 100%;
      font-size: 14px;
    }
    .link__top {
      text-align: right;
      margin-right: 10px;
    }
  }
</style>