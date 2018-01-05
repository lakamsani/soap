
const soap = require('strong-soap').soap

const {promisify} = require('util')

describe('Strong SOAP  Tests', async () => {

  const serverURL = 'http://localhost:2347/stockquote?WSDL'

  it('should test Strong SOAP Async',  async() => {
    jest.setTimeout(10000);
    const createClient = soap.createClient
    const createClientAsync = promisify(createClient)
    const client = await createClientAsync(serverURL)
    const description = client.describe()
    console.log(JSON.stringify(description.StockQuote.StockQuoteSoap.GetQuote));

    const method = client['StockQuote']['StockQuoteSoap']['GetQuote']

    const requestArgs = {symbol: 'IBM'}

    /*
    method(requestArgs, function(err, result, envelope, soapHeader) {
      //response envelope
      console.log('Response Envelope: \n' + envelope);
      //'result' is the response body
      console.log('Result: \n' + JSON.stringify(result));
    });
    */


    const asyncMethod = promisify(method)
    const [result, envelope, soapHeader] = await asyncMethod(requestArgs)
    console.log('Response Envelope: \n' + envelope);
    //'result' is the response body
    console.log('Result: \n' + JSON.stringify(result));

  })

  it.skip('should test Strong SOAP Callbacks',  () => {
    var options = {};
    soap.createClient(serverURL, options, function(err, client) {
      const description = client.describe()
      console.log(JSON.stringify(description.StockQuote.StockQuoteSoap.GetQuote));
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
