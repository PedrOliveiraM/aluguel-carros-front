import { ContratoLocacao, Manutencao, Marca, Modelo, Ocorrencia, Pagamento, PostContratoLocacao, Veiculo } from "@/types/schemas";

export const fetchDataMarcas = async (): Promise<Marca[]> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/getMarcas`);
        const result: Marca[] = await response.json(); // Definindo que result é um array de Marca

        console.log('result Marca: ', result);

        // Filtra as marcas para garantir que sejam únicas com base no nome
        const marcasUnicas = Array.from(new Set(result.map((marca) => marca.nome)))
            .map((nome) => result.find((marca) => marca.nome === nome));

        return marcasUnicas as Marca[];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchDataModelos = async (IdMarca?: string): Promise<Modelo[]> => {
    try {
        // Obtém todos os modelos, mesmo sem filtro
        const response = await fetch(`https://backend.thlm.site/api/getModelos`);
        const result = await response.json();    
        if (IdMarca) {
            const modelosFiltrados = result.filter((modelo: Modelo) => modelo.marcaId === Number(IdMarca));
            const nomesUnicos = new Set<string>();
            const modelosSemDuplicados = modelosFiltrados.filter((modelo: { nome: string; }) => {
              if (nomesUnicos.has(modelo.nome)) {
                return false;
              } else {
                nomesUnicos.add(modelo.nome);
                return true;
              }
            });
            console.log("Modelos filtrados por marca sem duplicados: ", modelosSemDuplicados);
            return modelosSemDuplicados;
          }
    
        return result as Modelo[];
      } catch (error) {
        console.error("Erro ao buscar modelos: ", error);
        return [];
      }
}


export const fetchDataVeiculos = async (): Promise<Veiculo[]> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/getVeiculos`);
        const result = await response.json();

        console.log('Veículos: ', result);
        return result as Veiculo[];
    } catch (error) {
        return [];
    }
};

export const fetchDataManutencoes = async (): Promise<Manutencao[]> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/getManutencoes`);
        const result = await response.json();

        console.log('Manutenções: ', result);
        return result as Manutencao[];
    } catch (error) {
        return [];
    }
};


export const fetchDataOcorrencias = async (): Promise<Ocorrencia[]> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/getOcorrencias`);
        const result = await response.json();

        console.log('Ocorrencias: ', result);
        return result as Ocorrencia[];
    } catch (error) {
        return [];
    }
};


export const fetchDataPagamentos = async (): Promise<Pagamento[]> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/getPagamentos`);
        const result = await response.json();

        console.log('Pagamento: ', result);
        return result as Pagamento[];
    } catch (error) {
        return [];
    }
};

export const fetchDataContratos = async (IdContrato: string): Promise<ContratoLocacao> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/getContratoLocacao/${IdContrato}`);
        const result = await response.json();
        console.log('Contrato: ', result);
        return result as ContratoLocacao;
    } catch (error) {
        return {} as ContratoLocacao;
    }
};

export const postContrato = async (contrato: PostContratoLocacao): Promise<boolean> => {
    try {
        const response = await fetch(`https://backend.thlm.site/api/createContratoLocacao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contrato)
        });

        return response.ok;
    } catch (error) {
        return false;
    }
}