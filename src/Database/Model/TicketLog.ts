import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

interface TicketLogDoc {
  id: number
  ticket_id: number
  items?: JSON
  created_by: number
  action: number
  created_at: string
  updated_at: string
}

@Entity({ name: 'ticket_logs' })
export class TicketLogModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  ticket_id!: number

  @Column({ type: 'jsonb', nullable: true })
  items?: JSON

  @Column()
  created_by!: number

  @Column()
  action!: number

  @UpdateDateColumn()
  updated_at!: Date

  @CreateDateColumn()
  created_at!: Date

  transform(): TicketLogDoc {
    return {
      id: this.id,
      ticket_id: this.ticket_id,
      items: this.items,
      created_by: this.created_by,
      action: this.action,
      created_at: this.created_at.toISOString(),
      updated_at: this.updated_at.toISOString(),
    }
  }
}
