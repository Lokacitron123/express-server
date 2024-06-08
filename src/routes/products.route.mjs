import { Router } from "express";
import { getProducts } from "../controllers/products.controller.mjs";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000 });
  return res.status(201).send({ message: "Hello" });
});

router.get("/api/products", getProducts);

export default router;
