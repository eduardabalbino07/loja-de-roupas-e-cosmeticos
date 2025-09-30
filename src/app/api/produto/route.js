import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM produto')
    client.release()
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Erro listando produtos:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const {nome, email, telefone} = await request.json()
    const client = await pool.connect()
    await client.query(
      'INSERT INTO cadastro (nome, email, telefone) VALUES ($1, $2, $3)',      
      [nome, email, telefone]
    )
    client.release()
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error('Error adding aluno:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}