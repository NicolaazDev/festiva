import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordReset } from './passwordreset.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  hashPassword;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ default: false, name: 'is_verified' })
  isConfirmed: boolean;

  @Column({ nullable: true, name: 'verification_code' })
  verificationCode?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'verification_code_expires',
  })
  verificationCodeExpires?: Date;

  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  passwordResets: PasswordReset[];

  @Column({ type: 'timestamptz', default: () => 'NOW()', name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'NOW()',
    name: 'updated_at',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true, name: 'last_login' })
  lastLogin?: Date;
}
