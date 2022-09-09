<template>
  <div>
    <h1>UpdateUser</h1>
    <div class="user_data" v-if="!edit">
      <table>
        <tbody>
          <tr>
            <td>ФИО:</td>
            <td>{{ name }}</td>
          </tr>
          <tr>
            <td>E-mail:</td>
            <td>{{ email }}</td>
          </tr>
          <tr>
            <td>Телефон:</td>
            <td>{{ phone }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn" @click="getUSER">Изменить данные</button>
    </div>
    <form v-if="edit" class="form" @submit.prevent="updateUser">
      <label>
        ФИО
        <input type="text" v-model.trim="name" placeholder="ФИО" />
        <small v-if="!nameValid">Введите ФИО кириллицей</small>
      </label>
      <label>
        Email
        <input type="text" v-model.trim="email" placeholder="E-mail" />
        <small v-if="!emailValid">Email введен неверно</small>
      </label>
      <label>
        Телефон
        <input
          type="text"
          v-model="phone"
          v-phone
          placeholder="+7 (___) ___-__-__"
        />
        <small v-if="!phoneValid"
          >Введите телефон в формате +7 (999) 999-99-99</small
        >
      </label>
      <button class="btn" type="submit" :disabled="disBtn">Сохранить</button>
    </form>
    <div class="error" v-if="errors">
      <p>Status: {{ errors && errors.status }}</p>
      <p>{{ errors && errors.code }}</p>
    </div>
    <div class="request">X-Action-Id: {{ x_action_id }}</div>
  </div>
</template>
  
  <script>
import name_emailValid from "@/mixins/name_emailValid";
import axios from "axios";

export default {
  mixins: [name_emailValid],
  data() {
    return {
      getResult: [],
      errors: false,
      name: "",
      email: "",
      phone: "",
      x_action_id: "",
      edit: false,
      baseURL: "https://api.sitemap-generator.ru/test-api/user"
    };
  },
  mounted() {
    this.getUser();
  },
  computed: {
    disBtn() {
      if (this.nameValid && this.emailValid && this.phoneValid) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async getUser() {
      this.edit = false;

      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.$store.state.auth_key}`,
      };

      await axios
        .get(this.baseURL, { headers })
        .then((response) => {
          this.getResult = response.data;
          localStorage.setItem("usersList", JSON.stringify(response.data));
          let usersList = localStorage.getItem("usersList");
          if (usersList) {
            this.getResult = JSON.parse(usersList);
            this.name = this.getResult.name;
            this.email = this.getResult.email;
            this.phone = this.getResult.phone;
          }
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    },

    getUSER() {
      this.edit = true;
    },

    async updateUser() {
      const user = {
        name: this.name,
        email: this.email,
        phone: this.phone,
      };

      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.$store.state.auth_key}`,
      };

      await axios
        .patch(this.baseURL, user, {
          headers,
        })
        .then((response) => {
          localStorage.setItem("usersList", JSON.stringify(response.data));

          this.x_action_id = response.headers;

          this.edit = false;
        })
        .catch((error) => {
          this.errors = true;

          console.log(error.toJSON());

          this.errors = error.toJSON();

          setTimeout(() => {
            this.errors = false;
            this.edit = false;
            this.getUSER();
          }, 1500);
        });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
table {
  margin: 0 auto;
}

.request {
  margin-top: 15px;
}
</style>