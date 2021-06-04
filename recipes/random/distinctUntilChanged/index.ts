import { boundingRects } from './dom';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

alert('move mouse to different elements and check console');

const findCurrentEle = (e: MouseEvent) =>
  boundingRects.find(
    (b) => e.x >= b.left && e.x <= b.right && e.y <= b.bottom && e.y >= b.top,
  );

fromEvent(document, 'mousemove')
  .pipe(
    map((e) => findCurrentEle(e)),
    pluck('id'),
    distinctUntilChanged(),
  )
  .subscribe((id) => {
    console.log(`$ distinctUntilChanged element id ${id}`);
  });
