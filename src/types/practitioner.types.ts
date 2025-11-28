import { JsonValue } from "@prisma/client/runtime/library";

export type PractitionerResponse =
    {
        id: string;
        description: string;
        userId: string;
        contactId: string | null;
        socialMedia: JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }

