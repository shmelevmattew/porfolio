import React, {FC, ReactNode} from 'react';

import {
    createBrowserRouter, RouteProps,
    RouterProvider
} from "react-router-dom";
import {AboutPage} from "../../../pages/AboutPage";
import {WelcomePage} from "../../../pages/WelcomePage";
import {HomePage} from "../../../pages/HomePage";

enum AppRoutes {
    WELCOME = 'welcome',
    HOME = 'home',
    ABOUT = 'about'
}

const RoutePaths : Record<AppRoutes,string> = {
    [ AppRoutes.WELCOME ] : '/welcome',
    [ AppRoutes.HOME ]:'/',
    [ AppRoutes.ABOUT ]:'/about',
}

const RouterConfig : Record<AppRoutes , RouteProps> = {
    [AppRoutes.WELCOME]: {
        path : RoutePaths.welcome,
        element : <WelcomePage/>
    },
    [AppRoutes.HOME]: {
        path : RoutePaths.home,
        element : <HomePage/>
    },
    [AppRoutes.ABOUT]: {
        path : RoutePaths.about,
        element : <AboutPage/>
    },
}

interface MyRouterProviderProps {
    children? : ReactNode
}

const MyRouterProvider : FC<MyRouterProviderProps> = (props) => {

    const { children } = props

    const router = createBrowserRouter(
        Object.values(RouterConfig).map(({path,element})=>{
            return {
                path: path,
                element: element
            }
        })
    );

    return (
        <RouterProvider router={router}/>
    );
};

export default MyRouterProvider;
