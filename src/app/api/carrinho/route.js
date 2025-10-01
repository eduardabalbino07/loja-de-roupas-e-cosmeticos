import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
    try {
        const {searchParams} = new URL (request.url)
        const usuarioId = searchParams.get('usuarioId')

        const client = await pool.connect( )
        const result = await client.query(
        `SELECT from p.produtos, p.nome, p.preco, p.quantidade, p.cor
        WHERE u.usuario_id = $1`
        [usuarioId]
          )
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
        const { nome, preco, quantidade, cor} = await request.json()

        if(!usuarioId) {
            return NextResponse.json(
                {error: "usuario_id é obrigatório"},
                {status: 400}
            )
        }
        client = await pool.connect()
        await client.query(
            `INSERT INTO adicionarCarrinho (produtos_id)
            VALUES $1 `, 
            [produtos_id]
        )
        return NextResponse.json({message: "Produto adicionado com sucesso "}, {status: 201} )
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho", error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    } finally {
        if (client) client.release()
    }
}
