import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";

import Precedent from "./precedent";

@Entity()
class Tweet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    name: string;

    @Column({ type: "text"})
    content: string;

    @Column({ type: 'boolean' })
    isUploaded: boolean;

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;

    @ManyToOne(type => Precedent, precedent => precedent.tweet)
    precedent: Precedent;
  }
  
  export default Tweet