import { Replies } from 'amqplib';

export default interface IBrokerServer {
    start(uri: string): Promise<void>;
    createExchange(exchangeName: string, exchangeType: string): Promise<void>;
    createQueue(queueName: string): Promise<void>;
    bindQueue(queueName: string, exchangeName: string, routingKey: string): Promise<void>;
    publishInQueue(queue: string, message: string): void;
    publishInExchange(exchange: string, routingKey: string, message: object): void;
    consumeMessage(queue: string, callback: Function): Promise<void>
}