/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Room" ("id", "status") SELECT "id", "status" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegram_id" TEXT,
    "real_name" TEXT NOT NULL,
    "fiction_name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "opened_at" DATETIME,
    "room_id" TEXT NOT NULL,
    CONSTRAINT "Player_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("fiction_name", "id", "opened_at", "real_name", "room_id", "status", "telegram_id") SELECT "fiction_name", "id", "opened_at", "real_name", "room_id", "status", "telegram_id" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
