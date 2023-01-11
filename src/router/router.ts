import {Router} from "express";
import homeController from "../controller/HomeController";
import {productRouter} from "./productRouter";
import {userRouter} from "./userRouter";

export const router = Router();
router.get('/home', homeController.showHome)
router.use('/product',productRouter)
router.use('/user',userRouter)

