import { Router } from 'express';
import { RepairLogController } from '../controllers/repair/repairLog.controller';
import { validateRequest } from '../middleware';
import { repairLogSchema } from '../domain/repair/repairLog.validations';

class RepairLogRouter {
	router: Router;

	controller: RepairLogController;

	constructor() {
		this.router = Router();
		this.controller = new RepairLogController();
		this.routes();
	}

	routes() {
		this.router
			.route('/repair')
			.post(validateRequest(repairLogSchema), this.controller.createRepairLog.bind(this.controller))
			.get(this.controller.getRepairLog.bind(this.controller))
			.put(validateRequest(repairLogSchema), this.controller.updateRepairLog.bind(this.controller));
		this.router.delete('/repair/:id', this.controller.deleteRepairLog.bind(this.controller));
	}
}

export default new RepairLogRouter().router;
