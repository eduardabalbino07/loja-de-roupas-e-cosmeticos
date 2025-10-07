import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const produtoId = parseInt(id, 10);

    if (isNaN(produtoId)) {
      console.error('ID inválido:', id);
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const client = await pool.connect();
    
    
    try {
      const result = await client.query('SELECT * FROM produtos WHERE id = $1', [produtoId]);

      if (result.rows.length === 0) {
        console.log('Produto não encontrado para o ID:', produtoId);
        return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
      }

      return NextResponse.json(result.rows[0]);

    } catch (queryError) {
      console.error('Erro ao consultar o banco de dados:', queryError);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      
      client.release();
    }

  } catch (error) {
    console.error('Erro ao conectar com o banco de dados ou outro erro:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
