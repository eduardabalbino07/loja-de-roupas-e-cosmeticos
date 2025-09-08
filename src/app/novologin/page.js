'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation' 
import style from './page.module.css'



export default function ClienteLogin() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')

  const route = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/autenticacao/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone, senha })
      })

      if (response.ok) {
        const data = await response.json()
        const id = data.id
        route.push(`/perfil/${id}`)
      } else {
        const errorData = await response.json()
        alert(`Erro ao fazer login: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <div>
      <h1 className={style.h1}>Criar uma Conta</h1>
      <p className={style.h2}>Acompanhe os seus pedidos em um só lugar!</p> <br></br>

    <a href= "paginainicial" className={style.outrapagina}></a>
    
          <form onSubmit={handleLogin}>
            <div className={style.box}>
              <h2 className={style.titulo}></h2>
            
            <label className={style.name} htmlFor="nome">Nome:</label>
            <input
              className={style.nome}
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label className={style.email} htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            <label className={style.telefone} htmlFor="telefone">Telefone:</label>
              <input
                type="number"
                id="telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
          
             <label className={style.senha} htmlFor="senha">Senha:</label>
             <input 
              className={style.password}
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button className={style.entrar} type="submit">Criar uma conta</button>
       </div>
    </form>
  </div>
  )
}