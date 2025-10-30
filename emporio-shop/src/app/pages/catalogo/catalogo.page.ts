import { Component, OnInit } from '@angular/core';
import { Infinitepay, InfinitePayCheckoutRequest } from 'src/app/services/infinitepay/infinitepay';
import { Pagarme } from 'src/app/services/pagarme/pagarme';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
  providers: [Supabase, Infinitepay, Pagarme]
})
export class CatalogoPage implements OnInit {
  constructor(private supabase: Supabase, private infinitepay: Infinitepay, private pagamento: Pagarme) { }
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
      this.produtosFiltrados = [...this.produtos];
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

  // Filtrando Produtos
  public produtosFiltrados: any[] = [];

  filtrarProdutos(ev: CustomEvent) {
    const valor = ev.detail.value?.toLowerCase() || '';
    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.nome?.toLowerCase().includes(valor) ||
      produto.modelo?.toLowerCase().includes(valor) ||
      produto.marca?.toLowerCase().includes(valor)
    );
  }

  // Ordenando produtos
  ordenarPor(campo: 'nome' |'modelo'| 'marca' | 'preco_venda', ordem: 'asc' | 'desc' = 'asc') {
    const fator = ordem === 'asc' ? 1 : -1;
    this.produtosFiltrados.sort((a, b) => {
      if (campo === 'preco_venda') {
        return (a[campo] - b[campo]) * fator;
      }
      return a[campo].localeCompare(b[campo]) * fator;
    });
  }


  //Área de teste
  categoriaSelecionada = '';

selecionar(valor: string) {
  this.categoriaSelecionada = valor;
}
}

