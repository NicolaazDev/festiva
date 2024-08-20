import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
