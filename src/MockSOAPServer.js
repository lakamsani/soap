

import fs from 'fs'
import path from 'path'
const soap = require('strong-soap').soap

const stockWsdlXML = fs.readFileSync(path.resolve(__dirname, './stockquote.wsdl'), 'utf8')

export class MockSOAPServer {
  constructor (server) {
    let soapServer = soap.listen(server, '/stockquote', stockService, stockWsdlXML)
    soapServer.log = function (type, data) {
      // type is 'received' or 'replied'
      console.log(`MockSOAPServer got request of : ${type} with data ${JSON.stringify(data)}`)
    }
  }
}


const stockService = {
  StockQuoteService: {
    StockQuotePort: {
      GetLastTradePrice: function(args, cb, soapHeader) {
        if (soapHeader)
          return {TradePrice: {price: soapHeader.SomeToken }};
        if (args.tickerSymbol === 'trigger error') {
          throw new Error('triggered server error');
        } else if (args.tickerSymbol === 'Async') {
          return cb({ TradePrice: {price: 19.56 }});
        } else if (args.tickerSymbol === 'SOAP Fault v1.2') {
          throw {
            Fault: {
              Code: {
                Value: "soap:Sender",
                Subcode: { value: "rpc:BadArguments" }
              },
              Reason: { Text: "Processing Error" }
            }
          };
        } else if (args.tickerSymbol === 'SOAP Fault v1.1') {
          throw {
            Fault: {
              faultcode: "soap:Client.BadArguments",
              faultstring: "Error while processing arguments"
            }
          };
        } else if (args.tickerSymbol === 'AAPL') {
          var jsonResponse = {TradePrice: {"price": "19.56"}};
          return jsonResponse;
        }
      },

      SetTradePrice: function(args, cb, soapHeader) {
      },

      IsValidPrice: function(args, cb, soapHeader, req) {
        lastReqAddress = req.connection.remoteAddress;

        var validationError = {
          Fault: {
            Code: {
              Value: "soap:Sender",
              Subcode: { value: "rpc:BadArguments" }
            },
            Reason: { Text: "Processing Error" },
            statusCode: 500
          }
        };

        var isValidPrice = function() {
          var price = args.price;
          if(isNaN(price) || (price === ' ')) {
            return cb(validationError);
          }

          price = parseInt(price, 10);
          var validPrice = (price > 0 && price < Math.pow(10, 5));
          return cb(null, { valid: validPrice });
        };

        setTimeout(isValidPrice, 10);
      }
    }
  }
}