import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/login/login.vue";
import Register from "@/views/register/register.vue";
import User from "@/views/user.vue";
import Admin from "@/views/admin.vue";
import UserHome from "@/views/user-home/user-home.vue";
import CreateCv from "@/views/create-cv/create-cv.vue";
import UpdateCv from "@/views/update-cv/update-cv.vue";
import ViewCv from "@/views/view-cv/view-cv.vue";
import ListPost from "@/views/list-post/list-post.vue";
import PostDetail from "@/views/post-details/post-detail.vue";
import ForgetPassword from "@/views/forget-password/forget-password.vue";
import Home from "@/views/home/home.vue";
import CreatePost from '@/views/create-post/create-post.vue';
import UserChangePassword from '@/views/change-pass/change-pass.vue'
import AdminChangePassword from '@/views/change-pass/change-pass.vue'
import PostManagement from "@/views/post-management/post-management.vue";
import SkillManagement from "@/views/skill-management/skill-management.vue";
import ApplyPost from "@/views/apply-post/apply-post.vue";
import Otp from "@/views/otp/otp.vue";
import NotFound from "@/components/not-found/not-found";
import MyApply from "@/views/my-apply/my-apply.vue";
import ChangeInformation from '@/views/change-information/change-information.vue';
import AccountManagement from '@/views/account-management/account-management.vue';
import Payment from '@/views/payment/payment.vue';
import checkout from '@/views/payment/checkout.vue';
import CvDetail from '@/views/cv-detail/cv-detail.vue';
import Income from '@/views/income/income.vue';


const Authority = {
    SEEKER: 'ROLE_SEEKER',
    EMPLOYEE: 'ROLE_EMPLOYEE',
    ADMIN: 'ROLE_ADMIN',
    GUEST: 'ROLE_GUEST'
}


const router = createRouter({
    history: createWebHistory("jot"),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {isLogin: false, authorities: [Authority.GUEST]},
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {isLogin: false, authorities: [Authority.GUEST]},
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {isLogin: false, authorities: [Authority.GUEST]},
        },
        {
            path: '/forget-password',
            name: 'ForgetPassword',
            component: ForgetPassword,
            meta: {isLogin: false, authorities: [Authority.GUEST]},
        },
        {
            path: '/otp/:id',
            name: 'Otp',
            component: Otp,
            meta: {isLogin: false, authorities: [Authority.GUEST]},
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
            children: [
                {
                    path: '/user/user-home',
                    name: 'UserHome',
                    component: UserHome,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/list-post',
                    name: 'ListPost',
                    component: ListPost,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/post-detail/:id',
                    name: 'PostDetail',
                    component: PostDetail,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/cv',
                    name: 'CreateCv',
                    component: CreateCv,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/update-cv',
                    name: 'UpdateCv',
                    component: UpdateCv,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/view-cv',
                    name: 'ViewCv',
                    component: ViewCv,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/change-password',
                    name: '/UserChangePassword',
                    component: UserChangePassword,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/my-apply',
                    name: 'MyApply',
                    component: MyApply,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/change-information',
                    name: 'ChangeInformation',
                    component: ChangeInformation,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE]},
                },
                {
                    path: '/user/cv-detail/:uuid',
                    name: 'CvDetail',
                    component: CvDetail,
                    meta: {isLogin: true, authorities: [Authority.EMPLOYEE, Authority.SEEKER, Authority.ADMIN]},
                },
            ]
        },
        {
            path: '/management',
            name: 'Admin',
            component: Admin,
            meta: {isLogin: true, authorities: [Authority.ADMIN, Authority.SEEKER]},
            children: [
                {
                    path: '/management/create-post',
                    name: 'CreatePost',
                    component: CreatePost,
                    meta: {isLogin: true, authorities: [Authority.SEEKER]},
                },
                {
                    path: '/management/change-password',
                    name: '/AdminChangePassword',
                    component: AdminChangePassword,
                    meta: {isLogin: true, authorities: [Authority.ADMIN, Authority.SEEKER]},
                },
                {
                    path: '/management/post-management',
                    name: '/PostManagement',
                    component: PostManagement,
                    meta: {isLogin: true, authorities: [Authority.ADMIN, Authority.SEEKER]},
                },
                {
                    path: '/management/skill-management',
                    name: '/SkillManagement',
                    component: SkillManagement,
                    meta: {isLogin: true, authorities: [Authority.ADMIN]},
                },
                {
                    path: '/management/apply-post',
                    name: '/ApplyPost',
                    component: ApplyPost,
                    meta: {isLogin: true, authorities: [Authority.SEEKER]},
                },
                {
                    path: '/management/account',
                    name: '/AccountManagement',
                    component: AccountManagement,
                    meta: {isLogin: true, authorities: [Authority.ADMIN]},
                },
                {
                    path: '/management/payment',
                    name: '/Payment',
                    component: Payment,
                    meta: {isLogin: true, authorities: [Authority.SEEKER]},
                },
                {
                    path: '/management/checkout',
                    name: '/checkout',
                    component: checkout,
                    meta: {isLogin: true, authorities: [Authority.SEEKER]},
                },
                {
                    path: '/management/income',
                    name: '/Income',
                    component: Income,
                    meta: {isLogin: true, authorities: [Authority.ADMIN]},
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: {error: true, authorities: []},
        },
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = checkAuthentication();
    const authority = getAuthority()
    const checkAuthority = to.meta.authorities.find(element => element === authority)

    if (to.meta.error) {
        next();
    }

    if (to.meta.isLogin) {
        if (isAuthenticated) {
            if (checkAuthority) {
                next();
            } else {
                if (authority === Authority.ADMIN || authority === Authority.SEEKER) {
                    next("/management")
                } else if (authority === Authority.EMPLOYEE) {
                    next("/user/user-home")
                } else {
                    next('/');
                }
            }
        } else {
            next('/');
        }
    } else {
        if (!isAuthenticated) {
            next();
        } else {
            if (authority === Authority.ADMIN || authority === Authority.SEEKER) {
                next("/management")
            } else if (authority === Authority.EMPLOYEE) {
                next("/user/user-home")
            } else {
                next('/');
            }
        }
    }

});

function checkAuthentication() {
    return localStorage.getItem("token") != null;
}

function getAuthority() {
    if (checkAuthentication()) {
        return JSON.parse(localStorage.getItem('current-account')).authority;
    } else {
        return Authority.GUEST;
    }
}

export default router
