import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() { }

formData = {
    access_key: '4837056b-1a6d-4ce6-960e-58bb3ad42c05',
    name: '',
    email: '',
    message: ''
  };

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(this.formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ Mensagem enviada com sucesso!');
        form.resetForm(); // limpa o formulário
      } else {
        alert('❌ Erro ao enviar. Tente novamente mais tarde.');
        console.log(result);
      }
    } catch (error) {
      alert('⚠️ Erro na conexão. Verifique sua internet.');
      console.error(error);
    }
  }

}
