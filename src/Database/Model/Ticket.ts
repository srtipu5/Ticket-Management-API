import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

interface Ticket {
  id: number
  token: number
  title: string
  description?: string
  category: string
  sub_category: string
  site_uid: number
  company_uid: number
  opened_by: number
  assigned_team?: number
  assigned_to?: number
  status: string
  priority: string
  meta_data?: JSON 
  files?: JSON
  created_at: string
  updated_at: string
}

@Entity({ name: 'tickets' })
export class TicketModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  token!: number

  @Column()
  title!: string

  @Column({ nullable: true })
  description?: string

  @Column()
  category!: string

  @Column()
  sub_category!: string

  @Column()
  site_uid!: number

  @Column()
  company_uid!: number

  @Column()
  opened_by!: number

  @Column({ nullable: true })
  assigned_team?: number

  @Column({ nullable: true })
  assigned_to?: number

  @Column()
  status!: string

  @Column()
  priority!: string

  @Column({ type: 'jsonb', nullable: true })
  meta_data?: JSON

  @Column({ type: 'jsonb', nullable: true })
  files?: JSON

  @UpdateDateColumn()
  updated_at!: Date

  @CreateDateColumn()
  created_at!: Date

  transform(): Ticket {
    return {
      id: this.id,
      token: this.token,
      title: this.title,
      description: this.description,
      category: this.category,
      sub_category: this.sub_category,
      site_uid: this.site_uid,
      company_uid: this.company_uid,
      opened_by: this.opened_by,
      assigned_team: this.assigned_team,
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
