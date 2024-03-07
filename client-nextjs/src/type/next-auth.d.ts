import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      accessToken: string;
      role: string;
      refreshToken: string;
      prueba:string
    };
    connection: {
      accessToken: string;
      role: string;
      refreshToken: string;
    };
  }
}
