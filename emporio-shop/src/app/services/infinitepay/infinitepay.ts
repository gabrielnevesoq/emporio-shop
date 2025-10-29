import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InfinitePayItem {
  quantity   : number;
  price      : number; // em centavos
  description: string;
}

export interface InfinitePayCheckoutRequest {
  handle      : string;
  redirect_url: string;
  webhook_url : string;
  order_nsu   : string;
  items       : InfinitePayItem[];
}

@Injectable({
  providedIn: 'root'
})
export class Infinitepay {
  private apiUrl = 'https://localhost:44302/api/InfinitePay';
  constructor(private http: HttpClient) {}

  // Gerando o pagamento
  GerarCheckout(data: InfinitePayCheckoutRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, data);
  }
}