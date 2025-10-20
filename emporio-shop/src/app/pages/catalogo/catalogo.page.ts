import { Component, OnInit } from '@angular/core';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class CatalogoPage implements OnInit {
  constructor(private supabase: Supabase) { }
  ngOnInit() {
    this.GetProdutos();
  }

  // GET - Produtos
  public produtos: any[] = [];
  async GetProdutos() {
    const {error, data} = await this.supabase.GetProdutos();
    if (error) {
      console.error("Erro ao carregar dados: ", error);
    } else {
      this.produtos = data;
    }
  }
}
