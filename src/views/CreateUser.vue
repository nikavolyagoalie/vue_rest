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
import { POST } from "@/api/http";
import name_emailValid from "@/mixins/name_emailValid";

export default {
  mixins: [name_emailValid],
  data() {
    return {
      name: "",
      email: "",
      getResult: [],
      errors: false,
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

      await POST.post(`user`, user)
        .then((response) => {
          this.getResult = response.data;
          localStorage.setItem("usersList", JSON.stringify(response.data));
          this.$router.push("/update");
        })
        .catch((error) => {
          this.errors = true
          console.log(error.toJSON());
          this.errors = error.toJSON()
          console.log(this.errors)
        });

      this.name = "";
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>