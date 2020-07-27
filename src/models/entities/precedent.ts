import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";

import Tweet from "./tweet"
  
@Entity()
class Precedent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    name: string;

    @Column({ type: "text"})
    content: string;

    @Column({ type: "varchar"})
    url: string;

    @Column({ type: "varchar", length: 10 })
    category: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;

    @OneToMany(type => Tweet, tweet => tweet.precedent)
    tweet: Tweet[];
  }
  
  export default Precedent;