-- CreateEnum: PostStatus
DO $$ BEGIN
    CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable: blog_posts (Extend schema safely)
ALTER TABLE "blog_posts"
    ADD COLUMN IF NOT EXISTS "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    ADD COLUMN IF NOT EXISTS "seo_title_ar" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "seo_title_en" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "seo_description_ar" VARCHAR(500),
    ADD COLUMN IF NOT EXISTS "seo_description_en" VARCHAR(500),
    ADD COLUMN IF NOT EXISTS "og_image" TEXT,
    ADD COLUMN IF NOT EXISTS "author_id" UUID,
    ADD COLUMN IF NOT EXISTS "published_at" TIMESTAMPTZ(6),
    ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill: Ensure all existing historical articles remain PUBLISHED with their created_at as published_at
UPDATE "blog_posts"
SET 
    "status" = 'PUBLISHED',
    "published_at" = COALESCE("created_at", CURRENT_TIMESTAMP),
    "updated_at" = COALESCE("created_at", CURRENT_TIMESTAMP)
WHERE "status" = 'DRAFT' OR "published_at" IS NULL;

-- CreateIndex: Status and PublishedAt composite index for high-performance public filtering
CREATE INDEX IF NOT EXISTS "idx_blog_posts_status_published" ON "blog_posts"("status", "published_at");

-- AddForeignKey: Author relation (admin_users) with ON DELETE SET NULL
DO $$ BEGIN
    ALTER TABLE "blog_posts" 
    ADD CONSTRAINT "blog_posts_author_id_fkey" 
    FOREIGN KEY ("author_id") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

