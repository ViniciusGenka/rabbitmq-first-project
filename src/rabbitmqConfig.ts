import { Connection, Channel, Message, connect } from 'amqplib';

export class Rabbitmq {
	private conn: Connection;
	private channel: Channel;
	private exchange;
	private queue;
	private routingKey;

	constructor() {
		this.exchange = 'first-exchange';
		this.queue = 'first-queue';
		this.routingKey = 'first-queue';
	}

	async config(): Promise<void> {
		this.conn = await connect(
			process.env.RABBITMQ_URI || 'amqp://user:password@localhost:5672'
		);
		this.channel = await this.conn.createChannel();
		await this.channel.assertExchange(this.exchange, 'direct', {
			durable: true,
		});
		await this.channel.assertQueue(this.queue, { durable: true });
		await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);
	}

	async consume(
		queue: string,
		callback: (message: Message) => void
	): Promise<void> {
		this.channel.consume(queue, (message) => {
			if (message == null) return console.log('Consumer failed');
			callback(message);
			this.channel.ack(message);
		});
	}

	produce(exchange: string, message: string, routingKey: string): boolean {
		return this.channel.publish(exchange, routingKey, Buffer.from(message));
	}
}
