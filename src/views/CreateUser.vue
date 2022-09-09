<template>
  <div>
    <h1>CreateUser</h1>
    <form class="form" @submit.prevent="createUser">
      <label>
        ФИО
        <input type="text" v-model="name" placeholder="ФИО" />
        <small v-if="!nameValid && name">Введите ФИО кириллицей</small>
      </label>
      <label>
        Email
        <input type="text" v-model="email" placeholder="E-mail" />
        <small v-if="!emailValid && email">Email введен неверно</small>
      </label>
      <button class="btn" type="submit" :disabled="disBtn">Create user</button>
    </form>
    <div class="error" v-if="errors">
      <p>Status {{ errors && errors.status }}</p>
      <p>{{ errors && errors.code }}</p>
    </div>
  </div>
</template>

<script>
import name_emailValid from "@/mixins/name_emailValid";
import axios from "axios";

export default {
  mixins: [name_emailValid],
  data() {
    return {
      name: "",
      email: "",
      errors: false,
      x_application_token: "wefiEFv_dwDEvf-12Veda_feadvkJbBgh831",
      baseURL: 'https://api.sitemap-generator.ru/test-api/user',
    };
  },
  computed: {
    disBtn() {
      if (this.nameValid && this.emailValid) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async createUser() {
      const user = {
        name: this.name,
        email: this.email,
        phone: "",
      };

      const headers = {
        "Content-type": "application/json",
        "X-Application-Token": this.x_application_token,
      };

      await axios.post(this.baseURL, user, { headers })
        .then((response) => {
          console.log(response.data.auth_key);
          this.$store.state.auth_key = response.data.auth_key;
          localStorage.setItem("usersList", JSON.stringify(response.data));
          this.$router.push("/update");
        })
        .catch((error) => {
          this.errors = true;
          console.log(error.toJSON());
          this.errors = error.toJSON();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>