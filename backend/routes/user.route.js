import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/:id", getUser);

// userRouter.post("/",(req,res)=>{
//     res.send({
//         title:"create new user"
//     })
// })
export default userRouter;
