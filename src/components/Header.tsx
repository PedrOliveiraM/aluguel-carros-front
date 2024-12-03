'use client'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import Link from 'next/link'

export function Header() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/">Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/clientes">Clientes</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/locacao">Locação</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/devolucao">Devolução</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/veiculos">Veículos</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/manutencao">Manutenção</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Link href="/relatorios">Relatórios</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
