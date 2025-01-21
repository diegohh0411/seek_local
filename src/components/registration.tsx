import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";

import { formSchema } from "@/utils/formDataValidation";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { CheckCircle2, CircleX, Loader2 } from "lucide-react";

export function RegistrationForm() {
    const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: undefined,
            apellidos: undefined,
            edad: undefined,
            correo_electronico: undefined,
            numero_telefonico: undefined,
            grupo: undefined,
            grupo_alternativo: undefined,
            semestre: undefined,
            residencia: undefined,
            involucramiento: undefined,
            involucramiento_alternativo: undefined,
            referencia: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsPosting(true);

        try {
            const response = await fetch("/api/registro", {
                method: "POST",
                body: JSON.stringify(values),
            })

            console.log();

            const regno = ((await response.json()).properties["Registration no."].rich_text[0].text.content) ?? ''

            if (response.status === 200) {
                setSubmissionStatus("success");
                setIsPosting(false);
            } else if (response.status === 400) {
                const error = await response.json();

                error.validationErrors.issues.forEach((err: { path: string[]; message: string }) => {
                    // @ts-ignore 
                    form.setError(err.path.join("."), {
                        message: err.message,
                        type: "manual",
                    });

                    if (err.path.length > 0) {
                        //@ts-ignore
                        form.setFocus(err.path.join("."));
                    }
                });
                setIsPosting(false);
            } else {
                setSubmissionStatus("error");
                setIsPosting(false);
            }
        } catch {
            setSubmissionStatus("error");
            setIsPosting(false);
        }
    }

    if (submissionStatus === "success") {
        return (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
                <CheckCircle2 className="size-10 text-green-600" />
                <h1>¡Gracias!</h1>

                <p>Hemos recibido tu registro para SEEK Local en Monterrey 2025. Dentro de 1 - 2 semanas te enviaremos un correo con los detalles del pago para que puedas completar tu registro.</p>

                <p>Nos vemos pronto :)</p>
            </div>
        );
    }

    if (submissionStatus === "error") {
        return (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
                <CircleX className="size-10 text-red-600" />
                <h1>Oh oh :(</h1>

                <p>Tuvimos un error inesperado, pero ya estamos trabajando en ello.</p>

                <p>Por favor, intenta de nuevo más tarde...</p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.debug([errors, form.getValues()]))} className="flex flex-col gap-6 max-w-3xl w-full mx-auto">
                <h1>Registro para SEEK Local 2025 en Monterrey</h1>
                <p>SEEK Local es una conferencia católica de tres días para universitarios. Habrán conferencistas dando diferentes temas que te ayudarán a profundizar tu fe y relación con Cristo! También tendrás la oportunidad a conocer a otras personas que tienen el mismo objetivo que tú: crecer en la vida espiritual!</p>
                <p>📅 7 - 9 de marzo del 2025<br />📍 Edificio Estoa, Universidad de Monterrey (UDEM)<br />🎫 Al momento, el costo del ticket es de 650 MXN. Conforme se acerque la fecha, se elevará.</p>

                <hr className="border-stone-500 mt-6" />

                <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                    <FormField control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fulanito" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Tu(s) nombre(s) propio(s)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField control={form.control}
                        name="apellidos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos</FormLabel>
                                <FormControl>
                                    <Input placeholder="de Tal" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ambos apellidos, por favor :)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <FormField control={form.control}
                    name="edad"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Edad</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField control={form.control}
                    name="correo_electronico"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                                <Input placeholder="fulanito.detal@gmail.com" {...field} />
                            </FormControl>
                            <FormDescription>Lo utilizaremos para hacerte llegar información importante acerca de la conferencia</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField control={form.control}
                    name="numero_telefonico"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número telefónico</FormLabel>
                            <FormControl>
                                <Input placeholder="+52 81 0000 0000" {...field} />
                            </FormControl>
                            <FormDescription>Si tu número no es mexicano, incluye tu código de país.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField control={form.control}
                    name="grupo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿A qué universidad o grupo perteneces?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Elige una opción" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="UDEM">Universidad de Monterrey (UDEM)</SelectItem>
                                    <SelectItem value="ITESM">Tecnológico de Monterrey (ITESM)</SelectItem>
                                    <SelectItem value="UANL">Universidad Autónoma de N.L. (UANL)</SelectItem>
                                    <SelectItem value="preparatoria">Estoy en preparatoria</SelectItem>
                                    <SelectItem value="Misionero FOCUS">Soy un misionero de FOCUS</SelectItem>
                                    <SelectItem value="OTRO">Otro...</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                {
                    form.watch("grupo") === "OTRO" &&
                    <FormField control={form.control}
                        name="grupo_alternativo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿A qué otra universidad o grupo perteneces?</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>Esto nos sirve para organizarte una mejor conferencia, así que si no estás seguro de qué responder, cualquier información general sobre tu etapa de vida nos ayudará a conocerte mejor :)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                }

                <FormField control={form.control}
                    name="semestre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿En qué semestre de la prepa/universidad vas?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Elige una opción" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1ero">1ero</SelectItem>
                                    <SelectItem value="2do">2do</SelectItem>
                                    <SelectItem value="3ero">3ro</SelectItem>
                                    <SelectItem value="4to">4to</SelectItem>
                                    <SelectItem value="5to">5to</SelectItem>
                                    <SelectItem value="6to">6to</SelectItem>
                                    <SelectItem value="7mo">7mo</SelectItem>
                                    <SelectItem value="8vo">8vo</SelectItem>
                                    <SelectItem value="9mo">9mo</SelectItem>
                                    <SelectItem value="10+">10+</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField control={form.control}
                    name="residencia"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Vives en Monterrey?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Elige una opción" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Sí, soy local">Sí, soy local</SelectItem>
                                    <SelectItem value="Sí, soy foráneo">Sí, soy foráneo</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                {
                    form.watch("residencia") === "No" &&
                    <FormField control={form.control}
                        name="residencia_alternativa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿De dónde eres?</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                }

                <FormField control={form.control}
                    name="involucramiento"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Cómo te has involucrado con FOCUS?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Elige una opción" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Estudio de Biblia">Estudio de Biblia</SelectItem>
                                    <SelectItem value="Misionero">Misionero</SelectItem>
                                    <SelectItem value="No estoy involucrado">No estoy involucrado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                {
                    form.watch("involucramiento") === "No estoy involucrado" &&
                    <FormField control={form.control}
                        name="involucramiento_alternativo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Te interesaría formar parte de un estudio bíblico?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Elige una opción" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Sí">Sí</SelectItem>
                                        <SelectItem value="No">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                }

                <FormField control={form.control}
                    name="referencia"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Quién te invitó a SEEK Local?</FormLabel>
                            <FormControl>
                                <Input placeholder="Mi amiga fulanita" {...field} />
                            </FormControl>
                            <FormDescription>Queremos saber cómo te enteraste de esta conferencia.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <Button type="submit" disabled={isPosting}>{isPosting && <Loader2 className="animate-spin" />} Enviar</Button>

                <p id="formErrors" className="text-red-500"></p>
            </form>
        </Form>
    )
}