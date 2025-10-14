import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request, {params}) {
    try {
        const {cadastroId}= params;

        const client = await pool.connect( )
        const result = await client.query(
        `SELECT p.nome, c.quantidade from item_carrinho i join produtos p ON (p.id = i.id_produto) WHERE i.cadastro_id = $1`
        [cadastroId]
          );
          client.release()
          return NextResponse.json(result.rows)
        } catch(error) {
           console.error('Erro listando clientes:', error)
           return NextResponse.json({error: 'internal server error '}, {status: 500}) 
        }
}

export async function POST(request) {
    let client 
    try {
        const { id_cadastro, id_produtos, quantidade, data_adicao} = await request.json()

        if(!id_cadastro) {
            return NextResponse.json(
                {error: "cadastro_id é obrigatório"},
                {status: 400}
            )
        }
        client = await pool.connect()
       await client.query(
        `INSERT INTO item_carrinho (id_produto, cadastro_id, quantidade, data_adicao)
         VALUES ($1, $2, $3, $4)`, 
        [id_produtos, id_cadastro, quantidade, data_adicao]
);  
        return NextResponse.json({message: "Produto adicionado com sucesso "}, {status: 201} )
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho", error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    } finally {
        if (client) client.release()
    }
}
