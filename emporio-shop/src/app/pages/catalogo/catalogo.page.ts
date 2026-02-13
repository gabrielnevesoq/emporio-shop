import { Component, OnInit } from '@angular/core';
import { Infinitepay, InfinitePayCheckoutRequest } from 'src/app/services/infinitepay/infinitepay';
import { Pagarme } from 'src/app/services/pagarme/pagarme';
import { Supabase } from 'src/app/services/supabase/supabase';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
  providers: [Supabase, Infinitepay, Pagarme]
})
export class CatalogoPage implements OnInit {
  constructor(private supabase: Supabase, private pagamento: Pagarme, private modalCtrl: ModalController) { }
  ngOnInit() {
    this.GetProdutos();
    this.GetEstoque();
    
    // Ouve os eventos disparados pelo cart-modal
    window.addEventListener('carrinhoAtualizado', (event: any) => {
      this.carrinho = event.detail;
      this.AtualizarTotalCarrinho();
    });
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

  // Serviço de pagamento
  public carrinho: any[] = [];
  GerarPagamento() {
    // (Verificação extra caso o carrinho esteja vazio)
    if (this.carrinho.length === 0) {
      console.error("Tentando pagar com carrinho vazio.");
      return;
    }

    console.log("Enviando para o Node.js:", this.carrinho);

    // O serviço Pagarme enviará o 'this.carrinho'
    this.pagamento.GerarCheckout(this.carrinho, "Meu Pedido da Loja").subscribe((res: any) => {
      if (res.sucesso && res.checkoutUrl) {
        window.location.href = res.checkoutUrl; // Redireciona para Asaas
      } else {
        console.error('Erro ao gerar pagamento:', res.erro);
      }
    });
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

  // Adicionando no carrinho
  AdicionarProdutoNaLista(produtoParaAdicionar: any) {
    // 1. Tenta encontrar o item no carrinho
    const itemExistente = this.carrinho.find(
      item => item.nome === produtoParaAdicionar.nome
    );

    if (itemExistente) {
      // 2. SE EXISTE: Atualiza a quantidade (de forma imutável com .map)
      
      // Mapeia o carrinho para um NOVO array
      this.carrinho = this.carrinho.map(item => {
        
        if (item.nome === produtoParaAdicionar.nome) {
          // Se for o item que estamos adicionando,
          // retorna um NOVO objeto com a quantidade somada
          return { 
            ...item, // Copia as propriedades (nome, preco)
            quantidade: item.quantidade + produtoParaAdicionar.quantidade // Soma a quantidade
          };
        } else {
          // Se não for o item, só retorna ele como estava
          return item;
        }
      });

    } else {
      // 3. SE NÃO EXISTE: Adiciona o novo item ao array (como antes)
      this.carrinho = [...this.carrinho, produtoParaAdicionar];
    }

    console.log("Carrinho atual:", this.carrinho);
    this.AtualizarTotalCarrinho();
  }

  // Botão de carrinho: quantidade
  public quantidadeTotalNoCarrinho: number = 0;
  AtualizarTotalCarrinho() {
    // Zera o total
    this.quantidadeTotalNoCarrinho = 0; 
    // Soma a 'quantidade' de CADA item no carrinho
    for (const item of this.carrinho) {
      this.quantidadeTotalNoCarrinho += item.quantidade;
    }
    console.log("Total de itens no badge:", this.quantidadeTotalNoCarrinho);
  }

  // Abrindo carrinho
  async abrirCarrinho() {
    const modal = await this.modalCtrl.create({
      component: CartModalComponent,
      componentProps: {
        carrinho: this.carrinho 
      }
    });
    
    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    // 👇 ADICIONE ESTE LOG
    // Este log DEVE aparecer quando o modal fechar
    console.log("PÁGINA: Modal fechado. Role recebido:", role); 

    if (role === 'pagar') {
      
      // 👇 ADICIONE ESTE LOG
      // Este log SÓ VAI APARECER se o 'role' for "pagar"
      console.log("PÁGINA: Role é 'pagar'. Chamando GerarPagamento()..."); 

      this.GerarPagamento(); // Chama a função que vai para o Asaas

    } else {
      console.log("PÁGINA: Modal fechado sem ação de pagamento (Role:", role, ")");
    }
  }


  // Sort por categoria
  categoriaSelecionada = '';

  selecionar(valor: string) {
    this.categoriaSelecionada = valor;

  }
}

