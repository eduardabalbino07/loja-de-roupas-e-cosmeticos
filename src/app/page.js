'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import style from "./page.module.css";

export default function ClientesProdutos() {
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
      const response = await fetch('/api/autenticacao/criarconta' , {
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
       <a href="paginainicial" className={style.outrapagina}></a>

        <header className={style.header}>

          <img src="/logo da loja.png" alt="J&G" width={50} height={50} />

          <div className={style.pesquisar}>
            <input type="text" placeholder="" />
            <span className={style.imagempesquisa}>

              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          <div className={style.header1}>
            <button className={style.iconeBotao} aria-label="Carrinho">
              <img src="/carrinho.png.png" alt="" width={50} height={30} />
            </button>
            <button className={style.iconeBotao} aria-label="Perfil">
              <img src="/iconperfil.png.png" alt="" width={50} height={30} />
            </button>
          </div>
        </header>

        <nav className={style.nav}>
          <ul>
            <li><a className={style.active} href="#">Início</a></li>
            <li><a href="#">Roupas Femininas</a></li>
            <li><a href="#">Infantil</a></li>
            <li><a href="#">Roupas Masculinas</a></li>
            <li><a href="#">Cosméticos</a></li>
          </ul>
        </nav>


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
              <img src= "meiasunissex.png" alt="Meias Unissex" width={200} />
              <p>Meias Unissex</p>
              <span>R$ 9,99</span>
            </div>

            <div className={style.produto}>
              <img src= "semicropped.png" alt="Semi Cropped" width={200} />
              <p>Semi Cropped</p>
              <span>R$ 19,99</span>
            </div>

            <div className={style.produto}>
              <img src= "colonialuna.png" alt="Deo Colônia Luna Feminino 75ml - Natura" width={200} />
              <p>Deo Colônia Luna <br></br> Feminino 75ml - Natura</p>
              <span>R$ 119,99</span>
            </div>

            <div className={style.produto}>
              <img src="petitattitude.png" alt="Petit Attitude Bee 50 ml - Avon" width={200} />
              <p>Petit Attitude Bee <br></br> 50 ml - Avon</p>
              <span>R$ 39,99</span>
            </div>

            <div className={style.produto}>
              <img src= "parfumuna.png" alt="Deo Parfum Una Brilho 75ml - Natura" width={200} />
              <p>Deo Parfum Una Brilho<br></br> 75 ml - Natura</p>
              <span>R$ 199,99</span>
            </div>

            <div className={style.produto}>
              <img src="coloniakaiak.png" alt="Kaiak Colônia Masculino 100ml - Natura" width={200} />
              <p>Kaiak Colônia<br></br> Masculino 100ml - Natura</p>
              <span>R$ 131,99</span>
            </div>
          </div>

          <div className={style.produto}>
            <img src="coloniahomemsagaz.png" alt="Homem Sagaz 100ml - Natura" width={200} />
            <p>Homem Sagaz<br></br> 100ml - Natura</p>
            <span>R$ 131,99</span>
          </div>
        </section>
       

        <footer className={style.footer}>
        <div className={style.rodape}>
          <div>
            <p className={style.footerTitle}>FORMAS DE PAGAMENTO</p>
            <div className={style.footerIcons}>
              <img src="logopix.png.png" alt="PIX"/>
            </div>
          </div>

          <div>
            <p className={style.footerTitle}>NÂO ENCONTROU O QUE PROCURAVA?<br />FALE CONOSCO.</p>
            <div className={style.footerIcons}>
              <img src="logowhatsapp.png.png" alt=""/>
            <p><strong>(83) 987375521</strong></p>
            <p><strong>(83) 987680837</strong></p>
            </div>
          </div>

          <div>
            <p className={style.footerTitle}>SIGAM NOSSO INSTAGRAM</p>
            <div className={style.footerIcons}>
              <img src="logoinstagram.png.png" alt="Instagram"/>
              <span>@jg.modass18</span>
            </div>
           </div>
          </div>
        </footer>
      
      </div>
  )
}
    