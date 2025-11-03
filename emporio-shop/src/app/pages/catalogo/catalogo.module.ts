import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    ProductCardComponent,
    HeaderComponent,
    CartModalComponent
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}
