Feature: Testes de Delete by Id na api /users

    @ct001_delete_user
    Scenario: [CT_001] - Deletar user previamente criado na API "/users"
        Given realizo um POST de um user
        And que possuo o id do usuário previamente criado
        When realizo um DELETE na "v1/users/" informando o id no path id
        Then verifico se retornou o status code de no content "204"

    @ct002_delete_user
    Scenario: [CT_002] - Deletar user previamente criado na API "/users" sem informar o accessToken
        Given realizo um POST de um user
        And que possuo o id do usuário previamente criado
        When realizo um DELETE na "v1/users/" informando o id no path id sem informar o accessToken
        Then verifico se retornou o status code de sem autorização "401"

    @ct003_delete_user
    Scenario: [CT_003] - Deletar user previamente criado na API "/users" informando um accessToken inválido
        Given que possuo o id do usuário previamente criado
        When realizo um DELETE na "v1/users/" informando o id no path id com um accessToken inválido
        Then verifico se retornou o status code de sem autorização "401"

    @ct004_delete_user
    Scenario: [CT_004] - Deletar user previamente criado na API "/users" informando um id inválido no path id
        When realizo um DELETE na "v1/users/" informando um id inválido no path id
        Then verifico se retornou o status code not found "404"
        And realizo um DELETE de um user previamente criado