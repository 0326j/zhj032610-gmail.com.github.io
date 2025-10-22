# GitHub Actions Workflows

## deploy.yml - 自动部署到 GitHub Pages

这个工作流会在每次推送到 `main` 分支时自动构建并部署博客到 GitHub Pages。

### 功能特性

- ✅ 自动触发：推送到 main 分支时自动运行
- ✅ 手动触发：支持通过 GitHub Actions 界面手动触发
- ✅ 使用 pnpm：与项目的包管理器保持一致
- ✅ 现代部署：使用官方 GitHub Pages Actions，无需自定义 token
- ✅ 安全权限：仅授予必要的权限

### 配置步骤

1. **启用 GitHub Actions**
   - 进入仓库的 Actions 标签页
   - 如果 Actions 被禁用，点击启用

2. **配置 GitHub Pages**
   - 进入 Settings → Pages
   - 在 "Build and deployment" 部分
   - Source 选择 "GitHub Actions"
   - 保存设置

3. **推送到 main 分支**
   - 将代码推送到 main 分支
   - 工作流会自动运行
   - 构建完成后，网站会自动部署到 GitHub Pages

### 工作流程

1. **Build Job**: 构建 Astro 站点
   - 检出代码
   - 设置 pnpm 和 Node.js 环境
   - 安装依赖
   - 运行 Astro 构建
   - 上传构建产物

2. **Deploy Job**: 部署到 GitHub Pages
   - 使用官方 deploy-pages action
   - 自动部署构建产物到 GitHub Pages

### 注意事项

- 确保 `astro.config.mjs` 中的 `site` 配置正确
- 部署后的网站地址会显示在工作流执行结果中
- 如果部署失败，检查 GitHub Pages 是否已正确配置为使用 GitHub Actions
