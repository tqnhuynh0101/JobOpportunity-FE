import axios from "../../config/axios";
import { useToast } from 'vue-toastification';
import { Modal } from 'usemodal-vue3';
import Loading from 'vue-loading-overlay';

const toast = useToast();


export default {
    name: "create-cv",
    mounted() {
        // this.getData();
        this.getAccountLogin();
        this.getBaseSkill();
    },
    components: {
        Modal,
        Loading
    },
    data() {
        return {
            cv: null,
            name: "",
            pos: "",
            email: "",
            tel: "",
            address: "",
            age: 0,
            intro: "",
            education: [],
            educationDegree: "Giỏi",
            educationSpecialized: "",
            educationFrom: null,
            educationTo: null,
            educationSchool:"",
            workExperience: [],
            workExperienceName: "",
            workExperiencePos: "",
            workExperienceBegin: null,
            workExperienceEnd: null,
            workExperienceAchievement: "",
            certifications: [],
            certificationName: "",
            certificationYear: null,
            awards: [],
            awardName: "",
            awardYear: null,
            listSkill: [],
            listBaseSkill: [],
            listInterest: [],
            skillSelect: null,
            newSkill: null,
            newInterest: null,
            image: null,
            previewSrc: null,
            isVisibleConfirmSave: false,
            isLoading: false,

        }
    },
    methods: {
        // getData() {
        //     this.isLoading = true;
        //     axios.get("/cv/get-by-current-user")
        //         .then((response) => {
        //             if (response.data.status == "success") {
        //                 this.cv = response.data.result;
        //                 this.name = this.cv.name;
        //                 this.pos = this.cv.pos;
        //                 this.email = this.cv.email;
        //                 this.tel = this.cv.tel;
        //                 this.gender = this.cv.gender;
        //                 this.age = this.cv.age;
        //                 this.intro = this.cv.intro;
        //                 this.education = this.cv.education;
        //                 this.workExperience = this.cv.workExperience;
        //                 this.certifications = this.cv.certifications;
        //                 this.awards = this.cv.awards;
        //                 this.listSkill = this.cv.skill;
        //                 this.listInterest = this.cv.interest;
        //                 this.address = this.cv.address;
        //                 this.setAvatar(this.cv.avatar);
        //             } this.isLoading = false;
        //         })
        // },
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
        addSkill() {
            this.isLoading = true;
            try{
                if(this.skillSelect) {
                    this.skillSelect = this.skillSelect.trim();
                }
                if(this.newSkill) {
                    this.newSkill = this.newSkill.trim();
                }
                if (this.skillSelect || this.newSkill) {
                    if (!this.listSkill.includes(this.skillSelect)) {
                        this.listSkill.push(this.skillSelect);
                    } else {
                        toast.error("Kỹ năng đã tồn tại!");
                    }
    
                    this.skillSelect = null;
                    this.newSkill = null;
                }else{
                    toast.error("Thông tin không hợp lệ");
                }
            }catch{
            }finally{
                this.isLoading = false;
            }
        },
        addNewDataSkill() {
            
            this.isLoading = true;
            if(this.skillSelect) {
                this.skillSelect = this.skillSelect.trim();
            }
            if(this.newSkill) {
                this.newSkill = this.newSkill.trim();
            }
            if (this.skillSelect || this.newSkill) {
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
        },
        addInterest() {
            this.isLoading = true;
            if (this.newInterest || this.newInterest != null) {
                if (!this.listInterest.includes(this.newInterest)) {
                    this.listInterest.push(this.newInterest);
                } else {
                    toast.error("Kỹ năng đã tồn tại!");
                }
                this.newInterest = null;
                this.isLoading = false;
            }
            else{
                toast.error("Thông tin không hợp lệ");
                this.isLoading = false;
            }
        },
        deleteInterest(index) {
            this.listInterest.splice(index, 1);
        },
        addCertifications() {
            this.isLoading = true;
            var certification = {
                name: this.certificationName,
                year: this.certificationYear
            };
            function compareObjects(obj, objectArray) {
                for (let item of objectArray) {
                    if (obj.name === item.name) {
                        return true;
                    }
                }
                return false;
            }
            if (compareObjects(certification, this.certifications)) {
                toast.error("Chứng chỉ này đã tồn tại!")
            } else {
                if(certification.name == "" || certification.year==""){
                    toast.error("Không được để trống")
                }else{
                    this.certifications.push(certification);
                    this.certificationName = null;
                    this.certificationYear = null;
                }

            }
            this.isLoading = false;
        },
        deleteCertification(index){
            this.certifications.splice(index, 1);
        },
        addAwards() {
            this.isLoading = true;
            var award = {
                name: this.awardName,
                year: this.awardYear
            };
            function compareObjects(obj, objectArray) {
                for (let item of objectArray) {
                    if (obj.name === item.name && obj.year === item.year) {
                        return true;
                    }
                }
                return false;
            }
            if (compareObjects(award, this.awards)) {
                toast.error("Giải thưởng này đã tồn tại!")
            } else {
                if(award.name == "" || award.year ==""){
                    toast.error("Không được để trống")
                }else{
                    this.awards.push(award);
                }
            }
            this.isLoading = false;
        },
        deleteAward(index){
            this.awards.splice(index, 1);
        },
        addWorkExperience() {
            this.isLoading = true;
            var wE = {
                position: this.workExperiencePos,
                from: this.workExperienceBegin,
                to: this.workExperienceEnd,
                company: this.workExperienceName,
                achievements: this.workExperienceAchievement
            };
            function compareObjects(obj, objectArray) {
                for (let item of objectArray) {
                    if (obj.company === item.company && obj.position === item.position && ((obj.from === item.from && obj.to === item.to) )) {
                        return true;
                    }
                }
                return false;
            }
            if (compareObjects(wE, this.workExperience)) {
                toast.error("Kinh nghiệm làm việc đã tồn tại!")
            } else {
                if(wE.achievements==""||wE.company==""||wE.from==""||wE.position==""||wE.to==""){
                    toast.error("Không được để trống")
                }else{
                    this.workExperience.push(wE);
                    this.workExperiencePos = null;
                    this.workExperienceBegin = null;
                    this.workExperienceEnd = null;
                    this.workExperienceName = null;
                    this.workExperienceAchievement = null;
                }
            }
            this.isLoading = false;
        },
        deleteWorkExperience(index){
            this.workExperience.splice(index, 1);
        },
        addEducation() {
            this.isLoading = true;
            var e = {
                school: this.educationSchool,
                from: this.educationFrom,
                to: this.educationTo,
                degree: this.educationDegree,
                specialized: this.educationSpecialized
            };
            function compareObjects(obj, objectArray) {
                for (let item of objectArray) {
                    if (obj.school === item.school && obj.specialized === item.specialized && ((obj.from === item.from && obj.to === item.to) || (obj.from > item.from && obj.from < item.to) || (obj.to > item.from && obj.to < item.to) || (obj.from < item.from && obj.to > item.form) || (obj.from < item.to && obj.to > item.to))) {
                        return true;
                    }
                }
                return false;
            }
            if (compareObjects(e, this.education)) {
                toast.error("Học vấn đã tồn tại!")
            } else {
                if (e.school == "" || e.degree == "" || e.from == "" || e.to == "" || e.specialized == ""){
                    toast.error("Không được để trống")
                }else{
                    this.education.push(e);
                    this.educationSchool = null;
                    this.educationFrom = null;
                    this.educationTo = null;
                    this.educationDegree = "Giỏi";
                    this.educationSpecialized = null;
                }
                
            }
            this.isLoading = false;
        },
        deleteEducation(index){
            this.education.splice(index, 1);
        },
        getAccountLogin() {
            this.isLoading = true;
            axios.get("account/get-account-login")
                .then((response) => {
                    if(response.data.status == "success"){
                        this.email = response.data.result.email;
                        this.tel = response.data.result.tel;
                        this.name = response.data.result.name;
                        this.age = response.data.result.age;
                    }
                    this.isLoading = false;
                })
        },
        save() {
            this.isLoading = true;
            const formData = new FormData();
            formData.append('file', this.image);
            formData.append('cv', JSON.stringify({
                "pos": this.pos,
                "name": this.name,
                "email": this.email,
                "tel": this.tel,
                "gender": this.gender,
                "age": this.age,
                "intro": this.intro,
                "education": this.education,
                "workExperience": this.workExperience,
                "certifications": this.certifications,
                "awards": this.awards,
                "skill": this.listSkill,
                "interest": this.listInterest,
                "address": this.address
            }));
            axios.post('cv/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data.status == "error") {
                    toast.error(response.data.message);
                    this.isVisibleConfirmSave = false;
                } else if (response.data.status == "success") {
                    toast.success(response.data.message);
                    this.isVisibleConfirmSave = false;
                }
                this.isLoading = false;
            })
            .catch(error => {

            });
    },
    previewImage(event) {
        const file = event.target.files[0];
        this.image = file;
        const reader = new FileReader();

        reader.onload = () => {
          this.previewSrc = reader.result;
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      },
        confirmSave() {
            this.isVisibleConfirmSave = true;
        },
        closeComfirmSave() {
            this.isVisibleConfirmSave = false;
        },
    },


}
