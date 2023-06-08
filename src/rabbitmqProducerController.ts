import { RabbitmqProducer } from './rabbitmqProducer';
import { Request, Response } from 'express';

export class RabbitmqProducerController {
	private rabbitmqProducer: RabbitmqProducer;

	constructor() {
		this.rabbitmqProducer = new RabbitmqProducer();
	}

	send = async (req: Request, res: Response): Promise<void> => {
		const { exchange, key } = req.params;
		const message = JSON.stringify(req.body);
		(await this.rabbitmqProducer.send(exchange, message, key))
			? res.status(200).send()
			: res.status(400).send();
	};
}
