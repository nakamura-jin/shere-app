<template>
  <div class="header">
    <Nuxt-link to="/"><img src="~/assets/logo.png" /></Nuxt-link>
    <div class="link">
      <Nuxt-link to="/">新規登録</Nuxt-link>
      <Nuxt-link to="/login">ログイン</Nuxt-link>
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
  a:first-of-type {
    margin-right: 30px;
  }
  img{
    width: 250px;
  }
</style>