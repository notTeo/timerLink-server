import express from "express";
import * as userValidator from "./user.validator";
import * as userController from "./user.controller";
import * as authMiddleware from "../../middleware/auth.middleware";
import * as validatorMiddleware from "../../middleware/validator.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware.token,
  validatorMiddleware.validate,
  userController.getAllUsers,
);

router.post(
  "/new-user",
  authMiddleware.token,
  userValidator.createUserValidation,
  validatorMiddleware.validate,
  userController.createNewUser,
);

router.get("/:userId", userController.getUserById);

router.put(
  "/:userId/edit-user",
  userValidator.updateUserValidation,
  userController.updateUserById,
);

router.delete("/:userId/delete-user", userController.deleteUserbyId);
router.get("/:userId/links", userController.getLinksByUserId);
//router.get("/links", userController.getLinksByJwtToken);

export default router;
