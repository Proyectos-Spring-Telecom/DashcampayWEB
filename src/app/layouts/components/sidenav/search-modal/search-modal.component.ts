import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatRippleModule],
  selector: 'vex-search-modal',
  template: `
    <div>
      <div class="flex items-center gap-4 px-6 py-3 border-b border-divider">
        <mat-icon
          svgIcon="mat:search"
          class="text-secondary flex-none"></mat-icon>
        <input
          type="text"
          placeholder="Search..."
          class="text-xl font-medium bg-transparent outline-none flex-auto placeholder-secondary" />
        <button
          class="flex-none ltr:-mr-2 rtl:-ml-2 text-secondary"
          type="button"
          mat-icon-button>
          <mat-icon svgIcon="mat:settings"></mat-icon>
        </button>
      </div>

      <div class="p-4">
        <div class="text-xs font-semibold text-secondary px-2 mb-2">
          Contacts
        </div>

        <div class="space-y-1">
          <div
            class="px-2 py-2 hover:bg-hover rounded transition duration-200 ease-out flex items-center gap-4 cursor-pointer select-none"
            matRipple>
            <img
              src="assets/img/avatars/4.jpg"
              class="w-8 h-8 rounded-full flex-none" />
            <div class="flex-auto text-base font-medium">Alice Miller</div>
            <div
              class="flex-none text-xs text-secondary font-medium flex items-center gap-2">
              <div>found in Contacts</div>
              <mat-icon
                svgIcon="mat:contacts"
                class="icon-xs flex-none"></mat-icon>
            </div>
            <mat-icon
              svgIcon="mat:chevron_right"
              class="icon-sm flex-none"></mat-icon>
          </div>

          <div
            class="px-2 py-2 hover:bg-hover rounded transition duration-200 ease-out flex items-center gap-4 cursor-pointer select-none"
            matRipple>
            <img
              src="assets/img/avatars/3.jpg"
              class="w-8 h-8 rounded-full flex-none" />
            <div class="flex-auto text-base font-medium">Frank White</div>
            <div
              class="flex-none text-xs text-secondary font-medium flex items-center gap-2">
              <div>found in Contacts</div>
              <mat-icon
                svgIcon="mat:contacts"
                class="icon-xs flex-none"></mat-icon>
            </div>
            <mat-icon
              svgIcon="mat:chevron_right"
              class="icon-sm flex-none"></mat-icon>
          </div>
        </div>
      </div>

      <div class="p-4">
        <div class="text-xs font-semibold text-secondary px-2 mb-2">Pages</div>

        <div class="space-y-1">
          <div
            class="px-2 py-2 hover:bg-hover rounded transition duration-200 ease-out flex items-center gap-4 cursor-pointer select-none"
            matRipple>
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/20">
              <mat-icon svgIcon="mat:web" class="icon-sm flex-none"></mat-icon>
            </div>
            <div class="flex-auto text-base font-medium">
              <div>Scrumboard</div>
              <div class="text-secondary text-xs">/apps/scrumboard</div>
            </div>
            <mat-icon
              svgIcon="mat:chevron_right"
              class="icon-sm flex-none"></mat-icon>
          </div>

          <div
            class="px-2 py-2 hover:bg-hover rounded transition duration-200 ease-out flex items-center gap-4 cursor-pointer select-none"
            matRipple>
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/20">
              <mat-icon svgIcon="mat:web" class="icon-sm flex-none"></mat-icon>
            </div>
            <div class="flex-auto text-base font-medium">
              <div>Mailbox</div>
              <div class="text-secondary text-xs">/apps/mailbox</div>
            </div>
            <mat-icon
              svgIcon="mat:chevron_right"
              class="icon-sm flex-none"></mat-icon>
          </div>
        </div>
      </div>

      <div class="p-4">
        <div class="text-xs font-semibold text-secondary px-2 mb-2">Tasks</div>

        <div class="space-y-1">
          <div
            class="px-2 py-2 hover:bg-hover rounded transition duration-200 ease-out flex items-center gap-4 cursor-pointer select-none"
            matRipple>
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/20">
              <mat-icon
                svgIcon="mat:check"
                class="icon-sm flex-none"
                color="primary"></mat-icon>
            </div>
            <div class="flex-auto text-base font-medium">
              Configure OrderController as defined in RVT-11
            </div>
            <mat-icon
              svgIcon="mat:chevron_right"
              class="icon-sm flex-none"></mat-icon>
          </div>

          <div
            class="px-2 py-2 hover:bg-hover rounded transition duration-200 ease-out flex items-center gap-4 cursor-pointer select-none"
            matRipple>
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/20">
              <mat-icon
                svgIcon="mat:check"
                class="icon-sm flex-none"
                color="primary"></mat-icon>
            </div>
            <div class="flex-auto text-base font-medium">
              Add more data-models to product-controller
            </div>
            <mat-icon
              svgIcon="mat:chevron_right"
              class="icon-sm flex-none"></mat-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class SearchModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
