import { Document, Schema, model } from "mongoose";
import { userDetails } from "../types";



interface IContacts extends Document<string> {
    user : userDetails;
    contact : userDetails;
    last_message : string;
    message : string;
    message_type : "text" | "media";
}

const contactSchema = new Schema<IContacts>({
    user: { type: Object, required: true },
    contact : { type: Object, required: true},
    last_message : { type: String },
    message : { type: String },
    message_type: { type: String, enum: ["text", "media"] }
})

const ContactModel = model<IContacts>('Contact', contactSchema)

export default ContactModel