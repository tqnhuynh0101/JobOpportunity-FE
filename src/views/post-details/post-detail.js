import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';
const toast = useToast();


export default {
    name: "post-detail",
    components: {
        Loading
      },
    props: ["idView"],
    mounted() {
          if (this.idView) {
              this.getPost(this.idView);
          }
    },  
    data() {
        return {
            message: "",
            postDetail: {},
            isLoading: false,
            uuid: null,
            isVisibleViewCv: false,
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.id) {
                vm.getPost(to.params.id);
            }
        });
    },

    methods: {
        getPost(id) {
            this.isLoading = true;
            axios.get("post/get-by-id/" + id)
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                    } else if (response.data.status == "success") {
                        this.postDetail = response.data.result;
                        this.postDetail.salaryMin = this.formatCurrency(this.postDetail.salaryMin)
                        this.postDetail.salaryMax = this.formatCurrency(this.postDetail.salaryMax)
                        this.setImage(response.data.result.image)
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                    }
                    this.isLoading = false;
                })

        },
        formatCurrency(price, symbol = "") {
            var DecimalSeparator = Number('1.2').toLocaleString().substr(1, 1);
            var priceWithCommas = price.toLocaleString();
            var arParts = String(priceWithCommas).split(DecimalSeparator);
            var intPart = arParts[0];
            var decPart = arParts.length > 1 ? arParts[1] : '';
            // decPart = (decPart + '00').substr(0, 2);
            return symbol + intPart;
        },
        goBack() {
            this.$router.back();
        },
        applyPost(){
            this.Loading = true;
            axios.post("apply-post/create/" + this.postDetail.id)
            .then((response) => {
                if (response.data.status == "error") {
                   toast.error(response.data.message)
                } else if (response.data.status == "success") {
                   toast.success(response.data.message)
                } else if (response.data.status == "not-found") {
                    toast.error(response.data.message)
                }
                this.Loading = false;
            })
        },
        setImage(avatar) {
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
          },
          
        openCv(uuid) {
            this.isVisibleViewCv = true;
            this.uuid = uuid;
        },
        closeViewCv() {
            this.isVisibleViewCv = false;
        }

    }
};
