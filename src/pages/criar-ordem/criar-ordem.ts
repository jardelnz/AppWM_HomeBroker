import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavLifeCycle } from '../../utils/ionic/nav/nav-lifecycles';
import { Acao } from '../../modelos/acao';
import { Ordem } from '../../modelos/ordem';
import { Carteira } from '../../modelos/carteira';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-criar-ordem',
  templateUrl: 'criar-ordem.html',
})

export class CriarOrdemPage implements NavLifeCycle {

  public acao: Acao;
  public ordens: Ordem[];
  public minhasAcoes: Carteira[];
  public quantidadeDaAcaoSelecionada: number = 0;

  public quantidade: number;
  public valor: number = 0;
  public total: number = 0;
  public tipo: string;
  public vendasEmAberto: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _alertCtrl: AlertController) {

    this.acao = this.navParams.get('acaoSelecionada');
    this.ordens = this.navParams.get('ordens');
    this.minhasAcoes = this.navParams.get('minhasAcoes');
  }

  ionViewDidLoad() {
    this.quantidadeDaAcaoSelecionada = this.carregarAcaoDaMinhaCarteira(this.acao);
    this.vendasEmAberto = this.existeVendasEmAberto(this.ordens, this.acao);
  }

  carregarAcaoDaMinhaCarteira(acao: Acao) {

    let quantidadeTotal: number = 0;

    for (let carteira of this.minhasAcoes) {
      if (carteira.acao == acao.id) {
        quantidadeTotal += carteira.quantidade;
      }
    }

    return quantidadeTotal;
  }

  existeVendasEmAberto(ordens: Ordem[], acao: Acao) {
    let quantidade: number = 0;

    for (let ordem of ordens) {
      if ((ordem.tipo == 'Venda') && (ordem.status == 'Aberta') && (ordem.acao == acao.id)) {
        quantidade++;
      }
    }

    return quantidade;
  }

  calculaTotal(quantidade, valor) {

    if (!valor || !quantidade) {
      this.total = 0;
    } else {
      this.total = (quantidade * valor);
    }
  }

  validarOrdem(tipo, valor, quantidade) {
    let novaOrdem: Ordem;

    if (!tipo || !quantidade) {

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos',
        buttons: [
          { text: 'ok' }
        ]
      }).present();

      return;
    }

    if (tipo == 'Venda') {

      if (quantidade > this.quantidadeDaAcaoSelecionada) {

        this._alertCtrl.create({
          title: 'Quantidade inválida',
          subTitle: 'A quantidade de ações para venda é maior que a quantidade em carteira!',
          buttons: [
            { text: 'ok' }
          ]
        }).present();

        return false;

      } else if (this.vendasEmAberto > 0) {

        this._alertCtrl.create({
          title: 'Aviso',
          subTitle: 'Encontramos ' + this.vendasEmAberto + ' ordem(ns) de venda aberta(s) para esta ação. Deseja prosseguir?',
          buttons: [
            {
              text: 'Não',
              handler: () => {
                return false;
              }
            },
            {
              text: 'Sim',
              handler: () => {
                this.cadastrarOrdem(novaOrdem = {
                  tipo: 'Venda', acao: this.acao.id, valor: Number(valor),
                  quantidade: Number(quantidade), status: 'Aberta'
                });
              }
            },

          ]
        }).present();
      } else {

        this._alertCtrl.create({
          title: 'Aviso',
          subTitle: `Confirma a venda de ${quantidade} unidade(s) da ação ${this.acao.nome}?`,
          buttons: [
            {
              text: 'Não',
              handler: () => {
                return false;
              }
            },
            {
              text: 'Sim',
              handler: () => {
                this.cadastrarOrdem(novaOrdem = {
                  tipo: 'Venda', acao: this.acao.id, valor: Number(valor),
                  quantidade: Number(quantidade), status: 'Aberta'
                });
              }
            },

          ]
        }).present();

      }

    }

    if (tipo == 'Compra') {

      this._alertCtrl.create({
        title: 'Aviso',
        subTitle: `Confirma a compra de ${quantidade} unidade(s) da ação ${this.acao.nome}?`,
        buttons: [
          {
            text: 'Não',
            handler: () => {
              return false;
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.cadastrarOrdem(novaOrdem = {
                tipo: 'Compra', acao: this.acao.id, valor: Number(valor),
                quantidade: Number(quantidade), status: 'Aberta'
              });
            }
          },

        ]
      }).present();
    }

  }

  cadastrarOrdem(novaOrdem: Ordem) {

    if (novaOrdem.tipo == 'Venda') {

      if (this.acao.minimo > novaOrdem.valor) {

        this.fecharOrdem(novaOrdem);
        this.atualizarMinhasAcoes(novaOrdem);
      } else {

        this.ordens.push(novaOrdem);
        this.navCtrl.setRoot(HomePage, {
          atualizao: false,
          novasOrdens: this.ordens,
          novaAcoes: this.minhasAcoes
        });
      }

    } else if (novaOrdem.tipo == 'Compra') {

      if (this.acao.maximo < novaOrdem.valor) {

        this.fecharOrdem(novaOrdem);
        this.atualizarMinhasAcoes(novaOrdem);
      } else {

        this.ordens.push(novaOrdem);

        this.navCtrl.setRoot(HomePage, {
          novasOrdens: this.ordens,
          novaAcoes: this.minhasAcoes
        });
      }
    }
  }

  fecharOrdem(ordem: Ordem) {
    ordem.status = "Fechada";
    this.ordens.push(ordem);
  }

  atualizarMinhasAcoes(ordem: Ordem) {
    let novaCarteira: Carteira;

    if (ordem.tipo == 'Venda') {

      for (let minhaAcao of this.minhasAcoes) {
        if (minhaAcao.acao == ordem.acao) {
          minhaAcao.quantidade = (Number(minhaAcao.quantidade) - Number(ordem.quantidade));
        }
      }
    } else if (ordem.tipo == 'Compra') {

      let novaAcao;
      novaAcao = this.minhasAcoes.find(acao => acao.acao == ordem.acao);

      if (novaAcao) {

        for (let minhaAcao of this.minhasAcoes) {
          if (minhaAcao.acao == ordem.acao) {
            minhaAcao.quantidade = (Number(minhaAcao.quantidade) + Number(ordem.quantidade));
          }
        }
      } else {

        novaCarteira = { acao: ordem.acao, quantidade: ordem.quantidade, valor: ordem.valor };
        this.minhasAcoes.push(novaCarteira);
      }

    }

    this.navCtrl.setRoot(HomePage, {
      novaAcoes: this.minhasAcoes,
      novasOrdens: this.ordens
    });
  }

}