import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';
const toast = useToast();


export default {
    name: "post-detail",
    components: {
        Loading
      },
    data() {
        return {
            message: "",
            postDetail: {},
            isLoading: false,
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
                        this.postDetail.expiredDate = this.convertToDate(this.postDetail.expiredDate)
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
        convertToDate(yyyymmdd) {
            // Tách chuỗi thành các phần tử: năm, tháng, ngày
            const year = yyyymmdd.slice(0, 4);
            const month = yyyymmdd.slice(4, 6);
            const day = yyyymmdd.slice(6, 8);

            // Tạo đối tượng ngày từ các phần tử vừa tách được
            const date = new Date(`${year}-${month}-${day}`);
            return [day, month, year].join('-');
        },
        applyPost(){
            this.Loading = true;
            console.log(this.postDetail.id)
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
          }

    }
};
