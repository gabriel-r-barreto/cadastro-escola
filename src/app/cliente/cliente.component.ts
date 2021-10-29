import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../cliente.service';
import { AlunoModel } from './cliente.model';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms'



// tslint:disable-next-line: class-name
interface jsPDFWITHPlugin extends jspdf {
  autoTable: (options: UserOptions) => jspdf;
}


@Component({
  selector: 'app-alunos',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class AlunosComponent implements OnInit {

  title = 'ng-jspdf';

  aluno: AlunoModel = new AlunoModel();
  alunos: Array<any> = new Array();
  contactForm: FormGroup;

  constructor(private alunosService: AlunosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listarAlunos();
    this.loadFormGroup();
  }


  loadFormGroup() {
  this.contactForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      telefone: ['', Validators.required],
      dtNascimento: ['', Validators.required],
    });
  }

  clearFormGroup() {
    this.contactForm.reset();
    }


  atualizar(id: number) {

    if (this.contactForm.status === 'INVALID') {
      Swal.fire('Insira os dados nos campos');
      return;
    }

    this.alunosService.atualizarAluno(id, this.aluno).subscribe(aluno => {
      this.aluno = new AlunoModel();
      Swal.fire('Aluno Atualizado com sucesso');
      this.listarAlunos();
    }, err => {
      console.log('Erro ao atualizar o aluno');
    });


  }

  remover(id: number) {

    this.alunosService.removerAluno(id).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
      Swal.fire('Aluno Removido com sucesso');
    }, err => {
      console.log('Erro ao remover o aluno');
    });

  }

  cadastrar() {

    console.log(this.contactForm);



    if (this.contactForm.status === 'INVALID') {
      Swal.fire('Insira os dados nos campos');
      return;
    }


    this.alunosService.cadastrarAluno(this.contactForm.value).subscribe(aluno => {
      this.aluno = new AlunoModel();
      Swal.fire('Aluno Cadastrado com sucesso');
      this.listarAlunos();
    }, err => {
      console.log('Erro ao cadastrar o aluno');
    });
  }


  listarAlunos() {
    this.alunosService.listarAlunos().subscribe(alunos => {
      this.alunos = alunos;
    }, err => {
      console.log('Erro ao listar os alunos', err);
    });

  }


  alunoSelecionado(aluno) {
    this.aluno.nome = aluno.nome;
    this.aluno.email = aluno.email;
    this.aluno.telefone = aluno.telefone;
    this.aluno.dataNascimento = aluno.dtNascimento;
  }

  downloadPdf(dado) {
    const doc = new jspdf('portrait', 'px', 'a4') as jsPDFWITHPlugin;

    doc.autoTable({
      head: [['Nome', 'email', 'Telefone', 'Data de Nascimento']],
      body: [[dado.nome, dado.email, dado.telefone, dado.dtNascimento]]
    });

    doc.save('Pdf');


  }

}
