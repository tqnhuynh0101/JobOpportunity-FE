import axios from "../../config/axios";

import {useToast} from 'vue-toastification';
const toast = useToast();

import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      username: "",
      password: "",
      messageUser: "",
      isValid: "",
      isLoading: false,
      messagePass: ""
    };
  },
  components: {
    Loading
  },
  mounted() {
    if (this.isLogin()) {
      if (this.checkRole()) {
        this.$router.push({ name: "UserHome" });
      } else {
        this.$router.push({ name: "Admin" });
      }
    }
    this.checkButton();
  },
  methods: {
    login() {
      this.isLoading = true;
      if (this.username.length <= 2) {
        this.message = "Vui lòng nhập tên đăng nhập ít nhất 2 kí tự";
        return;
      }
      if (this.password < 5) {
        this.message = "Vui lòng nhập mật khẩu ít nhất 5 kí tự";
        return;
      }
      axios
        .post("account/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.data.status == "error") {
            this.isLoading = false;
            toast.error(response.data.message);
          } else if(response.data.status == "success") {
            this.username = "";
            this.password = "";
            localStorage.setItem(
              "current-account",
              JSON.stringify({
                username: response.data.result.username,
                name: response.data.result.name,
                authority: response.data.result.authority,
              })
            );
            const token = response.data.result.token
            localStorage.setItem("token", token);
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            
            this.$router.push({ name: "Home" });
          } else {
            toast.error(response.data.message);
          }
          this.isLoading = false;
        })
        .catch((error) => {
        });

    },
    isLogin() {
      return localStorage.getItem("token") != null;
    },
    checkButton() {
      if (this.username.length >= 2 && this.password.length >= 5) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
  },
  watch: {
    username(newValue, oldValue) {
      if (newValue.length < 2) {
        this.messageUser = "Vui lòng nhập tên đăng nhập ít nhất 2 kí tự";
      } else {
        this.messageUser = "";
      }
      this.checkButton();
    },
    password(newValue, oldValue) {
      if (newValue.length < 5) {
        this.messagePass = "Vui lòng nhập mật khẩu ít nhất 5 kí tự";
      } else {
        this.messagePass = "";
      }
      this.checkButton();
    },
  },
};
