import { Component } from '@angular/core';
import { NgxGifComponent } from 'ngx-gif';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ngx-gif />
    <ngx-gif style="--ngx-gif-primary-color: #6ea7ac" />
    <ngx-gif style="--ngx-gif-primary-color: #fff" />
  `,
  imports: [NgxGifComponent],
  styles: [
    `
      :host {
        display: flex;
        gap: 20px;
      }
    `,
  ],
})
export class AppComponent {}
