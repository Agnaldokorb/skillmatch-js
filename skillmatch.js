const candidato = {
  nome: "Suelen Tonello",
  area: "Front-End",
  habilidades: [
    "JavaScript",
    "GitHub",
    "Logica de Programacao",
    "Kanban",
    "HTML",
    "CSS",
  ],
  experienciaMeses: 10,
  aceitaModeloHibrido: true,
};

class Vaga {
  // Classe base para representar uma vaga de emprego
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    // Construtor para inicializar os atributos da vaga
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    // Método para exibir um resumo da vaga
    return `${this.cargo} na empresa ${this.empresa}`; // Exemplo: "Desenvolvedor Front-End Junior na empresa TechStart"
  }

  atendeTodosRequisitos(habilidadesCandidato) {
    // Método para verificar se o candidato atende a todos os requisitos da vaga
    return this.requisitos.every(
      (
        requisito, // Verifica se cada requisito da vaga está presente nas habilidades do candidato
      ) => habilidadesCandidato.includes(requisito), // Retorna true se o candidato atender a todos os requisitos, caso contrário retorna false
    );
  }
}

class VagaFrontEnd extends Vaga {
  // Classe que representa uma vaga específica para Front-End, estendendo a classe Vaga
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    // Construtor para inicializar os atributos da vaga Front-End, incluindo o nível da vaga
    super(id, empresa, cargo, requisitos, salario, modalidade); // Chama o construtor da classe base Vaga para inicializar os atributos herdados
    this.nivel = nivel; // Inicializa o nível da vaga
  }

  exibirNivel() {
    // Método para exibir o nível da vaga
    return `Nivel da vaga: ${this.nivel}`; // Exemplo: "Nivel da vaga: Junior"
  }
}

const vagas = [
  new VagaFrontEnd(
    1,
    "diadev",
    "Desenvolvedor Front-End Junior",
    ["JavaScript", "GitHub", "Logica de Programacao", "HTML", "CSS"],
    2800,
    "Remoto",
    "Junior",
  ),
  new VagaFrontEnd(
    2,
    "codemaster",
    "Estagio Front-End",
    ["JavaScript", "Kanban", "GitHub", "HTML"],
    1800,
    "Hibrido",
    "Estagio",
  ),
  new VagaFrontEnd(
    3,
    "novocode",
    "Programador JavaScript Junior",
    ["JavaScript", "Arrays", "Objetos", "Funcoes"],
    3000,
    "Presencial",
    "Junior",
  ),
];

function calcularCompatibilidade(candidatoAtual, vagaAtual) {
  // Função para calcular a compatibilidade entre o candidato e a vaga
  const habilidadesEncontradas = vagaAtual.requisitos.filter(
    (
      requisito, // Filtra os requisitos da vaga para encontrar quais habilidades do candidato correspondem aos requisitos
    ) => candidatoAtual.habilidades.includes(requisito), // Retorna um array com as habilidades encontradas que correspondem aos requisitos da vaga
  );

  const habilidadesFaltantes = vagaAtual.requisitos.filter(
    // Filtra os requisitos da vaga para encontrar quais habilidades do candidato não possui
    (requisito) => !candidatoAtual.habilidades.includes(requisito), // Retorna um array com as habilidades faltantes que o candidato não possui em relação aos requisitos da vaga
  );

  const percentual = Number(
    // Calcula o percentual de compatibilidade com base nas habilidades encontradas em relação ao total de requisitos da vaga
    (
      (habilidadesEncontradas.length / vagaAtual.requisitos.length) * // Calcula a proporção de habilidades encontradas em relação ao total de requisitos da vaga
      100
    ).toFixed(2), // Arredonda o resultado para 2 casas decimais e converte para número
  );

  return {
    // Retorna um objeto com as informações da vaga, habilidades encontradas, habilidades faltantes, percentual de compatibilidade, classificação e se atende todos os requisitos
    vaga: vagaAtual, // Inclui a vaga atual no resultado para facilitar o acesso às informações da vaga
    habilidadesEncontradas,
    habilidadesFaltantes,
    percentual,
    classificacao: classificarCompatibilidade(percentual), // Classifica a compatibilidade com base no percentual calculado
    atendeTodos: vagaAtual.atendeTodosRequisitos(candidatoAtual.habilidades), // Verifica se o candidato atende a todos os requisitos da vaga usando o método da classe Vaga
  };
}

function classificarCompatibilidade(percentual) {
  // Função para classificar a compatibilidade com base no percentual calculado
  if (percentual >= 80) {
    return "Alta compatibilidade";
  }

  if (percentual >= 50) {
    return "Media compatibilidade";
  }

  return "Baixa compatibilidade";
}

