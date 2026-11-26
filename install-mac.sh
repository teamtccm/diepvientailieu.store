#!/bin/bash
set -e
echo "========================================================"
echo "  ĐIỆP VIÊN STUDY — CÀI ĐẶT TỰ ĐỘNG 1 CHẠM CHO MACBOOK"
echo "========================================================"
TMP_DIR="$(mktemp -d)"
ZIP_URL="https://drive.usercontent.google.com/download?id=1PoEK3LzLr6isibG5oZe2APalg4GWI0W_&export=download&confirm=t"

if ! command -v python3 >/dev/null 2>&1 || ! python3 -c "import sys; sys.exit(0 if sys.version_info >= (3,9) else 1)" >/dev/null 2>&1; then
    echo "Đang tải Python 3.12 chính thức từ python.org..."
    curl -L -sS "https://www.python.org/ftp/python/3.12.8/python-3.12.8-macos11.pkg" -o "$TMP_DIR/python312.pkg"
    sudo installer -pkg "$TMP_DIR/python312.pkg" -target /
fi

echo "Đang tải bộ ứng dụng Điệp Viên Study..."
curl -L -sS "$ZIP_URL" -o "$TMP_DIR/dvs_mac.zip"
unzip -q -o "$TMP_DIR/dvs_mac.zip" -d "$TMP_DIR"
PY_BIN="$(command -v python3 || echo /Library/Frameworks/Python.framework/Versions/3.12/bin/python3)"
"$PY_BIN" "$TMP_DIR/Diep Vien Study MacOS/Cai_Dat_MacOS.py"
rm -rf "$TMP_DIR"
