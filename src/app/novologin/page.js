'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation' 


export default function ClienteLogin() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const route = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/autenticacao/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone })
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
    
          <form onSubmit={handleLogin}>
            <label htmlFor="nome">Nome:</label>
            <div>
            <input
              type="name"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            </div>
            <br></br>

            <label htmlFor="email">Email:</label>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br></br>

            <label htmlFor="telefone">Telefone:</label>
            <div>
              <input
                type="number"
                id="telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
        
            <br></br>

            <button type="submit" >Entrar</button>

            
          </form>

         
  )
}