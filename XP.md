# What have I been learned from this project

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
