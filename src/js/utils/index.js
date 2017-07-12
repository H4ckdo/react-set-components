module.exports.mapActions = function(response, textStatus, error) {
  const status =  this.request.status;
  const findCase = cases => cases.status.some(code => code === status);

  let successCase = this.responseCases.success.find(findCase);
  let failCase = this.responseCases.fails.find(findCase);
  if(successCase) return this.resolve({
    ...successCase,
    payload: response,
    modals: this.modals
  })

  if(failCase) return this.reject({
    ...failCase,
    error,
    modals: this.modals
  })
  return this.reject(this.responseCases.otherWise);
}//end mapActions

module.exports.validWord = (data = "") => {
  let result = /[A-Za-zñÑ0-9_]{3,10}/i.exec(data);
  if(result) return (result[0].length === data.length);
  return false;
}//end validWord

module.exports.validPassword = (data = "")=> ((data.length >= 6 || data.length <= 20) && !/(\W)/g.test(data));//end validPassword

module.exports.validText = (data = "")=> {
  let result = /[A-Za-zñÑ0-9_ ]{3,500}/i.exec(data);
  if(result) return (result[0].length === data.length);
  return false;
}//end validText
