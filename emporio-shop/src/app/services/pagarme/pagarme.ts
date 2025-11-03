import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Pagarme {
  private apiUrl_teste = 'http://localhost:7096/api/asaas/checkout';
  private apiUrl       = 'https://api-asaas.vercel.app/asaas/checkout';
  constructor(private http: HttpClient) {}

  // Gerando checkout
  GerarCheckout(produtos: any[], descricao: string) {
    // Agora o reduce funciona, pois o carrinho usa 'preco' e 'quantidade' (camelCase)
    const total = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

    // Use as variáveis recebidas, não dados mockados
    const payload = {
      descricao: descricao || "Pedido da Loja", // Usa a descrição recebida
      total: total,                             // Usa o total calculado
      produtos: produtos                        // Usa os produtos recebidos
    };
    
    // O Angular envia o payload (camelCase) e o C# (PascalCase) entende
    return this.http.post(this.apiUrl, payload);
  }
}