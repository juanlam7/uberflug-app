export type orderArr = 'asc' | 'desc';

type arrType = { name: string } & any;

export function sortArrayByName(arr: arrType[], order: orderArr): arrType[] {
  const copyArr = [...arr];
  return copyArr.sort((a, b) => {
    return order === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
}
