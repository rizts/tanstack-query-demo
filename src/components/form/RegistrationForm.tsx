import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  mobilePhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type FormValues = z.infer<typeof formSchema>

export function RegistrationForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // tambahkan ini
    defaultValues: {
      fullName: "",
      email: "",
      mobilePhone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
    alert("Registration successful! Check console for data.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
        <CardDescription>Fill in the form to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+62 812-3456-7890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your phone number with country code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={!form.formState.isValid || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
