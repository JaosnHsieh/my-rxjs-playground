const ids = ['id1', 'id2', 'id3', 'id4'];
export const eles = ids.map((id) => document.getElementById(id));
console.log('eles', eles);
export const boundingRects = eles.map((e) => {
  const b = e.getBoundingClientRect();
  return {
    id: e.id,
    left: b.left,
    right: b.right,
    top: b.top,
    bottom: b.bottom,
  };
});
