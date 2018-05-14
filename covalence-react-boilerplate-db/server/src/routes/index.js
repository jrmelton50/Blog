import { Router } from "express";
import authRouter from "./auth";
import blogsRouter from "./blogs";
import authorsRouter from "./authors";
import tagsRouter from "./tags";
import usersRouter from "./users";
import stripeDonationRouter from './stripeDonations';
import contactRouter from './contactForm';
import { isLoggedIn, tokenMiddleware} from "../middleware/auth.mw";

let router = Router();

router.use("/auth", authRouter);
router.use("/donate", stripeDonationRouter);
router.use("/contact", contactRouter);

// must be logged in to post, put, or delete
router
  .route("*")
  .post(tokenMiddleware, isLoggedIn)
  .put(tokenMiddleware, isLoggedIn)
  .delete(tokenMiddleware, isLoggedIn);

router.use("/blogs", blogsRouter);
router.use("/authors", authorsRouter);
router.use("/tags", tagsRouter);
router.use("/users", usersRouter);


export default router;
