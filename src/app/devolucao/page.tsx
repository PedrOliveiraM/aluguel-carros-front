import React from 'react';

const Devolucao = () => {
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
                  className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">Data Prevista para Devolução:</label>
                <input
                  type="date"
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
                className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do locatário"
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <button className="w-full lg:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
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
              <p className="text-4xl font-bold text-gray-900">R$ 29.000,00</p>
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