import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {GenderizeApiResponse} from "../model/genderize-api-response";

@Injectable({
  providedIn: 'root'
})
export class GenderizeService {
  private readonly API_URL = "https://api.genderize.io";

  public constructor(private http: HttpClient) {
  }

  public getGenderPrediction(name: string): Observable<string> {
    // TODO 3: We're only interested in the 'gender' attribute. How can we produce this output?
    // Bonus: Add the correct return type of the function.
    return this.http.get<GenderizeApiResponse>(`${this.API_URL}?name=${name}`).pipe(
      map((res: GenderizeApiResponse) => res.gender)
    );
  }
}
