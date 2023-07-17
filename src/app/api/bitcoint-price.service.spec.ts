import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {BitcoinPriceService} from "./bitcoin-price.service";
import {BitcoinPriceMock} from "./spec-mocks/bitcoin-price.mock";

describe('BitcoinPriceService', () => {
  let bitcoinService: BitcoinPriceService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    }).compileComponents();
    bitcoinService = TestBed.inject(BitcoinPriceService);
    http = TestBed.inject(HttpClient);
  });

  it('should create an instance', () => {
    expect(bitcoinService).toBeTruthy();
  });

  it('should map the response correctly', (done) => {
    spyOn(http, 'get').and.returnValue(of(BitcoinPriceMock.response));
    bitcoinService.getBitcoinPrice().subscribe(response => {
      expect(response).toEqual(BitcoinPriceMock.bitcoinPrice);
      done();
    })
  });
});
