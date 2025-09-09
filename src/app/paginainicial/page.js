'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation' 
import style from './page.module.css'



export default function ClienteProdutos() {
  const [barra] = useState('')
  const [menuSuperior] = useState('')
  const [menuDeCategorias] = useState('')
  const [carrinho] = useState('')
  const [promocao] = useState('')
  const [produtos] = useState('')
  const [pagamento] = useState('')
  const [contato] = useState('')

  const route = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/autenticacao/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barra, menuSuperior, menuDeCategorias, carrinho, promocao, produtos, pagamento, contato })
      })

      if (response.ok) {
        const data = await response.json()
        const id = data.id
        route.push(`/perfil/${id}`)
      } else {
        const errorData = await response.json()
        alert(`Erro ao fazer compra: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao fazer compra:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <div>
    <a href= "paginainicial" className={style.outrapagina}></a>
            
      <header className={style.header}>
        <img src= "logo da loja.png" alt="" width={100}/>
        <header className={style.header1}>
        <img src= "iconperfil.png.png" alt="" width={50}/>
        <header className={style.header2}>
        <img src= "carrinho.png.png" alt="" width={70}/>
        </header>
        </header>
      </header>
       <section></section>
        <nav className={style.nav}>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Roupas Femininas</a></li>
            <li><a href="#">Infantil</a></li>
            <li><a href="#">Roupas Masculinas</a></li>
            <li><a href="#">Cosméticos</a></li>
          </ul>
        </nav>
        <div className={style.search}>
          <input type="text" placeholder="" />
        </div>


      <section className={style.promocao}>
        <h1>PROMOÇÃO <br></br> DO DIA</h1>
        <section className={style.promocaonome}>
        <p>
          Perfume Ilía Secreto <br></br> Feminino 50 ml <br></br> De: R$ 185,00 <br></br> Por: R$ 140,00
        </p>
        <div className={style.promoimg}>
          <img src="ilia.png" alt="" />

        </div>
        </section>
      </section>

      <section className={style.produtos}>
        <div className={style.produtoscards}>
          <div className={style.produto}>
            <img src="blusamangalonga.png" alt="Blusa Manga Longa" width={200} />
            <p>Blusa Manga Longa</p>
            <span>R$ 34,99</span>
          </div>
          <div className={style.produto}>
            <img src="vestidoinfantilmidi.png" alt="Vestido Infantil Midi" width={200} />
            <p>Vestido Infantil Midi</p>
            <span>R$ 49,99</span>
          </div>
          <div className={style.produto}>
            <img src="calcacargojeans.png" alt="Calça Cargo Jeans" width={200} />
            <p>Calça Cargo Jeans</p>
            <span>R$ 99,99</span>
          </div>
          <div className={style.produto}>
            <img src="meiasunissex.png" alt="Meias Unissex" width={200}/>
            <p>Meias Unissex</p>
            <span>R$ 9,99</span>
          </div>
          <div className={style.produto}>
            <img src="semicropped.png" alt="Semi Cropped" width={200} />
            <p>Semi Cropped</p>
            <span>R$ 19,99</span>
          </div>
          <div className={style.produto}>
            <img src="colonialuna.png" alt="Deo Colônia Luna Feminino 75ml - Natura" width={200}/> 
            <p>Deo Colônia Luna <br></br> Feminino 75ml - Natura</p>
            <span>R$ 119,99</span>
          </div>
          <div className={style.produto}>
            <img src="petitattitude.png" alt="Petit Attitude Bee 50ml - Avon" width={200}/> 
            <p>Petit Attitude Bee <br></br> 50ml - Avon</p>
            <span>R$ 39,99</span>
          </div>
          <div className={style.produto}>
            <img src="parfumuna.png" alt="Deo Parfum Una Brilho 75ml - Natura" width={200}/> 
            <p>Deo Parfum Una Brilho <br></br> 75ml - Natura</p>
            <span>R$ 199,99</span>
          </div>
          <div className={style.produto}>
            <img src="coloniakaiak.png" alt="Kaiak Colônia Masculino 100ml - Natura" width={200}/> 
            <p>Kaiak Colônia <br></br> Masculino 100ml - Natura</p>
            <span>R$ 131,99</span>
          </div>
          <div className={style.produto}>
            <img src="coloniahomemsagaz.png" alt="Homem Sagaz 100ml - Natura" width={200}/> 
            <p>Homem Sagaz <br></br> 100ml - Natura</p>
            <span>R$ 131,99</span>
          </div>
        </div>
    </section>

      <footer className={style.footer}>
        <section className={style.rodape}>
        </section>
        <div>
        <img src= "" alt="" />
          <p>Formas de Pagamento</p>
          <p>
            Não encontrou o que procurava? <br></br> Fale Conosco. <br></br> (83) 987375521 <br></br> (83) 987680837
          </p>
          <p>Siga-nos no Instagram <br></br> @jg.modass18</p>
        </div>
      </footer>
    </div>
  )
}