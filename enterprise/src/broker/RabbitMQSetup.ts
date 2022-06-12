import { ConsumeMessage } from 'amqplib';
import EmployeeCreated from '../events/handles/employee/EmployeeCreated';
import EmployeeCreatedFactory from '../factories/EmployeeCreatedFactory';
import EmployeeUpdatedFactory from '../factories/EmployeeUpdatedFactory';
import { RABBIT_CONFIG } from './config';
import RabbitMqServer from './server/RabbitmqServer';

export default class RabbitMQSetup {
    static async init() {
        try {
            const rabbitInstance = RabbitMqServer.getInstance();
            await rabbitInstance.start(RABBIT_CONFIG.RABBITMQ_URI);
            await rabbitInstance.createExchange(RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.EXCHANGE_TYPE_DIRECT);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_ENTERPRISE_CREATED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_ENTERPRISE_CREATED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_ENTERPRISE_CREATED);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_ENTERPRISE_UPDATED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_ENTERPRISE_UPDATED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_ENTERPRISE_UPDATED);

            await rabbitInstance.createQueue(RABBIT_CONFIG.QUEUE_ENTERPRISE_DELETED);
            await rabbitInstance.bindQueue(RABBIT_CONFIG.QUEUE_ENTERPRISE_DELETED, RABBIT_CONFIG.EXCHANGE_NAME, RABBIT_CONFIG.ROUTING_KEY_ENTERPRISE_DELETED);

            await rabbitInstance.consumeMessage(RABBIT_CONFIG.QUEUE_EMPLOYEE_CREATED, (message: ConsumeMessage) => {
                new EmployeeCreatedFactory().create().handle(JSON.parse(message.content.toString()));
            });

            await rabbitInstance.consumeMessage(RABBIT_CONFIG.QUEUE_EMPLOYEE_UPDATED, (message: ConsumeMessage) => {
                new EmployeeUpdatedFactory().create().handle(JSON.parse(message.content.toString()));
            });

            await rabbitInstance.consumeMessage(RABBIT_CONFIG.QUEUE_EMPLOYEE_DELETED, (message: ConsumeMessage) => {

            });

        } catch (error) {
            console.log('error rabbitmq: ', error);
        }
    }
}