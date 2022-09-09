export default {
    computed: {
        emailValid() {
          if (
            this.email?.includes("@") &&
            this.email?.includes(".") &&
            this.email?.length > 5
          ) {
            return true
          } else {
            return false
          }
        },
        nameValid() {
            let match = /^[а-я ]+$/i.test(this.name);
            return match
        },
        phoneValid() {
          if (this.phone?.length > 17 ) {
            return true
          } else {
            return false
          }
        }
      },
}