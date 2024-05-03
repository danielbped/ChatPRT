import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from "typeorm"
import { uuid } from "uuidv4"
import Conversation from "./conversation.entity"

export interface ICreateMessageDTO extends Omit<Message, 'id' | 'createdAt' | 'updatedAt' | 'response'> {}

@Entity()
export default class Message {
  @PrimaryColumn()
  public readonly id!: string

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  public conversation!: Conversation

  @Column()
  public content!: string

  @Column("longtext")
  public response!: string

  @CreateDateColumn()
  public readonly createdAt!: Date

  @UpdateDateColumn()
  public readonly updatedAt!: Date

  public constructor(props: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    }
  }
}