System.register(['@angular/platform-webworker'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_webworker_1;
    return {
        setters:[
            function (platform_webworker_1_1) {
                platform_webworker_1 = platform_webworker_1_1;
            }],
        execute: function() {
            platform_webworker_1.bootstrapWorkerUi("factorial/loader.js");
        }
    }
});
//# sourceMappingURL=main.js.map