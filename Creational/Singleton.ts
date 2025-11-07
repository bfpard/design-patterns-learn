import { createClient, RedisClientType } from 'redis';

class RedisSingleton {
    private static instance: RedisClientType
    private client: RedisClientType;

    private constructor() {
        this.client = createClient({
            url: 'redis://localhost:6379',
        });

        this.client.on('error', (err) => {
            console.error('❌ Redis connection error:', err);
        });

        this.client.connect().then(() => {
            console.log('✅ Redis connected successfully');
        });
    }

    public static getInstance(): RedisClientType {
        if (!RedisSingleton.instance) {
            RedisSingleton.instance = createClient();
        }
        return RedisSingleton.instance;
    }

    public getClient(): RedisClientType {
        return this.client;
    }
}

export default RedisSingleton;


async function main() {
    const redisClient = RedisSingleton.getInstance().getClient();
    redisClient.set('key', 'value');
    const value = await redisClient.get('key');
    console.log('Value from Redis:', value);
}

main().catch(console.error);