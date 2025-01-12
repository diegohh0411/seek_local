import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { getSDKFactory } from "@/utils/medusa";

const formSchema = z.object({
  first_name: z.string()
    .min(2, {
      message: "Tu nombre debe de tener mínimo 2 letras.",
    })
    .max(15, {
      message: "Tu nombre debe de tener máximo 15 letras.",
    }),
  last_name: z.string()
    .min(5, {
      message: "Tus apellidos deben de tener mínimo 5 letras.",
    })
    .max(25, {
      message: "Tus apellidos deben de tener máximo 25 letras.",
    }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido.",
  }),
  password: z.string()
    .min(12, {
      message: "Tu contraseña debe de tener mínimo 12 carácteres.",
    })
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const sdk = await getSDKFactory();

    try {
      const token = await sdk.auth.register("customer", "emailpass", values)

      const { password, ...rest } = values;
      const customer = await sdk.store.customer.create(rest, {}, {
        'Authorization': `Bearer ${token}`
      });

      console.log(customer);
    } catch (e) {

    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Fulanito" {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre que aparecerá en tu boleto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder="González González" {...field} />
              </FormControl>
              <FormDescription>
                Estos son los apellidos que aparecerán en tu boleto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="fulanito@gmai.com" {...field} />
              </FormControl>
              <FormDescription>
                Este será tu correo electrónico asociado a tu boleto.
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="fulanito@gmai.com" {...field} />
              </FormControl>
              <FormDescription>Tu contraseña deberá tener al menos 12 carácteres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
