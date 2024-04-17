import express from "express";
import * as linkValidator from "./linkValidator";
import * as linkConroller from "./linkController";

const router = express.Router();

//router.use(authMiddleware.token, authMiddleware.validate);
router.post("/:userId/new-link", linkConroller.createNewLink);
router.post("/:userId/:linkId/new-target", linkConroller.createNewTarget);
router.get("/:userId/:linkId", linkConroller.getLinkById)
router.get("/:userId/:linkId/:targetId", linkConroller.getTargetByLinkId);
router.delete("/:userId/:linkId/delete-link", linkConroller.deleteLinkById);



export default router;
