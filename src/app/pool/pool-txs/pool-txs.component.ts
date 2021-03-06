import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/_classes/transaction';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionIndexParams, TransactionService } from 'src/app/_services/transaction.service';

@Component({
  selector: 'app-pool-txs',
  templateUrl: './pool-txs.component.html',
  styleUrls: ['./pool-txs.component.scss']
})
export class PoolTxsComponent implements OnInit {

  offset: number;
  limit: number;
  transactions: Transaction[];
  totalCount: number;
  poolName: string;

  constructor(private route: ActivatedRoute, private transactionsService: TransactionService, private router: Router) {
    this.limit = this.transactionsService.limit;
  }

  ngOnInit(): void {

    this.route.parent.queryParamMap.subscribe( (params) => {

      const offset = params.get('offset');
      this.offset = offset ? +offset : 0;

    });

    this.route.parent.paramMap.subscribe( async (params) => {

      this.poolName = params.get('pool');
      this.getAssetTransactions();

    });

  }

  async getAssetTransactions() {

    const params: TransactionIndexParams = {
      offset: this.offset,
      asset: this.poolName
    };
    this.transactionsService.index(params).subscribe(
      (res) => {
        this.totalCount = res.count;
        this.transactions = res.txs;
      },
      (err) => console.error('err is: ', err)
    );
  }

  setPage(offset: number) {

    this.offset = offset;

    const queryParams: Params = { offset: String(this.offset)};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );
    this.getAssetTransactions();

  }

  getLastPageOffset(): number {
    return Math.floor(this.totalCount / this.limit) * this.limit;
  }

}
