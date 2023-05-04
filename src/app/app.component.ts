import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatFactApiService} from "./api/cat-fact-api.service";
import {BitcoinPrice} from "./model/bitcoin-price";
import {BitcoinPriceService} from "./api/bitcoin-price.service";
import {interval, map, mergeMap, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {GenderizeService} from "./api/genderize.service";
import {MyService} from "../my.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'public-api-consumer';

  public catFact: string;
  public bitcoinPrice: BitcoinPrice;
  public trend: boolean;
  public priceLoading = false;
  public genderizeNameInput: string = '';
  public genderizeNameEmitter = new Subject<string>();
  public nameGenderResult: string;

  private genderizeServiceSubscription: Subscription;
  private ngDestroyed$: Subject<void> = new Subject<void>();

  public constructor(private catFactApiService: CatFactApiService,
                     private bitcoinPriceService: BitcoinPriceService,
                     private genderizeService: GenderizeService,
                     private myService: MyService) {
  }

  public ngOnInit() {
    interval(20000).pipe(
      takeUntil(this.ngDestroyed$)
    ).subscribe(() => this.getCatFact());
    interval(60000).pipe(
      takeUntil(this.ngDestroyed$)
    ).subscribe(() => this.getBitcoinPrice());
    this.getCatFact();
    this.getBitcoinPrice();
    // with subscription

    // this.genderizeServiceSubscription = this.genderizeNameEmitter.pipe(
    //   mergeMap(name => this.genderizeService.getGenderPrediction(name))
    // ).subscribe(gender => this.nameGenderResult = gender);

    // with takeUntil
    this.genderizeNameEmitter.pipe(
      takeUntil(this.ngDestroyed$),
      switchMap(name => this.genderizeService.getGenderPrediction(name))
    ).subscribe(gender => this.nameGenderResult = gender);

    // an ugly example with nested subscribe; to avoid this, we use unpack operators
    // (mergeMap, switchMap, concatMap, etc) depending on the case

    //   this.genderizeNameEmitter.pipe(
    //     map(name => this.genderizeService.getGenderPrediction(name))
    //   ).subscribe(result => result.subscribe(gender => this.nameGenderResult = gender));

    this.myService.loadUser(['Ana', 'Marius', 'Bob', 'Cristi', 'Maria']).subscribe(res => console.log(res));
  }

  public ngOnDestroy() {
    // with subscription

    // if (this.genderizeServiceSubscription) {
    //   this.genderizeServiceSubscription.unsubscribe();
    // }

    // with takeUntil
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  public getCatFact() {
    this.catFact = undefined;
    this.catFactApiService.getCatFact().pipe(
    ).subscribe((fact) => {
      this.catFact = fact;
    });
  }

  public onClickGetCatFact() {
     // TODO 2: Does this work? Why / why not?
     this.getCatFact();
  }

  public getBitcoinPrice() {
    this.priceLoading = true;
    this.bitcoinPriceService.getBitcoinPrice().subscribe(price => {
      if (this.bitcoinPrice && (price.currencies[0].value > this.bitcoinPrice.currencies[0].value)) {
        this.trend = true;
      }
      this.trend = (this.bitcoinPrice && price.timestamp !== this.bitcoinPrice.timestamp) ? (price.currencies[0].value > this.bitcoinPrice.currencies[0].value) : undefined;
      this.bitcoinPrice = price;
      this.priceLoading = false;
    });
  }
}
