import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CartModalComponent  implements OnInit {
  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {}

  // 1. Recebe o array 'carrinho' que vem da página principal
  @Input() carrinho: any[] = [];
  total: number = 0;

  // 2. Função para o botão "Fechar"
  fecharModal() {
    this.modalCtrl.dismiss();
  }

  // 3. Função para calcular o total
  calcularTotal() {
    this.total = this.carrinho.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
    return this.total;
  }

  // Finzalizar compra
  confirmarPagamento() {
    console.log("MODAL: Botão 'Finalizar Compra' clicado. Enviando role 'pagar'.");
    // Fecha o modal e envia um "sinal" (role) 'pagar'
    // A página (catalogo.page) vai escutar esse sinal.
    this.modalCtrl.dismiss(null, 'pagar');
  }

  // Aumentar quantidade
  aumentar(item: any) {
    item.quantidade++;
    this.calcularTotal();
    this.emitirAtualizacaoCarrinho();
  }

  // Diminuir quantidade (se for 1, remove)
  diminuir(item: any) {
    if (item.quantidade > 1) {
      item.quantidade--;
    } else {
      const index = this.carrinho.indexOf(item);
      if (index > -1) {
        this.carrinho.splice(index, 1);
      }
    }
    this.calcularTotal();
    this.emitirAtualizacaoCarrinho();
  }

  // Atualizar valor manualmente (digitado)
  atualizarQuantidade(item: any) {
    if (item.quantidade < 1 || isNaN(item.quantidade)) {
      const index = this.carrinho.indexOf(item);
      if (index > -1) {
        this.carrinho.splice(index, 1);
      }
    }
    this.calcularTotal();
    this.emitirAtualizacaoCarrinho();
  }

  // Atualiza o simbolo do carrinho no catalogo
  emitirAtualizacaoCarrinho() {
  // dispara um CustomEvent manualmente para a janela pai
  window.dispatchEvent(new CustomEvent('carrinhoAtualizado', {
    detail: this.carrinho
  }));
}

}