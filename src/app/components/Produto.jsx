import Link from 'next/link';
import style from './Produto.module.css';

export default ({produto:{id, srcImage, alt, nome, preco}}) => (
    <div className={style.produto}>
        <Link href={`/teladoproduto/${id}`}>
            <img src={srcImage} alt={alt} width={200} />
            <p>{nome}</p>
            <span>{preco}</span>
        </Link>
    </div>
);

