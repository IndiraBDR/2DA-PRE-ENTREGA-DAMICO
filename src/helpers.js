import  Handlebars  from "handlebars";



Handlebars.registerHelper('isEmpty', function(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
});



module.exports = Handlebars;
 
