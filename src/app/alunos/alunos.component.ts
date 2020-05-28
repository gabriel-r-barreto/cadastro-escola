import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { AlunoModel } from './aluno.model';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  title = 'ng-jspdf';

  aluno: AlunoModel = new AlunoModel();
  alunos: Array<any> = new Array ();

  constructor(private alunosService: AlunosService ) { }

  ngOnInit() {
    this.listarAlunos();
  }


atualizar(id: number) {

  if (this.aluno.nome == null && this.aluno.idade == null) {
    Swal.fire('Campo nome e idade vazio favor selecionar o aluno');
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

if (this.aluno.nome == null && this.aluno.idade == null) {
  Swal.fire('Insira o nome e idade');
  return;
}
this.alunosService.cadastrarAluno(this.aluno).subscribe(aluno => {
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
console.log(this.alunos);
}, err => {
  console.log('Erro ao listar os alunos', err);
});

  }


alunoSelecionado(aluno) {
  this.aluno.nome = aluno.nome;
  this.aluno.idade = aluno.idade;
}

downloadPdf(dado) {
const doc = new jsPDF();
// tslint:disable-next-line: no-unused-expression
}

}