function buscarVagaPorId(listaVagas, id) {
  // Função para buscar uma vaga específica por ID usando o método find
  return listaVagas.find((vaga) => vaga.id === id); // Retorna a vaga encontrada com o ID correspondente ou undefined se não encontrar
}

function encontrarMelhorVaga(resultados) {
  // Função para encontrar a vaga com a maior compatibilidade usando o método reduce
  return resultados.reduce((melhor, atual) => {
    // Compara o percentual de compatibilidade do resultado atual com o melhor encontrado até agora
    if (!melhor) {
      // Se ainda não houver um melhor definido, o resultado atual se torna o melhor
      return atual; // Retorna o resultado atual como o melhor encontrado até agora
    }
    return atual.percentual > melhor.percentual ? atual : melhor; // Compara os percentuais de compatibilidade e retorna o resultado com o maior percentual
  }, null); // O segundo argumento null é o valor inicial para o acumulador, indicando que inicialmente não há um melhor definido
}

function gerarRecomendacaoEstudo(resultados) {
  // Função para gerar uma recomendação de estudo com base nas habilidades faltantes mais comuns entre as vagas analisadas
  const mapaFaltantes = resultados.reduce((acumulador, resultado) => {
    // Para cada resultado, itera sobre as habilidades faltantes e conta a frequência de cada habilidade faltante em um objeto acumulador
    resultado.habilidadesFaltantes.forEach((habilidade) => {
      // Para cada habilidade faltante, incrementa a contagem no acumulador
      acumulador[habilidade] = (acumulador[habilidade] || 0) + 1; // Se a habilidade já tiver uma contagem, incrementa; caso contrário, inicia a contagem em 1
    });
    return acumulador; // Retorna o acumulador atualizado para a próxima iteração do reduce
  }, {});

  const habilidadesPriorizadas = Object.entries(mapaFaltantes) // Converte o objeto de habilidades faltantes em um array de [habilidade, contagem] para facilitar a ordenação
    .sort((a, b) => b[1] - a[1]) // Ordena o array de habilidades faltantes com base na contagem em ordem decrescente, para priorizar as habilidades mais comuns entre as vagas analisadas
    .map((item) => item[0]); // Mapeia o array ordenado para obter apenas as habilidades, resultando em um array de habilidades priorizadas para estudo

  if (habilidadesPriorizadas.length === 0) {
    // Se não houver habilidades faltantes, significa que o candidato atende a todos os requisitos das vagas analisadas
    return "Voce ja atende todos os requisitos das vagas analisadas. Foque em praticar entrevistas e portfolio."; // Retorna uma mensagem indicando que o candidato já atende a todos os requisitos e pode focar em outras áreas para se preparar para as entrevistas
  }

  return `Priorize estudar: ${habilidadesPriorizadas.join(", ")}. Esses temas aparecem com frequencia nas vagas analisadas.`; // Retorna uma mensagem recomendando as habilidades a serem priorizadas para estudo, listando as habilidades faltantes mais comuns entre as vagas analisadas
}

function criarContadorDeAnalises() {
  // Função para criar um contador de análises utilizando closure, permitindo contar o número de análises realizadas durante a execução do sistema
  let total = 0;

  return function incrementar() {
    // Função interna que incrementa o contador total de análises e retorna o valor atualizado
    total += 1;
    return total;
  };
}

function finalizarAnalise(nomeCandidato, callback) {
  // Função para finalizar a análise e executar um callback com o nome do candidato
  console.log("\nAnalise finalizada.");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  // Função para exibir a mensagem final ao candidato

  console.log(
    `${nome}, revise as habilidades faltantes e atualize seu plano de estudos.`, // Exibe uma mensagem personalizada para o candidato, incentivando-o a revisar as habilidades faltantes e atualizar seu plano de estudos com base nos resultados da análise
  );
}

function buscarVagasSimuladas() {
  // Função para simular a busca de vagas, retornando uma promessa que resolve com o array de vagas após um atraso de 1 segundo, simulando uma operação assíncrona de busca de vagas em um banco de dados ou API, permitindo que o sistema continue a execução enquanto aguarda a resolução da promessa com as vagas disponíveis para análise de compatibilidade.
  return new Promise((resolve) => {
    // Retorna uma nova promessa que simula a busca de vagas com um atraso
    setTimeout(() => {
      // Simula um atraso de 1 segundo para representar o tempo de busca de vagas
      resolve(vagas); // Resolve a promessa com o array de vagas definido anteriormente, permitindo que o sistema continue a execução após a "busca" ser concluída
    }, 1000); // O tempo de atraso é definido em milissegundos (1000 ms = 1 segundo)
  });
}

