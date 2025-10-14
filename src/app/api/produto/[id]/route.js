import { NextResponse } from 'next/server'
import pool from "@/lib/db";
export async function GET(request, { params }) {
  // `params` pode ser um objeto síncrono ou uma Promise em alguns contextos.
  // Detectamos se é "thenable" e aguardamos somente se necessário.
  const resolvedParams = params && typeof params.then === 'function' ? await params : params;
  const { id } = resolvedParams || {};

  let client;

  try {
    const produtoId = parseInt(id, 10);

    if (isNaN(produtoId)) {
      console.error('ID inválido:', id);
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    client = await pool.connect();
    const result = await client.query('SELECT * FROM produtos WHERE id = $1', [produtoId]);
    const produto = result.rows[0];

    if (!produto) {
      console.log('Produto não encontrado para o ID:', produtoId);
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    if (produto.tipo === 'perfume') {
      delete produto.cores;
      delete produto.tamanhos;
    }

    return NextResponse.json(produto);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados ou outro erro:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      try {
        client.release();
      } catch (releaseError) {
        console.error('Erro ao liberar cliente do pool:', releaseError);
      }
    }
  }
}
