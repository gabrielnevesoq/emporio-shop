import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Infinitepay {
  private apiUrl = 'https://api.infinitepay.io/invoices/public/checkout/links';
  constructor(private http: HttpClient) {}

  // Gerando link de pagamento
  @Input() valor_produto: string = "";
  GerarLink(dados: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, dados, {headers});
  }
}