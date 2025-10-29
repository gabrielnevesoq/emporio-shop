import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/headerServices/navigation.service';
import { ScrollService } from 'src/app/services/headerServices/scroll.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class HeaderComponent implements OnInit {
  activeSectionId = '';

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // Atualiza o active link quando o NavigationService muda
    this.navigationService.activeSection$.subscribe(section => {
      this.activeSectionId = section;
    });

    // Também observa mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/catalogo') {
          this.activeSectionId = 'catalogo';
        } else if (event.url === '/') {
          // volta a seguir as seções internas
          const current = this.navigationService.getActiveSection();
          this.activeSectionId = current;
        }
      });
  }

  goToSection(sectionId: string) {
    if (this.router.url !== '/') {
      // se estiver fora da home, navega pra home e depois faz scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollService.scrollTo(sectionId), 300);
      });
    } else {
      this.scrollService.scrollTo(sectionId);
    }
  }

  goToCatalogo() {
    this.router.navigate(['/catalogo']);
    this.navigationService.setActiveSection('catalogo');
  }
}
