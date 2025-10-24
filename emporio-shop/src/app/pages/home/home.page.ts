import { Supabase } from 'src/app/services/supabase/supabase';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from 'src/app/services/headerServices/navigation.service';
import { ScrollService } from 'src/app/services/headerServices/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('homeSection') homeSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;

  private sectionsMap: { [key: string]: ElementRef } = {};
  private observer!: IntersectionObserver;

  constructor(
    private scrollService: ScrollService,
    private navigationService: NavigationService,
    private supabase: Supabase
  ) { }


  ngOnInit(): void {
    this.scrollService.scrollRequest$.subscribe(sectionId => {
      this.scrollToSection(sectionId);
    });
  }

  ngAfterViewInit() {
    this.sectionsMap = {
        homeSection: this.homeSection,
        contactSection: this.contactSection,
      };
      this.setupIntersectionObserver();
  }


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

  
  scrollToSection(sectionId: string) {
    const target = this.sectionsMap[sectionId]?.nativeElement;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

private setupIntersectionObserver() {
    const options = { root: null, threshold: 0.5 };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = Object.keys(this.sectionsMap).find(
            key => this.sectionsMap[key].nativeElement === entry.target
          );
          if (sectionId) {
            this.navigationService.setActiveSection(sectionId);
          }
        }
      });
    }, options);

    Object.values(this.sectionsMap).forEach(section => {
      this.observer.observe(section.nativeElement);
    });
  }


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
