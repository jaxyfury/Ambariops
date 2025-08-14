
import { handlers } from '@amberops/api/mocks/handlers';
import { http, passthrough } from 'msw';

const hostsHandlers = handlers.filter(handler => {
    return handler.info.path.startsWith('/api/v1/hosts');
});

const route = http.all('/api/v1/hosts/:slug*', async ({request, params}) => {
    for (const handler of hostsHandlers) {
        const response = await handler.run({request, params});
        if(response) return response;
    }
    return passthrough();
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
