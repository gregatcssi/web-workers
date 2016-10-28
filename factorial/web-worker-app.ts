import { Component } from '@angular/core';
import { WorkerService } from './worker-service.js';
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
  leftPosition: string = this.val.toString() + 'px';
  constructor(private _workerService: WorkerService) { }
  calculate_factorial($event) {
    try {
      var resol = this._workerService.calculate(this.val.toString());
      resol.then((ret) => { if (isFinite(ret)) { this.res = ret } else { this.res = 12345; } });
    } catch (ex) {
      console.log(ex);

    }
  }
  calculate_factorial2($event) {
    try {
      var resol = this._workerService.calculate2(this.val.toString());
      resol.then((ret) => { if (isFinite(ret)) { this.res = ret } else { this.res = 12345; } });
    } catch (ex) {
      console.log(ex);

    }
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