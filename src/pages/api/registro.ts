export const prerender = false;
import { type APIRoute } from "astro";
import { formSchema } from "@/utils/formDataValidation";
import { z } from "zod";

import { Client } from "@notionhq/client";

// const { Client } = require("@notionhq/client");
const notion = new Client({
    auth: "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"
})


export const POST: APIRoute = async ({ request }) => {
    /**
    const result = await notion.databases.query({
        database_id: "18162de3ddab8004b6d8d3e7fe6416ad"
    })

    console.log(result.results[0].properties)
     */

    try {
        const data: z.infer<typeof formSchema> = await request.json();

        try {
            formSchema.parse(data);
        } catch (e) {
            return new Response(JSON.stringify({ 
                validationErrors: e,
            }),{ status: 400 })
        }

        const response = await notion.pages.create({
            parent: {
                database_id: "18162de3ddab8004b6d8d3e7fe6416ad"
            },
            properties: {
                Nombre: {
                    type: "title",
                    title: [
                        {
                            type: "text",
                            text: {
                                content: data.nombre 
                            }
                        }
                    ]
                },
                Apellidos: {
                    type: 'rich_text', 
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: data.apellidos, link: null
                            }
                        }
                    ] 
                },
                Edad: {
                    type: "number",
                    number: data.edad
                },
                "Correo electrónico": {
                    type: "email",
                    email: data.correo_electronico
                },
                "Número telefónico": {
                    type: "phone_number",
                    phone_number: data.numero_telefonico
                },
                "Universidad o grupo": {
                    type: "select",
                    select: {
                        name: (data.grupo_alternativo ?? data.grupo).replace(',', '')
                    }
                },
                Semestre: {
                    type: "select",
                    select: {
                        name: (data.semestre ?? "").replace(',', '')
                    }
                },
                Residencia: {
                    type: "select", 
                    select: {
                        name: (data.residencia_alternativa ?? data.residencia).replace(',', '')
                    }
                },
                Involucramiento: {
                    type: "select",
                    select: {
                        name: data.involucramiento.replace(',', '')
                    }
                },
                "¿Te interesaría formar parte de un estudio bíblico?": {
                    type: "select",
                    select: {
                        name: (data.involucramiento_alternativo ?? "No aplica").replace(',', '')
                    }
                },
                Referencia: {
                    type: "rich_text",
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: data.referencia ?? "", link: null
                            }
                        }
                    ] 
                }
            }
        })
    
        return new Response("", { status: 200 });
    } catch {
        return new Response(JSON.stringify({ 
            message: "Tuvimos un error en nuestro servidor y estamos trabajando para resolverlo. Por favor, intenta más tarde..." 
        }),{ status: 500 })
    }
}