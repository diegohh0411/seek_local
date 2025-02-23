import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: "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"
})

export const database_registration_id = "18162de3ddab8004b6d8d3e7fe6416ad";
export const horario_id = "17b62de3ddab8157a92bc1130e8cfc5e";
export const speakers_id = "19d62de3ddab80ceaccfe00d776bddc9";

interface Page {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
        object: string;
        id: string;
    },
    last_edited_by: {
        object: string;
        id: string;
    },
    cover: string | null;
    icon: string | null;
    parent: {
        type: string;
        database_id: string;
    },
    archived: boolean;
    in_trash: boolean;
    properties: any[]
    url: string;
    public_url: null | string;
}

export const horario = async (): Promise<{
    object: string;
    results: Page[]
}> => {
    const response = await notion.databases.query({
        database_id: horario_id
    }) as unknown as { object: string; results: Page[] };

    response.results.sort((a: any, b: any) => {
        if ((new Date(a.properties["Fecha"]?.date?.start)) > (new Date(b.properties["Fecha"]?.date?.start))) {
            return 1;
        } else if ((new Date(a.properties["Fecha"]?.date?.start)) < (new Date(b.properties["Fecha"]?.date?.start))) {
            return -1;
        } else {
            return -2;
        }
    })

    response.results = response.results.filter((page: any) => {
        return page.properties["Public"].checkbox;
    })

    return response;
}

export const featured_speakers = async (): Promise<Page[]> => {
    const response = await notion.databases.query({
        database_id: speakers_id
    }) as unknown as { object: string; results: Page[] };

    return response.results.filter((page: any) => {
        return page.properties["Featured"].checkbox
    });
}