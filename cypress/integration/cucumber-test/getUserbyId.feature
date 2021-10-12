Feature: Testes de Get by Id na api /users

    @ct001_get_user
    Scenario: [CT_001] - Consultar user previamente criado na API "/users"
        Given realizo um POST de um user
        When realizo um GET na "v1/users/" informando o id no path id
        Then verifico se retornou o status code "200" junto das informações previamente criadas dentro do response.body
        And realizo um DELETE de um user previamente criado

    @ct002_get_user
    Scenario: [CT_002] - Consultar user inválido
        Given que informo um id inválido no path id
        When realizo um GET na "v1/users/" informando um id inválido no path id
        Then verifico se retornou o status code not found "404"
