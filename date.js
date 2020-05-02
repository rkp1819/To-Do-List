exports.getDate = function(){
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-IN',options);
}

exports.getDay = function(){
  const options = { weekday: 'long'};
  return new Date().toLocaleDateString('en-IN',options);
}
