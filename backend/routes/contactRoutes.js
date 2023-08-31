const express = require("express");
const router = express.Router();
const path =  require("path");
const {getContact, createContact, getContacts, updateContact, deleteContact} = require(path.join(__dirname,"../controllers/contactController.js"));
const validateToken = require('../middleware/validateToken');

router.use(validateToken);

router.get("/", getContacts);

router.get("/:id", getContact)

router.post("/", createContact)

router.put("/:id", updateContact);

router.delete("/:id", deleteContact)



module.exports = router;
