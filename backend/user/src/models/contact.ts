import { Schema, model } from "mongoose";


interface IContacts extends Document {
    user_id : string;
    contact_id : string;
    last_message : string;
    message : string;
    message_type : "text" | "media";
    _id : string;
}

const contactSchema = new Schema<IContacts>({
    user_id : { type: String, required: true },
    contact_id : { type: String, required: true},
    last_message : { type: String },
    message : { type: String },
    message_type: { type: String, enum: ["text", "media"] }
})

const ContactModel = model<IContacts>('Contact', contactSchema)

export default ContactModel