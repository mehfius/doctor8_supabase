module.exports = function(app){

  app.get('/teste', function(req,res){

    var connection = app.config.supa();

    const main = async function (){

      //let { data, error } = await connection.from('suites').select(`id,label,url,suites_config(label,url)`).like('url',req.get('origin'));
      let { data, error } = await connection.from('suites').select(`id,label,url,suites_config(label,url)`).eq('id','1');
      console.log(data);

        res.send(data);

    }

    main();

  });

};