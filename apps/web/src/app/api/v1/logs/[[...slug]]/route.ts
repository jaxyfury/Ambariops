
import { handlers } from '@amberops/api/mocks/handlers';
import { http } from 'msw';

const route = http.all('*', async ({request}) => {
    const logsHandlers = handlers.filter(handler => {
        const url = new URL(handler.info.path, request.url);
        return url.pathname.startsWith('/api/v1/logs');
    });
    for (const handler of logsHandlers) {
        const response = await handler.run({request, params: {slug: ''}});
        if(response) return response;
    }
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
