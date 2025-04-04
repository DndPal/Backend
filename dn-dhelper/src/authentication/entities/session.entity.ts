import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn("uuid")
    @Index()
    id: string

    @CreateDateColumn({ name: "login_date"})
    loginDate: Date

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @Column({ name: "has_logged_out", default: false })
    hasLoggedOut: Boolean

}