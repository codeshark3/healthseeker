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
  boolean

} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `healthseeker_${name}`);


 export const roleEnums = pgEnum("role",['user','admin'])
 export const genderEnums = pgEnum("gender",['Male','Female','Other'])
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
  id:text("id").primaryKey(),
  name:text('name'),
  email:text('email').notNull().unique(),
  password:text('password').notNull(),
 
  phone:text('phone'),
  role:roleEnums('role').notNull().default('user'),
})

export const patients = createTable("patient",{
  id:text("id").primaryKey(),
  name:text('name'),
  email:text('email').notNull().unique(),
  phone:text('phone'),
  privacy_consent:boolean('privacy_consent').notNull(),
  birth_date:date('birth_date'),
  gender:genderEnums('gender').default('Other'),
  address:text('address'),
  occupation:text('occupation'),
  emergency_contact_name:text('emergency_contact_name'),
  emergency_contact_number:text('emergency_contact_number'),
  primary_physician:text('primary_physician'),
  insurance_provider:text('insurance_provider'),
  insurance_policy_number:text('insurance_policy_number'),
  allergies:text('allergies'),
  current_medication:text('current_medication'),
  family_medical_history:text('family_medical_history'),
  past_medical_history:text('past_medical_history'),
  identification_type:text('identification_type'),
  identification_number:text('identification_number'),
  identification_document:text('identification_document'),
  treatment_consent:boolean('treatment_consent').notNull(),
  disclosure_consent:boolean('disclosure_consent').notNull(),
  password:text('password').notNull(),
  role:roleEnums('role').notNull().default('user'),
})
