import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { NGX_GIF } from './ngx-gif';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import type { TenorCategory, TenorObject } from './ngx-gif-tenor.types';
import type { MediaColumn } from './ngx-gif.utils';
import { SplitIntoColumns } from './ngx-gif.utils';

@Component({
  selector: 'ngx-gif',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <div tabindex="-1" class="InputContainer">
      @if (gifSearch.value !== null) {
        <svg
          class="BackButton"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          (click)="gifSearch.setValue(null)"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      }

      <input
        class="Input"
        autofocus
        placeholder="Search"
        [formControl]="gifSearch"
      />
    </div>

    <div #gifResults class="GifResults">
      @if (results$ | async; as results) {
        @if (gifSearch.value !== null) {
          @for (
            column of results;
            track column.id;
            let columnIndex = $index;
            let totalColumns = $count
          ) {
            <div class="GifResultsColumn">
              @for (row of column.rows; track row.id; let rowIndex = $index) {
                <img
                  class="GifResultsColumnImage"
                  [src]="row.media_formats.tinygif.url"
                  [tabindex]="rowIndex * totalColumns + columnIndex + 1"
                  alt="Gif result"
                />
              }
            </div>
          }
        }
      } @else if (gifSearch.value !== null) {
        @for (column of loadingItems; track column.id) {
          <div class="GifResultsColumn">
            @for (row of column.rows; track row.id) {
              <div
                class="GifResultsColumnImage Loading"
                [style.height]="row.height + 'px'"
                [style.max-width]="row.width + 'px'"
              ></div>
            }
          </div>
        }
      }

      @if (gifSearch.value === null) {
        @for (
          column of categories$ | async;
          track column.id;
          let columnIndex = $index;
          let totalColumns = $count
        ) {
          <div class="GifResultsColumn">
            @for (row of column.rows; track row.name; let rowIndex = $index) {
              <div
                class="CategoryParent"
                [tabindex]="rowIndex * totalColumns + columnIndex + 1"
                (click)="clickedCategory(row)"
                (keydown.enter)="clickedCategory(row)"
              >
                <p class="CategoryName">{{ row.searchterm }}</p>
                <img
                  class="GifResultsColumnImage Category"
                  [src]="row.image"
                  alt="Gif result"
                  loading="lazy"
                />
              </div>
            }
          </div>
        }
      }
    </div>
  `,
  styleUrl: 'ngx-gif.component.css',
})
export class NgxGifComponent implements OnInit {
  private readonly apiService = inject(NGX_GIF);

  gifResults = viewChild<ElementRef<HTMLDivElement>>('gifResults');

  protected readonly gifSearch = new FormControl<string | null>(null);

  protected categories$!: Observable<MediaColumn<TenorCategory> | undefined>;
  protected results$!: Observable<MediaColumn<TenorObject> | undefined>;
  protected loadingItems:
    | MediaColumn<{ id: number; width: number; height: number }>
    | undefined = SplitIntoColumns([
    { id: 1, width: 159, height: 160 },
    { id: 2, width: 159, height: 160 },
    { id: 3, width: 159, height: 260 },
    { id: 4, width: 159, height: 160 },
    { id: 5, width: 159, height: 160 },
    { id: 6, width: 159, height: 260 },
    { id: 7, width: 159, height: 160 },
    { id: 8, width: 159, height: 160 },
    { id: 9, width: 159, height: 260 },
    { id: 10, width: 159, height: 160 },
  ]);

  ngOnInit() {
    this.results$ = this.gifSearch.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.gifResults()?.nativeElement?.scroll(0, 0)),
      switchMap((query) =>
        query
          ? this.apiService.search({
              query,
              contentFilter: 'high',
              limit: 20,
            })
          : of([]),
      ),
      map(SplitIntoColumns),
    );

    this.categories$ = this.apiService.categories().pipe(map(SplitIntoColumns));
  }

  protected clickedCategory(category: TenorCategory): void {
    this.gifResults()?.nativeElement?.scroll(0, 0);
    this.gifSearch.setValue(category.searchterm);
  }
}
