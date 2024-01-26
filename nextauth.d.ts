import NextAuth, {DefaultSession} from 'next-auth'  

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            emailVerified?: boolean;
            name: string;
            image?: string;
            role: string;
        } & DefaultSession['user'];
    }
}