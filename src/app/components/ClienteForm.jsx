import { useState }  from 'react'

export default function ClienteForm({ onAddCliente }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState ('')
    const [endereco, setEndereco] = useStage ('')
    const [senha, setSenha] = useStage ('')
    const [concluido, setConcluido] = useStage (false)

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddCliente({ name, email, telefone, endereco, senha })
        setName('')
        setEmail('')
        setTelefone('')
        setEndereco('')
        setSenha('')
        setConcluido(false)
    }

    return (
        <form onSubmit={handleSubmit}>  
         
        <input
            type= "text"
            placeholder="Nome do Usuario"
            value={name}
            onCharge={(e) => setName(e.target.value)}
        />

        <input
            type= "text"
            placeholder="Email do Usuario"
            value={email}
            onCharge= {(e) => setEmail(e.target.value)}
        />
            <input
            type= "number"
            placeholder= "Telefone do Usuario"
            value={telefone}
            onCharge= {(e) => setTelefone(e.target.value)}
        />
            <input
            type= "text"
            placeholder= "Endereco do Usuario"
            value= {endereco}
            onCharge= {(e) => setEndereco(e.target.value)}
        />
            <input
            type= "text"
            placeholder= "Senha do Usuario"
            value= {senha}
            onCharge= {(e) => setSenha(e.target.value)}
        />

         <input
         type="checkbox"
         checked={concluido}
         onChange={(e) => setConcluido(e.target.checked)}
         />

        <button type="submit">
           Criar uma Conta

        </button>
        
        </form>
    )

}