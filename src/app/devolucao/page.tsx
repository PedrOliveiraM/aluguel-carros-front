'use client'

import { fetchDataContratos, fetchDataMarcas, fetchDataModelos, postContrato } from '@/http/api';
import { ContratoLocacao, Marca, Modelo } from '@/types/schemas';
import React, { use, useEffect, useState } from 'react';

interface ContratoLocacaoCharge {
  dataLocacao: Date;
  dataDevolucao: Date;
  locatario: string;
  marcaVeiculo: number;
  valorLocacao: number;
  valorOcorrencia: number;
  valorTotal: number;
  status: string;
  valorCaucao: number;
}

const Devolucao = () => {

  const [Contratos, setContratos] = useState<ContratoLocacao>();
  const [IdContrato, setIdContrato] = useState<string | null>(null);
  const [Marcas, setMarcas] = useState<Marca[]>([]);
  const [Modelos, setModelos] = useState<Modelo[]>([]);
  const [ModeloSelecionado, setModeloSelecionado] = useState<Modelo>();
  const [ContratoCharge, setContratoCharge] = useState<ContratoLocacaoCharge>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setContratos(await fetchDataContratos(IdContrato?.toString() || ''));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    if (IdContrato !== null && IdContrato !== '' && /^[0-9]+$/.test(IdContrato)) {
      fetchData();
    }
  }, [IdContrato]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMarcas(await fetchDataMarcas());
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();

  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setModelos(await fetchDataModelos(ContratoCharge?.marcaVeiculo?.toString()));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();

  }, [ContratoCharge?.marcaVeiculo]);


  const handleModeloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modeloId = Number(e.target.value);

    const modeloSelecionado = Modelos.find((modelo) => modelo.id === modeloId);
    setModeloSelecionado(modeloSelecionado);

    if (modeloSelecionado && ContratoCharge && ContratoCharge.dataLocacao && ContratoCharge.dataDevolucao) {
      // Calcula a diferença em dias entre dataLocacao e dataDevolucao
      const dataInicio = new Date(ContratoCharge.dataLocacao);
      const dataFim = new Date(ContratoCharge.dataDevolucao);
      const dias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24)); // Diferença em dias

      // Calcula o valor total da locação
      const valorTotal = dias * modeloSelecionado.categoria.valorLocacao;

      // Atualiza o estado com o modelo selecionado e o valor de locação calculado
      setContratoCharge((prevState) => ({
        ...prevState!,
        marcaVeiculo: modeloId, // Atualiza o ID do veículo selecionado
        valorLocacao: valorTotal, // Atualiza o valor de locação
      }));
    }
  };

  const Calcular = () => {
    if (ContratoCharge && ContratoCharge.dataLocacao && ContratoCharge.dataDevolucao) {
      // Calcula a diferença em dias entre dataLocacao e dataDevolucao
      const dataInicio = new Date(ContratoCharge.dataLocacao);
      const dataFim = new Date(ContratoCharge.dataDevolucao);
      const dias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24)); // Diferença em dias

      // Calcula o valor total da locação
      const valorTotal = dias * (ModeloSelecionado?.categoria?.valorLocacao ?? 0);

      // Atualiza o estado com o valor total calculado
      setContratoCharge((prevState) => ({
        ...prevState!,
        valorLocacao: valorTotal, // Atualiza o valor total
      }));
    }
  }

  const Finalizar = async () => {
    if (ContratoCharge) {
      try{
        setContratoCharge((prevState) => ({
          ...prevState!,
          status: 'Alugado',
          valorCaucao: 0,
        }));
        await postContrato(ContratoCharge);
        
      }catch(error){
        console.error('Erro ao finalizar contrato:', error);
      }
    }
  }


    
  return (
    <div className="flex flex-col min-w-full min-h-screen bg-white text-gray-900 p-4">
      <div className="flex flex-col flex-grow w-full">
        {/* Container principal */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          {/* Formulário */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
            <div className="mb-5">
              <label className="block mb-1 text-sm text-gray-700">Buscar Locação:</label>
              <div className="flex">
                <input
                  type="text"
                  value={IdContrato ?? ''}
                  onChange={(e) => setIdContrato(e.target.value)}
                  className="flex-1 p-2 bg-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o ID da locação"
                />
                <button className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
                  🔍
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm text-gray-700">Data de Locação:</label>
                <input
                  type="date"
                  value={
                    Contratos?.dataLocacao
                      ? new Date(Contratos.dataLocacao).toISOString().split('T')[0] // Pega apenas a data no formato YYYY-MM-DD
                      : ContratoCharge?.dataLocacao
                      ? new Date(ContratoCharge.dataLocacao).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setContratoCharge((prevState) => ({
                      ...prevState!,
                      dataLocacao: new Date(e.target.value), // Certifique-se de que o valor seja tratado como número
                    }))
                  }
                  className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">Data Prevista para Devolução:</label>
                <input
                  type="date"
                  value={
                    Contratos?.dataDevolucao
                      ? new Date(Contratos.dataDevolucao).toISOString().split('T')[0] // Pega apenas a data no formato YYYY-MM-DD
                      : ContratoCharge?.dataDevolucao
                      ? new Date(ContratoCharge.dataDevolucao).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setContratoCharge((prevState) => ({
                      ...prevState!,
                      dataDevolucao: new Date(e.target.value), // Certifique-se de que o valor seja tratado como número
                    }))
                  }
                  className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">CPF / CNPJ do Locatário:</label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-2 bg-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o CPF ou CNPJ"
                />
                <button className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
                  🔍
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Nome do Locatário:</label>
              <input
                type="text"
                value={ContratoCharge?.locatario ?? ''}
                className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do locatário"
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Marca do Veiculo:</label>
              <select
                className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setContratoCharge((prevState) => ({
                    ...prevState!,
                    marcaVeiculo: Number(e.target.value), // Certifique-se de que o valor seja tratado como número
                  }))
                }
              >
                <option value="">Selecione a Marca</option>
                {Marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Veiculo:</label>
              <select
                className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleModeloChange}
              >
                <option value="">Selecione o Veiculo</option>
                {Modelos.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nome}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <button className="w-full lg:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" 
              onClick={Calcular}>
                Calcular Contrato (R$)
              </button>
              <button className="w-full lg:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Finalizar Contrato
              </button>
            </div>
          </div>

          {/* Total a Pagar */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-lg font-bold text-gray-700">Total a Pagar (R$):</h2>
              <p className="text-4xl font-bold text-gray-900">{ContratoCharge?.valorLocacao}</p>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Débito
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Crédito
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Dinheiro
              </button>
              <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                Cancelar Contrato
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="mt-8 overflow-x-auto flex-grow w-full">
          <table className="w-full bg-gray-100 text-gray-900 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Marca</th>
                <th className="py-2 px-4 text-left">Modelo</th>
                <th className="py-2 px-4 text-left">Categoria</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Registrar Ocorrência</th>
                <th className="py-2 px-4 text-left">Valor Locação (R$)</th>
                <th className="py-2 px-4 text-left">Valor Ocorrência (R$)</th>
                <th className="py-2 px-4 text-left">Subtotal (R$)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Devolucao;

