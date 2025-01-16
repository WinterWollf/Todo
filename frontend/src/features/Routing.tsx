import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {ToDoHistory} from "./todo/ToDoHistory.tsx";
import {ToDoList} from "./todo/ToDoList.tsx";
import {ToDoForm} from "./todo/ToDoForm.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";
import {LoginPage} from "./login/LoginPage.tsx";
import {useIsLogged} from "../hooks/useIsLogged.ts";
import {ProfilePage} from "./profile/ProfilePage.tsx";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "*",
                element: <Navigate to="/login" replace/>
            }
        ]
    }
];

const privateRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/todo",
                element: <ToDoList/>
            },
            {
                path: "/todo/new",
                element: <ToDoForm/>
            },
            {
                path: "/todo/:id",
                element: <ToDoForm/>
            },
            {
                path: "/history",
                element: <ToDoHistory/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "*",
                element: <ErrorPage/>
            }
        ]
    }
];

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}