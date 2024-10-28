import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { routes } from './app.routes';
import { authLink } from './utils/interceptors/auth-link';
import { ErrorResponseInterceptor } from './utils/interceptors/error-response.interceptor';
import { SpinnerInterceptor } from './utils/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([ErrorResponseInterceptor, SpinnerInterceptor])
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: authLink.concat(
          httpLink.create({ uri: 'http://localhost:4300/api' })
        ),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
