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
    this.GetEstoque();
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

  // GET - Estoque
  public estoque: any[] = [];
  async GetEstoque() {
    const {error, data} = await this.supabase.GetEstoque();
    if (error) {
      console.error("Erro ao carregar dados: ", error);
    } else {
      this.estoque = data;
    }
  }

  // Filtrando o estoque
  FiltrarEstoque(produto: string) {
    const item = this.estoque.find((e: any) => e.id_produto === produto);

    if (item) {
      return item.quantidade;
    } else {
      return "Indisponível A Pronta Entrega";
    }
  }
}