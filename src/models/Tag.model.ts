import { uuid } from "@/utils";
import { isTextEmpty } from "@/utils/string.utils";

export interface Tag {
  id: string;

  name: string;
}

export function createTag(name: string): Tag | null {
  if (isTextEmpty(name)) return null;
  console.log("name", name);
  return {
    id: uuid(),

    name,
  };
}

export function editTag() {
  // ... edit selected tag
}

export function deleteTag() {
  // ...delete selected tag in list tags
}
