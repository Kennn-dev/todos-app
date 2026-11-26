import type { Tag } from "@/models/Tag.model";
import type { TaskUpdatePayload } from "@/models/Task.model";
import { useState } from "react";

export default function useListView() {
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);

  function reset() {
    setText(""); //
    setTags([]); //
  }

  function initForm(data: TaskUpdatePayload) {
    setTags(data.tags);
    setText(data.title);
  }
  return {
    text,
    tags,
    reset,
    initForm,
    setTags,
    setText,
  };
}
