# GitHub Actions 部署文档 / Deployment Documentation

## 概述 / Overview

本仓库使用 GitHub Actions 自动构建和部署 Astro 博客到 GitHub Pages。

This repository uses GitHub Actions to automatically build and deploy the Astro blog to GitHub Pages.

## 工作流文件 / Workflow File

工作流配置文件位于：`.github/workflows/deploy.yml`

The workflow configuration is located at: `.github/workflows/deploy.yml`

## 触发条件 / Trigger Conditions

工作流将在以下情况下自动触发：
- 推送代码到 `main` 分支时自动触发
- 可以在 GitHub Actions 界面手动触发 (`workflow_dispatch`)

The workflow is automatically triggered when:
- Code is pushed to the `main` branch
- Manually triggered from the GitHub Actions interface (`workflow_dispatch`)

## 工作流步骤 / Workflow Steps

### Build Job

1. **Checkout** - 检出代码 / Check out the code
2. **Setup pnpm** - 设置 pnpm 包管理器 (v8) / Set up pnpm package manager (v8)
3. **Setup Node.js** - 设置 Node.js 环境 (v20) 并配置缓存 / Set up Node.js environment (v20) with cache
4. **Setup Pages** - 配置 GitHub Pages / Configure GitHub Pages
5. **Install dependencies** - 安装项目依赖 / Install project dependencies
6. **Build with Astro** - 使用 Astro 构建静态站点 / Build static site with Astro
7. **Upload artifact** - 上传构建产物 / Upload build artifacts

### Deploy Job

1. **Deploy to GitHub Pages** - 将构建产物部署到 GitHub Pages / Deploy build artifacts to GitHub Pages

## 环境变量 / Environment Variables

工作流在构建时会自动设置以下环境变量：

The workflow automatically sets the following environment variables during build:

- `NODE_ENV=production` - 生产环境标识
- `CI=true` - CI 环境标识
- `GITHUB_REPOSITORY` - 仓库全名（如 `username/repo-name`）
- `GITHUB_REPOSITORY_OWNER` - 仓库所有者用户名

这些环境变量用于 Astro 配置文件中自动确定部署的 URL 和路径。

These environment variables are used in the Astro config to automatically determine the deployment URL and path.

## 权限配置 / Permissions

工作流需要以下权限：

The workflow requires the following permissions:

- `contents: read` - 读取仓库内容
- `pages: write` - 写入 GitHub Pages
- `id-token: write` - 写入 ID token（用于部署验证）

## 启用 GitHub Pages / Enable GitHub Pages

在使用此工作流之前，需要在仓库设置中启用 GitHub Pages：

Before using this workflow, you need to enable GitHub Pages in the repository settings:

1. 进入仓库的 **Settings** > **Pages** / Navigate to **Settings** > **Pages**
2. 在 **Build and deployment** 部分 / In the **Build and deployment** section
3. **Source** 选择 **GitHub Actions** / Set **Source** to **GitHub Actions**

## Astro 配置 / Astro Configuration

项目的 `astro.config.mjs` 已配置为根据环境变量自动设置：

The project's `astro.config.mjs` is configured to automatically set:

- **site**: 根据 `GITHUB_REPOSITORY_OWNER` 自动生成站点 URL
- **base**: 
  - 如果仓库名为 `username.github.io`，则部署在根路径（`/`）
  - 否则部署在子路径（`/repo-name`）

Configuration:

- **site**: Automatically generates the site URL based on `GITHUB_REPOSITORY_OWNER`
- **base**: 
  - If the repository name is `username.github.io`, deploy to root path (`/`)
  - Otherwise deploy to subpath (`/repo-name`)

## 部署时间 / Deployment Time

- 构建通常需要 2-3 分钟
- GitHub Pages 部署可能需要额外 1-2 分钟生效

Typical deployment time:

- Build usually takes 2-3 minutes
- GitHub Pages deployment may take an additional 1-2 minutes to take effect

## 故障排除 / Troubleshooting

### 工作流失败 / Workflow Fails

1. 检查 Actions 标签页中的日志 / Check the logs in the Actions tab
2. 确保所有依赖正确安装 / Ensure all dependencies are correctly installed
3. 验证 `package.json` 和 `pnpm-lock.yaml` 同步 / Verify `package.json` and `pnpm-lock.yaml` are in sync

### 页面无法访问 / Page Not Accessible

1. 确认 GitHub Pages 已启用并设置为 GitHub Actions 源 / Confirm GitHub Pages is enabled with GitHub Actions source
2. 检查仓库是否公开（GitHub Pages 在私有仓库需要 Pro 账户）/ Check if the repository is public (GitHub Pages for private repos requires Pro)
3. 等待几分钟让部署生效 / Wait a few minutes for the deployment to take effect

### 资源路径错误 / Asset Path Errors

如果页面部署后样式或脚本无法加载，可能是 base 路径配置问题：

If styles or scripts fail to load after deployment, it may be a base path issue:

1. 检查 `astro.config.mjs` 中的 `base` 配置
2. 确保所有静态资源引用使用相对路径或 Astro 的 `import` 语法

Check:

1. The `base` configuration in `astro.config.mjs`
2. All static assets use relative paths or Astro's `import` syntax

## 缓存 / Caching

工作流使用 pnpm 缓存来加速依赖安装：

The workflow uses pnpm caching to speed up dependency installation:

- Node.js setup 步骤会自动缓存 pnpm 依赖
- 缓存键基于 `pnpm-lock.yaml` 文件

Cache details:

- The Node.js setup step automatically caches pnpm dependencies
- Cache key is based on the `pnpm-lock.yaml` file

## 并发控制 / Concurrency Control

工作流配置了并发控制以避免同时运行多个部署：

The workflow is configured with concurrency control to avoid multiple simultaneous deployments:

- 使用 `pages` 作为并发组 / Uses `pages` as the concurrency group
- 新的部署不会取消正在进行的部署 / New deployments don't cancel in-progress ones

## 版本信息 / Version Information

- **GitHub Actions**: 使用最新的 v4 actions
- **Node.js**: 20.x
- **pnpm**: 8.x
- **Astro**: 4.x

## 相关链接 / Related Links

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Astro 部署文档](https://docs.astro.build/en/guides/deploy/github/)
- [pnpm 文档](https://pnpm.io/)
