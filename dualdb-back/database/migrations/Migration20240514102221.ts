import { Migration } from '@mikro-orm/migrations';

export class Migration20240514102221 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "user_account" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user_account" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "user_account" add constraint "user_account_username_unique" unique ("username");');
  }

}
