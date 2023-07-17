import {BitcoinPriceApiResponse} from "../../model/bitcoin-price-api-response";
import {BitcoinPrice} from "../../model/bitcoin-price";

export class BitcoinPriceMock {
  public static get response(): BitcoinPriceApiResponse {
    return {
      "time": {
        "updated": "Jul 17, 2023 11:53:00 UTC",
        "updatedISO": "2023-07-17T11:53:00+00:00",
        "updateduk": "Jul 17, 2023 at 12:53 BST"
      },
      "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
      "chartName": "Bitcoin",
      "bpi": {
        "USD": {
          "code": "USD",
          "symbol": "&#36;",
          "rate": "30,193.3666",
          "description": "United States Dollar",
          "rate_float": 30193.3666
        },
        "GBP": {
          "code": "GBP",
          "symbol": "&pound;",
          "rate": "25,229.3356",
          "description": "British Pound Sterling",
          "rate_float": 25229.3356
        },
        "EUR": {
          "code": "EUR",
          "symbol": "&euro;",
          "rate": "29,412.7473",
          "description": "Euro",
          "rate_float": 29412.7473
        }
      }
    };
  }

  public static get bitcoinPrice(): BitcoinPrice {
    return {
      currencies: [
        {code: 'USD', description: 'United States Dollar', value: 30193.3666},
        {code: 'GBP', description: 'British Pound Sterling', value: 25229.3356},
        {code: 'EUR', description: 'Euro', value: 29412.7473}
      ],
      timestamp: "2023-07-17T11:53:00+00:00"
    };
  }
}
