import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from 'src/app/components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgbModule,
    FooterComponent
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
