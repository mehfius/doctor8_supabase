module.exports = function(app){

  app.get('/upload', function(req,res){

    var connection = app.config.supa();

    const main = async function (){

      const { data, error } = await connection.storage.getBucket('testes');
      console.log(data);
      console.log(error);
      res.send("Criado");
      
    }

    main();

  });

};