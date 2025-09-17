'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import style from './page.module.css'


export default function ClienteLogin () {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const route = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/autenticacao/criarconta' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })

            if (response.ok) {
                const data = await response.json()
                const id = data.id
                route.push(`/`)
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
        <div className={style.container}>
        <div className={style.logo}>
            <img src="/logo da loja.png" alt="J&G" width={100} height={100} />
        </div>
        </div>

        <h1 className={style.h1}>Iniciar Sessão</h1>
        <p className={style.h2}>Acompanhe os seus pedidos em um só lugar!</p>
        <br />

        <form onSubmit={handleLogin}>
            <div className={style.box}>
                <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                
            />

            <label htmlFor="senha">Senha:</label>
             <input
              className={style.password}
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
             
            />

            <button className={style.entrar} type="submit">
                 Iniciar Sessão
            </button>
         </div>
    </form>
</div>
  )
}
