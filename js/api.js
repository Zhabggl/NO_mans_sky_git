// API接口系统 - 使用localStorage作为数据存储

class ArtifactAPI {
    constructor() {
        this.storageKey = 'artifacts';
        this.fileStoragePrefix = 'artifact_';
    }
    
    // 获取所有文物
    getAllArtifacts() {
        try {
            const artifacts = localStorage.getItem(this.storageKey);
            return artifacts ? JSON.parse(artifacts) : [];
        } catch (error) {
            console.error('获取文物列表失败:', error);
            return [];
        }
    }
    
    // 根据分类获取文物
    getArtifactsByCategory(category) {
        const allArtifacts = this.getAllArtifacts();
        return allArtifacts.filter(artifact => artifact.category === category);
    }
    
    // 根据ID获取文物
    getArtifactById(id) {
        try {
            const artifactData = localStorage.getItem(`${this.fileStoragePrefix}${id}`);
            return artifactData ? JSON.parse(artifactData) : null;
        } catch (error) {
            console.error('获取文物详情失败:', error);
            return null;
        }
    }
    
    // 添加新文物
    addArtifact(artifact) {
        try {
            // 获取现有文物列表
            const allArtifacts = this.getAllArtifacts();
            
            // 添加新文物
            allArtifacts.push(artifact);
            
            // 保存更新后的列表
            localStorage.setItem(this.storageKey, JSON.stringify(allArtifacts));
            
            // 保存文物详细数据
            localStorage.setItem(`${this.fileStoragePrefix}${artifact.id}`, JSON.stringify(artifact));
            
            return true;
        } catch (error) {
            console.error('添加文物失败:', error);
            return false;
        }
    }
    
    // 更新文物
    updateArtifact(id, updates) {
        try {
            const artifact = this.getArtifactById(id);
            if (!artifact) {
                return false;
            }
            
            // 更新文物数据
            const updatedArtifact = { ...artifact, ...updates };
            
            // 保存更新后的数据
            localStorage.setItem(`${this.fileStoragePrefix}${id}`, JSON.stringify(updatedArtifact));
            
            // 更新文物列表
            const allArtifacts = this.getAllArtifacts();
            const index = allArtifacts.findIndex(a => a.id === id);
            if (index !== -1) {
                allArtifacts[index] = { ...allArtifacts[index], ...updates };
                localStorage.setItem(this.storageKey, JSON.stringify(allArtifacts));
            }
            
            return true;
        } catch (error) {
            console.error('更新文物失败:', error);
            return false;
        }
    }
    
    // 删除文物
    deleteArtifact(id) {
        try {
            // 删除文物详细数据
            localStorage.removeItem(`${this.fileStoragePrefix}${id}`);
            
            // 更新文物列表
            const allArtifacts = this.getAllArtifacts();
            const filteredArtifacts = allArtifacts.filter(a => a.id !== id);
            localStorage.setItem(this.storageKey, JSON.stringify(filteredArtifacts));
            
            return true;
        } catch (error) {
            console.error('删除文物失败:', error);
            return false;
        }
    }
    
    // 获取文物统计数据
    getStats() {
        try {
            const allArtifacts = this.getAllArtifacts();
            const categories = [...new Set(allArtifacts.map(a => a.category))];
            
            return {
                totalArtifacts: allArtifacts.length,
                totalCategories: categories.length,
                artifactsByCategory: categories.map(category => {
                    const count = allArtifacts.filter(a => a.category === category).length;
                    return { category, count };
                })
            };
        } catch (error) {
            console.error('获取统计数据失败:', error);
            return {
                totalArtifacts: 0,
                totalCategories: 0,
                artifactsByCategory: []
            };
        }
    }
    
    // 搜索文物
    searchArtifacts(query) {
        try {
            const allArtifacts = this.getAllArtifacts();
            const lowerQuery = query.toLowerCase();
            
            return allArtifacts.filter(artifact => 
                artifact.name.toLowerCase().includes(lowerQuery) ||
                artifact.description.toLowerCase().includes(lowerQuery) ||
                artifact.category.toLowerCase().includes(lowerQuery)
            );
        } catch (error) {
            console.error('搜索文物失败:', error);
            return [];
        }
    }
}

// 导出API实例
const artifactAPI = new ArtifactAPI();
