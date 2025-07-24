-- 用戶表
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 交易表
CREATE TABLE IF NOT EXISTS trades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  enchantments TEXT, -- JSON 格式存儲附魔資訊
  slots TEXT, -- JSON 格式存儲插槽資訊
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 創建索引以提高查詢性能
CREATE INDEX IF NOT EXISTS idx_trades_seller_id ON trades(seller_id);
CREATE INDEX IF NOT EXISTS idx_trades_item_name ON trades(item_name);
CREATE INDEX IF NOT EXISTS idx_trades_status ON trades(status);
CREATE INDEX IF NOT EXISTS idx_trades_created_at ON trades(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 插入一些示例數據
INSERT OR IGNORE INTO users (id, name, email, avatar_url) VALUES
(1, 'Alice Chen', 'alice@example.com', 'https://via.placeholder.com/40'),
(2, 'Bob Lin', 'bob@example.com', 'https://via.placeholder.com/40'),
(3, 'Carol Wu', 'carol@example.com', 'https://via.placeholder.com/40');

INSERT OR IGNORE INTO trades (id, seller_id, item_id, item_name, price, quantity, enchantments, slots, description, status, created_at) VALUES
(1, 1, 12345, '+9 聖劍', 150000, 1, '["攻擊力+50", "暴擊率+15%"]', '["紅寶石", "藍寶石"]', '極品聖劍，PVP必備', 'active', datetime('now', '-2 hours')),
(2, 2, 67890, '龍鱗盔甲', 80000, 1, '["防禦力+30", "火抗+20%"]', '["鑽石", "空槽"]', '高防龍鱗盔甲', 'active', datetime('now', '-1 hour')),
(3, 3, 11111, '魔法法杖', 120000, 1, '["魔攻+40", "MP恢復+10%"]', '["魔法石", "空槽", "空槽"]', '法師專用高階法杖', 'active', datetime('now', '-30 minutes')),
(4, 1, 22222, '疾風之靴', 45000, 1, '["移速+25%", "閃避+10%"]', '["風之石"]', '輕便疾風靴', 'active', datetime('now', '-15 minutes')),
(5, 2, 33333, '治療藥水', 500, 10, '[]', '[]', '高級治療藥水 x10', 'active', datetime('now', '-5 minutes'));
