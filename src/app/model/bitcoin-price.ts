export interface BitcoinPrice {
  timestamp: string;
  currencies: {
    code: string;
    description: string;
    value: number;
  }[];
}
