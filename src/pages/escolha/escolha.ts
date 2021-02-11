import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Acao } from '../../modelos/acao';
import { Carteira } from '../../modelos/carteira';
import { Ordem } from '../../modelos/ordem';
import { NavLifeCycle } from '../../utils/ionic/nav/nav-lifecycles';
import { CriarOrdemPage } from '../criar-ordem/criar-ordem';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})

export class EscolhaPage implements NavLifeCycle {

  public acoes: Acao[];
  public acao: Acao;
  public ordens: Ordem[];
  public minhasAcoes: Carteira[];
  public total: number = 0;
  public quantidade: number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.acoes = this.navParams.get('acoes');
    this.acao = this.navParams.get('acaoSelecionada');
    this.ordens = this.navParams.get('ordens');
    this.minhasAcoes = this.navParams.get('minhasAcoes');
  }

  ionViewDidLoad() {
    this.carregarCarteira();
  }

  carregarCarteira() {

    for (let carteira of this.minhasAcoes) {

      if (carteira.acao == this.acao.id) {

        this.total += this.total + (carteira.quantidade * this.acao.preco);
        this.quantidade += carteira.quantidade;
      }
    }
  }

  criarOrdem() {
    this.navCtrl.push(CriarOrdemPage.name, {
      acoes: this.acoes,
      acaoSelecionada: this.acao,
      ordens: this.ordens,
      minhasAcoes: this.minhasAcoes
    });
  }

}
