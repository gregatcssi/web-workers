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
  constructor(private _workerService: WorkerService) { }
  calculate_factorial($event) {
    var resol = this._workerService.calculate(this.val.toString());
    resol.then((ret) => { this.res = ret });
  }
  calculate_factorial2($event) {
    var resol = this._workerService.calculate2(this.val.toString());
    resol.then((ret) => { this.res = ret });
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