async function iniciarSistema() {
  // Função assíncrona para iniciar o sistema, permitindo o uso de await para lidar com operações assíncronas, como a busca de vagas simuladas
  console.log("=== SkillMatch JS ==="); // Exibe o título do sistema no console
  console.log(`Candidato: ${candidato.nome}`); // Exibe o nome do candidato no console
  console.log(`Area: ${candidato.area}`); // Exibe a área de atuação do candidato no console
  console.log(`Habilidades: ${candidato.habilidades.join(", ")}`); // Exibe as habilidades do candidato no console, juntando as habilidades em uma string separada por vírgulas para melhor legibilidade
  console.log(`Experiencia (meses): ${candidato.experienciaMeses}`); // Exibe a experiência do candidato em meses no console

  const contarAnalise = criarContadorDeAnalises(); // Cria um contador de análises utilizando a função criarContadorDeAnalises, que retorna uma função para incrementar o contador e obter o número atual de análises realizadas

  try {
    // Tenta executar o bloco de código para buscar as vagas simuladas e realizar a análise de compatibilidade, lidando com possíveis erros que possam ocorrer durante a execução
    const vagasCarregadas = await buscarVagasSimuladas(); // Aguarda a resolução da promessa retornada pela função buscarVagasSimuladas, que simula a busca de vagas e retorna o array de vagas após um atraso
    console.log("\n## Vagas encontradas:\n"); // Exibe uma mensagem indicando que as vagas foram carregadas com sucesso após a resolução da promessa

    const resultados = vagasCarregadas.map(
      (
        vaga, // Mapeia o array de vagas carregadas para calcular a compatibilidade de cada vaga com o candidato, utilizando a função calcularCompatibilidade
      ) => calcularCompatibilidade(candidato, vaga), // Para cada vaga, chama a função calcularCompatibilidade passando o objeto do candidato e a vaga atual, retornando um array de resultados com as informações de compatibilidade para cada vaga
    );

    for (const resultado of resultados) {
      // Itera sobre os resultados de compatibilidade para exibir as informações de cada vaga analisada, incluindo o número da análise, empresa, cargo, resumo da vaga, nível da vaga, percentual de compatibilidade, habilidades encontradas, habilidades faltantes, classificação e se atende todos os requisitos
      const numeroAnalise = contarAnalise(); // Incrementa o contador de análises para obter o número atual da análise, permitindo exibir um número sequencial para cada vaga analisada
      console.log(`Analise #${numeroAnalise}`); // Exibe o número da análise atual no console, indicando qual vaga está sendo analisada no momento
      console.log(`Empresa: ${resultado.vaga.empresa}`); // Exibe o nome da empresa da vaga analisada no console
      console.log(`Cargo: ${resultado.vaga.cargo}`); // Exibe o cargo da vaga analisada no console
      console.log(`Salário: R$${resultado.vaga.salario}`); // Exibe o salário da vaga analisada no console, formatando o valor com o símbolo de moeda e utilizando a propriedade salario do objeto vaga para obter o valor do salário
      console.log(`Resumo: ${resultado.vaga.exibirResumo()}`); // Exibe um resumo da vaga utilizando o método exibirResumo da classe Vaga, que retorna uma string com o cargo e a empresa da vaga
      console.log(`${resultado.vaga.exibirNivel()}`); // Exibe o nível da vaga utilizando o método exibirNivel da classe VagaFrontEnd, que retorna uma string com o nível da vaga (por exemplo, "Nivel da vaga: Junior")
      console.log(`Compatibilidade: ${resultado.percentual}%`); // Exibe o percentual de compatibilidade calculado para a vaga analisada no console, indicando o quão compatível o candidato é com os requisitos da vaga
      console.log(
        // Exibe as habilidades encontradas que correspondem aos requisitos da vaga, ou "Nenhuma" se não houver habilidades encontradas
        `Habilidades encontradas: ${
          resultado.habilidadesEncontradas.length > 0 // Verifica se há habilidades encontradas para exibir, caso contrário exibe "Nenhuma"
            ? resultado.habilidadesEncontradas.join(", ") // Se houver habilidades encontradas, junta as habilidades em uma string separada por vírgulas para exibir no console
            : "Nenhuma"
        }`,
      );
      console.log(
        // Exibe as habilidades faltantes que não correspondem aos requisitos da vaga, ou "Nenhuma" se não houver habilidades faltantes
        `Habilidades faltantes: ${
          // Verifica se há habilidades faltantes para exibir, caso contrário exibe "Nenhuma"
          resultado.habilidadesFaltantes.length > 0 // Se houver habilidades faltantes, junta as habilidades em uma string separada por vírgulas para exibir no console
            ? resultado.habilidadesFaltantes.join(", ") // Se houver habilidades faltantes, junta as habilidades em uma string separada por vírgulas para exibir no console
            : "Nenhuma"
        }`,
      );
      console.log(`Classificacao: ${resultado.classificacao}`); // Exibe a classificação da compatibilidade (Alta, Média ou Baixa) com base no percentual calculado para a vaga analisada no console
      console.log(
        `Atende todos os requisitos? ${resultado.atendeTodos ? "Sim" : "Nao"}`, // Exibe se o candidato atende a todos os requisitos da vaga analisada, exibindo "Sim" se atende e "Nao" se não atende, com base no resultado do método atendeTodosRequisitos da classe Vaga
      );
      console.log("-"); // Exibe um separador para melhorar a legibilidade entre as análises de cada vaga no console
    }

    const melhorVaga = encontrarMelhorVaga(resultados); //  Encontra a vaga com a maior compatibilidade utilizando a função encontrarMelhorVaga, que utiliza o método reduce para comparar os percentuais de compatibilidade e retornar o resultado com o maior percentual
    if (melhorVaga) {
      // Verifica se foi encontrada uma vaga com compatibilidade, ou seja, se o array de resultados não está vazio
      console.log("\nVaga mais compativel:"); // Exibe uma mensagem indicando que a vaga mais compatível será exibida a seguir no console
      console.log(`${melhorVaga.vaga.empresa} - ${melhorVaga.vaga.cargo}`); // Exibe o nome da empresa e o cargo da vaga mais compatível encontrada no console, utilizando as informações do objeto resultado retornado pela função encontrarMelhorVaga
      console.log(`Compatibilidade: ${melhorVaga.percentual}%`); // Exibe o percentual de compatibilidade da vaga mais compatível encontrada no console, indicando o quão compatível o candidato é com os requisitos dessa vaga específica
    }

    const recomendacao = gerarRecomendacaoEstudo(resultados); // Gera uma recomendação de estudo com base nas habilidades faltantes mais comuns entre as vagas analisadas utilizando a função gerarRecomendacaoEstudo, que utiliza o método reduce para contar a frequência das habilidades faltantes e retorna uma mensagem recomendando as habilidades a serem priorizadas para estudo
    console.log("\nRecomendacao de estudo:"); // Exibe uma mensagem indicando que a recomendação de estudo será exibida a seguir no console
    console.log(recomendacao); // Exibe a recomendação de estudo gerada com base nas habilidades faltantes mais comuns entre as vagas analisadas no console, incentivando o candidato a focar nos temas mais relevantes para melhorar sua compatibilidade com as vagas de Front-End Junior

    let indice = 0; // Exemplo de uso do while para iterar sobre os resultados de compatibilidade, exibindo o número da análise e o cargo da vaga correspondente, demonstrando o uso do loop while para percorrer um array de resultados
    while (indice < resultados.length) {
      // Enquanto o índice for menor que o comprimento do array de resultados, continua a iteração
      indice += 1; // Incrementa o índice para avançar para a próxima análise
    }

    let totalVagasAnalisadas = resultados.length; // Exemplo de uso de let para declarar uma variável que armazena o total de vagas analisadas, demonstrando o uso de let para declarar variáveis em JavaScript, evitando problemas de escopo
    console.log(`\nTotal de vagas analisadas: ${totalVagasAnalisadas}`); // Exibe o total de vagas analisadas no console, utilizando a variável declarada com let para armazenar o valor do comprimento do array de resultados, indicando quantas vagas foram analisadas durante a execução do sistema

    finalizarAnalise(candidato.nome, exibirMensagemFinal); // Chama a função finalizarAnalise passando o nome do candidato e a função exibirMensagemFinal como callback, demonstrando o uso de callbacks para executar uma função após a finalização da análise, exibindo uma mensagem personalizada para o candidato com base nos resultados da análise
  } catch (erro) {
    // Captura e exibe qualquer erro que possa ocorrer durante a execução do bloco try, como erros na busca de vagas simuladas ou na análise de compatibilidade, garantindo que o sistema lide com erros de forma adequada e forneça feedback ao usuário em caso de falhas
    console.error("Falha ao iniciar o sistema:", erro); // Exibe uma mensagem de erro no console indicando que houve uma falha ao iniciar o sistema, juntamente com o objeto de erro para fornecer detalhes sobre o que causou a falha, ajudando na depuração e resolução de problemas durante a execução do sistema
  } finally {
    console.log("\nObrigado por usar o SkillMatch JS!"); // Exibe uma mensagem de agradecimento no console, indicando que o sistema foi utilizado, independentemente de ter ocorrido um erro ou não durante a execução, garantindo que o usuário receba uma mensagem final de encerramento do sistema
  }
}

iniciarSistema(); // Chama a função iniciarSistema para iniciar a execução do sistema de simulação de compatibilidade com vagas de Front-End Junior, permitindo que o candidato veja os resultados da análise e as recomendações de estudo com base nas vagas disponíveis.
