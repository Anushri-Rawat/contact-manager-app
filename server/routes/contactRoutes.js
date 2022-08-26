const express = require("express");
const contactController = require("./../controllers/contactController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/contact-category").get(contactController.groupContactsCategory);

router
  .route("/")
  .get(contactController.getAllContacts)
  .post(contactController.setUserIds, contactController.createContact);
router
  .route("/:id")
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
