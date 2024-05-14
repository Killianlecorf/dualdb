import { Entity, PrimaryKey, Property} from '@mikro-orm/postgresql';

@Entity()
export class Recipes {
  @PrimaryKey({autoincrement: true})
  id!: number;

  @Property()
  title!: string;

  @Property()
  ingredients!: string;

  @Property()
  preparationStep!: string;
}