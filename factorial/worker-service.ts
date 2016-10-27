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

  private calculate(val: string) {
    if (val) {
      let result = factorial(parseInt(val));
      return Promise.resolve(result);
    }
    return Promise.resolve('');
  }

  private calculate2(val: string): any {
    if (val) {
      let result = factorial(parseInt(val));
      var val2 = Number.parseInt(result);
      return Promise.resolve(val2 * 2);
    }
    return Promise.resolve('');
  }
}

function factorial(num) {

  if (num === 0) {
    return 1;
  }
  else {
    return (num * factorial(num - 1));
  }
}