import { z } from "zod"
import { createSubjects } from "@openauthjs/openauth/subject"

export const subjects = createSubjects({
    user: z.object({
        id: z.string(),
        email: z.string().email(),
    }),
})