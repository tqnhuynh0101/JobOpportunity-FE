import axios from "../../config/axios";

import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';

const toast = useToast();

export default {
    mounted() {
        this.checkButton();
    },
    components: {
        Loading
    },
    data() {
        return {
            authority: "EMPLOYEE",
            name: "",
            email: "",
            age: "",
            tel: "",
            gender: false,
            message: "",
            messageName: "",
            messageMail: "",
            messageAge: "",
            messageTel: "",
            isValid: true,
            isLoading: false,
        };
    },
    methods: {
        register() {
            this.isLoading = true;
            if (this.name.length < 4) {
                this.messageName = "Vui lòng nhập Họ và Tên ít nhất 4 ký tự!";
                return;
            }
            if (!this.checkEmail()) {
                this.messageMail = "Vui lòng nhập đúng định dạng của email!";
                return;
            }
            if (!this.checkTel()) {
                this.messageTel = "Vui lòng nhập đúng định dạng của số điện thoại!";
                return;
            }
            if (this.validateNumber()) {
                this.messageAge = "Vui lòng nhập tuổi giá trị số!";
                return;
            }
            if (Number(this.age) > 60 || Number(this.age < 18)) {
                this.messageAge = "Vui lòng nhập giá trị tuổi từ 18 - 60!";
                return;
            }
            axios.post("account/register", {
                authority: this.authority,
                name: this.name,
                email: this.email,
                age: this.age,
                tel: this.tel,
                gender: this.gender,
            }).then((response) => {
                if (response.data.status == "error") {
                    toast.error(response.data.message);
                } else {
                    this.name = ""
                    this.email = "";
                    this.age = "";
                    this.tel = "";
                    this.$router.push({name: "Login"});
                    toast.success(response.data.message);
                }
                this.isLoading = false;
            })
                .catch((error) => {
                    this.isLoading = false;
                });


        },
        checkEmail() {
            var regix =
                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (regix.test(this.email)) {
                return true;
            }
            return false;
        },

        checkTel() {
            var regix = /^0([3|5|7|8|9])([0-9]){8}$/;

            if (regix.test(this.tel)) {
                return true;
            }
            return false;
        },
        validateNumber() {
            if (isNaN(this.age)) {
                return true;
            } else {
                return false;
            }
        },
        checkButton() {
            if (
                this.name.length >= 4 &&
                this.checkEmail() &&
                !this.validateNumber() &&
                this.age <= 60 &&
                this.age >= 18 &&
                this.checkTel()
            ) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        },
    },
    watch: {
        name(newValue, oldValue) {
            if (newValue.length < 4) {
                this.messageName = "Vui lòng nhập Họ và Tên ít nhất 4 ký tự!";
            } else {
                this.messageName = "";
            }
            this.checkButton();
        },
        email(newValue, oldValue) {
            if (!this.checkEmail()) {
                this.messageMail = "Vui lòng nhập đúng định dạng của email!";
            } else {
                this.messageMail = "";
            }
            this.checkButton();
        },
        age(newValue, oldValue) {
            if (this.validateNumber()) {
                this.messageAge = "Vui lòng nhập đúng định dạng  của tuổi !";
            } else if (newValue > 60 || newValue < 18) {
                this.messageAge = "Vui lòng nhập giá trị tuổi từ 18 - 60!";
            } else {
                this.messageAge = "";
            }
            this.checkButton();
        },
        tel(newValue, oldValue) {
            if (!this.checkTel()) {
                this.messageTel = "Vui lòng nhập đúng định dạng của số điện thoại!";
            } else {
                this.messageTel = "";
            }
            this.checkButton();
        },
    },
};
