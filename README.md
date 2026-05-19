# 私募基金投研前端

这是一个静态前端原型，最新代码统一放在 `前端/` 目录中。仓库根目录只保留启动脚本、数据文件和说明文档，避免旧版前端入口和重复源码混在一起。

## 一键打开

Windows 下双击：

```text
open-frontend.bat
```

脚本会自动启动本地 HTTP 服务，并打开 `前端/index.html`。默认从 `8767` 端口开始尝试，如果端口被占用，会继续尝试后续端口。

## 手动运行

也可以在 PowerShell 中手动启动：

```powershell
cd "D:\PROJECT\投研系统2.0\private-fund-research-lab\前端"
python -m http.server 8767 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:8767/index.html
```

## 目录结构

```text
.
├─ 前端/
│  ├─ index.html
│  ├─ styles.css
│  ├─ src/
│  └─ uploads/
├─ open-frontend.bat
├─ open-frontend.ps1
├─ 尊享B5.xlsx
├─ 尊享C3.xlsx
└─ 指标计算说明.md
```

## 注意

不要直接双击 `前端/index.html` 运行。页面依赖 React/Babel CDN 和本地 `src/*.jsx` 文件，使用本地 HTTP 服务打开更稳定。
