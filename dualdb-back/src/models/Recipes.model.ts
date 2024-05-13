import { Entity, PrimaryKey, Property, ManyToOne} from '@mikro-orm/postgresql';
import { UserAccount } from './User.model';

@Entity()
export class Recipes {
  @PrimaryKey({autoincrement: true})
  id!: number;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @ManyToOne(() => UserAccount)
  UserAccount!: UserAccount;
}