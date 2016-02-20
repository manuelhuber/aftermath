import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import { TownConnector } from './connector/town-connector';
import { CharacterConnector } from './connector/character-connector';
import { Aftermath } from './aftermath/aftermath';

if (process.env.ENV === 'production') {
    enableProdMode();
}
/*
 * Bootstrap our Angular app with a top level component `Aftermath` and inject
 * our Services and Providers into Angular's dependency injection
 */
bootstrap(Aftermath, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: PathLocationStrategy}),
    TownConnector,
    CharacterConnector
]);
