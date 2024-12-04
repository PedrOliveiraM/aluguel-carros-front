'use client'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import Link from 'next/link'

export function Header() {
  return (
    <Menubar className="h-12">
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/">Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/clientes">Clientes</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/locacao">Locação</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/devolucao">Devolução</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/veiculos">Veículos</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/manutencao">Manutenção</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild className="hover:bg-slate-100">
          <Link href="/relatorios">Relatórios</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
