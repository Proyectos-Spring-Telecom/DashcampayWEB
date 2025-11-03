import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vex-ver-documento-operador',
  templateUrl: './ver-documento-operador.component.html',
  styleUrls: ['./ver-documento-operador.component.scss']
})
export class VerDocumentoOperadorComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');
  titulo = 'Documento';
  url?: string;
  urlSanitizada?: SafeResourceUrl;
  urlImgSanitizada?: SafeUrl;
  esImagen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras?.state as { url?: string; titulo?: string }) ?? {};

    this.url = state.url || this.route.snapshot.queryParamMap.get('url') || '';
    this.titulo = state.titulo || this.route.snapshot.queryParamMap.get('titulo') || 'Documento';

    if (this.url) {
      this.esImagen = this.isImageUrl(this.url);
      if (this.esImagen) {
        this.urlImgSanitizada = this.sanitizer.bypassSecurityTrustUrl(this.url);
        this.urlSanitizada = undefined;
      } else {
        this.urlSanitizada = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.urlImgSanitizada = undefined;
      }
    }
  }

  ngOnInit(): void {}

  abrirNuevaPestana() {
    if (this.url) window.open(this.url, '_blank', 'noopener');
  }

  volver() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private isImageUrl(u: string): boolean {
    return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(u);
  }
}
