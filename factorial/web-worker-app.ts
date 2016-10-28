import { Component } from '@angular/core';
import { WorkerService } from './worker-service.js';
import { ReturnedValues } from './returned-values.js';
import { NgModule } from '@angular/core';
import { WorkerAppModule } from '@angular/platform-webworker';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

const FACTORIAL_CHANNEL = "FACTORIAL";

import { UiArguments, FnArg, PRIMITIVE, ClientMessageBrokerFactory, ClientMessageBroker } from '@angular/platform-webworker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app',
  templateUrl: './web-worker-app.html'
})
class Worker {
  res: number;
  val: number = 100;
  originalAmount: number = 100;
  originalDollar: number = 10;
  currentValue: number = 100;
  perc: number = .0725;
  years: number = 500000;
  constructor(private _workerService: WorkerService) { }
  calculate_factorial($event) {
    try {
      var resol = this._workerService.calculate(this.val.toString());
      resol.then((ret) => { if (isFinite(ret)) { this.res = ret } else { this.res = 12345; } });
    } catch (ex) {
      console.log(ex);
      console.log('fact 1');
      this.runTest();

    }
  }
  calculate_factorial2($event) {
    try {
      var resol = this._workerService.calculate2(this.val.toString());
      resol.then((ret) => { if (isFinite(ret)) { this.res = ret } else { this.res = 12345; } });
    } catch (ex) {
      console.log(ex);
      console.log('fact 2');
      this.runTest();

    }
  }
  runTest() {
    let temp: ReturnedValues = new ReturnedValues();
    temp.originalAmount = this.originalAmount;
    temp.originalDollar = this.originalDollar;
    temp.currentValue = this.currentValue;
    let wefAttack: ReturnedValues = new ReturnedValues();
    wefAttack.originalAmount = 100;
    wefAttack.currentValue = 100;
    wefAttack.additionalPercent = .15;
    var starttime = Date.now();

    let orig = <number>100.00;


    for (let i = 0; i < this.years; i++) {

      if ((i % 6 === 0) && i >= 3) {

        temp = this._workerService.CurrentValuePercentCalculation(temp.currentValue, temp.currentValue, <number>.10, true);
        let cont = temp.originalAmount.toString() + ': ' + temp.originalDollar.toString()
          + ' : ' + temp.delta.toString() + ' : ' + temp.currentValue.toString() + '   ';
        //console.log();
        //console.log('Ass Added:  ' + cont);
        //console.log();
      }


      if ((i % 12 === 0) && i > 3) {
        if (wefAttack.currentValue > 0) {

          wefAttack = this._workerService.CurrentValuePercentCalculation(wefAttack.currentValue,
            temp.currentValue, <number>wefAttack.additionalPercent, false);
          wefAttack.additionalPercent = <number>.15;
          //console.log('attack');
          temp = this._workerService.CurrentValuePercentCalculation(temp.currentValue, temp.currentValue, <number>wefAttack.additionalPercent, false);
          let cont = (
            temp.originalAmount.toString() + ' : ' +
            temp.originalDollar.toString() + ' : ' + temp.delta.toString() + ' : ' + temp.currentValue.toString());
          let conw = wefAttack.originalAmount.toString() + ': ' +
            wefAttack.originalDollar.toString() + '  :  ' +
            wefAttack.delta.toString() + ' : ' +
            wefAttack.currentValue.toString() + '  : ' +
            wefAttack.negativeOverFlowAmount.toString();
          //console.log();
          //console.log('Ass:  ' + cont);
          //console.log('WEF:  ' + conw);
          if (wefAttack.negativeOverFlowAmount > 0) {
            temp = this._workerService.CurrentValueDollarCalculation(temp.currentValue, wefAttack.negativeOverFlowAmount, true);
            //console.log();
            //console.log('Adjusted after overflow from Wef attack');
            //console.log(
            // temp.originalAmount.toString() + ' : ' +
            // temp.originalDollar.toString() + ' : ' +
            // temp.delta.toString() + ' : ' +
            // temp.currentValue.toString());
            // console.log();
          }
        }
      }
      temp = this._workerService.CurrentValuePercentCalculation(temp.currentValue, temp.currentValue, this.perc, true);
      // let con = temp.originalAmount.toString() + ' :  ' +
      //   temp.originalDollar.toString() + '  :  ' +
      //   temp.delta.toString() + '  :  ' +
      //   temp.currentValue.toString() + '   ';

      // console.log(con);
    }
    var endtime = Date.now();
    console.log(starttime);
    console.log(endtime);
    console.log('DONE!!!!!!!!!!!');



  }
}
@NgModule({
  imports: [WorkerAppModule, FormsModule],
  bootstrap: [Worker],
  declarations: [Worker],
  providers: [WorkerService]
})
class WorkerModule {
}

platformWorkerAppDynamic().bootstrapModule(WorkerModule);