import { Redis } from "@upstash/redis";

type RedisClient = {
  get: <T = unknown>(key: string) => Promise<T | null>;
  mget: <T = unknown>(...keys: string[]) => Promise<(T | null)[]>;
  set: (key: string, value: any, options?: any) => Promise<string | null>;
  incr: (key: string) => Promise<number>;
};

// Create a mock Redis client that returns default values when not configured
const createMockRedis = (): RedisClient => ({
  get: async <T = unknown>(_key: string): Promise<T | null> => null,
  mget: async <T = unknown>(..._keys: string[]): Promise<(T | null)[]> => _keys.map(() => null),
  set: async (_key: string, _value: any, _options?: any): Promise<string | null> => null,
  incr: async (_key: string): Promise<number> => 0,
});

// Safely get Redis client - use mock if env vars are not set
export function getRedisClient(): RedisClient {
  try {
    // Check if Redis env vars are set
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      return Redis.fromEnv() as unknown as RedisClient;
    }
    // Return mock for local development
    return createMockRedis();
  } catch (error) {
    // If Redis.fromEnv() fails, return mock
    return createMockRedis();
  }
}
