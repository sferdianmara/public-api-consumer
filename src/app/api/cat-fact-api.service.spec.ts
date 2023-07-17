import {TestBed} from '@angular/core/testing';
import {CatFactApiService} from "./cat-fact-api.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

describe('CatFactApiService', () => {
  let catFactService: CatFactApiService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [],
      providers: []
    }).compileComponents();
    catFactService = TestBed.inject(CatFactApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should instantiate service', () => {
    expect(catFactService).toBeTruthy();
  });

  it('should map response correctly', (done) => {
    spyOn(http, 'get').and.returnValue(of({ fact: 'Cats are nice', length: 13}));
    catFactService.getCatFact().subscribe(fact => {
      expect(fact).toBe('Cats are nice');
      done();
    });
  });

});
