import axios from "../../config/axios";
import changeInformationVue from "./change-information.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
import Loading from "vue-loading-overlay";

export default {
  name: "change-information",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      account: {},
      message: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.isLoading = true;
      axios.get("account/get-account-login").then((response) => {
        if (response.data.status == "error") {
          this.message = response.data.message;
        } else if (response.data.status == "success") {
          this.account = response.data.result;
          console.log(this.account.gender);
        } else if (response.data.status == "not-found") {
          this.message = response.data.message;
        }

        this.isLoading = false;
      });
    },
    confirmChange() {
      this.isLoading = true;
      axios
        .put("account/update-information", {
          age: this.account.age,
          tel: this.account.tel,
          email: this.account.email,
          gender: this.account.gender,
        })
        .then((response) => {
          if (response.data.status == "error") {
            toast.error(response.data.message);
          } else if (response.data.status == "success") {
            toast.success(response.data.message);
          }
          this.isLoading = false;
        });
    },
  },
};
