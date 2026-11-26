import type { Tag } from "@/models/Tag.model";
import type { TaskUpdatePayload } from "@/models/Task.model";
import { useState } from "react";

interface TaskFormActions {
  create(data: TaskUpdatePayload): boolean;
  update(id: string, data: TaskUpdatePayload): boolean;
}
type Mode = { type: "create" } | { type: "edit"; id: string };
export default function useListView(props: TaskFormActions) {
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [mode, setMode] = useState<Mode | null>({ type: "create" });

  function reset() {
    setText(""); //
    setTags([]); //
    setMode({ type: "create" });
  }

  function initForm(data: TaskUpdatePayload) {
    setTags(data.tags);
    setText(data.title);
  }

  function changeUpdateMode(id: string) {
    setMode({ id, type: "edit" });
  }

  function changeCreateMode() {
    setMode({ type: "create" });
  }
  function submit() {
    let result: boolean = false;
    const data: TaskUpdatePayload = {
      tags,
      title: text,
    };
    if (mode?.type === "create") {
      result = props.create(data);
    }

    if (mode?.type === "edit") {
      result = props.update(mode.id, data);
    }
    console.log({ result });
    if (result) {
      reset();
    }
  }

  return {
    text,
    tags,
    reset,
    initForm,
    setTags,
    setText,

    mode,
    submit,
    changeUpdateMode,
    changeCreateMode,
  };
}
