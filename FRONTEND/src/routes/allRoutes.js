import { createRouter, createRoute } from "@tanstack/react-router";
import { rootRoute } from "./route.js";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import DashBoardNgo from "../pages/DashBoardNgo.jsx";
import Request from "../pages/Request.jsx";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/About",
  component: About,
});

const authRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : '/auth',
    component : AuthPage
})

const dashboardRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard/donor',
    component : Dashboard
})

const dashboardNgoRoute= createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard/ngo',
    component : DashBoardNgo
})
const requestRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : '/request',
    component : Request
})

export const router = createRouter({
    routeTree : rootRoute.addChildren([
        homeRoute,
        aboutRoute,
        authRoute,
        dashboardRoute,
        dashboardNgoRoute,
        requestRoute,
    ])
})