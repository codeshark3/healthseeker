// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  primaryKey,
  text,
  pgEnum,
  date,

} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `healthseeker_${name}`);


 export const roleEnums = pgEnum("role",['user','admin'])
export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);


export const userTable = createTable("user",{
  id:text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name:text('name'),
  email:text('email').notNull().unique(),
  password:text('password').notNull(),
  emailVerified:timestamp('email_verified',{mode:'date'}),
  image:text('image'),
  role:roleEnums('role').notNull().default('user'),
})