import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { Acao } from '../../modelos/acao';
import { Carteira } from '../../modelos/carteira';
import { Ordem } from '../../modelos/ordem';
import { NavLifeCycle } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements NavLifeCycle {

  public acoes: Acao[];
  public atualizacaoDeAcoes: Carteira[];
  public ordens: Ordem[];
  public atualizacaoDeOrdens: Ordem[];
  public minhasAcoes: Carteira[]
  public icone: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loading: LoadingController) {

    this.atualizacaoDeAcoes = this.navParams.get('novaAcoes');
    this.atualizacaoDeOrdens = this.navParams.get('novasOrdens');
  }

  ionViewDidLoad() {

    let loading = this._loading.create({
      content: 'Aguarde o carregamento dos ações...'
    });

    loading.present();
    this.carregaDados();
    loading.dismiss();
  }

  carregaDados() {

    this.acoes = [
      { id: 34, nome: 'ITSA4', preco: 14.50, variacao: +0.16, minimo: 14.50, maximo: 15.50 },
      { id: 35, nome: 'TRPL4', preco: 33.49, variacao: +0.25, minimo: 33.40, maximo: 354.00 },
      { id: 39, nome: 'LREN3', preco: 39.95, variacao: -0.33, minimo: 39.95, maximo: 432.29 },
      { id: 42, nome: 'TOTS3', preco: 35.10, variacao: +0.05, minimo: 35.00, maximo: 69.96 },
    ];

    if (this.atualizacaoDeOrdens) {

      this.ordens = this.atualizacaoDeOrdens;
    } else {

      this.ordens = [
        { tipo: 'Compra', acao: 34, valor: 13.31, quantidade: 4, status: 'Fechada' },
        { tipo: 'Venda', acao: 34, valor: 13.58, quantidade: 5, status: 'Aberta' },
        { tipo: 'Venda', acao: 34, valor: 11.22, quantidade: 5, status: 'Fechada' },
        { tipo: 'Compra', acao: 39, valor: 50.55, quantidade: 7, status: 'Fechada' },
        { tipo: 'Venda', acao: 39, valor: 50.57, quantidade: 5, status: 'Aberta' }
      ]

    }
    if (this.atualizacaoDeAcoes) {

      this.minhasAcoes = this.atualizacaoDeAcoes;
    } else {

      this.minhasAcoes = [
        { acao: 34, quantidade: 4, valor: 13.31 },
        { acao: 39, quantidade: 7, valor: 50.55 }
      ]
    }

  }

  selecionaAcao(acao: Acao) {
    this.navCtrl.push(EscolhaPage.name, {
      acoes: this.acoes,
      acaoSelecionada: acao,
      ordens: this.ordens,
      minhasAcoes: this.minhasAcoes
    });
  }

}