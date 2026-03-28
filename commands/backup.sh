#!/bin/bash

# Load .env TRƯỚC (phải lên đầu)
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Cấu hình (sau khi đã load .env)
CONTAINER_NAME="wordpress_db"
DB_NAME="wordpress"
DB_USER="root"
DB_PASSWORD="${DB_ROOT_PASSWORD:-rootsecurepassword}"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="$BACKUP_DIR/backup.sql"

mkdir -p "$BACKUP_DIR"

# Chạy mysqldump, ẩn warning password
docker exec "$CONTAINER_NAME" \
  mysqldump -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" \
  2>/dev/null \
  > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Backup thành công: $OUTPUT_FILE"
else
  echo "❌ Backup thất bại!"
  rm -f "$OUTPUT_FILE"
  exit 1
fi