import dotenv from 'dotenv';

dotenv.config();

export class Env {
  public static getEnv(): string {
    return process.env.ENV || 'qa';
  }

  public static getBaseUrl(): string {
    const env = this.getEnv().toUpperCase();
    const baseUrl = process.env[`BASE_URL_${env}`];
    if (!baseUrl) {
      throw new Error(`BASE_URL_${env} is not defined in the environment variables.`);
    }
    return baseUrl;
  }

  public static getAdminUser(): string {
    return process.env.ADMIN_USER || '';
  }

  public static getAdminPassword(): string {
    return process.env.ADMIN_PASSWORD || '';
  }
}
