'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import style from "./page.module.css";

export default function ProdutoBlusa({params}) {
  const {id} = params
  const [produtos, setProdutos ] = useState(null)
  const [cor, setCor] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [quantidade, setQuantidade] = useState(1)

  const route = useRouter()

  useEffect(() => {
    const fetchProduto = async () => {
      const res = await fetch(`/api/produto/${id}`)
      const data = await res.json()
      setProdutos(data)
      setCor(data.cores[0])
      setTamanho(data.tamanhos[0])
    }
    fetchProduto()
  }, [id])

  if (!produto) return <p> carregando 

  </p>

  const adicionarAoCarrinho = async () => {
    try {
      const response = await fetch('/api/carrinho/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto, cor, tamanho, quantidade })
        
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
        <img src={produto.imagem} alt="produto.nome" width={200} />
      </div>

      <div className={style.produtoInfo}>
        <h2>Blusa Manga Longa</h2>
        <p><strong>R$ 30,00</strong></p>

        <div className={style.opcoes}>
          <div className={style.campo}>
            <span>Cor:</span>
            {produto.cores.map(c => (
              <button 
              key={c}
              onClick={() => setCor(c)}
              style={{ backgroundColor: '#000000ff' }}
            ></button>
            ))}
          </div>


          <div className={style.campo}>
            <span>Tamanho:</span>
            {produto.tamanhos.map(t => (
              <button 
                
                className={`${style.tamanhoOpcao}`} 
                onClick={() => setTamanho()}
              >
                {}
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
