const { createClient } = require("@supabase/supabase-js");

var connSupa = function () {

  return createClient(process.env['URL'],process.env['anom_key'])

};
 
module.exports = function () {

  return connSupa;

};