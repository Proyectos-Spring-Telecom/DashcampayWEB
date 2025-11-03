import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Link } from '@vex/interfaces/link.interface';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'vex-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  animations: [scaleIn400ms, fadeInRight400ms],
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    NgFor,
    RouterLinkActive,
    RouterLink,
    ReactiveFormsModule,
    RouterOutlet,
    AsyncPipe
  ]
})
export class IconsComponent implements OnInit {
  searchCtrl = new UntypedFormControl();

  colorCtrl = new UntypedFormControl();
  color$ = this.colorCtrl.valueChanges;

  links: Link[] = [
    {
      label: 'MATERIAL ICONS',
      route: 'ic'
    },
    {
      label: 'FONT AWESOME',
      route: 'fa'
    }
  ];

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  ngOnInit() {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(20), takeUntilDestroyed(this.destroyRef))
      .subscribe((search) =>
        this.router.navigate([], { queryParams: { search } })
      );
  }
}
