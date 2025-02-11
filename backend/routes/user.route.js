import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", (req, res) => {
  res.send({
    title: "todo-list items",
  });
});

// userRouter.post("/",(req,res)=>{
//     res.send({
//         title:"create new user"
//     })
// })
export default userRouter;
