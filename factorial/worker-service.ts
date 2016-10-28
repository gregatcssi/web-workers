import { Injectable, Type } from '@angular/core';
import { ReturnedValues } from './returned-values.js';
const FACTORIAL_CHANNEL = "FACTORIAL";
import { ServiceMessageBrokerFactory, PRIMITIVE } from '@angular/platform-webworker';


@Injectable()
export class WorkerService {
  time: string;
  constructor(private _serviceBrokerFactory: ServiceMessageBrokerFactory) {
    var broker = _serviceBrokerFactory.createMessageBroker(FACTORIAL_CHANNEL, false);
    broker.registerMethod("factorial", [PRIMITIVE], this.calculate, PRIMITIVE);
    broker.registerMethod("factorial2", [PRIMITIVE], this.calculate2, PRIMITIVE);

    broker.registerMethod("CurrentValueDollarCalculation", [PRIMITIVE], this.CurrentValueDollarCalculation, PRIMITIVE);
    broker.registerMethod("CurrentValuePercentCalculation", [PRIMITIVE], this.CurrentValuePercentCalculation, PRIMITIVE);
  }

  public calculate(val: string): Promise<number> {
    if (val) {
      let result = factorial(parseInt(val));
      return Promise.resolve(result);
    }
    return Promise.resolve(0);
  }

  public calculate2(val: string): Promise<number> {
    if (val) {
      let result = factorial(parseInt(val));
      var val2 = result / 2;
      return Promise.resolve(val2);
    }
    return Promise.resolve(0);
  }


  public CurrentValueDollarCalculation(
    originalAmount: number,
    dollarAmount: number,
    isPositive: boolean,
    additionalDollar?: number): ReturnedValues {
    if (typeof (additionalDollar) === 'undefined' || additionalDollar == null) {
      additionalDollar = 0;
    }
    let ret: ReturnedValues = new ReturnedValues();
    ret.originalAmount = originalAmount;
    ret.originalDollar = dollarAmount;
    ret.additionalDollar = additionalDollar;
    ret.delta = dollarAmount + <number>additionalDollar;
    if (isPositive) {
      ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) + Number.parseFloat(ret.delta.toString());
    } else {
      ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) - Number.parseFloat(ret.delta.toString());
      if (ret.currentValue < 0) {
        ret.negativeOverFlowAmount = Math.abs(ret.currentValue);
        ret.currentValue = 0;
      }
    }
    return ret;
  }



  public CurrentValuePercentCalculation(originalAmount: number,
    calculationDollarAmount: number,
    percentageAmount: number,
    isPositive: boolean,
    additionalDollar?: number,
    additionalPercent?: number): ReturnedValues {
    if (typeof (additionalDollar) === 'undefined' || additionalDollar === null) {
      additionalDollar = 0;
    }
    if (typeof (additionalPercent) === 'undefined' || additionalPercent === null) {
      additionalPercent = 1;
    }
    let ret: ReturnedValues = new ReturnedValues();
    ret.originalAmount = Number.parseFloat(originalAmount.toString());
    ret.originalDollar = ((<number>calculationDollarAmount) * (<number>percentageAmount));
    ret.additionalDollar = ((<number>additionalDollar) * (<number>additionalPercent));
    ret.delta = Number.parseFloat(ret.originalDollar.toString()) + Number.parseFloat(ret.additionalDollar.toString());
    if (isPositive) {
      ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) + Number.parseFloat(ret.delta.toString());
    } else {
      ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) - Number.parseFloat(ret.delta.toString());
      if (ret.currentValue < 0) {
        ret.negativeOverFlowAmount = Math.abs(ret.currentValue);
        ret.currentValue = 0;
      }
    }
    if (typeof (ret.negativeOverFlowAmount) === 'undefined' || ret.negativeOverFlowAmount === null) {
      ret.negativeOverFlowAmount = 0;
    }
    return ret;
  }

}


function factorial(num): number {

  if (num === 0) {
    return 1;
  }
  else {
    //setTimeout(function () {
    return (num * factorial(num - 1));
    // }, 100);

  }
}