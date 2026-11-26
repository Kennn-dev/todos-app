import List from "@/components/list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  return (
    <div className="p-5">
      <Card className="p-5 max-w-4xl m-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Todos App</CardTitle>
          <CardDescription>Write down your targets 🎯</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <List />
        </CardContent>
      </Card>
    </div>
  );
}
