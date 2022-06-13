import RabbitMQSetup from "./src/broker/RabbitMQSetup";

async function main() {
    await RabbitMQSetup.initQueues();
}

main();