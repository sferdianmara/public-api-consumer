import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CatFactApiResponse} from "../model/cat-fact-api-response";

@Injectable({
  providedIn: 'root'
})
export class CatFactApiService {
  private readonly API_URL = "https://catfact.ninja/fact";

  public constructor(private http: HttpClient) {
  }

  public getCatFact(): Observable<string> {
    return this.http.get<CatFactApiResponse>(this.API_URL).pipe(
      map(response => response.fact)
    );
  }
}
