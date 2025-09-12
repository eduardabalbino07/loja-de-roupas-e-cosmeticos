'use cliennt'
import {useState, useEffect} from 'react';
import style from './styles.module.css'

export default function ClienteList({ clientes = []}) {
    const[list, setList] = useState(clientes);

     useEffect(() => {
    setList(clientes);
     }, [clientes]);

       const toggleConcluido = (id) => {
        setList((prev) => prev.map((item) => item.cadastroid === id ? {...item, concluido: !item.concluido }: item))
       }

    return (
        <ul>
            {list.map((cadastro) => (
                <li key={cadastro.cadastro.id} >
                    <span>{cadastro.name} - {cadastro.emailid} - {cadastro.telefone} - {cadastro.senha} - {cadastro.concluido ? 'Concluído' : 'Pendente'}</span>
                     <form>
            <input className={style.check}
            type="checkbox"  
            checked={cadastro.concluido ?? false}
            onChange={() => toggleConcluido(cadastro.cadastroid)}
            style={{ marginLeft: '1600px'}}
          
          ></input>
          </form>
        <button style={{backgroundColor:"transparent", color:"#F00"}}
        onClick={() => onDeleteCliente(cadastro.id)}
     >
                    x
                    </button>
                </li>
            ))}

        </ul>
    )
}