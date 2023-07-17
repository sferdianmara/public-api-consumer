import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CatFactApiService} from "./api/cat-fact-api.service";
import {firstValueFrom, Observable, of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";

export class MockCatFactApiService {
  public getCatFact(): Observable<string> {
    return of('Cats!!');
  }
}

describe('AppComponent', () => {

  let catFactService: MockCatFactApiService;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: CatFactApiService, useClass: MockCatFactApiService}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    catFactService = TestBed.inject(CatFactApiService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'public-api-consumer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('public-api-consumer');
  });

  it('should request new cat fact', async () => {
    component.catFact = 'Cats are gods.';
    component.onClickGetCatFact();
    await firstValueFrom(catFactService.getCatFact());
    expect(component.catFact).toEqual('Cats!!');
  });

});
