System.register(['@angular/core', './worker-service.js', '@angular/platform-webworker', '@angular/platform-webworker-dynamic', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, worker_service_js_1, core_2, platform_webworker_1, platform_webworker_dynamic_1, forms_1;
    var FACTORIAL_CHANNEL, Worker, WorkerModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (worker_service_js_1_1) {
                worker_service_js_1 = worker_service_js_1_1;
            },
            function (platform_webworker_1_1) {
                platform_webworker_1 = platform_webworker_1_1;
            },
            function (platform_webworker_dynamic_1_1) {
                platform_webworker_dynamic_1 = platform_webworker_dynamic_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            FACTORIAL_CHANNEL = "FACTORIAL";
            Worker = (function () {
                function Worker(_workerService) {
                    this._workerService = _workerService;
                    this.val = 100;
                }
                Worker.prototype.calculate_factorial = function ($event) {
                    var _this = this;
                    var resol = this._workerService.calculate(this.val.toString());
                    resol.then(function (ret) { _this.res = ret; });
                };
                Worker.prototype.calculate_factorial2 = function ($event) {
                    var _this = this;
                    var resol = this._workerService.calculate2(this.val.toString());
                    resol.then(function (ret) { _this.res = ret; });
                };
                Worker = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: './web-worker-app.html'
                    }), 
                    __metadata('design:paramtypes', [worker_service_js_1.WorkerService])
                ], Worker);
                return Worker;
            }());
            WorkerModule = (function () {
                function WorkerModule() {
                }
                WorkerModule = __decorate([
                    core_2.NgModule({
                        imports: [platform_webworker_1.WorkerAppModule, forms_1.FormsModule],
                        bootstrap: [Worker],
                        declarations: [Worker],
                        providers: [worker_service_js_1.WorkerService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], WorkerModule);
                return WorkerModule;
            }());
            platform_webworker_dynamic_1.platformWorkerAppDynamic().bootstrapModule(WorkerModule);
        }
    }
});
//# sourceMappingURL=web-worker-app.js.map