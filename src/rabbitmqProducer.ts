import { Rabbitmq } from './rabbitmqConfig';

export class RabbitmqProducer {
	private rabbitmq: Rabbitmq;

	constructor() {
		this.rabbitmq = new Rabbitmq();
	}

	async send(
		exchange: string,
		message: string,
		routingKey: string
	): Promise<boolean> {
		await this.rabbitmq.config();
		return this.rabbitmq.produce(exchange, message, routingKey);
	}
}
