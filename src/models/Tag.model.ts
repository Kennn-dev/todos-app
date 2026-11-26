export interface Tag {
  id: string;
  name: string;
}

export function createTag(id: string, name: string): Tag | null {
  if (!isValidTag(name)) return null;
  return {
    id,
    name,
  };
}

export function isValidTag(name: string): boolean {
  if (name.trim() === "") return false;
  return true;
}
