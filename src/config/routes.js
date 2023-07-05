import {
    Login,
    SignUp,
    Home
  } from "../pages";
  
  const routes = [
    { path: "/login", component: Login },
    { path: "/signup", component: SignUp },
    { path: "/", component: Home },
  ];
  
  export default routes;
  