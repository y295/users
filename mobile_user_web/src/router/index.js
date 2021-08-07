import Home from "../view/home.vue"
import Login from "../view/login.vue"
// import Register from "../view/register.vue"
import userList from "../view/userList.vue"
import addUsers from "../view/addUsers.vue"
import editUsers from "../view/editUsers.vue"
// import searchList from "../view/searchList.vue"
// import Userinfo from "../view/userinfo.vue"
const routers = [
    {
        path: "/",
        redirect: '/home',

    },
    { path: "/login", component: Login },
    // { path: "/register", component: Register },
    {
        path: "/home", component: Home,
        children: [
            { path: '/home', component: userList },
            { path: '/home/userList', component: userList },
            { path: '/home/addUsers', component: addUsers },
            { path: '/home/editUsers/:id', component: editUsers, props: true },
            // { path: '/home/searchList/:value', component: searchList, props: true },
            // { path: '/home/userinfo/:id', component: Userinfo, props: true },
        ]

    },
];

export default routers
