declare module 'redis' {
  interface RedisClient {
    // Declare the RedisClient properties and methods here
    // Example:
    get(key: string, callback?: (err: Error | null, reply: string | null) => void): void
    set(key: string, value: string, callback?: (err: Error | null, reply: string) => void): void
    // Add other methods as needed
  }

  interface ClientOpts {
    // Declare the ClientOpts properties here
    // Example:
    host?: string
    port?: number
    password?: string
    // Add other options as needed
  }

  function createClient(options?: ClientOpts): RedisClient

  // Add other declarations for Redis-related types as needed
}
