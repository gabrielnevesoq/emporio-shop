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

  // 2. Função para o botão "Fechar"
  fecharModal() {
    this.modalCtrl.dismiss();
  }

  // 3. Função para calcular o total
  calcularTotal() {
    return this.carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }

  // Finzalizar compra
  confirmarPagamento() {
    console.log("MODAL: Botão 'Finalizar Compra' clicado. Enviando role 'pagar'.");
    // Fecha o modal e envia um "sinal" (role) 'pagar'
    // A página (catalogo.page) vai escutar esse sinal.
    this.modalCtrl.dismiss(null, 'pagar');
  }
}
