import axios from "../../config/axios";
import post from "../post/post.vue";
import Loading from 'vue-loading-overlay';

export default {
    name: "user-home",
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
            message: "",
            isLoading: false,
        };

    },
    methods: {
        getAllPost() {
            this.isLoading = true
            axios.get("post/suggest")
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                    } else if (response.data.status == "success") {
                        this.listPost = response.data.result;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                    }
                    this.isLoading = false
                })
        },
    }
}
