import { Router } from 'express';
import {upload_none} from '@app/config/multer.config';
import {Auth_Controller} from "@app/modules/auth/auth.controller";
import {auth_middleware} from "@app/middlewares/auth.middleware";

const auth_routes = Router();

auth_routes.post('/register', upload_none, Auth_Controller.register);
auth_routes.post('/login', upload_none, Auth_Controller.login);
auth_routes.post('/me', auth_middleware, upload_none, Auth_Controller.me);
auth_routes.post('/logout', upload_none, Auth_Controller.logout);

export default auth_routes;
