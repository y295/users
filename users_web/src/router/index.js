import Home from "../view/home.vue"

const routers = [
    {
        path: "/",
        redirect: '/home',

    },
    // { path: "/login", component: Login },
    // { path: "/register", component: Register },
    {
        path: "/home", component: Home,
        // children: [
        //     { path: '/home', component: userList },
        //     { path: '/home/userList', component: userList },
        //     { path: '/home/addUser', component: addUser },
        //     { path: '/home/modify/:id', component: Modify, props: true },

        // ]

    },
];

export default routers
