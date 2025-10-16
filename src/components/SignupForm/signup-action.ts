import { prisma } from "@/lib/prism";
import * as z from "zod"
import { authSchema } from "../../../schema/auth-schema";1
import { createResponse } from "../../../helpers/createResponse";

export async function SignUpAction(data : z.infer<typeof authSchema>) {
    
}