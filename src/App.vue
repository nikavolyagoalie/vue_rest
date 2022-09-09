<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.error {
  margin: 0 auto;
  padding: 3px;
  max-width: 186px;
  background: #ed143d33;
}

.form {
  display: flex;
  flex-direction: column;
}

.btn {
  max-width: 100px;
  margin: 0 auto;
  margin-top: 15px;
}
</style>
