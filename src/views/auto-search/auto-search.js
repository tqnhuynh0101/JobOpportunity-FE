import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';

const toast = useToast();

export default {
    name: "auto-search",
    components: {
        Loading
    },
    data() {
        return {
            listProvince: [],
            selectedProvince: null,
            message: "",
            salary: 0,
            flag: false,
            isLoading: false
        }
    },
    methods: {
        getProvince() {
            this.isLoading = true;
            axios.get("provinces/get-all")
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                    } else if (response.data.status == "success") {
                        this.listProvince = response.data.result;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                    }
                    this.isLoading = false;
                });
        },
        save() {
            this.isLoading = true;
                axios.post("auto-search/create",{
                    provinceCode: this.selectedProvince,
                    flag: this.flag,
                    salary: this.salary
                })
                .then((response) => {
                    if (response.data.status == "error") {
                        toast.error(response.data.message)

                    } else if (response.data.status == "success") {
                        toast.success(response.data.message)
                        this.$emit("close");
                    }this.isLoading = false;
                });
        },
        getByCurrentUser(){
            this.isLoading = true;
            axios.get("auto-search/get-by-current-user")
            .then((response) => {
                if (response.data.status == "error") {
                    this.message = response.data.message;
                } else if (response.data.status == "success") {
                    this.message = response.data.message;
                    this.salary = response.data.result.salary;
                    this.selectedProvince = response.data.result.province;
                    this.flag = response.data.result.flag;
                } else if (response.data.status == "not-found") {
                    this.message = response.data.message;
                }this.isLoading = false;
            });
        }
    },
    mounted() {
        this.getProvince();
        this.getByCurrentUser();
    },

};
