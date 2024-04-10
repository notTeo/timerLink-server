import express from "express";
import {
  createLink,
  createTarget,
  createUser,
  deleteLink,
  deleteLinkTarget,
  deleteUser,
  getAllUsers,
  getLinkAllTargets,
  getLinkTarget,
  getUser,
  getUserAllLinks,
  getUserLink,
  updateLinkTarget,
} from "../controllers/index";
const router = express.Router();

//GET requests

router.get("/users/:userId/links", getUserAllLinks);
router.get("/users/:userId/:linkId", getUserLink);
router.get("/users/:userId/:linkId/targets",   getLinkAllTargets,);
router.get("/users/:userId/:linkId/:targetId", getLinkTarget);

//POST requests
router.post("/users/:userId/new-link", createLink);
router.post("/users/:userId/:linkId/new-target", createTarget);

//DELETE requests
router.delete("/users/:userId/:linkId", deleteLink);
router.delete("/users/:userId/:linkId/:targetId", deleteLinkTarget);

//PUT requests
router.put("/users/:userId/:linkId/:targetId", updateLinkTarget);

export default router;
