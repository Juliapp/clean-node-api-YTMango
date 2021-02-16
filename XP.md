# What have I been learned from this project

## Resumo do Clean Architecture:

Domain == Casos de uso
Data == Implementação dos casos de uso com as regras de negocio
Infra == Infraestrutura, adaptação dos frameworks
Presentation == Gerenciamento de estado de variáveis, possibilita reaproveitar código em várias interfaces diferentes (Nem sempre faz sentido existir)

## Project Setup
### standard
Pacote para linting do código direcionado a JavaScript.

### husky + lint-staged
Essa dupla impede que o código vá para o commit se tiver código "mal feito".
* Você precisa habilitar o husk globalmente.

### Jest 
Pacote de testes. 
* Você precisa habilitar o Jest globalmente.

## Login Router
Começo dos testes personalizados. A aplicação do CA pode ser um pouco grande, porém o código fica bem coêso.

### script test:staged
--passWithNoTests : Parâmetro para quando passar para o husky sem modificação nos arquivos de teste
--findRelatedTests : Procura os testes relacionados aos arquivos que foram modificados


### script test jest
--watch vs watchAll == qualquer modificação nos arquivos de teste vs qualquer modificação geral
--silent : Não mostrar detalhes dos testes (--verbose mostra os detalhes mas não mostra os consoles)
--colors : mostrar cores no prompt
--noStackTrace

## Auth UseCase
Algumas classes de erros foram mudadas para o utils/erros

## LoadUserByEmail Repository
Para casos de teste foi instalada uma biblioteca que emula banco mongodb em memória que está sendo utilizada pelos desenvolvedores hoje em dia (Devido a complexidade de mokar esse banco de dados)