import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

interface TicketDoc {
  id: number
  title?: string
  description?: string
  category?: number
  sub_category?: number
  site_uid: number
  company_uid: number
  opened_by: number
  assigned_to?: number
  status?: number
  priority?: number
  meta_data?: JSON 
  files?: JSON
  created_at: string
  updated_at: string
}

@Entity({ name: 'tickets' })
export class TicketModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  category?: number

  @Column({ nullable: true })
  sub_category?: number

  @Column()
  site_uid!: number

  @Column()
  company_uid!: number

  @Column()
  opened_by!: number

  @Column({ nullable: true })
  assigned_to?: number

  @Column({ nullable: true })
  status?: number

  @Column({ nullable: true })
  priority?: number

  @Column({ type: 'jsonb', nullable: true })
  meta_data?: JSON

  @Column({ type: 'jsonb', nullable: true })
  files?: JSON

  @UpdateDateColumn()
  updated_at!: Date

  @CreateDateColumn()
  created_at!: Date

  transform(): TicketDoc {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      sub_category: this.sub_category,
      site_uid: this.site_uid,
      company_uid: this.company_uid,
      opened_by: this.opened_by,
      assigned_to: this.assigned_to,
      status: this.status,
      priority: this.priority,
      meta_data: this.meta_data,
      files: this.files,
      created_at: this.created_at.toISOString(),
      updated_at: this.updated_at.toISOString(),
    }
  }
}
