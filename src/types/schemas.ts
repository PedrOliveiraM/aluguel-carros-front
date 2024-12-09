export interface Ocorrencia {
  id: number
  descricao: string
  dataOcorrencia: Date
  valorOcorrencia: number
  contratoId: number
  contrato: ContratoLocacao
}

export interface Pagamento {
  id: number
  data: Date
  valorPago: number
  formaPagamento: string
  contratoId: number
  contrato: ContratoLocacao
}

export interface Categoria {
  id: number
  tipo: string
  valorLocacao: number
  modelos: Modelo[]
}

export interface Marca {
  id: number
  nome: string
  modelos: Modelo[]
}

// Agora definindo as interfaces completas
export interface Modelo {
  id: number
  nome: string
  anoModelo: Date
  qtModelo: number
  veiculos: Veiculo[]
  categoriaId: number
  marcaId: number
  categoria: Categoria
  marca: Marca
}

export interface Manutencao {
  id: number
  descricao: string
  dataManutencao: Date
  valorManutencao: number
  veiculoId: number
  veiculo: Veiculo
}

export interface Veiculo {
  id: number
  placa: string
  chassi: string
  anoFabricacao: Date
  cor: string
  status: string
  manutencoes: Manutencao[]
  modeloId: number
  modelo: Modelo
  contratos: ContratoLocacao[]
}

export interface ContratoLocacao {
  id: number
  dataLocacao: Date
  dataDevolucao: Date
  valorCaucao: number
  valorTotal: number
  status: string
  veiculos: Veiculo[]
  ocorrencias: Ocorrencia[]
  pagamentos: Pagamento[]
}
export interface PostContratoLocacao {
  dataLocacao: Date
  dataDevolucao: Date
  valorCaucao: number
  valorTotal: number
  status: string
}
