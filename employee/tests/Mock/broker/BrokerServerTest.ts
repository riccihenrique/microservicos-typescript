import IBrokerServer from "../../../src/broker/server/IBrokerServer";

class BrokerServerTest implements IBrokerServer {
    async start(uri: string): Promise<void> {

    }

    async createExchange(exchangeName: string, exchangeType: string): Promise<void> {

    }

    async createQueue(queueName: string): Promise<void> {

    }

    async bindQueue(queueName: string, exchangeName: string, routingKey: string): Promise<void> {

    }

    publishInQueue(queue: string, message: string): void {

    }

    publishInExchange(exchange: string, routingKey: string, message: object): void {

    }

    async consumeMessage(queue: string, callback: Function): Promise<void> {

    }
}

export default BrokerServerTest;