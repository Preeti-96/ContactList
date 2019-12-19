const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts.controllers');


//list contacts
router.get('/contacts', contactsController.listContacts);

//Add contact
router.post('/contact', contactsController.addContact);

//Edit Contact
router.put('/contact/:id', contactsController.editContact);

//Delete Contact
router.delete('/contact/:id', contactsController.deleteContact);


module.exports = router;
