import { RabbitmqProducerController } from './rabbitmqProducerController';
import { Router } from 'express';

export class RabbitmqProducerRoutes {
	public router: Router;
	public rabbitmqProducerController: RabbitmqProducerController;

	constructor() {
		this.router = Router();
		this.rabbitmqProducerController = new RabbitmqProducerController();
		this.config();
	}

	private config(): void {
		this.router.post(
			'/send/:exchange/:key',
			this.rabbitmqProducerController.send
		);
	}
}
