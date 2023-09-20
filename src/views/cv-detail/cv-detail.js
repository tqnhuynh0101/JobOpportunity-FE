import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
const toast = useToast();
import Loading from 'vue-loading-overlay';

export default {
    name: "cv-detail",
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
    props: [
        'uuid',
        'previewCv'
    ],
    mounted() {
        console.log(this.uuid)
        if(this.uuid != null) {
            this.getCv(this.uuid);
        } else {
            this.getCv()
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.uuid) {
                vm.getCv(to.params.uuid);
            }
        });
    },

    methods: {
        getCv(uuid) {
            this.isLoading = true;
            axios.get("cv/get-cv-view/"+ uuid)
            .then((response) => {
                if(response.data.status == "not-found" || response.data.status== "error") {
                    toast.error("CV không tồn tại");
                }else if (response.data.status == "success") {
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
