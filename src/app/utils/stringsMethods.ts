import { orderArr } from '../types/common';

type arrType = { name: string } & any;

export function sortArrayByName(arr: arrType[], order: orderArr): arrType[] {
  return arr.sort((a, b) => {
    return order === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
}
