# SkillMatch JS

Simulador de compatibilidade entre perfil de candidato e vagas de Front-End Junior, desenvolvido em JavaScript puro.

## Sobre o projeto

O SkillMatch JS compara as habilidades de uma pessoa candidata com vagas fictícias de Front-End Junior e apresenta:

- percentual de compatibilidade por vaga;
- habilidades encontradas;
- habilidades faltantes;
- classificação da compatibilidade;
- vaga com maior aderência;
- recomendação de estudo.

## Grupo de criação do projeto

- @Agnaldokorb
- @suelen-tonello
- @juvarle

## Professor Front-End "Javascript"

- @eduardoworrel

## Objetivo

Praticar os principais conceitos estudados no modulo:

- lógica de programacao;
- tipos de dados;
- operadores e condicionais;
- estruturas de repetição;
- funções e arrow functions;
- arrays e métodos de array;
- objetos e POO;
- classes, construtor, herança e this;
- callback, closure, Promise e async/await.

Também exercitar organização com Kanban, versionamento com Git/GitHub e comunicação técnica no README.

## Estrutura do projeto

```txt
skillmatch-js/
├── index.html
├── skillmatch.js
├── README.md
├── planejamento/
|   └── tarefas-kanban.md
└── assets/
    ├── mapa-mental.png
    ├── index.png
    └── console.png
```

## Como executar

Você pode executar de duas formas simples: 

**1. Navegador sem clonar o repositório**

- Abra o Chrome.
- Pressione F12.
- Abra a aba Console.
- Cole o conteúdo de skillmatch.js.
- Pressione Enter.

**2. Navegador clonando o repositório**

- Clone o repositório:
  ```bash
  git clone https://github.com/Agnaldokorb/skillMatch-js.git
  ```
- abra a pasta clonada no VsCode
- instale a extenção **LIVE SERVER**
- click com o botão direito do mouse sobre **index.html**
- selecione **open with live server**
- na janela do navegador que abrir siga os passos indicados

## Requisitos funcionais atendidos

- RF01: objeto candidato com nome, área, habilidades, experiência e preferência de modelo de trabalho.
- RF02: lista com 3 vagas fictícias.
- RF03: cálculo de compatibilidade por vaga.
- RF04: classificação em Alta, Média e Baixa compatibilidade com if.
- RF05: listagem de habilidades faltantes por vaga.
- RF06: identificação da vaga mais compatível.
- RF07: recomendação de estudo com base nas faltas recorrentes.
- RF08: uso de métodos de array (map, filter, find, every e reduce).
- RF09: classe Vaga.
- RF10: herança com classe VagaFrontEnd extends Vaga.
- RF11: uso de this em métodos da classe.
- RF12: callback para mensagem de encerramento da análise.
- RF13: closure para contador de análises.
- RF14: Promise e async/await para simular carregamento de vagas.

## Requisitos técnicos atendidos

- VS Code como editor principal.
- Extensões recomendadas listadas neste README.
- Kanban para organizacão de tarefas.
- Repositório público no GitHub com versionamento por commits.
- Uso de branches seguindo um fluxo simplificado.

### Como a internet funciona (resumo)

A internet conecta dispositivos por meio de redes. Quando abrimos um site, o navegador envia uma requisição para um servidor, e o servidor responde com os arquivos da aplicação (HTML, CSS, JavaScript e dados).

### Arquitetura cliente-servidor (resumo)

Neste modelo, o cliente (navegador) solicita informações e o servidor responde. Neste projeto, a função com Promise simula essa comunicação ao "buscar" vagas com atraso, como se os dados viessem de um servidor real.

### Var, let e const (resumo)

- var: possui escopo de função e pode gerar comportamentos inesperados em blocos.
- let: possui escopo de bloco e permite reatribuição.
- const: possui escopo de bloco e nao permite reatribuição da referência.

No projeto, foi priorizado o uso de let e const.

## Extensões recomendadas e utilizadas no VS Code

- JavaScript (ES6) code snippets.
- Prettier - Code formatter.
- Error Lens.
- GitLens.

## Versionamento e GitHub Flow simplificado

Branches sugeridas no projeto avaliativo:

- main
- develop
- feat/index
- feat/estrutura-projeto
- feat/calculo-compatibilidade
- feat/readme-tarefas

Exemplos de mensagens de commit:

- feat: cria estrutura inicial do projeto
- feat: Criada estrutura de pastas e arquivos inicial
- feat: Adicionada a página index ao projeto
- feat: Desenvolvido o README e o tarefas-kanban inicial
- feat: adicionado dados do candidato
- feat: dados vagas
- feat: cálculo e compatibilidade
- Fix: retirado código comentado na produção
- fix: apagado comentários feitos durante a criação do projeto para manter o código limpo e organizado
- docs: Atualização do README.md 

## Feramentas ultilizadas

**desenvolvimento**

- VScode
- Windows

**pesquisa**

- Google
- ChatGPT

## Kanban

O planejamento das tarefas foi organizado com Trello em **https://trello.com/invite/b/6a0872c432914715b4d1eb6e/ATTI3ae7ffd6782eae12522f9c0b4cf353d8034745C7/mini-projeto-avaliativo-modulo-01-semana-06**

Colunas utilizadas:

- Backlog
- A Fazer
- Em Andamento
- Concluído

## Video de demonstração

Vídeo de ate 5 minutos (em grupo) abordando:

- objetivo e demonstração do sistema;
- como executar;
- organização no Kanban;
- estratégia de branches;
- melhorias futuras.

Link do vídeo: **https://drive.google.com/file/d/13bOcLdUX3CzQ1Puxs5W6DHqAqtoOmlDZ/view?usp=sharing**

## Checklist final de entrega

- [x] Repositório público no GitHub
- [x] Arquivo skillmatch.js
- [x] Arquivo README.md
- [x] Quadro Kanban
- [x] Objeto candidato
- [x] Pelo menos 3 vagas fictícias
- [x] Uso de arrays, objetos, strings, números e booleanos
- [x] Uso de if e operadores lógicos/matemáticos
- [x] Uso de let e const
- [x] Uso de while
- [x] Uso de funções e arrow functions
- [x] Uso de métodos de array (map, filter, find, every e reduce)
- [x] Uso de classe, construtor, heranca e this
- [x] Uso de callback, closure, Promise e async/await
- [x] Vídeo publicado com permissão de leitura por link
- [x] Links enviados no AVA


## Mapa mental do projeto

![mapa mental](./assets/mapa-mental.png)

## imagem do Index.html

![index.html](./assets/index.png)

## imagem do console (Resultado esperado)

![console](./assets/console.png)
