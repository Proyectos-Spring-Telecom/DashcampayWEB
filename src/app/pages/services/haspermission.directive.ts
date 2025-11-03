// src/app/core/haspermission.directive.ts
import {
  Directive, Input, TemplateRef, ViewContainerRef,
  ElementRef, Renderer2, OnInit, OnDestroy,
  Optional
} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  private required: string[] = [];
  private sub?: Subscription;
  private isStructural: boolean;

constructor(
    @Optional() private templateRef: TemplateRef<any> | null, // ⬅️ hazlo opcional
    private viewContainer: ViewContainerRef,
    private auth: AuthenticationService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.isStructural = !!templateRef; // true si se usa *appHasPermission
  }

  @Input() set appHasPermission(permission: string | number | Array<string | number>) {
    const req = Array.isArray(permission) ? permission : [permission];
    this.required = req.filter(v => v != null).map(v => String(v).trim());
    this.updateView();
  }

  ngOnInit(): void {
    this.sub = this.auth.isAuthenticationChanged()?.subscribe(() => this.updateView());
  }
  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  private updateView(): void {
    const current = (this.auth.getPermissions() || []).map(p => String(p).trim());
    const allowed = this.required.length === 0
      ? true
      : this.required.some(r => current.includes(r));

    if (this.isStructural) {
      this.viewContainer.clear();
      if (allowed && this.templateRef) this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', allowed ? '' : 'none');
    }
  }
}
