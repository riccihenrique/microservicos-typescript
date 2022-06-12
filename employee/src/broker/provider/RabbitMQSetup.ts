import { RABBIT_CONFIG } from '../config';
import rabbitInstance from './RabbitmqProvider';

export default class RabbitMQSetup {
    static async init() {
        try {
            await rabbitInstance.start(RABBIT_CONFIG.RABBITMQ_URI);
            await rabbitInstance.createExchange(RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.EXCHANGE_TYPE_DIRECT);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_CUSTOMER_CREATED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_CUSTOMER_CREATED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_CUSTOMER_CREATED);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_CUSTOMER_UPDATED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_CUSTOMER_UPDATED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_CUSTOMER_UPDATED);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_CUSTOMER_DELETED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_CUSTOMER_DELETED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_CUSTOMER_DELETED);

        } catch (error) {
            console.log('error rabbitmq: ', error);
        }
    }
}