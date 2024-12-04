'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Car, DollarSign, Wrench } from 'lucide-react'
import { useEffect } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Sample data for the charts
const dailyRentalData = [
  { date: '2023-01-01', rentals: 10 },
  { date: '2023-01-02', rentals: 15 },
  { date: '2023-01-03', rentals: 8 },
  { date: '2023-01-04', rentals: 12 },
  { date: '2023-01-05', rentals: 20 },
  { date: '2023-01-06', rentals: 18 },
  { date: '2023-01-07', rentals: 22 },
]

const dailyRevenueData = [
  { date: '2023-01-01', revenue: 1000 },
  { date: '2023-01-02', revenue: 1500 },
  { date: '2023-01-03', revenue: 800 },
  { date: '2023-01-04', revenue: 1200 },
  { date: '2023-01-05', revenue: 2000 },
  { date: '2023-01-06', revenue: 1800 },
  { date: '2023-01-07', revenue: 2200 },
]

export default function Reports() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fazendo o fetch da API
        const response = await fetch(`https://backend.thlm.site/api/getMarcas`)

        console.log('result: ', await response.json())
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error('Falha na requisição')
        }

        // Convertendo a resposta para JSON
        const result = await response.json()

        console.log('result: ', result)
      } catch (error) {
        console.log(error)
      } finally {
        console.log('Finalizado')
      }
    }

    fetchData() // Chamando a função fetchData
  }, [])

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-black">Relatórios</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modelos</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              +2% em relação a semana passada
            </p>
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
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 em relação a semana passada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita / Dia</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,500</div>
            <p className="text-xs text-muted-foreground">
              +15% em relação a semana passada
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aluguel diário</CardTitle>
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
                <LineChart data={dailyRentalData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rentals"
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
            <CardTitle>Receita diária</CardTitle>
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
                <LineChart data={dailyRevenueData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
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
