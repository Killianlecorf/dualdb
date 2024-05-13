import { Entity, PrimaryKey, Property, OneToMany, Collection, Unique } from '@mikro-orm/postgresql';
import { Recipes } from './Recipes.model';

@Entity()
export class UserAccount {
  @PrimaryKey({autoincrement: true})
  id!: number;

  @Unique()
  @Property()
  username!: string;

  @Property()
  password!: string;

  @OneToMany(() => Recipes, recipes => recipes.UserAccount)
  notes = new Collection<Recipes>(this);
}