import 'dotenv/config';

const { RABBIT_USER, RABBIT_PASS, RABBIT_HOST, RABBIT_SERVER_PORT } = process.env;

export const RABBIT_CONFIG = {
    EXCHANGE_NAME: 'enterprise',
    EXCHANGE_TYPE_DIRECT: 'direct',
    ROUTING_KEY_ENTERPRISE_CREATED: 'enterprise-created',
    ROUTING_KEY_ENTERPRISE_UPDATED: 'enterprise-updated',
    ROUTING_KEY_ENTERPRISE_DELETED: 'enterprise-deleted',
    QUEUE_ENTERPRISE_CREATED: 'enterprise-created',
    QUEUE_ENTERPRISE_UPDATED: 'enterprise-updated',
    QUEUE_ENTERPRISE_DELETED: 'enterprise-deleted',
    QUEUE_EMPLOYEE_CREATED: 'employee-created',
    QUEUE_EMPLOYEE_UPDATED: 'employee-updated',
    QUEUE_EMPLOYEE_DELETED: 'employee-deleted',
    RABBITMQ_URI: `amqp://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_HOST}:${RABBIT_SERVER_PORT}`,
}