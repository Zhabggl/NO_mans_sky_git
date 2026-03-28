import os
import shutil

# 定义源目录和目标目录
source_dir = "d:\\solo\\NO_mans_sky_git"
uploads_dir = os.path.join(source_dir, "uploads")

# 定义分类映射
categories = {
    "at": "阿特拉斯文物",
    "bz": "标本类文物",
    "js": "技术装置",
    "sw": "生物文物",
    "sy": "生物标本",
    "wx": "文献资料",
    "yw": "遗物类文物",
    "zg": "植物文物",
    "zw": "植物标本"
}

# 确保目标目录存在
for category in categories.keys():
    category_dir = os.path.join(uploads_dir, category)
    if not os.path.exists(category_dir):
        os.makedirs(category_dir)
        print(f"创建目录: {category_dir}")

# 移动图片文件
for file in os.listdir(source_dir):
    if file.endswith(".png"):
        # 提取分类
        parts = file.split("_")
        if len(parts) >= 2:
            category = parts[0]
            if category in categories:
                source_path = os.path.join(source_dir, file)
                target_dir = os.path.join(uploads_dir, category)
                target_path = os.path.join(target_dir, file)
                
                try:
                    shutil.move(source_path, target_path)
                    print(f"移动文件: {file} -> {target_dir}")
                except Exception as e:
                    print(f"移动文件失败: {file}, 错误: {e}")

print("文件移动完成！")
