import { Request, Response, NextFunction } from "express";
import { ContactModel, UserModel } from "../models";



const ContactController = {
    createContact : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const {user_id, contact_id, last_message, message, message_type} = req.body
    
            const existingcContact = await ContactModel.findOne({user_id, contact_id})
            if (existingcContact) {
                return res.status(400).json({ message: "Contact already exists" });
            }
            
            const existingUser = await UserModel.findOne({email : user_id})
            const existingContact = await UserModel.findOne({email : contact_id})
            
            if(!(existingUser && existingContact)) {
                return res.status(400).json({ message: "User doesn't exist" });
            }
            const newContact = new ContactModel({ user_id, contact_id, last_message, message, message_type });
            await newContact.save();
            res.status(201).json({ newContact });
        } catch (error) {
            next(error);
        }
    },

    updateContact : async (req : Request, res: Response, next : NextFunction) => {
        try {
            const { id } = req.params 
            const {user_id, contact_id, last_message, message, message_type} = req.body
            console.log(id, user_id, contact_id, last_message, message, message_type)
        } catch (error) {
            next(error)
        }
    },

    listContact: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
    
            const userContactsPromise = ContactModel.find({ user_id: id }).skip(skip).limit(limit);
            const contactContactsPromise = ContactModel.find({ contact_id: id }).skip(skip).limit(limit);
    
            const [userContacts, contactContacts] = await Promise.all([userContactsPromise, contactContactsPromise]);
            const combinedContacts = [...userContacts, ...contactContacts];
    
            res.status(200).json({ res: combinedContacts });
        } catch (error) {
            next(error);
        }
    }
    
}

export default ContactController