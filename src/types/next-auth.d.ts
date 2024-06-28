import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string;
        phoneNumber?: number;
        verified?: boolean;
    }
    interface JWT {
        _id?: string;
        phoneNumber?: number;
        verified?: boolean;
    }
    interface Session {
        user: {
            _id?: string;
            phoneNumber?: number;
            verified?: boolean;
        };
    }
}