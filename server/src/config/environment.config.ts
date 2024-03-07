import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    PORT_DB_VALIDADO:process.env.PORT_DB,
    SECRET_APP_AUTH:process.env.APP_SECRET_AUTH
  };
});