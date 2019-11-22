# Validator Middleware
 
## O que é?

É um módulo para validar os dados de entrada do cliente. Por exemplo, sempre que você recebe os dados no express da forma: `req.body.id`, torna-se difícil realmente acreditar que em `id` há uma ID inteiro positivo. Este módulo é para facilitar a sua vida e você conseguir garantir que há um inteiro positivo lá.

Este módulo tem como objetivo fazer você deixar seu código para cuidar apenas da lógica de negócio, desconsiderando qualquer validação dos dados de entrada.

Nós recomendamos você usar essa biblioteca como uma camada de **middleware**.

## Como usar?

Suponha que temos o seguinte cenário: precisamos criar um *endpoint* para cadastrar um novo usuário, com apenas nome e CPF. Com a ajuda do validator, essa tarefa será fácil. 

Crie um arquivo com o nome `exemplo.validator.js`:
```javascript
var validator = require('./validator-middleware/validator'); //importe a biblioteca

exports.validatorMiddleware = async (req, res, next) => {

	try {

		validator.validate(req, {
			nome: {
				required: true, //campo obrigatório
				type: 'alpha', //aceita letras
				length: [6, 100] //mínimo de 6 caracteres, máximo 100
			},
			cpf: {
				required: true, //obrigatório
				type: 'cpf', //valida cpf no formato 999.999.999-99
				length: [14, 14] //tamanho de 14 caracteres
			}
		});

		next();
	} catch (err) {
		return res.status(422).send(err); //retorna status code 422 com o erro.
	}
}
```
Uma boa prática é transformar o objeto com a descrição dos campos em um JSON e importá-lo aqui no middleware. Veja na seção **boas práticas** para mais detalhes.

Adicione a chamada do **middleware validador** em seu arquivo de **rotas**:

```javascript
const  express  =  require('express');
const  router  =  express.Router();
const  controller  =  require('../controllers/exemplo.controller');
const  validator  =  require('../validators/exemplo.validator');

router.post('/', validator.validatorMiddleware, controller.add);

module.exports  =  router;
```
 
O validator middleware ajuda você a organizar o seu código, de forma a manter apenas a parte da lógica de negócio dentro do controller, sendo as validações de entrada tratado no middleware de validação.

No `exemplo.controller.js`:

```javascript
exports.add = async (req, res) => {
	//Aqui podemos ter certeza que nome e cpf existem e que em nome há apenas letras e o cpf é um cpf válido, no formato: 999.999.999-99
	const { nome, cpf } = req.body;
	

	req.status(200).send({
		message: `O nome é ${nome} e o CPF é ${cpf}`
	});
}
```

## Documentação

	TODO

## Rodando os Testes

Para testar a biblioteca, execute:

	npm test
 
## Contribuidores

* [Darlan Nakamura](https://github.com/darlannakamura)

Faça um PR e ajude o projeto a crescer!