import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-ver-documento-cliente',
  templateUrl: './ver-documento-cliente.component.html',
  styleUrl: './ver-documento-cliente.component.scss',
  animations: [fadeInRight400ms],
})
export class VerDocumentoClienteComponent implements OnInit {
layoutCtrl = new UntypedFormControl('fullwidth');
  titulo = 'Documento';
  url?: string;
  urlSanitizada?: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras?.state as { url?: string; titulo?: string }) ?? {};

    this.url = state.url || this.route.snapshot.queryParamMap.get('url') || '';
    this.titulo = state.titulo || this.route.snapshot.queryParamMap.get('titulo') || 'Documento';

    // LOG para verificar que sí llega
    console.log('[VerDocumento] url:', this.url);
    console.log('[VerDocumento] titulo:', this.titulo);

    if (this.url) {
      this.urlSanitizada = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  abrirNuevaPestana() {
    if (this.url) window.open(this.url, '_blank', 'noopener');
  }

  ngOnInit(): void {
      
  }

    volver() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}