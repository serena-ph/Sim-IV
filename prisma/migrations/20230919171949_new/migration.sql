/*
  Warnings:

  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "content",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
