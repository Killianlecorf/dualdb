import { Migration } from '@mikro-orm/migrations';

export class Migration20240523162951 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "recipes" ("id" serial primary key, "title" varchar(255) not null, "ingredients" jsonb not null, "preparation_step" jsonb not null);');
  }

}
