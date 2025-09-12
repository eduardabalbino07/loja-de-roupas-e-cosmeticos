import { useState } from 'react'
import style from "./styles.module.css"



export default function AutenticarForm ({onAddConsumidor}) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddConsumidor({nome, email, telefone, senha})
    setNome(''),
    setEmail(''),
    setTelefone(''),
    setSenha('')
  }

  return (
   <form onSubmit={handleSubmit}>

            
            <label className={style.name} htmlFor="nome">Nome:</label>
            <br></br>
            <input className={style.logar}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <br></br>
            <label className={style.email} htmlFor="email">Email:</label>
            <br></br>
              <input className={style.campoemail}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            <br></br>
            <label className={style.telefone} htmlFor="telefone">Telefone:</label>
            <br></br>
              <input className={style.campotelefone}
                type="number"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
          
            <br></br>
             <label className={style.senha} htmlFor="senha">Senha:</label>
            <br></br>
             <input className={style.camposenha}
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

             <br></br>
            <a href="novoLogin"> </a>
            <button className={style.button} type='submit'>
                
                Criar uma conta
            
        </button>
      
    </form>
  )

}