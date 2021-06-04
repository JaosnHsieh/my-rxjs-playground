// rxjs v7 "firstValueFrom" is easier to understand and should be more performant than toPromise() on v6 but it's not working in my project
// so I use rxjs v6 with "toPromise()"" and "take(1)""
// related issue: https://github.com/angular/angular/issues/41897
import { fromEvent, interval, Observable, race } from 'rxjs';
import { mapTo, filter, take, map } from 'rxjs/operators';
import Events from 'events';

main();

/**
 * rxjs-race-wait-for-event-value-arrive
 * this demo shows how to wait a value from EventEmitter until it emits the target value or expire.
 */
async function main() {
  const ee = getIntervalTestEe();
  logT('start waiting value 5 for 2s');
  const value1 = await waitUntilTargetValue(ee, 2000, 5);
  logT(`got value1`, value1);

  const ee2 = getIntervalTestEe();

  logT('start waiting value 5 for 6s');
  const value2 = await waitUntilTargetValue(ee2, 6000, 5);
  logT(`got value2`, value2);
}
function logT(...args: any[]) {
  console.log(new Date().toISOString(), ...args);
}

function waitUntilTargetValue(
  ee: Events.EventEmitter,
  ms = 1000,
  targetValue = 5,
): Promise<number | null> {
  // this might lead to memory leak. in real world, I should create this event$ only once.
  const event$ = fromEvent(ee, 'test') as Observable<number>;
  const timer$ = interval(ms).pipe(mapTo(null));
  const filterNumber5$ = event$.pipe(filter((n) => n === targetValue));
  const race$ = race([filterNumber5$, timer$]).pipe(take(1));
  return race$.toPromise();
}

function getIntervalTestEe() {
  const EE = Events.EventEmitter;
  const ee = new EE();
  let count = 1;
  setInterval(() => {
    ee.emit('test', count++);
  }, 1000);
  return ee;
}
