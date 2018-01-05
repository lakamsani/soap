
const soap = require('strong-soap').soap

const {promisify} = require('util')

/*
 https://groups.google.com/forum/#!forum/loopbackjs
  https://gitter.im/strongloop/loopback
 */

describe('Strong SOAP  Tests', async () => {

  const serverURL = 'http://localhost:2347/stockquote?WSDL'
  const requestArgs = {symbol: 'IBM'}

  it('should test Strong SOAP Async',  async() => {
    jest.setTimeout(10000);
    const createClient = soap.createClient
    const createClientAsync = promisify(createClient)
    const client = await createClientAsync(serverURL)
    //const description = client.describe()
    //console.log(JSON.stringify(description.StockQuote.StockQuoteSoap.GetQuote));
    const method = client['StockQuote']['StockQuoteSoap']['GetQuote']

    const asyncMethod = promisify(method)
    const [result, envelope, soapHeader] = await asyncMethod(requestArgs)
    console.log('Response Envelope: \n' + envelope);
    //'result' is the response body
    console.log('Result: \n' + JSON.stringify(result));

  })

  it('should test Strong SOAP Callbacks',  done => {
    var options = {};
    soap.createClient(serverURL, options, function(err, client) {
      const description = client.describe()

      //expect(description.StockQuote).toBeDefined()
      //console.log(JSON.stringify(description.StockQuote.StockQuoteSoap.GetQuote));
      var method = client['StockQuote']['StockQuoteSoap']['GetQuote'];
      method(requestArgs, function(err, result, envelope, soapHeader) {
        //response envelope
        console.log('Response Envelope: \n' + envelope);
        //'result' is the response body
        console.log('Result: \n' + JSON.stringify(result));
        done()
      });
    });
  })
})
