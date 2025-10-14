'use client'
import {useState, useEffect} from 'react';
import style from './styles.module.css'

export default function ClienteList({ clientes = [], onDeleteCliente, onToggle }) {
    const [list, setList] = useState(clientes || []);

    useEffect(() => {
        setList(clientes || []);
    }, [clientes]);

    const toggleConcluido = (id) => {
        setList((prev) => (prev || []).map((item) => item.cadastroid === id ? { ...item, concluido: !item.concluido } : item))
        if (typeof onToggle === 'function') onToggle(id);
    }

    return (
        <ul>
            {(list || []).map((cadastro) => (
                <li key={cadastro.cadastroid ?? cadastro.id} >
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
        onClick={() => typeof onDeleteCliente === 'function' ? onDeleteCliente(cadastro.id ?? cadastro.cadastroid) : null}
     >
                    x
                    </button>
                </li>
            ))}

        </ul>
    )
}