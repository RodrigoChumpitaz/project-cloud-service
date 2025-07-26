import { Router } from 'express';
import { UserController } from '../controllers/auth/user/user.controller';
import { validateRequest } from '../middleware';
import { userSchema } from '../domain/auth/user.validation';

class UserRouter {
	router: Router;

	controller: UserController;

	constructor() {
		this.router = Router();
		this.controller = new UserController();
		this.routes();
	}

	routes() {
		this.router.route('/users').post(validateRequest(userSchema), this.controller.createUser.bind(this.controller));
		this.router.post('/users/confirm/:token', this.controller.confirmUser.bind(this.controller)),
			this.router.get('/users/:data', this.controller.getUser.bind(this.controller));
		this.router.post('/users/login', this.controller.login.bind(this.controller));
		this.router.post('/users/refresh-token', this.controller.refreshToken.bind(this.controller));
	}
}

export default new UserRouter().router;
