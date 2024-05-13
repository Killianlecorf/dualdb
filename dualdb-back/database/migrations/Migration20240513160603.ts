import { Migration } from '@mikro-orm/migrations';

export class Migration20240513160603 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "recipes" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "user_account_id" int not null);');

    this.addSql('alter table "recipes" add constraint "recipes_user_account_id_foreign" foreign key ("user_account_id") references "user_account" ("id") on update cascade;');

    this.addSql('drop table if exists "note" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "note" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "user_account_id" int not null);');

    this.addSql('alter table "note" add constraint "note_user_account_id_foreign" foreign key ("user_account_id") references "user_account" ("id") on update cascade;');

    this.addSql('drop table if exists "recipes" cascade;');
  }

}
