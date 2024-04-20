import express from "express";
import * as linkValidator from "./linkValidator";
import * as linkConroller from "./linkController";
import * as authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware.validateToken);

router.get("/", linkConroller.getLinks);
router.post("/:userId/new-link", linkConroller.createNewLink);
router.post("/:userId/:linkId/new-target", linkConroller.createNewTarget);
router.get("/:userId/:linkId", linkConroller.getLinkById);
router.get("/:userId/:linkId/:targetId", linkConroller.getTargetByLinkId);
router.delete("/:userId/:linkId/delete-link", linkConroller.deleteLinkById);
router.delete(
  "/:userId/:linkId/:targetId/delete-target",
  linkConroller.deleteTargetById,
);
router.put(
  "/:userId/:linkId/:targetId/edit-target",
  linkConroller.updateTargetById,
);

export default router;
