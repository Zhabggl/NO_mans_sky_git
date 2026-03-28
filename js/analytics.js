// 网站访问量统计功能

// 初始化访问量计数器
function initVisitorCount() {
    // 从本地存储获取当前访问量
    let count = localStorage.getItem('visitorCount');
    
    // 如果不存在，初始化为0
    if (!count) {
        count = 0;
    }
    
    // 增加访问量
    count = parseInt(count) + 1;
    
    // 保存到本地存储
    localStorage.setItem('visitorCount', count);
    
    return count;
}

// 更新页面上的访问量显示
function updateVisitorCount() {
    const count = initVisitorCount();
    
    // 更新about.html页面的访问量显示
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = count;
    }
    
    // 可以在其他页面添加访问量显示
    // 例如在首页添加一个访问量显示
    const homeVisitorCountElement = document.getElementById('home-visitor-count');
    if (homeVisitorCountElement) {
        homeVisitorCountElement.textContent = count;
    }
}

// 跟踪文物浏览量
function trackArtifactView(artifactId) {
    if (!artifactId) return;
    
    // 从本地存储获取当前浏览量
    let viewCount = localStorage.getItem(`artifact_views_${artifactId}`);
    
    // 如果不存在，初始化为0
    if (!viewCount) {
        viewCount = 0;
    }
    
    // 增加浏览量
    viewCount = parseInt(viewCount) + 1;
    
    // 保存到本地存储
    localStorage.setItem(`artifact_views_${artifactId}`, viewCount);
    
    return viewCount;
}

// 获取文物浏览量
function getArtifactViewCount(artifactId) {
    const viewCount = localStorage.getItem(`artifact_views_${artifactId}`);
    return viewCount ? parseInt(viewCount) : 0;
}

// 当页面加载完成后初始化访问量统计
document.addEventListener('DOMContentLoaded', function() {
    updateVisitorCount();
    
    // 检查是否在文物详情页面
    const artifactDetail = document.getElementById('artifact-detail');
    if (artifactDetail) {
        // 从URL获取文物ID
        const urlParams = new URLSearchParams(window.location.search);
        const artifactId = urlParams.get('id');
        if (artifactId) {
            trackArtifactView(artifactId);
        }
    }
});

// 导出函数（如果需要在其他脚本中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initVisitorCount,
        updateVisitorCount,
        trackArtifactView,
        getArtifactViewCount
    };
}
