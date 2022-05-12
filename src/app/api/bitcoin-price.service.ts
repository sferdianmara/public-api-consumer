import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BitcoinPrice} from "../model/bitcoin-price";
import {BitcoinPriceApiResponse} from "../model/bitcoin-price-api-response";

@Injectable({
  providedIn: 'root'
})
export class BitcoinPriceService {
  private readonly API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

  public constructor(private http: HttpClient) {
  }

  public getBitcoinPrice(): Observable<BitcoinPrice> {
    return this.http.get<BitcoinPriceApiResponse>(this.API_URL).pipe(
      map(response => {
        const res: BitcoinPrice = {currencies: [], timestamp: response.time.updatedISO};
        const currencyObj = response.bpi;
        for (const prop in currencyObj) {
          const currencyData = currencyObj[prop];
          if (currencyObj.hasOwnProperty(prop)) {
            res.currencies.push({
              code: currencyData.code,
              description: currencyData.description,
              value: currencyData.rate_float
            });
          }
        }
        return res;
      })
    );
  }
}
