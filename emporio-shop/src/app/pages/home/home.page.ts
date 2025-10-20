import { Component, OnInit } from '@angular/core';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class HomePage implements OnInit {
  constructor(private supabase: Supabase) { }
  ngOnInit() { }

  // GET - Produtos
  public produtos: any[] = [];
  async GetProdutos() {
    const {data, error} = await this.supabase.GetProdutos();
    if(error) {
      console.error('Erro: ', error);
    } else {
      this.produtos = data;
    }
  }
}