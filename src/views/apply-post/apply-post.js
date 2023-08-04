import axios from "../../config/axios";
import headerContentAdmin from "@/components/header-content-admin";
import Loading from 'vue-loading-overlay';

export default {
    name: "apply-post",
    components: {
        headerContentAdmin,
        Loading
    },
    mounted(){
        this.getData();
    },
    data() {
        return {
            titlePage: "Quản Lý Ứng Viên",
            listApplyPost: [],
            isLoading: false,
        }
    },
    methods: {
        getData() {
            this.isLoading = true;
            axios.get("/apply-post/get-by-poster")
           .then((response) => {
            if (response.data.status == "error") {
                this.message = response.data.message;
            } else if (response.data.status == "success") {
                this.listApplyPost = response.data.result;
            } else if (response.data.status == "not-found") {
                this.message = response.data.message;
            }
            this.isLoading = false;
        })
        }
    }
}
