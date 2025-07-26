import { Router } from 'express';
import { OwnerController } from '../controllers/owner/owner.controller';
import { validateRequest } from '../middleware';
import { ownerValidationSchema } from '../domain/owner/owner.validation';

class OwnerRouter {
	router: Router;

	controller: OwnerController;

	constructor() {
		this.router = Router();
		this.controller = new OwnerController();
		this.routes();
	}

	routes() {
		this.router.route('/owner').post(validateRequest(ownerValidationSchema), this.controller.createOwner).get(this.controller.getOwners);
		this.router
			.route('/owner/:id')
			.get(this.controller.getOwnerById)
			.patch(this.controller.updateOwner)
			.delete(this.controller.deleteOwner);
	}
}

export default new OwnerRouter().router;
