import db from "@/lib/db"
export default async () => {
    const usuario = await db.query("select * from usuario")
    return (<>
    <h1> Lista de Cadrastro </h1>
    <div>
        {
            usuario.rows.map(
                c => (
                    <div>
                        {c.nome} 
                   </div>
                )
            )
        }
    </div>
 </>);
}


   // return <>
     //   <div><input type="checkbox"></input> Blusas</div>
       // <div><input type="checkbox"></input> Perfumes</div> 
       // <input type="datetime-local"></input>