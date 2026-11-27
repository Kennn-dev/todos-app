import type { Tag } from "@/models/Tag.model";
import type { TaskUpdatePayload } from "@/models/Task.model";
import { useEffect, useState } from "react";
interface TaskFormActions {
  create(data: TaskUpdatePayload): boolean;
  update(id: string, data: TaskUpdatePayload): boolean;
}
export default function useTodoForm(initialValues: TaskUpdatePayload) {
  const [text, setText] = useState<string>(initialValues.title);
  const [tags, setTags] = useState<Tag[]>(initialValues.tags);

  function initForm(data: TaskUpdatePayload) {
    setTags(data.tags);
    setText(data.title);
  }

  function reset() {
    setText(""); //
    setTags([]); //
    // setMode({ type: "create" });
  }

  function getPayload() {
    const data: TaskUpdatePayload = {
      tags,
      title: text,
    };
    return data;
  }

  function submit() {
    let result: boolean = false;
    const data: TaskUpdatePayload = {
      tags,
      title: text,
    };
    return data;
  }

  useEffect(() => {
    setTags(initialValues.tags);
    setText(initialValues.title);
  }, [initialValues]);

  return {
    text,
    setTags,
    setText,
    tags,
    submit,
    reset,
    initForm,
    getPayload,
  };
}
