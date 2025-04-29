import db from "@/lib/db"
export default async () => {
    const usuario = await db.query("select * from usuario")
 return (<>
    <h1>Lista de alunos</h1>
    <div>
      {
         usuario.rows.map( 
            a => (
               <div>
                  <h2>{a.name}</h2>
               </div>
            ) 
         )
      }
   </div>
 </>);
}