import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
  }

  // GET - Produtos
  async GetProdutos() {
    return await this.supabase.from('tbl_produtos').select('*');
  }

  // GET - Estoque
  async GetEstoque() {
    return await this.supabase.from('tbl_estoque').select('*');
  }
}