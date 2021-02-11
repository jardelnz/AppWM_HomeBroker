## App - Working Minds

*Esse app foi desenvolvido com base na solicitação da Working Minds*

### Para executar:
```bash
$ npm install
$ ionic server --lab
```

### Descrição da solicitação da Working Minds:
Eu como cliente, gostaria de comprar e vender ações na bolsa.

### Requisitos funcionais

1. O usuário deve poder selecionar a ação para comprar e vender.

2. Ao selecionar uma ação, deve ser exibida a quantidade de ações que ele possui, quanto ela está valendo atualmente, o valor total e as ordens abertas do usuário.

3. O aplicativo deve permitir que o usuário crie uma ordem de compra ou de venda, com quantidade e valor.
É necessário verificar se o usuário tem ações suficientes para poder vender, inclusive se já existem outras ordens de venda abertas.

4. Ao criar uma ordem, o aplicativo deve verificar se o valor registrado executará a ordem automaticamente ou não.
Para verificar se a ordem é executada automaticamente, é verificado o valor de compra mais alto e de venda mais baixo (não é necessário se preocupar com a quantidade).
Caso a ordem seja executada, atualizar a quantidade de ações do usuário.


### Considerações

1. As ações e os valores não precisam ser de fato registrados, podem ser dados mockados, inclusive os valores de compra mais alto e de venda mais baixo.

2. Não é necessária implementação de back-end.

3. Usar as  tecnologias Ionic com Angular.js.