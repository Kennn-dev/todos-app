import type { useRender } from "@base-ui/react";
import type { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "./ui/badge";

type BaseBadge = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;
type StatusType = "In progress" | "New" | "Done" | "Canceled";
interface CustomBadgeProps extends BaseBadge {
  type: StatusType;
}

const classNameByStatus: { [k in StatusType]: string } = {
  "In progress": "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  Canceled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  Done: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  New: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};
export default function CustomBadge(props: CustomBadgeProps) {
  const { className, type } = props;

  const finalClassName = [className, classNameByStatus[type]].join(" ");
  return <Badge {...props} className={finalClassName} />;
}
