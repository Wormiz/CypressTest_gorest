Feature: Testes de POST na API /users

 @ct001_post_user
 Scenario: [CT_001] - Criar usuário na API "/users"
   Given que possuo um accessToken criado a partir do site gorest
   And informo o accessToken no header
   When realizo um POST na "v1/users/" enviando todos os campos válidos 
   Then verifico se retornou o status code "201" junto dos dados informados na request dentro do response.body
   And realizo um DELETE de um user

 @ct002_post_user
 Scenario: [CT_002] - Criar usuário na API "/users" informando um accessToken inválido
   Given que possuo um accessToken inválido
   And informo o accessToken no header
   When realizo um POST na "v1/users/" enviando todos os campos válidos 
   Then verifico se retornou o status code "401" junto da mensagem "Authentication failed"

 @ct003_post_user
 Scenario: [CT_003] - Criar usuário na API "/users" sem informar o body
   Given que possuo um accessToken criado a partir do site gorest
   And informo o accessToken no header
   When realizo um POST na "v1/users/" sem enviar o body
   Then verifico se retornou o status code "422" junto da mensagem "can't be blank" informando que os campos "email", "name", "gender" e "status" não podem ser vazios