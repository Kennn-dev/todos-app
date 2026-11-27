import useTodoForm from "@/app/form.hooks";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { isValidTaskName, type TaskUpdatePayload } from "@/models/Task.model";
import type { DrawerRoot } from "@base-ui/react";
import InputTags from "./input-tags";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FormDrawerProps {
  open: boolean;
  onOpenChange: (
    open: boolean,
    eventDetails?: DrawerRoot.ChangeEventDetails,
  ) => void;

  onSubmit: (payload: TaskUpdatePayload) => void;
  title: string;
  initialValues: TaskUpdatePayload;
}
export default function FormDrawer(props: FormDrawerProps) {
  const { open, onOpenChange, onSubmit, title, initialValues } = props;
  const { text, setTags, tags, setText, getPayload } =
    useTodoForm(initialValues);

  const handleSubmit = () => {
    onSubmit(getPayload());
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 px-2 flex flex-col gap-2">
          <Input
            type="text"
            placeholder="What next todo ?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          <InputTags placeholder="Tags ..." value={tags} onChange={setTags} />
          <Textarea placeholder="Content task ..." rows={10} />
        </div>

        <DrawerFooter>
          <Button disabled={!isValidTaskName(text)} onClick={handleSubmit}>
            Submit
          </Button>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
