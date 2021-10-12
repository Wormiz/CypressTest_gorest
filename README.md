# Overview

Projeto de automação utilizando Cypress, Cucumber pre processor  e Allure.

## Start

Para baixar as dependências do projeto, é necessário rodar o comando `npm install`, seguem libs utilizadas no projeto.

## Stack

[Cypress](https://docs.cypress.io/guides/overview/why-cypress) -> Automação de testes com sintaxe voltada para js;

[Allure](https://docs.qameta.io/allure/) -> Geração de reports visuais

[Cucumber](https://cucumber.io/) -> Framework utilizado para estruturação em BDD

[Cucumber Pre-Processor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor) -> Plugin para utilização do cucumber no Cypress

[Cypress Allure Plugin](https://github.com/Shelex/cypress-allure-plugin-example) -> Plugin para utilização do allure no cypress

## Executar os testes pela UI do Cypress via linha de comando

Para rodar o teste pela UI do cypress é necessário rodar o seguinte comando:

`npm run cy:open`

## Executar os testes pelo console linha de comando

Para rodar o teste pelo console é necessário rodar o seguinte comando:

`npm run cy:run`

## Executar os testes e verificar o report do allure

Para executar os testes e gerar o relatório no allure é necessário rodar o seguinte comando:

`npm run allure`

Após terminar os testes, será gerado um relatório do allure. Para verifcar o resultado dos testes é necessario
rodar o seguinte comando:

`allure open`

Se você não estiver com o Allure instalado na sua maquina, você pode realizar a instalação conforme a documentação do [Allure](https://docs.qameta.io/allure/#_installing_a_commandline)

## Estrutura do projeto

O projeto foi estruturado da seguinte maneira:

```
\cypress
    \files # Pastas onde se localizam os attachments do allure.
    \fixtures # Pasta onde contém os request body utilizados nas chamadas da API.
    \integration # Pasta onde contém todos as features e steps dos nossos testes.
        \common # Onde fica localizados os steps que são utilizados em mais de uma feature.
        \cucumber-test # Pasta onde fica localizados as features e as pastas de steps referente a cada feature.
            \nomeDeUmaFeature # Onde fica localizado os steps da feature nomeada na pasta.
             Ex: teste.feature teria uma pasta chamada 'teste' com um arquivo testeSteps.js
    \plugins # Plugins utilizados no projeto
    \support # É onde fica localizados comandos que serão utilizados antes dos testes
```

## Estrutura dos testes

A estrutura de testes do projeto usando [Cucumber](https://cucumber.io/) segue a seguinte estrutura

### Padrão de Scenarios

Os cenários nós devemos passar como parâmetro o path da requisição na qual desejamos realizar uma chamada
como por exemplo `/create`. O `/create` será usado como parâmetro na classe de stepDefinition da feature.

```
 When Realizo um Post '/create' para criar um novo registro na base de dados
```

Também utilizamos status code e campos que queremos verificar no response da chamada como parâmetros como por exemplo:

```
Then Verifico se o status code retornado é um 202 e se retornou o campo 'nome' no response body
```

Mesmo que o 202 não seja passado como um parâmetro no Scenario, é possível definir ele na criação do step na classe
de stepDefinition da feature como por exemplo:

```
Then('Verifico se o status code retornado é um {int} e se retornou o campo {string} no response body', (statusCode, id)
```

### O exemplo completo do Scenario

```
Given que possuo um accessToken criado a partir do site gorest
And informo o accessToken no header
When realizo um POST na "v1/users/" enviando todos os campos válidos 
Then verifico se retornou o status code "201" junto dos dados informados na request dentro do response.body
And realizo um DELETE de um user
```

### Estrutura dos Steps

Os Steps são estruturados da seguinte forma:

```javascript
//DEFINIÇÃO DO STEPS CRIADOS NA FEATURE
When(
  "Realizo um Post {string} para criar um novo registro na base de dados",
  (path) => {
    /**
     * O primeiro passo é sempre definir o nosso request body.
     */

    const geracaoDeUmInteiro = Math.trunc(Math.random() * 999);

    const corpoDaRequisicao = {
      numero: geracaoDeUmInteiro,
    };

    /** Realizo a requisição para a API utilizando o Cypress */
    cy.api({
      method: "POST",
      url: Cypress.env("VARIAVEL_URL") + path,
      headers: {
        client_id: Cypress.env("CLIENT_ID"),
        "Content-Type": "application/json",
      },
      /** Informo o corpo da requisição, definido acima */
      body: corpoDaRequisicao,
    }).as("retorno_do_post "); /** Resposta da requisição anterior */

    /**
     * PASSO ALLURE:
     * Foi definido um attachment para o ALLURE usando a função de attFileAllure definida acima.
     * Nesta função é necessário algumas informações para ajudar na hora de verificar o report do allure
     * O padrão que utilizado para criar os attachments é o seguinte:
     * Informo o body da requisicão ou o body retornado,
     * Se é o request ou o response,
     * O path definido na feature,
     * Uma informação especial para o attachment
     */
    attFileAllure(corpoDaRequisição, "request", path, "post_com_sucesso");
  }
);
```

## Estrutura para Steps de validações de response

A estrutura para realizar as validações de um response é a seguinte:

```javascript
/** Realizamos um GET para verificarmos o response da requisição anterior */
Then(
  "Verifico se o status code retornado é um {int} e se retornou o campo {string} no response body",
  (statusCode, id) =>
    /** @retorno_do_post definido no step acima */
    cy.get("@retorno_do_post").then((response) => {
      /** Realizo as validações bem semelhante as validações do Postman */
      expect(response.status).to.equal(statusCode);

      expect(response.body).to.have.property(id);

      /** PASSO ALLURE */
      attFileAllure(response.body, "response", path, "retorno_do_post");

      /** Armazeno um valor que poderá ser usado em outra requisição */
      commonData.id = response.body.id;
    })
);
```

o passo de `cy.get('@alias')` pode ser definido no mesmo step no qual foi feito o request, sendo assim fica a gosto
de como realizar as validações desejadas.
