
const soap = require('strong-soap').soap

describe('Strong SOAP  Tests', () => {

  it('should test Strong SOAP',  () => {
    const serverURL = 'http://localhost:2347/stockquote?WSDL'

    var options = {};
    soap.createClient(serverURL, options, function(err, client) {
      var method = client['StockQuote']['StockQuoteSoap']['GetQuote'];
      method(requestArgs, function(err, result, envelope, soapHeader) {
        //response envelope
        console.log('Response Envelope: \n' + envelope);
        //'result' is the response body
        console.log('Result: \n' + JSON.stringify(result));
      });
    });
  })
})
