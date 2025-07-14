-- CreateTable
CREATE TABLE "KeepAlive" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT DEFAULT '',
    "random" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "KeepAlive_pkey" PRIMARY KEY ("id")
);
