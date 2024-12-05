import { Manutencao, Marca, Ocorrencia, Pagamento, Veiculo } from "@/types/schemas";

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