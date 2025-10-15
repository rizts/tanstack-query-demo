import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>shadcn/ui Works! 🎉</CardTitle>
          <CardDescription>Testing Button and Card components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button>Click Me</Button>
          <Button variant="outline">Outline Button</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App