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