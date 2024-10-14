-- CreateTable
CREATE TABLE "coaches" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "bio" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "title" TEXT,
    "sport" TEXT,
    "phoneNumber" SMALLINT,
    "profilePicture" TEXT,
    "working_hrs" BIGINT,
    "prices" BIGINT,

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_registrations" (
    "id" BIGSERIAL NOT NULL,
    "event_id" UUID,
    "user_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(6) NOT NULL,
    "location" VARCHAR(255),
    "organizer_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'utc'::text),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "juniors" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT,
    "age" BIGINT,
    "partner" TEXT,
    "coach_Academy" TEXT,
    "phoneNo" BIGINT,
    "gender" TEXT,

    CONSTRAINT "juniors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menDoubles" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "player" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL,
    "age" SMALLINT,

    CONSTRAINT "mendoubles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menSingles" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "mensingles_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mixedDoubles" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "player" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "mixeddoubles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainers" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID,
    "bio" TEXT,
    "specialty" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "gender" VARCHAR,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "fullnames" VARCHAR,
    "gender" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "institution" TEXT,
    "phoneNo" BIGINT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "womenDoubles" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "womendoubles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "womenSingles" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "womenSingles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coaches_user_id_key" ON "coaches"("user_id");

-- CreateIndex
CREATE INDEX "idx_coaches_user_id" ON "coaches"("user_id");

-- CreateIndex
CREATE INDEX "idx_event_registrations_event_id" ON "event_registrations"("event_id");

-- CreateIndex
CREATE INDEX "idx_event_registrations_user_id" ON "event_registrations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "trainers_user_id_key" ON "trainers"("user_id");

-- CreateIndex
CREATE INDEX "idx_trainers_user_id" ON "trainers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "coaches" ADD CONSTRAINT "coaches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trainers" ADD CONSTRAINT "trainers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
