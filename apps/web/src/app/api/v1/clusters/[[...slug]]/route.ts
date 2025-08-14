
import { handlers } from '@amberops/api/mocks/handlers';
import { http } from 'msw';

const route = http.all('*', async ({request, params}) => {
    const clustersHandlers = handlers.filter(handler => {
        const url = new URL(handler.info.path, request.url);
        return url.pathname.startsWith('/api/v1/clusters');
    });
    for (const handler of clustersHandlers) {
        const response = await handler.run({request, params});
        if(response) return response;
    }
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
