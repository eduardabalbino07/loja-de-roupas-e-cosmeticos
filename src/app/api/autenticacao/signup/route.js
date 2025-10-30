import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs";
import pool from "@/lib/db"


export async function POST(request) {
  try {
    const { nome, email, telefone, senha, role = "cliente" } = await request.json();


    if (!nome || !email || !telefone || !senha) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const client = await pool.connect()

    const existe = await client.query(
      "SELECT id FROM cadastro WHERE email = $1",
      [email]
    );
    if (existe.rowCount > 0) {
      client.release();
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const result = await client.query(
      'insert into cadastro (nome, email, telefone, senha) values ($1, $2, $3, $4) returning id',
      [nome, email, telefone, senhaHash]
    )

    client.release()

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error('Error ao logar consumidor:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}