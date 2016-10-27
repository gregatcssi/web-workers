import { Component, getPlatform } from '@angular/core';
import { WorkerService } from './worker-service.js';
import { NgModule } from '@angular/core';
import { WorkerAppModule } from '@angular/platform-webworker';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

// const FACTORIAL_CHANNEL = "FACTORIAL";

// import { UiArguments, FnArg, PRIMITIVE, ClientMessageBrokerFactory, ClientMessageBroker } from '@angular/platform-webworker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app',
  //templateUrl: './web-worker-app.html',
  template: '<div>loaded</div>'
})
class Worker {
  // res: number;
  // val: number = 100;
  // broker: ClientMessageBroker;
  // brokerFactory: ClientMessageBrokerFactory;


  constructor(private _workerService: WorkerService) {
    // var ref = getPlatform();
    // this.brokerFactory = ref.injector.get("ClientMessageBrokerFactory");
    // this.broker = this.brokerFactory.createMessageBroker(FACTORIAL_CHANNEL, false);
  }
  // calculate_factorial($event) {
  //   var args = new UiArguments("factorial");
  //   args.method = "factorial2";
  //   var fnArg = new FnArg(this.val, PRIMITIVE);
  //   fnArg.value = this.val;
  //   fnArg.type = PRIMITIVE;
  //   args.args = [fnArg];

  //   this.broker.runOnService(args, PRIMITIVE)
  //     .then((res: string) => {
  //       var val = Number.parseInt(res);
  //       this.res = val;
  //     });

  // }
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