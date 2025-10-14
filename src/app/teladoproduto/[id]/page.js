'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import style from "./page.module.css";

export default function ProdutoBlusa( ) {
  const {id} = useParams()
  const [produtos, setProdutos ] = useState(null)
  const [cor, setCor] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [quantidade, setQuantidade] = useState(1)

  const route = useRouter()

  useEffect(() => {
  const fetchProduto = async () => {
    const res = await fetch(`/api/produto/${id}`)
    if (!res.ok) {
      console.error("Erro ao buscar produto:", res.status)
      return
    }
    const produtoEncontrado = await res.json() 
    setProdutos(produtoEncontrado)

    if (produtoEncontrado) {
      setCor(produtoEncontrado.cores?.[0] ?? '')
      setTamanho(produtoEncontrado.tamanhos?.[0] ?? '')
    }
  }
  fetchProduto()
}, [id])


  if (!produtos) return <p> carregando...</p>

  const adicionarAoCarrinho = async () => {
    try {
      const response = await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtos, cor, tamanho, quantidade })

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
            <img src={produtos.imagem_url} alt={produtos.nome} width={200} />
          </div>

          <div className={style.produtoInfo}>
            <h2>{produtos.nome}</h2>
            <p><strong>R$ {produtos.preco}</strong></p>

            <div className={style.opcoes}>
          
              {produtos.tipo !== 'perfume' && produtos.cores && produtos.cores.length > 0 && (
                <div className={style.campo}>
                  <span>Cor:</span>
                  {(produtos.cores || []).map(c => (
                    <button
                      key={c}
                      onClick={() => setCor(c)}
                      aria-pressed={cor === c}
                      className={cor === c ? style.colorSelected : style.colorButton}
                      title={c}
                      style={{ backgroundColor: c, color:"#d588e3" }}
                    >{c}</button>
                  ))}
                </div>
              )}

              {/* Exibir opções de tamanho somente quando existirem e quando o produto não for perfume */}
              {produtos.tipo !== 'perfume' && produtos.tamanhos && produtos.tamanhos.length > 0 && (
                <div className={style.campo}>
                  <span>Tamanho:</span>
                  {(produtos.tamanhos || []).map(t => (
                    <button
                      key={t}
                      className={`${style.tamanhoOpcao} ${tamanho === t ? style.tamanhoSelected : ''}`}
                      onClick={() => setTamanho(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

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
