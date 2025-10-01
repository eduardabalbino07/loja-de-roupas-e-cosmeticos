'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import style from "./page.module.css";

export default function ProdutoBlusa() {
  const [cor, setCor] = useState('Preto')
  const [tamanho, setTamanho] = useState('P')
  const [quantidade, setQuantidade] = useState(1)

  const route = useRouter()

  const adicionarAoCarrinho = async () => {
    try {
      const response = await fetch('/api/carrinho/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto: "Blusa Manga Longa", cor, tamanho, quantidade })
        
      })

      if (response.ok) {
        alert("Produto adicionado ao carrinho com sucesso!")
        route.push('/carrinho') 
      } else {
        const errorData = await response.json()
        alert(`Erro ao adicionar: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro de conexão com o servidor.")
    }
  }

  return (
  <header className={style.header}>

  

    <div className={style.pesquisar}>
    
     <div className={style.produtoPage}>
      <div className={style.produtoImagem}>
        <img src="/blusamangalonga.png" alt="Blusa Manga Longa" width={200} />
      </div>

      <div className={style.produtoInfo}>
        <h2>Blusa Manga Longa</h2>
        <p><strong>R$ 30,00</strong></p>

        <div className={style.opcoes}>
          <div className={style.campo}>
            <span>Cor:</span>
            <button 
              className={`${style.corOpcao} ${cor === 'Preto' ? style.selecionado : ''}`} 
              onClick={() => setCor('Preto')}
              style={{ backgroundColor: '#000000ff' }}
            ></button>
          </div>


          <div className={style.campo}>
            <span>Tamanho:</span>
            {['P','M','G'].map((t) => (
              <button 
                key={t} 
                className={`${style.tamanhoOpcao} ${tamanho === t ? style.selecionado : ''}`} 
                onClick={() => setTamanho(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className={style.campo}>
            <span>Quantidade:</span>
            <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => setQuantidade(q => q + 1)}>+</button>
          </div>
        </div>

        <button className={style.botaoCarrinho} onClick={adicionarAoCarrinho}>
          Adicionar ao carrinho 
        </button>
        </div>
       </div>
      </div>
      </header>

  )
}
