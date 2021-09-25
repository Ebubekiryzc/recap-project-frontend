import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class SanitizerService {
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeURL(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
