import axios from "../../config/axios";
import { useToast } from 'vue-toastification';
import Loading from 'vue-loading-overlay';
const toast = useToast();

export default {
  name: "change-password",
  components: {
    Loading
  },
  mounted() {
    this.checkButtonSaveChange();
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      messageChangeOldPass: "",
      messageChangeNewPass: "",
      isValid: true,
      isLoading: false,
    };
  },
  methods: {
    saveChange() {
      this.isLoading = true;
      if (this.oldPassword.length < 5) {
        this.messageChangeOldPass = "Vui lòng nhập mật khẩu trên 5 ký tự !";
        return;
      }
      if (this.newPassword.length < 3) {
        this.messageChangeNewPass = "Vui lòng nhập mật khẩu trên 5 ký tự !";
        return;
      }
      axios
        .post("account/change-password", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((response) => {
          if (response.data.status == "error") {
            toast.error(response.data.message);
            this.oldPassword = "";
            this.newPassword = "";
            this.messageChangeOldPass = "";
            this.messageChangeNewPass = "";
          } else if (response.data.status == "success") {
            toast.success(response.data.message);
            this.oldPassword = "";
            this.newPassword = "";
            this.messageChangeOldPass = "";
            this.messageChangeNewPass = "";
          }
          this.isLoading = false;
        });
    },
    checkButtonSaveChange() {
      if (this.oldPassword.length >= 3 && this.newPassword.length >= 5) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
  },
  watch: {
    oldPassword(newValue, oldValue) {
      if (newValue.length === 0) {
        // this.messageChangeOldPass = "Vui lòng không để trống !";
      } else if (newValue.length < 5) {
        this.messageChangeOldPass = "Vui lòng nhập trên 5 kí tự !";
      } else {
        this.messageChangeOldPass = " ";
      }
      this.checkButtonSaveChange();
    },
    newPassword(newValue, oldValue) {
      if (newValue.length === 0) {
        // this.messageChangeNewPass = "Vui lòng không để trống !";
      } else if (newValue.length < 5) {
        this.messageChangeNewPass = "Vui lòng nhập trên 5 kí tự !";
      } else {
        this.messageChangeNewPass = "";
      }
      this.checkButtonSaveChange();
    },
  },
};
