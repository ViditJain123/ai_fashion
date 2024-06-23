import {z} from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string()
    .min(6, {message: "Password Should be at least 6 characters"})
    .max(255, {message: "Password Should be at most 255 characters"}),
});