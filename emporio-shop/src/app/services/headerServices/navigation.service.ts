import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavigationService {
  private activeSectionSource = new BehaviorSubject<string>('homeSection');
  public activeSection$ = this.activeSectionSource.asObservable();

  setActiveSection(sectionId: string) {
    this.activeSectionSource.next(sectionId);
    // if (this.activeSectionSource.value !== sectionId) {
    //   this.activeSectionSource.next(sectionId);
    // }
  }

  getActiveSection(): string {
    return this.activeSectionSource.value;
  }
}