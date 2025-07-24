PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users VALUES(1,'Alice Chen','alice@example.com','https://via.placeholder.com/40','2025-07-24 07:36:16','2025-07-24 07:36:16');
INSERT INTO users VALUES(2,'Bob Lin','bob@example.com','https://via.placeholder.com/40','2025-07-24 07:36:16','2025-07-24 07:36:16');
INSERT INTO users VALUES(3,'Carol Wu','carol@example.com','https://via.placeholder.com/40','2025-07-24 07:36:16','2025-07-24 07:36:16');
CREATE TABLE trades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  enchantments TEXT, 
  slots TEXT, 
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO trades VALUES(1,1,12345,'+9 聖劍',150000,1,'["攻擊力+50", "暴擊率+15%"]','["紅寶石", "藍寶石"]','極品聖劍，PVP必備','active','2025-07-24 05:36:16','2025-07-24 07:36:16',NULL);
INSERT INTO trades VALUES(2,2,67890,'龍鱗盔甲',80000,1,'["防禦力+30", "火抗+20%"]','["鑽石", "空槽"]','高防龍鱗盔甲','active','2025-07-24 06:36:16','2025-07-24 07:36:16',NULL);
INSERT INTO trades VALUES(3,3,11111,'魔法法杖',120000,1,'["魔攻+40", "MP恢復+10%"]','["魔法石", "空槽", "空槽"]','法師專用高階法杖','active','2025-07-24 07:06:16','2025-07-24 07:36:16',NULL);
INSERT INTO trades VALUES(4,1,22222,'疾風之靴',45000,1,'["移速+25%", "閃避+10%"]','["風之石"]','輕便疾風靴','active','2025-07-24 07:21:16','2025-07-24 07:36:16',NULL);
INSERT INTO trades VALUES(5,2,33333,'治療藥水',500,10,'[]','[]','高級治療藥水 x10','active','2025-07-24 07:31:16','2025-07-24 07:36:16',NULL);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('users',3);
INSERT INTO sqlite_sequence VALUES('trades',5);
CREATE INDEX idx_trades_seller_id ON trades(seller_id);
CREATE INDEX idx_trades_item_name ON trades(item_name);
CREATE INDEX idx_trades_status ON trades(status);
CREATE INDEX idx_trades_created_at ON trades(created_at);
CREATE INDEX idx_users_email ON users(email);