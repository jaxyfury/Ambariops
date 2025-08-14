
import { handlers } from '@amberops/api/mocks/handlers';
import { http, passthrough } from 'msw';

const testimonialsHandlers = handlers.filter(handler => {
    const url = new URL(handler.info.path, 'http://localhost');
    return url.pathname.startsWith('/api/v1/testimonials');
});

const route = http.all('/api/v1/testimonials/:slug*', async ({request, params}) => {
    for (const handler of testimonialsHandlers) {
        const response = await handler.run({request, params});
        if(response) return response;
    }
    return passthrough();
});

export { route as GET, route as POST, route as PUT, route as DELETE, route as PATCH };
