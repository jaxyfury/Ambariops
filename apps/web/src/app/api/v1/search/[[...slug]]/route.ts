
import { handlers } from '@amberops/api/mocks/handlers';
import { http, passthrough } from 'msw';

const searchHandlers = handlers.filter(handler => {
    return handler.info.path.startsWith('/api/v1/search');
});

const route = http.all('/api/v1/search/:slug*', async ({request}) => {
    for (const handler of searchHandlers) {
        const response = await handler.run({request, params: {slug: ''}});
        if(response) return response;
    }
    return passthrough();
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
