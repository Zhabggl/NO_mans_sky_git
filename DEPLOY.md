# GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建GitHub仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 仓库名称填写：`NO_mans_sky_git`
4. 选择 **Public**
5. 点击 **Create repository**

### 2. 上传文件到GitHub

#### 方法一：Git命令行（推荐）

```bash
# 进入项目目录
cd NO_mans_sky_git

# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: 无人深空博物馆上线"

# 连接远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/NO_mans_sky_git.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

#### 方法二：GitHub Desktop（图形界面）

1. 下载 [GitHub Desktop](https://desktop.github.com)
2. 打开软件，登录GitHub账号
3. 选择 **File** → **Add local repository**
4. 选择 `NO_mans_sky_git` 文件夹
5. 点击 **Publish repository**

#### 方法三：网页上传（最简单）

1. 在GitHub仓库页面点击 **Add file** → **Upload files**
2. 拖拽 `NO_mans_sky_git` 文件夹内的所有文件
3. 点击 **Commit changes**

### 3. 启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单选择 **Pages**
4. **Source** 选择 **Deploy from a branch**
5. **Branch** 选择 **main** → **/ (root)**
6. 点击 **Save**

### 4. 访问网站

等待1-2分钟后，访问：
```
https://YOUR_USERNAME.github.io/NO_mans_sky_git
```

将 `YOUR_USERNAME` 替换为你的GitHub用户名。

## 自定义域名（可选）

1. 在仓库根目录创建文件 `CNAME`（无后缀）
2. 内容填写你的域名，如：`museum.yourdomain.com`
3. 提交并推送
4. 在域名服务商添加CNAME记录：
   - 主机记录：`museum`（或你的子域名）
   - 记录值：`YOUR_USERNAME.github.io`

## 更新网站

修改文件后，重新推送：

```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Pages会自动重新部署。

## 故障排除

### 网站显示404
- 检查仓库是否为Public
- 确认GitHub Pages已启用
- 等待1-2分钟让部署完成

### 样式或图片不显示
- 检查文件路径是否正确
- 确认所有资源文件已上传

### 中文显示乱码
- 确保HTML文件有 `<meta charset="UTF-8">`

## 需要帮助？

查看 [GitHub Pages文档](https://docs.github.com/en/pages)