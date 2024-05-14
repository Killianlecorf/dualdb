import { Migration } from '@mikro-orm/migrations';

export class Migration20240514101827 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes" drop constraint "recipes_user_account_id_foreign";');

    this.addSql('alter table "recipes" drop column "user_account_id";');

    this.addSql('alter table "recipes" add column "preparation_step" varchar(255) not null;');
    this.addSql('alter table "recipes" rename column "content" to "ingredients";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes" drop column "preparation_step";');

    this.addSql('alter table "recipes" add column "user_account_id" int not null;');
    this.addSql('alter table "recipes" add constraint "recipes_user_account_id_foreign" foreign key ("user_account_id") references "user_account" ("id") on update cascade;');
    this.addSql('alter table "recipes" rename column "ingredients" to "content";');
  }

}
