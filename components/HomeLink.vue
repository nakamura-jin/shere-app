<template>
  <div class="home">
    <Nuxt-Link to="/shere" class="home__link"><img src="~/assets/home.png" class="home__img">ホーム</Nuxt-Link>
    <Nuxt-Link to="/login" class="logout__link"><img src="~/assets/logout.png" class="logout__img">ログアウト</Nuxt-Link>
  </div>
</template>

<style>
  .home {
    margin-top: 20px;
    margin-left: 20px;
  }
  .home a {
    align-items: center;
    text-decoration: none;
    color: white;
  }
  .home__link, .logout__link {
    display: flex;
    text-align: center;
    font-weight: bold;
  }
  .home__img, .logout__img {
    width: 40px;
    margin-right: 10px;
  }
  .home__link {
    margin: 20px 0;
  }
</style>