import { compareSync, hashSync } from 'bcrypt';

export const ComparePassword = async (currentPassword: string, attempt: string) => await compareSync(currentPassword, attempt);

export const HashPassword = async (pwd: string) => await hashSync(pwd, 10);
