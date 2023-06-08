import { Rabbitmq } from './rabbitmqConfig';
import { Message } from 'amqplib';

export class RabbitmqConsumer {
	private rabbitmq: Rabbitmq;

	constructor() {
		this.rabbitmq = new Rabbitmq();
	}

	async run(): Promise<void> {
		await this.rabbitmq.config();
		await this.rabbitmq.consume('first-queue', (message: Message) =>
			console.log(message.content.toString())
		);
	}
}
