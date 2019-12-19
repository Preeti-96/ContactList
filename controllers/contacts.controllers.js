const Contact = require('../models/contacts');

// controller-
function sendResponse(res, next, status, message, result = null) {
    let response = {
        status: status,
        message: message
    };
    if (result) {
        response.result = result;
    }
    res.json(response);
    if (status === 0) {
        res.end();
        next();
    }
}

class ContactsController {
    listContacts(req, res, next) {
        Contact.find((err, contacts) => {
            if (err) {
                sendResponse(res, next, 0, err);
            } else {
                sendResponse(res, next, 1, 'showing Contacts', contacts);
            }
        })
    }

    addContact(req, res, next) {
        let newContact = new Contact({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone
        });

        newContact.save((err, contact) => {
            if (err) {
                sendResponse(res, next, 0, err._message);
            } else {
                sendResponse(res, next, 1, 'message added successfully', contact);
            }
        });
    }

    editContact(req,res,next){
        let update = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone
        };
        console.log("update" + update);
        Contact.findOneAndUpdate({_id: req.params.id}, update, {new: true}, (err, result) => {
            if (err) {
                sendResponse(res,next,0,err);
            } else {
                sendResponse(res,next,1,'contact updated successfully',result);
            }
        });
    }

    deleteContact(req,res,next){
        Contact.deleteOne({_id: req.params.id}, (err, result) => {
            if (err) {
                sendResponse(res,next,0,err);
            } else {
                sendResponse(res,next,1,'contact deleted successfully',result);
            }
        });
    }
}

module.exports = new ContactsController();
