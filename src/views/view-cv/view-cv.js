import axios from "../../config/axios";
// import toast from "bootstrap/js/src/toast";
import {useToast} from 'vue-toastification';
const toast = useToast();
import Loading from 'vue-loading-overlay';
export default {
    name: "view-cv",
    components: {
        Loading
      },
    data() {
        return {
            cv: {},
            message: "",
            isLoading: false,
        }
    },

    mounted() {
        this.getCv()
    },

    methods: {
        getCv() {
            this.isLoading = true;
            axios.get("cv/get-by-current-user").then((response) => {
                if (response.data.status == "error") {
                } else if (response.data.status == "not-found") {
                    toast.error(response.data.message);
                    this.$router.push({ name: 'CreateCv' })
                } else if (response.data.status == "success") {
                    this.cv = response.data.result;
                    this.setAvatar(response.data.result.avatar);
                }
                this.isLoading = false;
            })

        },
        setAvatar(avatar) {
            let reader = new FileReader();
            const byteCharacters = atob(avatar);

            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: "application/octet-stream" });

            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                let base64data = reader.result;
                let imgElement = document.getElementById("avatar");
                imgElement.src = base64data;
            }
        }
    }
};
