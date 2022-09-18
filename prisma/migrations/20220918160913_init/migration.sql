-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegram_id" TEXT,
    "real_name" TEXT NOT NULL,
    "fiction_name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "opened_at" DATETIME,
    "room_id" INTEGER NOT NULL,
    CONSTRAINT "Player_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
