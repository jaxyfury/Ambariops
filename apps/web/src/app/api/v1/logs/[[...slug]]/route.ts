
import { handlers } from '@amberops/api/mocks/handlers';
import { http, passthrough } from 'msw';

const logsHandlers = handlers.filter(handler => {
    return handler.info.path.startsWith('/api/v1/logs');
});

const route = http.all('/api/v1/logs/:slug*', async ({request}) => {
    for (const handler of logsHandlers) {
        const response = await handler.run({request, params: {slug: ''}});
        if(response) return response;
    }
    return passthrough();
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
