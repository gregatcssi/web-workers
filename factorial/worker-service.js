System.register(['@angular/core', './returned-values.js', '@angular/platform-webworker'], function(exports_1, context_1) {
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
    var core_1, returned_values_js_1, platform_webworker_1;
    var FACTORIAL_CHANNEL, WorkerService;
    function factorial(num) {
        if (num === 0) {
            return 1;
        }
        else {
            //setTimeout(function () {
            return (num * factorial(num - 1));
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (returned_values_js_1_1) {
                returned_values_js_1 = returned_values_js_1_1;
            },
            function (platform_webworker_1_1) {
                platform_webworker_1 = platform_webworker_1_1;
            }],
        execute: function() {
            FACTORIAL_CHANNEL = "FACTORIAL";
            WorkerService = (function () {
                function WorkerService(_serviceBrokerFactory) {
                    this._serviceBrokerFactory = _serviceBrokerFactory;
                    var broker = _serviceBrokerFactory.createMessageBroker(FACTORIAL_CHANNEL, false);
                    broker.registerMethod("factorial", [platform_webworker_1.PRIMITIVE], this.calculate, platform_webworker_1.PRIMITIVE);
                    broker.registerMethod("factorial2", [platform_webworker_1.PRIMITIVE], this.calculate2, platform_webworker_1.PRIMITIVE);
                    broker.registerMethod("CurrentValueDollarCalculation", [platform_webworker_1.PRIMITIVE], this.CurrentValueDollarCalculation, platform_webworker_1.PRIMITIVE);
                    broker.registerMethod("CurrentValuePercentCalculation", [platform_webworker_1.PRIMITIVE], this.CurrentValuePercentCalculation, platform_webworker_1.PRIMITIVE);
                }
                WorkerService.prototype.calculate = function (val) {
                    if (val) {
                        var result = factorial(parseInt(val));
                        return Promise.resolve(result);
                    }
                    return Promise.resolve(0);
                };
                WorkerService.prototype.calculate2 = function (val) {
                    if (val) {
                        var result = factorial(parseInt(val));
                        var val2 = result / 2;
                        return Promise.resolve(val2);
                    }
                    return Promise.resolve(0);
                };
                WorkerService.prototype.CurrentValueDollarCalculation = function (originalAmount, dollarAmount, isPositive, additionalDollar) {
                    if (typeof (additionalDollar) === 'undefined' || additionalDollar == null) {
                        additionalDollar = 0;
                    }
                    var ret = new returned_values_js_1.ReturnedValues();
                    ret.originalAmount = originalAmount;
                    ret.originalDollar = dollarAmount;
                    ret.additionalDollar = additionalDollar;
                    ret.delta = dollarAmount + additionalDollar;
                    if (isPositive) {
                        ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) + Number.parseFloat(ret.delta.toString());
                    }
                    else {
                        ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) - Number.parseFloat(ret.delta.toString());
                        if (ret.currentValue < 0) {
                            ret.negativeOverFlowAmount = Math.abs(ret.currentValue);
                            ret.currentValue = 0;
                        }
                    }
                    return ret;
                };
                WorkerService.prototype.CurrentValuePercentCalculation = function (originalAmount, calculationDollarAmount, percentageAmount, isPositive, additionalDollar, additionalPercent) {
                    if (typeof (additionalDollar) === 'undefined' || additionalDollar === null) {
                        additionalDollar = 0;
                    }
                    if (typeof (additionalPercent) === 'undefined' || additionalPercent === null) {
                        additionalPercent = 1;
                    }
                    var ret = new returned_values_js_1.ReturnedValues();
                    ret.originalAmount = Number.parseFloat(originalAmount.toString());
                    ret.originalDollar = (calculationDollarAmount * percentageAmount);
                    ret.additionalDollar = (additionalDollar * additionalPercent);
                    ret.delta = Number.parseFloat(ret.originalDollar.toString()) + Number.parseFloat(ret.additionalDollar.toString());
                    if (isPositive) {
                        ret.currentValue = Number.parseFloat(ret.originalAmount.toString()) + Number.parseFloat(ret.delta.toString());
                    }
                    else {
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
                };
                WorkerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [platform_webworker_1.ServiceMessageBrokerFactory])
                ], WorkerService);
                return WorkerService;
            }());
            exports_1("WorkerService", WorkerService);
        }
    }
});
//# sourceMappingURL=worker-service.js.map