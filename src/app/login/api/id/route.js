import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const usuario = await pool.connect()
    await usuario.query('DELETE FROM conta WHERE id = $1', [id] )
    usuario.release()
    return NextResponse.json({ message: 'Usuario removido com sucesso' })
  } catch (error) {
    console.error('Erro removendo aluno:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}