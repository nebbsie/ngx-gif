import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  TenorCategoriesApiResult,
  TenorCategory,
  TenorInterface,
  TenorObject,
  TenorProvideOptions,
  TenorSearchApiResult,
  TenorSearchOptions,
} from './ngx-gif-tenor.types';

export const NGX_GIF = new InjectionToken<TenorInterface>('NGX_GIF');

export function provideNgxGifTenor({
  apiKey,
  clientKey,
}: TenorProvideOptions): FactoryProvider {
  return {
    provide: NGX_GIF,
    useFactory: (http: HttpClient): TenorInterface => ({
      search: ({
        query,
        limit = 10,
        contentFilter = 'off',
        mediaFormats = ['preview', 'gif', 'mediumgif', 'tinygif', 'nanogif'],
      }: TenorSearchOptions): Observable<TenorObject[]> => {
        return http
          .get<TenorSearchApiResult>(`https://tenor.googleapis.com/v2/search`, {
            params: {
              q: query,
              key: apiKey,
              limit,
              client_key: clientKey,
              media_formats: mediaFormats.join(','),
              ContentFilter: contentFilter,
            },
          })
          .pipe(map((result) => result.results));
      },

      categories: (): Observable<readonly TenorCategory[]> => {
        return http
          .get<TenorCategoriesApiResult>(
            'https://tenor.googleapis.com/v2/categories',
            {
              params: {
                key: apiKey,
                client_key: clientKey,
              },
            },
          )
          .pipe(map((result) => result.tags));
      },
    }),

    deps: [HttpClient],
  };
}

export function injectGifApiService(): TenorInterface {
  return inject(NGX_GIF);
}
