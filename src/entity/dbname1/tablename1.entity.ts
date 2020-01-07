import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tablename1', { schema: 'dbname1', database: 'dbname1' })
export class Tablename1 {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'title'
  })
  title: string;

  @Column('text', {
    nullable: true,
    name: 'content'
  })
  content: string | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at'
  })
  updated_at: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at'
  })
  created_at: Date;
}
