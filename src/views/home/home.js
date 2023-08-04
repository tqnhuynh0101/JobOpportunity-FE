import axios from "../../config/axios";
import post from "../post/post.vue";
import Loading from 'vue-loading-overlay';

export default {
    name: "home",
    components: {
        post,
        Loading
    },
    mounted() {
        this.getAllPost();
    },
    data() {
        return {
            listPost: [],
            totalPages: 0,
            page: 0,
            message: "",
            messageProvinces: "",
            listProvince: [],
            selectedProvince: null,
            messageDistrict: "",
            listDistrict: [],
            selectedDistrict: null,
            selectedWard: null,
            messageWard: "",
            listWard: [],
            messageNotFound: "",
            isLoading: false,
        };

    },
    methods: {
        getAllPost() {
            this.isLoading = true;
            axios.get("post/get-20-newest-posts")
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                    } else if (response.data.status == "success") {
                        this.totalPages = response.data.result.totalPages;
                        this.listPost = response.data.result;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                    }
                    this.isLoading = false;
                })
        },
    }
}
