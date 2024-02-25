import { AppRoutes } from "../models/common.model";
import { appInfoRouter } from "./app-info.routes";
import { authenticationRouter } from "./authentication.routes";
import { productRouter } from "./product.routes";
import { userRouter } from "./user.routes";

export const routes: AppRoutes[] = [
    {
        path: '/app-info/v1',
        router: appInfoRouter
    },
    {
        path: '/users/v1',
        router: userRouter
    },
    {
        path: '/authentication/v1',
        router: authenticationRouter
    },
    {
        path: '/products/v1',
        router: productRouter
    }
];
