export function reinsert(params: { arr: number[]; from: number; to: number }) {
  const { arr, from, to } = params;
  const newArr = arr.slice(0);
  const val = newArr[from];
  newArr.splice(from, 1);
  newArr.splice(to, 0, val);
  return newArr;
}

export function clamp(params: { n: number; min: number; max: number }) {
  const { n, min, max } = params;
  return Math.max(Math.min(n, max), min);
}

export function generateChildren(
  children: React.ReactNode | React.ReactNode[]
) {
  return Array.isArray(children) ? [...children] : [children];
}
