// 社区互动功能 - 第一阶段：点赞和分享

// 初始化点赞功能
function initLikeFunctionality() {
    // 为所有点赞按钮添加事件监听器
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        // 移除旧的事件监听器（防止重复绑定）
        button.removeEventListener('click', handleLikeClick);
        // 添加新的事件监听器
        button.addEventListener('click', handleLikeClick);
    });
}

// 处理点赞点击事件
function handleLikeClick() {
    const artifactId = this.getAttribute('data-artifact-id');
    toggleLike(artifactId, this);
}

// 切换点赞状态
function toggleLike(artifactId, button) {
    // 从本地存储获取当前点赞状态
    let likedArtifacts = localStorage.getItem('likedArtifacts');
    if (!likedArtifacts) {
        likedArtifacts = [];
    } else {
        likedArtifacts = JSON.parse(likedArtifacts);
    }
    
    // 检查是否已点赞
    const isLiked = likedArtifacts.includes(artifactId);
    
    // 获取当前点赞数量
    let likeCount = parseInt(localStorage.getItem(`artifact_likes_${artifactId}`)) || 0;
    
    if (isLiked) {
        // 取消点赞
        likedArtifacts = likedArtifacts.filter(id => id !== artifactId);
        button.classList.remove('liked');
        likeCount = Math.max(0, likeCount - 1);
    } else {
        // 添加点赞
        likedArtifacts.push(artifactId);
        button.classList.add('liked');
        likeCount = likeCount + 1;
    }
    
    // 保存点赞状态到本地存储
    localStorage.setItem('likedArtifacts', JSON.stringify(likedArtifacts));
    // 保存点赞数量到本地存储
    localStorage.setItem(`artifact_likes_${artifactId}`, likeCount);
    
    // 更新页面上所有相关元素的显示
    updateAllLikeDisplays(artifactId, likeCount, !isLiked);
}

// 更新页面上所有相关元素的显示
function updateAllLikeDisplays(artifactId, likeCount, isLiked) {
    // 更新所有点赞按钮的显示
    const likeButtons = document.querySelectorAll(`.like-button[data-artifact-id="${artifactId}"]`);
    likeButtons.forEach(button => {
        if (isLiked) {
            button.classList.add('liked');
            button.innerHTML = `<span class="like-icon">💖</span><span>已点赞</span><span class="like-count">${likeCount}</span>`;
        } else {
            button.classList.remove('liked');
            button.innerHTML = `<span class="like-icon">❤️</span><span>点赞</span><span class="like-count">${likeCount}</span>`;
        }
    });
    
    // 更新所有点赞数量显示（包括卡片上的统计信息）
    const allLikeCountElements = document.querySelectorAll(`[data-artifact-id="${artifactId}"] .like-count`);
    allLikeCountElements.forEach(element => {
        element.textContent = likeCount;
    });
    
    // 更新卡片上的点赞统计文本
    const cardStatsElements = document.querySelectorAll(`[data-artifact-id="${artifactId}"] .card-stats`);
    cardStatsElements.forEach(element => {
        element.innerHTML = `❤️ ${likeCount} 点赞`;
    });
    
    // 更新其他可能显示点赞数量的元素
    const allCardContents = document.querySelectorAll(`[data-artifact-id="${artifactId}"]`);
    allCardContents.forEach(content => {
        // 查找并更新点赞统计行
        const statsRow = content.querySelector('.stats-row');
        if (statsRow) {
            const likeSpan = statsRow.querySelector('.like-stat');
            if (likeSpan) {
                likeSpan.innerHTML = `❤️ ${likeCount} 点赞`;
            }
        }
    });
    
    // 更新详情页面上的点赞数量（如果有的话）
    const artifactDetail = document.getElementById('artifact-detail');
    if (artifactDetail) {
        const detailLikeCount = artifactDetail.querySelector(`.like-button[data-artifact-id="${artifactId}"] .like-count`);
        if (detailLikeCount) {
            detailLikeCount.textContent = likeCount;
        }
    }
}

