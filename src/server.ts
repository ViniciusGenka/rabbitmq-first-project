import { RabbitmqProducerRoutes } from './rabbitmqProducerRoutes';
import { RabbitmqConsumer } from './rabbitmqConsumer';
import express from 'express';
import dotenv from 'dotenv';

class Server {
	private rabbitmqProducerRoutes: RabbitmqProducerRoutes;
	private rabbitmqConsumer: RabbitmqConsumer;
	private app: express.Application;

	constructor() {
		this.rabbitmqProducerRoutes = new RabbitmqProducerRoutes();
		this.rabbitmqConsumer = new RabbitmqConsumer();
		this.app = express();
		dotenv.config();
		this.config();
	}

	private config(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(this.rabbitmqProducerRoutes.router);
	}

	async start(): Promise<void> {
		const PORT = process.env.PORT || 3000;
		this.app.listen(PORT, () => {
			console.log(`Server started at http://localhost:${PORT}`);
		});
		await this.rabbitmqConsumer.run();
	}
}

new Server().start();
