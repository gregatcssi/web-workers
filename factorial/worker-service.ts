import { Injectable } from '@angular/core';
const FACTORIAL_CHANNEL = "FACTORIAL";
import { ServiceMessageBrokerFactory, PRIMITIVE } from '@angular/platform-webworker';


@Injectable()
export class WorkerService {
  time: string;
  constructor(private _serviceBrokerFactory: ServiceMessageBrokerFactory) {
    var broker = _serviceBrokerFactory.createMessageBroker(FACTORIAL_CHANNEL, false);
    broker.registerMethod("factorial", [PRIMITIVE], this.calculate, PRIMITIVE);
    broker.registerMethod("factorial2", [PRIMITIVE], this.calculate2, PRIMITIVE);
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