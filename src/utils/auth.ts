import Nodemailer from "@auth/core/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { StartAuthJSConfig } from "start-authjs";
import { prisma } from "@/db";
import { env } from "@/env";

declare module "@auth/core/types" {
	export interface Session {
		user: {
			name: string;
			email: string;
			email_verified: boolean;
		} & Profile;
		account: {
			access_token: string;
		};
		expires: Date;
	}
}

export const authConfig: StartAuthJSConfig = {
	secret: env.AUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	providers: [
		Nodemailer({
			server: {
				host: env.EMAIL_SERVER_HOST,
				port: env.EMAIL_SERVER_PORT,
				auth: {
					user: env.EMAIL_SERVER_USER,
					pass: env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: env.EMAIL_FROM,
			normalizeIdentifier(identifier: string): string {
				if (identifier.split("@").length > 2) {
					throw new Error("Only one email allowed");
				}
				// Get the first two elements only,
				// separated by `@` from user input.
				let [local, domain] = identifier.toLowerCase().trim().split("@");
				// The part before "@" can contain a ","
				// but we remove it on the domain part
				// You can also throw an error, which will redirect the user
				// to the sign-in page with error=EmailSignin in the URL
				domain = domain.split(",")[0];
				// Check Domain
				if (domain !== env.DOMAIN) {
					throw new Error("Es können nur Firmen-E-Mails genutzt werden");
				}
				return `${local}@${domain}`;
			},
		}),
	],
};
