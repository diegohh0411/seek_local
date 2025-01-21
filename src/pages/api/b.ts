export const prerender = false;

import { type APIRoute } from "astro";
import { notion, database_registration_id } from "@/utils/notion";
import type { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  console.log({ data })

  if (typeof data.regno !== "string" || !data.regno) {
    return new Response(JSON.stringify({ error: "Invalid registration number" }), {
      status: 400,
      headers: new Headers({ "content-type": "application/json" }),
    });
  }

  console.log(data.regno);

  const response = await notion.databases.query({
    database_id: database_registration_id,
    filter: {
      property: "Registration no.",
      rich_text: {
        equals: data.regno as string,
      },
    },
  });

  if (response.results.length === 0) {
    return new Response(JSON.stringify({ error: "Registration not found" }), {
      status: 404,
      headers: new Headers({ "content-type": "application/json" }),
    });
  }

  const registration = (response.results[0] as DatabaseObjectResponse).properties as any;

  const nombre = registration["Nombre"].title[0].plain_text;
  const apellidos = registration["Apellidos"].rich_text[0].text.content;

  const estado_del_registro = registration["Estado del registro"].status.name;

  return new Response(JSON.stringify({
    nombre,
    apellidos,
    estado_del_registro,
    regno: data.regno
  }), {
    status: 200,
    headers: new Headers({ "content-type": "application/json" }),
  });
};
