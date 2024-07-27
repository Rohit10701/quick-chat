import { Request, Response, NextFunction } from 'express'
import { ContactModel, UserModel } from '../models'
import { IUser, UserDocument } from '../models/user'
import { Document } from 'mongoose'

const ContactController = {
	createContact: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { user_email, contact_email, last_message, message, message_type } = req.body

			const user = await UserModel.findOne<IUser>({ email: user_email })
			const contact = await UserModel.findOne<IUser>({ email: contact_email })
			if (!(user && contact)) {
				return res.status(400).json({ message: "User doesn't exist" })
			}

			const userDetails = {
				user_id: user?._id?.toString(),
				username: user?.username,
				photo: user?.photo
			}
			const contactDetails = {
				user_id: contact?._id?.toString(),
				username: contact?.username,
				photo: contact?.photo
			}
			console.log(userDetails)
			const existingContact = await ContactModel.findOne({
				"user.user_id": userDetails?.user_id ,
				"contact.user_id": contactDetails?.user_id 
			})
			if (existingContact) {
				return res.status(400).json({ message: 'Contact already exists' })
			}

			const newContact = new ContactModel({
				user: userDetails,
				contact: contactDetails,
				last_message,
				message,
				message_type
			})
			await newContact.save()
			res.status(201).json({ newContact })
		} catch (error) {
			next(error)
		}
	},

	updateContact: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { user_id, contact_id, last_message, message, message_type } = req.body
			console.log(id, user_id, contact_id, last_message, message, message_type)
		} catch (error) {
			next(error)
		}
	},

	listContact: async (req: Request, res: Response, next: NextFunction) => {
		try {
			// baseUrl/user/mongodbId
			const { id } = req.params
			const page = parseInt(req.query.page as string) || 1
			const limit = parseInt(req.query.limit as string) || 10
			const skip = (page - 1) * limit

			const userContactsPromise = ContactModel.find({ 'user.user_id': id }).skip(skip).limit(limit)
			const contactContactsPromise = ContactModel.find({ 'contact.user_id': id })
				.skip(skip)
				.limit(limit)

			const [userContacts, contactContacts] = await Promise.all([
				userContactsPromise,
				contactContactsPromise
			])
			const combinedContacts = [...userContacts, ...contactContacts]

			res.status(200).json({ res: combinedContacts })
		} catch (error) {
			next(error)
		}
	}
}

export default ContactController
