// 增强版阅读时间计算器 - 学习DOM操作的好例子

function renderReadingTime(article) {
    // alert("Script injected!"); // 调试用，确保脚本被执行
    // 如果没有文章数据则直接退出
    if (!article) {
        console.log("No article found");
        return;
    }

    // 1. DOM查询 - 获取文章文本内容
    const text = article.textContent;
    
    // 2. 正则表达式匹配 - 计算单词数量
    const wordMatchRegExp = /[^\s]+/g; // 匹配所有非空字符
    const words = text.matchAll(wordMatchRegExp);

    // 3. 迭代器转换为数组 - 学习ES6语法
    const wordCount = [...words].length;
    // 等价写法：const wordCount = Array.from(words).length;
    
    // 4. 计算阅读时间（假设每分钟200词）
    const readingTime = Math.round(wordCount / 200);
    
    // 5. 创建新的DOM元素
    const badge = document.createElement("p");
    
    // 6. 设置元素属性和样式
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `${readingTime} min read`;
    
    // 7. 添加自定义样式（学习CSS-in-JS）
    badge.style.cssText = `
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        margin: 10px 0;
        display: inline-block;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    // 8. 添加交互功能（学习事件处理）
    badge.addEventListener("click", function() {
        // 学习this关键字和事件对象
        console.log(`文章包含 ${wordCount} 个单词`);
        this.style.transform = "scale(1.1)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 200);
    });
    
    // 9. 添加鼠标悬停效果
    badge.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    });
    
    badge.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    });

    // 10. DOM查询和条件插入 - 学习多种选择器
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    
    // 11. 空值合并操作符 - 现代JavaScript语法
    const targetElement = date ?? heading;
    
    if (targetElement) {
        // 12. 插入元素到DOM中
        targetElement.insertAdjacentElement("afterend", badge);
        
        // 13. 添加成功提示
        console.log("阅读时间标签已添加！");
    } else {
        // 14. 错误处理 - 如果没有找到目标元素
        console.warn("未找到合适的插入位置");
        // 15. 备用方案 - 插入到文章开头
        article.insertAdjacentElement("afterbegin", badge);
    }
}

// 16. 页面加载完成后执行
function initializeReadingTime() {
    // 等待DOM完全加载
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            const article = document.querySelector("article");
            if (article) {
                renderReadingTime(article);
            }
        });
    } else {
        // DOM已经加载完成
        const article = document.querySelector("article");
        if (article) {
            renderReadingTime(article);
        }
    }
}

// 17. 执行初始化
initializeReadingTime();

// 18. 学习：如何监听页面变化（动态内容加载）
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
            // 检查是否有新的article元素
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "ARTICLE") {
                    renderReadingTime(node);
                }
            });
        }
    });
});

// 19. 开始观察DOM变化
observer.observe(document.body, {
    childList: true,
    subtree: true
});