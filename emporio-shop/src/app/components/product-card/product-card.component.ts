import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagarme } from 'src/app/services/pagarme/pagarme';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [Pagarme]
})
export class ProductCardComponent  implements OnInit {
  constructor(private pagamento: Pagarme) { }
  ngOnInit() {}

  @Input() modelo   : string = "";
  @Input() descricao: string = "";
  @Input() preco    : string = "";
  @Input() estoque  : string = "";

  //* Carrinho funcional
  // 1. Crie o evento que vai "avisar" o pai
  @Output() onAdicionarAoCarrinho = new EventEmitter<any>();
  // 2. Variável local para guardar a quantidade do input
  public quantidade: number = 1;
  // 3. Função que o botão "Adicionar" vai chamar
  AdicionarCarrinho() {
    // Garanta que você está lendo 'this.descricao' e 'this.preco'
    const produtoParaEnviar = {
      nome: this.modelo, // 👈 Deve ler o @Input() descricao
      preco: this.preco,    // 👈 Deve ler o @Input() preco
      quantidade: Number(this.quantidade) || 1
    };
    
    this.onAdicionarAoCarrinho.emit(produtoParaEnviar);
    console.log('Produto emitido pelo card:', produtoParaEnviar);
  }
}