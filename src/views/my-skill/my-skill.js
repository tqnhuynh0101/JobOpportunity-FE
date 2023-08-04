import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';

const toast = useToast();

export default {
    name: "my-skill",
    data() {
        return {
            listSkill: [],
            newSkill: null,
            listBaseSkill: [],
            skillSelect:null,
            isLoading: false,
        }
    },
    components: {
        Loading
      },
    mounted() {
        this.getBaseSkill();
        this.getSkill();
    },
    methods: {
        getSkill() {
            this.isLoading = true;
            // lấy skill của current account, lưu vào listSkill, lưu ý định dạng object và string (listSkill là mảng string)
            axios.get("/skill-employee/get-by-employee-id")
            .then((response) => {
                if (response.data.status == "error") {
                    this.message = response.data.message;
                } else if (response.data.status == "success") {
                    this.listSkill = response.data.result;
                } else if (response.data.status == "not-found") {
                    this.message = response.data.message;
                }
                this.isLoading = false;
            })
        },
        save() {
            this.isLoading = true;
            axios.put("/skill-employee/save", this.listSkill)
            .then((response) => {
                if (response.data.status == "error") {
                    toast.error(response.data.message);
                } else if (response.data.status == "success") {
                    toast.success(response.data.message);
                }
                this.isLoading = false;
            })
        },
        getBaseSkill() {
            this.isLoading = true;
            axios.get("skill/base-skill")
                .then((response) => {
                    if (response.data.status == "error") {
                        this.message = response.data.message;
                    } else if (response.data.status == "success") {
                        this.listBaseSkill = response.data.result;
                    } else if (response.data.status == "not-found") {
                        this.message = response.data.message;
                    }
                    this.isLoading = false;
                })
        },
        add() {
            this.isLoading = true;
            if(this.skillSelect) {
                this.skillSelect = this.skillSelect.trim();
            }
            if(this.newSkill) {
                this.newSkill = this.newSkill.trim();
            }
            if(this.skillSelect || this.newSkill) {
                if (!this.listSkill.includes(this.skillSelect)) {
                    this.listSkill.push(this.skillSelect);
                } else {
                    toast.error("Kỹ năng đã tồn tại!");
                }
                this.skillSelect = null;
                this.newSkill = null;
                this.isLoading = false;
            }
        },
        addNewData() {
            this.isLoading = true;
            if(this.skillSelect) {
                this.skillSelect = this.skillSelect.trim();
            }
            if(this.newSkill) {
                this.newSkill = this.newSkill.trim();
            }
            if(this.skillSelect || this.newSkill) {
                if (!this.listSkill.includes(this.newSkill)) {
                    this.listSkill.push(this.newSkill);
                } else {
                    toast.error("Kỹ năng đã tồn tại!");
                }
                this.newSkill = null;
                this.isLoading = false;
            }
        },
        deleteSkill(index) {
            this.listSkill.splice(index, 1);
        }
    },
}
