import { ConsumeMessage } from 'amqplib';
import EnterpriseCreatedFactory from '../factories/EnterpriseCreatedFactory';
import EnterpriseDeletedFactory from '../factories/EnterpriseDeletedFactory';
import EnterpriseUpdatedFactory from '../factories/EnterpriseUpdatedFactory';
import { RABBIT_CONFIG } from './config';
import RabbitMqServer from './server/RabbitmqServer';

export default class RabbitMQSetup {

    static async initQueues() {
        try {
            const rabbitInstance = RabbitMqServer.getInstance();
            await rabbitInstance.start(RABBIT_CONFIG.RABBITMQ_URI);
            await rabbitInstance.createExchange(RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.EXCHANGE_TYPE_DIRECT);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_EMPLOYEE_CREATED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_EMPLOYEE_CREATED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_EMPLOYEE_CREATED);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_EMPLOYEE_UPDATED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_EMPLOYEE_UPDATED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_EMPLOYEE_UPDATED);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_EMPLOYEE_DELETED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_EMPLOYEE_DELETED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_EMPLOYEE_DELETED);

            await rabbitInstance.close();
        } catch(err) {
            console.log('error rabbitmq: ', err);
        }
    }


    static async init() {
        try {
            const rabbitInstance = RabbitMqServer.getInstance();
            await rabbitInstance.start(RABBIT_CONFIG.RABBITMQ_URI);

            await rabbitInstance.consumeMessage(RABBIT_CONFIG.QUEUE_ENTERPRISE_CREATED, (message: ConsumeMessage) => {
                new EnterpriseCreatedFactory().create().handle(JSON.parse(message.content.toString()));
            });

            await rabbitInstance.consumeMessage(RABBIT_CONFIG.QUEUE_ENTERPRISE_UPDATED, (message: ConsumeMessage) => {
                new EnterpriseUpdatedFactory().create().handle(JSON.parse(message.content.toString()));
            });

            await rabbitInstance.consumeMessage(RABBIT_CONFIG.QUEUE_ENTERPRISE_DELETED, (message: ConsumeMessage) => {
                new EnterpriseDeletedFactory().create().handle(JSON.parse(message.content.toString()));
            });

        } catch (error) {
            console.log('error rabbitmq: ', error);
        }
    }
}