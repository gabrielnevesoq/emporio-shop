import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    ProductCardComponent
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}
