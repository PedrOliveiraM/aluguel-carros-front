'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  fetchDataManutencoes,
  fetchDataMarcas, 
  fetchDataOcorrencias,
  fetchDataPagamentos,
  fetchDataVeiculos,
} from '@/http/api'
import {
  Manutencao,
  Marca,
  Ocorrencia,
  Pagamento,
  Veiculo,
} from '@/types/schemas'
import { Car, DollarSign, Wrench } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface BaseDataFormat {
  date: string;
  revenue: number;
}

type DataInput = Pagamento | Ocorrencia;

const transformToBaseDataFormat = <T extends DataInput>(
  data: T[],
  options: { dateField: keyof T; valueField: keyof T }
): BaseDataFormat[] => {
  const { dateField, valueField } = options;
  const valueMap: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = new Date(item[dateField] as unknown as string)
      .toISOString()
      .split('T')[0];
    const value = item[valueField] as unknown as number;

    if (valueMap[date]) {
      valueMap[date] += value;
    } else {
      valueMap[date] = value;
    }
  });

  return Object.keys(valueMap)
    .map((date) => ({
      date,
      revenue: valueMap[date], // Corrigido para usar 'revenue'
    }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
};

export default function Reports() {
  const [DataPagamentos, setDataPagamentos] = useState<BaseDataFormat[]>([]);
  const [DataOcorrencias, setDataOcorrencias] = useState<BaseDataFormat[]>([]);

  const [Marcas, setMarcas] = useState<Marca[]>([]);
  const [Manutencao, setManutencao] = useState<Manutencao[]>([]);
  const [Veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [Ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [Pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMarcas(await fetchDataMarcas());
        setVeiculos(await fetchDataVeiculos());
        setManutencao(await fetchDataManutencoes());
        setOcorrencias(await fetchDataOcorrencias());
        setPagamentos(await fetchDataPagamentos());
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // Atualiza DataPagamentos e DataOcorrencias após dados serem carregados
  useEffect(() => {
    if (Pagamentos.length > 0) {
      setDataPagamentos(
        transformToBaseDataFormat(Pagamentos, {
          dateField: 'data',
          valueField: 'valorPago',
        })
      );
    }
    if (Ocorrencias.length > 0) {
      setDataOcorrencias(
        transformToBaseDataFormat(Ocorrencias, {
          dateField: 'dataOcorrencia',
          valueField: 'valorOcorrencia',
        })
      );
    }
  }, [Pagamentos, Ocorrencias]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-black">Relatórios</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marcas</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Marcas.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Número de Manutenções
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Manutencao.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Veículos Disponíveis</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Veiculos.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rentals: {
                  label: 'Rentals',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DataPagamentos}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue" // Corrigido para 'revenue', que é o valor da receita
                    stroke="var(--color-rentals)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ocorrências</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DataOcorrencias}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue" // Corrigido para 'revenue', que é o valor da receita
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
