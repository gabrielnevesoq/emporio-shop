import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  private activeSectionSource = new BehaviorSubject<string>('homeSection');


  public activeSection$ = this.activeSectionSource.asObservable();

  constructor() { }


  setActiveSection(sectionId: string) {

    if (this.activeSectionSource.value !== sectionId) {
      this.activeSectionSource.next(sectionId);
    }
  }
}