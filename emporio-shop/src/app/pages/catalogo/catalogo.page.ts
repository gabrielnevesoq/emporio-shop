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

  // Serviço de pagamento
  public carrinho: any[] = [
    { nome: 'Produto A', preco: 50, quantidade: 40 }
  ];
  public nome_compra: string = "";
  GerarPagamento() {
    this.pagamento.GerarCheckout(this.carrinho, this.nome_compra).subscribe((res: any) => {
      if (res.sucesso && res.checkoutUrl) {
        window.location.href = res.checkoutUrl; // redireciona pro checkout da Pagar.me
      } else {
        console.error('Erro:', res.erro);
      }
    });
  }
}