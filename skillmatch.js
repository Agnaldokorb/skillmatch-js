const candidato = {
  // Objeto que representa o candidato, contendo informações como nome, área de atuação, habilidades, experiência em meses e se aceita modelo híbrido de trabalho
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
      ) => habilidadesCandidato.includes(requisito),
    );
  }
}

class VagaFrontEnd extends Vaga {
  // Classe que representa uma vaga específica para Front-End, estendendo a classe Vaga
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    // Método para exibir o nível da vaga
    return `Nivel da vaga: ${this.nivel}`;
  }
}

const vagas = [
  // Array de objetos que representam as vagas disponíveis para análise de compatibilidade, cada objeto é uma instância da classe VagaFrontEnd com informações específicas sobre a vaga, como ID, empresa, cargo, requisitos, salário, modalidade e nível da vaga
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

// Função para calcular a compatibilidade entre o candidato e a vaga
function calcularCompatibilidade(candidatoAtual, vagaAtual) {
  const habilidadesEncontradas = vagaAtual.requisitos.filter((requisito) =>
    candidatoAtual.habilidades.includes(requisito),
  );

  const habilidadesFaltantes = vagaAtual.requisitos.filter(
    // Filtra os requisitos da vaga para encontrar quais habilidades do candidato não possui
    (requisito) => !candidatoAtual.habilidades.includes(requisito),
  );

  const percentual = Number(
    // Calcula o percentual de compatibilidade com base nas habilidades encontradas em relação ao total de requisitos da vaga
    (
      (habilidadesEncontradas.length / vagaAtual.requisitos.length) *
      100
    ).toFixed(2),
  );

  return {
    vaga: vagaAtual,
    habilidadesEncontradas,
    habilidadesFaltantes,
    percentual,
    classificacao: classificarCompatibilidade(percentual),
    atendeTodos: vagaAtual.atendeTodosRequisitos(candidatoAtual.habilidades),
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
  return listaVagas.find((vaga) => vaga.id === id);
}

function encontrarMelhorVaga(resultados) {
  // Função para encontrar a vaga com a maior compatibilidade usando o método reduce
  return resultados.reduce((melhor, atual) => {
    if (!melhor) {
      return atual;
    }
    return atual.percentual > melhor.percentual ? atual : melhor;
  }, null);
}

function gerarRecomendacaoEstudo(resultados) {
  // Função para gerar uma recomendação de estudo com base nas habilidades faltantes mais comuns entre as vagas analisadas
  const mapaFaltantes = resultados.reduce((acumulador, resultado) => {
    resultado.habilidadesFaltantes.forEach((habilidade) => {
      acumulador[habilidade] = (acumulador[habilidade] || 0) + 1;
    });
    return acumulador;
  }, {});

  const habilidadesPriorizadas = Object.entries(mapaFaltantes)
    // Converte o objeto de habilidades faltantes em um array de [habilidade, contagem] para facilitar a ordenação
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  if (habilidadesPriorizadas.length === 0) {
    return "Voce ja atende todos os requisitos das vagas analisadas. Foque em praticar entrevistas e portfolio.";
  }
  return `Priorize estudar: ${habilidadesPriorizadas.join(", ")}. Esses temas aparecem com frequencia nas vagas analisadas.`;
}

function criarContadorDeAnalises() {
  // Função para criar um contador de análises utilizando closure, permitindo contar o número de análises realizadas durante a execução do sistema
  let total = 0;

  return function incrementar() {
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
    `${nome}, revise as habilidades faltantes e atualize seu plano de estudos.`,
  );
}

function buscarVagasSimuladas() {
  // Função para simular a busca de vagas, retornando uma promessa que resolve com o array de vagas após um atraso de 1 segundo, simulando uma operação assíncrona de busca de vagas em um banco de dados ou API, permitindo que o sistema continue a execução enquanto aguarda a resolução da promessa com as vagas disponíveis para análise de compatibilidade.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
}

async function iniciarSistema() {
  // Função assíncrona para iniciar o sistema, permitindo o uso de await para lidar com operações assíncronas, como a busca de vagas simuladas
  console.log("=== SkillMatch JS ===");
  console.log(`Candidato: ${candidato.nome}`);
  console.log(`Area: ${candidato.area}`);
  console.log(`Habilidades: ${candidato.habilidades.join(", ")}`);
  console.log(`Experiencia (meses): ${candidato.experienciaMeses}`);

  const contarAnalise = criarContadorDeAnalises();

  try {
    // Tenta executar o bloco de código para buscar as vagas simuladas e realizar a análise de compatibilidade, lidando com possíveis erros que possam ocorrer durante a execução
    const vagasCarregadas = await buscarVagasSimuladas();
    console.log("\n## Vagas encontradas:\n");

    const resultados = vagasCarregadas.map((vaga) =>
      calcularCompatibilidade(candidato, vaga),
    );

    for (const resultado of resultados) {
      // Itera sobre os resultados de compatibilidade para exibir as informações de cada vaga analisada, incluindo o número da análise, empresa, cargo, resumo da vaga, nível da vaga, percentual de compatibilidade, habilidades encontradas, habilidades faltantes, classificação e se atende todos os requisitos
      const numeroAnalise = contarAnalise();
      console.log(`Analise #${numeroAnalise}`);
      console.log(`Empresa: ${resultado.vaga.empresa}`);
      console.log(`Cargo: ${resultado.vaga.cargo}`);
      console.log(`Salário: R$${resultado.vaga.salario}`);
      console.log(`Resumo: ${resultado.vaga.exibirResumo()}`);
      console.log(`${resultado.vaga.exibirNivel()}`);
      console.log(`Compatibilidade: ${resultado.percentual}%`);
      console.log(
        `Habilidades encontradas: ${
          resultado.habilidadesEncontradas.length > 0
            ? resultado.habilidadesEncontradas.join(", ")
            : "Nenhuma"
        }`,
      );
      console.log(
        `Habilidades faltantes: ${
          resultado.habilidadesFaltantes.length > 0
            ? resultado.habilidadesFaltantes.join(", ")
            : "Nenhuma"
        }`,
      );
      console.log(`Classificacao: ${resultado.classificacao}`);
      console.log(
        `Atende todos os requisitos? ${resultado.atendeTodos ? "Sim" : "Nao"}`,
      );
      console.log("-");
    }

    const melhorVaga = encontrarMelhorVaga(resultados);
    if (melhorVaga) {
      // Verifica se foi encontrada uma vaga com compatibilidade, ou seja, se o array de resultados não está vazio
      console.log("\nVaga mais compativel:");
      console.log(`${melhorVaga.vaga.empresa} - ${melhorVaga.vaga.cargo}`);
      console.log(`Compatibilidade: ${melhorVaga.percentual}%`);
    }

    const recomendacao = gerarRecomendacaoEstudo(resultados);
    console.log("\nRecomendacao de estudo:");
    console.log(recomendacao);

    let indice = 0;
    while (indice < resultados.length) {
      // Enquanto o índice for menor que o comprimento do array de resultados, continua a iteração
      indice += 1;
    }

    let totalVagasAnalisadas = resultados.length;
    console.log(`\nTotal de vagas analisadas: ${totalVagasAnalisadas}`);

    finalizarAnalise(candidato.nome, exibirMensagemFinal);
  } catch (erro) {
    // Captura e exibe qualquer erro que possa ocorrer durante a execução do bloco try, como erros na busca de vagas simuladas ou na análise de compatibilidade, garantindo que o sistema lide com erros de forma adequada e forneça feedback ao usuário em caso de falhas
    console.error("Falha ao iniciar o sistema:", erro);
    console.log("\nObrigado por usar o SkillMatch JS!");
  }
}

iniciarSistema(); // Chama a função iniciarSistema para iniciar a execução do sistema de simulação de compatibilidade com vagas de Front-End Junior, permitindo que o candidato veja os resultados da análise e as recomendações de estudo com base nas vagas disponíveis.
