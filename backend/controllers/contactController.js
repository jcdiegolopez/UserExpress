const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel.js')
//@desc Get all contacts
//@route Get /api/contacts
//@acces private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@acces private
const createContact = asyncHandler( async(req, res) => {
    const {name, email, phone} = req.body;
    console.log(req.body);
    if(!name || !email || !phone){
        res.status(404)
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id});
    res.status(201).json(contact);
});

//@desc get contact
//@route get /api/contacts/:id
//@acces private
const getContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contact found");
    }
    res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@acces private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contact found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user conacts")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )
    res.status(200).json(updateContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@acces private
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact); 
    if(!contact){
        res.status(404);
        throw new Error("No contact found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete other user conacts")
    }

    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});




module.exports = {
    getContacts,
    createContact,
    getContact,
    deleteContact,
    updateContact
};