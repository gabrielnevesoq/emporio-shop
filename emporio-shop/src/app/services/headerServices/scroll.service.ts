import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollSubject = new Subject<string>();
  scrollRequest$ = this.scrollSubject.asObservable();

  requestScroll(sectionId: string) {
    this.scrollSubject.next(sectionId);
  }
}