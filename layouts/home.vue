<template>
  <div class="shere">
    <div class="shere__side">
    <img src="~/assets/logo.png" class="logo">
      <HomeLink />
      <Post />
    </div>
    <div class="shere__main">
      <Nuxt />
    </div>
  </div>
</template>

<style>
  .shere {
    display: flex;
    justify-content: space-between;
    background:#000033;
  }
  .shere__side {
    width: 22%;
  }
  .shere__main {
    width: 75%;
  }
  .page-title {
    color: white;
    border: 1px solid white;
  }
  .logo {
    width: 250px;
  }



  /* sp版 */
  
</style>