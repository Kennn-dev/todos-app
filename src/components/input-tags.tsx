import { createTag, type Tag } from "@/models/Tag.model";
import { uuid } from "@/utils";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Badge } from "./ui/badge";
interface InputTagProps {
  placeholder?: string;
  value: Tag[];
  onChange(value: Tag[]): void;
}
export default function InputTags(props: InputTagProps) {
  const { value, onChange, placeholder } = props;
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tagName: string) => {
    const tag = createTag(uuid(), tagName);
    if (tag === null) return;
    onChange([...value, tag]);
    setSearch("");
  };
  const removeTag = (id: string) => {
    const tags = [...value].filter((v) => v.id !== id);
    onChange(tags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ";") {
      addTag(search);
      e.preventDefault();
      return;
    }
  };

  const handleClear = () => {
    setSearch("");
    onChange([]);
  };
  return (
    <div className="flex lex-wrap  flex-wrap gap-1.5 rounded-md border border-input px-3 py-1.5 cursor-text ">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-10 flex-wrap items-center gap-1.5"
      >
        {value.map((t) => (
          <Badge key={t.id} variant={"outline"}>
            <div className="flex gap-1 items-center">
              <span>{t.name}</span>

              <HugeiconsIcon
                cursor={"pointer"}
                icon={Cancel01Icon}
                size={14}
                strokeWidth={1.5}
                onClick={() => removeTag(t.id)}
              />
            </div>
          </Badge>
        ))}
        {value.length > 0 && (
          <Badge
            className="cursor-pointer"
            variant={"secondary"}
            onClick={handleClear}
          >
            Clear
          </Badge>
        )}
      </div>
      <input
        id="tags-input"
        placeholder={placeholder}
        ref={inputRef}
        value={search}
        onBlur={() => search && addTag(search)}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-w-20 flex-1 bg-transparent text-sm outline-none"
        type="text"
      />
    </div>
  );
}