// 获取点赞数量
function getLikeCount(artifactId) {
    return parseInt(localStorage.getItem(`artifact_likes_${artifactId}`)) || 0;
}

// 初始化分享功能
function initShareFunctionality() {
    // 为所有分享按钮添加事件监听器
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        // 移除旧的事件监听器（防止重复绑定）
        button.removeEventListener('click', handleShareClick);
        // 添加新的事件监听器
        button.addEventListener('click', handleShareClick);
    });
}

// 处理分享点击事件
function handleShareClick() {
    const artifactId = this.getAttribute('data-artifact-id');
    shareArtifact(artifactId);
}

// 分享文物
function shareArtifact(artifactId) {
    // 构建分享URL
    const shareUrl = `${window.location.origin}/artifact.html?id=${artifactId}`;
    const artifactNameElement = document.querySelector(`[data-artifact-id="${artifactId}"] .artifact-name`);
    const artifactName = artifactNameElement ? artifactNameElement.textContent : '文物';
    
    // 分享文本
    const shareText = `在无人深空博物馆发现了一件有趣的文物：${artifactName}`;
    
    // 检查是否支持Web Share API
    if (navigator.share) {
        // 使用原生分享功能
        navigator.share({
            title: artifactName,
            text: shareText,
            url: shareUrl
        }).catch(err => {
            console.error('分享失败:', err);
            // 降级到复制链接
            copyToClipboard(shareUrl);
        });
    } else {
        // 降级到复制链接
        copyToClipboard(shareUrl);
    }
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('链接已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败:', err);
            showNotification('复制失败，请手动复制链接');
        });
    } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('链接已复制到剪贴板！');
    }
}

// 显示通知
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 添加样式
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'rgba(0, 240, 255, 0.9)';
    notification.style.color = '#0a192f';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = 'bold';
    notification.style.animation = 'slideIn 0.3s ease-in-out';
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后移除
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-in-out reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// 恢复点赞状态
function restoreLikeStatus() {
    let likedArtifacts = localStorage.getItem('likedArtifacts');
    if (!likedArtifacts) {
        likedArtifacts = [];
    } else {
        likedArtifacts = JSON.parse(likedArtifacts);
    }
    
    // 更新所有点赞按钮的状态
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const artifactId = button.getAttribute('data-artifact-id');
        const likeCount = getLikeCount(artifactId);
        const isLiked = likedArtifacts.includes(artifactId);
        
        if (isLiked) {
            button.classList.add('liked');
            button.innerHTML = `<span class="like-icon">💖</span><span>已点赞</span><span class="like-count">${likeCount}</span>`;
        } else {
            button.classList.remove('liked');
            button.innerHTML = `<span class="like-icon">❤️</span><span>点赞</span><span class="like-count">${likeCount}</span>`;
        }
    });
    
    // 更新所有卡片上的点赞统计
    const allCardContents = document.querySelectorAll('[data-artifact-id]');
    allCardContents.forEach(content => {
        const artifactId = content.getAttribute('data-artifact-id');
        if (artifactId) {
            const likeCount = getLikeCount(artifactId);
            
            // 查找并更新点赞统计行
            const statsRow = content.querySelector('.stats-row');
            if (statsRow) {
                const likeSpan = statsRow.querySelector('.like-stat');
                if (likeSpan) {
                    likeSpan.innerHTML = `❤️ ${likeCount} 点赞`;
                }
            }
        }
    });
}

// 当页面加载完成后初始化互动功能
document.addEventListener('DOMContentLoaded', function() {
    initLikeFunctionality();
    initShareFunctionality();
    restoreLikeStatus();
});

// 导出函数（如果需要在其他脚本中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLikeFunctionality,
        initShareFunctionality,
        restoreLikeStatus,
        getLikeCount,
        updateAllLikeDisplays
    };
}
