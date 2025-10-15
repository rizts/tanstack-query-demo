import { InfinitePostList } from "@/components/scroll/InfinitePostList"
import { RegistrationForm } from "@/components/form/RegistrationForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          TanStack Query Demo
        </h1>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6">
            <InfinitePostList />
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <RegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App