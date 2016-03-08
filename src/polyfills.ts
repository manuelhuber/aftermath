// Polyfills
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';
import 'reflect-metadata';
//import 'rxjs/Rx';
import 'zone.js/dist/zone-microtask.min';

// Manually include all operators we to minimize file size
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';

if ('production' === process.env.ENV) {

    // Nothing special for production right now

} else {
    // Development

    Error['stackTraceLimit'] = Infinity;

    require('zone.js/dist/long-stack-trace-zone');
}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
