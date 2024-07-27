import { Router } from 'express';
import { ContactController } from '../controllers';
import { authMiddleware } from '../middleware';

const contactRouter = Router();
contactRouter.post('/create-contact', ContactController.createContact);
contactRouter.put('/update-contact/:id', ContactController.updateContact);
contactRouter.get('/list-contact/:id',  ContactController.listContact);

export default contactRouter;
