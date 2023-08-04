import axios from "../../config/axios";

import { useToast } from 'vue-toastification';
const toast = useToast();

import Loading from 'vue-loading-overlay';

export default {
    name: "forget-password",
    data() {
        return {
            username: "",
            message: "",
            isValid: true,
            isLoading: false,
        }
    },
    components: {
        Loading
    },
    methods: {
        forgotPass() {
            this.isLoading = true;
            axios.get("/account/forgot-password/" + this.username)
                .then((response) => {
                    if (response.data.status == "not-found") {
                        toast.error(response.data.message);
                    } else if (response.data.status == "success") {
                        toast.success(response.data.message);
                        this.$router.push({ name: 'Otp' })
                    }
                    this.isLoading = false;
                }).catch((error) => {
                });
            
        },
    },
    watch: {
        username(newValue, oldValue) {
            if (newValue.length < 2) {
                this.message = "Vui lòng nhập tên đăng nhập ít nhất 2 kí tự";
                this.isValid = true;
            } else {
                this.message = "";
                this.isValid = false;
            }
        },
    }
};
