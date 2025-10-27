import { Component, OnInit } from '@angular/core';
import { Infinitepay } from 'src/app/services/infinitepay/infinitepay';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
  providers: [Supabase, Infinitepay]
})
export class CatalogoPage implements OnInit {
  constructor(private supabase: Supabase, private infinitepay: Infinitepay) { }
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
  GerarPagamento() {
    const dados = {
      handle      : 'globalnode',
      redirect_url: 'https://seusite.com/obrigado',
      webhook_url : 'https://seusite.com/webhook',
      order_nsu   : '123456',
      items: [
        {
          quantity   : 1,
          price      : 1000,
          description: 'Teste Produto'
        },
      ]
    };

    this.infinitepay.GerarLink(dados).subscribe({
      next: (res) => {
        console.log('Checkout criado com sucesso:', res);
        // Exemplo: redirecionar para o link retornado
        if (res?.checkout_url) {
          window.open(res.checkout_url, '_blank');
        }
      },
      error: (err) => {
        console.error('Erro ao gerar checkout:', err);
      }
    });
  }
}