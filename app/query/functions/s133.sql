drop function s133;

create function s133(euuid uuid,query_offset int) 

 returns jsonb as $$

    var sessions         = 'select * from sessions where uuid=$1'
    var json_sessions    = plv8.execute(sessions,[euuid]); 
    var users            = json_sessions[0].users;
    var me               = "CASE WHEN p.users = $1 THEN true else false END as me"

    var query = ' select';
        query+= ' p.id,';
        query+= ' p.category,';
        query+= ' p.medicos,';
        query+= ' p.pacientes,';
        query+= ' p.label,';
        query+= ' p.a,';
        query+= ' p.d,';
        query+= ' p.files,';
        query+= ' p.created_at,';
        query+= ' p.update,';
        query+= ' p.users,';
        query+=  me+',';
        query+= ' c.label as categorylabel';

        query+= ' from prontuarios  p'
        query+= ' join users        u on (p.users=u.id)'
        query+= ' join category     c on (p.category=c.id)'

        query+= ' where (p.users = $1 or $1 = ANY(p.share)) and p.d=false and p.a=true order by p.update desc,p.created_at desc'
        query+= ' limit 30 offset $2';

        var jsonProntuarios = plv8.execute(query,[users,query_offset]);

        Object.entries(jsonProntuarios).forEach(([key, value]) => {

            var query = 'select id,filename,key from files where anexos=$1';
            var j = plv8.execute(query,[value.files]); 

            jsonProntuarios[key].files = j;

        });
    
        Object.entries(jsonProntuarios).forEach(([key, value]) => {

            var query = 'select id,label,telefone,whatsapp,cidade,estado,nascimento,email,rua,numero,complemento,bairro,cpf,identidade from users where id=$1';
            var j = plv8.execute(query,[value.pacientes]); 

            jsonProntuarios[key].jsonpacientes = j[0];

        });

        Object.entries(jsonProntuarios).forEach(([key, value]) => {

            var query = 'select id,label from users where id=$1';
            var j = plv8.execute(query,[value.users]); 

            jsonProntuarios[key].users = j[0];

        });

        Object.entries(jsonProntuarios).forEach(([key, value]) => {

            var query = 'select id,label from users where id=$1';
            var j = plv8.execute(query,[value.medicos]); 

            jsonProntuarios[key].jsonmedicos = j[0];

        });



     json = {'page':jsonProntuarios};

return json;
 
$$ language plv8;

