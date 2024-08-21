import * as crypto from 'crypto';

export function generateVerificationCode(): string {
  const buffer = crypto.randomBytes(3);
  const code = buffer.readUIntBE(0, 3) % 1000000;

  return code.toString().padStart(6, '0');
}

export function generateResetPasswordCode(): string {
  const buffer = crypto.randomBytes(3);
  const code = buffer.readUIntBE(0, 3) % 1000000;

  return code.toString().padStart(10, '0');
}
