
import { handlers } from '@amberops/api/mocks/handlers';
import { http, passthrough } from 'msw';

const clustersHandlers = handlers.filter(handler => {
    return handler.info.path.startsWith('/api/v1/clusters');
});

const route = http.all('/api/v1/clusters/:slug*', async ({request, params}) => {
    for (const handler of clustersHandlers) {
        const response = await handler.run({request, params});
        if(response) return response;
    }
    return passthrough();
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
