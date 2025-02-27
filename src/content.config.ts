import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const speakers = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/speakers"
  }),
  schema: ({ image }) => z.object({
    title: z.string().optional(),
    first_name: z.string(),
    last_name: z.string(),
    bio: z.string().optional(),
    pictures: z.array(image()),
  })
})

export const collections = { speakers };