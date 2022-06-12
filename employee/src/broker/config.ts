import 'dotenv/config';

const { RABBIT_USER, RABBIT_PASS, RABBIT_HOST, RABBIT_SERVER_PORT } = process.env;

export type rabbitConfig = {
    RABBITMQ_URI: string;
}

export const RABBIT_CONFIG = {
    EXCHANGE_NAME: 'employee',
    EXCHANGE_TYPE_DIRECT: 'direct',
    ROUTING_KEY_EMPLOYEE_CREATED: 'employee-created',
    ROUTING_KEY_EMPLOYEE_UPDATED: 'employee-updated',
    ROUTING_KEY_EMPLOYEE_DELETED: 'employee-deleted',
    QUEUE_EMPLOYEE_CREATED: 'employee-created',
    QUEUE_EMPLOYEE_UPDATED: 'employee-updated',
    QUEUE_EMPLOYEE_DELETED: 'employee-deleted',
    RABBITMQ_URI: `amqp://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_HOST}:${RABBIT_SERVER_PORT}`,
}