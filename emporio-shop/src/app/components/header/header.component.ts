import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScrollService } from 'src/app/services/headerServices/scroll.service';
import { NavigationService } from 'src/app/services/headerServices/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, IonicModule, CommonModule, FormsModule]
})
export class HeaderComponent implements OnInit, OnDestroy {

  activeSectionId: string = 'homeSection';
  private subscription: Subscription = new Subscription();

  constructor(
    private scrollService: ScrollService,
    private navigationService: NavigationService
  ) { }


  ngOnInit() {
    this.subscription = this.navigationService.activeSection$.subscribe(sectionId => {
      this.activeSectionId = sectionId;
    });
  }


  scrollToSection(sectionId: string) {
    this.scrollService.requestScroll(sectionId);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
