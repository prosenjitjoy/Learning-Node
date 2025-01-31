console.log('Loading config.js');

export const PORT = process.env.PORT ?? 3000;
export const HOST = process.env.HOST ?? 'localhost';
export const SERVER_URL = (protocol = process.env.PROTOCOL ?? 'http') => `${protocol}://${HOST}:${PORT}`;
