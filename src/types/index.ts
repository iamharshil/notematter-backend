import "express-session";

declare module "express-session" {
	interface Session {
		user?: {
			_id?: string;
		};
	}
}
