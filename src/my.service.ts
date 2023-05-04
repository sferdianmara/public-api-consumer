import {Injectable} from '@angular/core';
import {mergeMap, Observable, of} from "rxjs";

// TODO 1: Exercise: what happens if we remove { providedIn: ... }?
@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor() {
  }

  public loadMockUserResponse(users: string[]): Observable<string> {
    return of(...users);
  }

  public loadMockUserDataResponse(name: string): Observable<string> {
    return of(`Loading data for ${name}`, `Successfully loaded data for ${name}`);
  }

  public loadUser(users: string[]): Observable<any> {
    // TODO 5: Load the user data for each user. What's the correct return type of this function?
    return this.loadMockUserResponse(users).pipe(
      mergeMap(name => this.loadMockUserDataResponse(name))
    );
  }
}
