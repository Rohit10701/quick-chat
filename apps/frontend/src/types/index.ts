export type ContactItem =  {
    _id: string;
    user: {
        user_id: string;
        username: string;
    };
    contact: {
        user_id: string;
        username: string;
    };
    last_message: string;
    message: string;
    message_type: string;
    __v: number;
}
export type GetContacts = {
    data : {res:ContactItem[];}
};
