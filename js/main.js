/* ============================================
   GitHub Pages - Main JavaScript
   ============================================ */

// ============================================
// 博客数据（示例文章，后续可替换）
// ============================================
const blogArticles = [
    {
        id: 1,
        title: '从零搭建 ArXiv 论文自动化工作流',
        date: '2026-09-07',
        summary: '记录如何使用 Dify 搭建 ArXiv 论文自动爬取与推送系统：定时触发→网页爬虫→参数提取→迭代爬取→LLM 提炼→飞书推送，全链路自动化的完整实践。',
        tags: ['Dify', '自动化', 'AI'],
        content: `
            <h2>背景</h2>
            <p>ArXiv 上每天都有大量新论文发布，手动筛选和阅读非常耗时。于是决定用 Dify 搭建一套自动化工作流，让 AI 自动爬取、提炼并推送有价值的论文。</p>

            <h2>系统架构</h2>
            <p>整个工作流由以下核心模块组成：</p>
            <p><strong>1. 定时触发器</strong> — 每天定时启动工作流，无需人工干预。</p>
            <p><strong>2. 网页爬虫</strong> — 爬取 ArXiv 论文列表页面，获取论文链接。</p>
            <p><strong>3. 参数提取器 + 迭代</strong> — AI 提取关键 URL，逐个爬取论文详情页面。</p>
            <p><strong>4. LLM 提炼</strong> — 使用 DeepSeek 模型对论文内容进行标题、摘要和 PDF 链接的提炼。</p>
            <p><strong>5. HTTP 推送</strong> — 通过飞书 Webhook 将整理好的论文推送给团队。</p>

            <h2>踩坑记录</h2>
            <p>Dify 的迭代节点需要特别注意数据结构的设计，爬虫节点的超时设置也需要根据页面加载速度调整。最终成功实现了全自动化的论文监控和推送。</p>
        `
    },
    {
        id: 2,
        title: 'Anthropic 厂商动态自动化监控',
        date: '2026-09-05',
        summary: '基于 Dify 搭建的 Anthropic 官网新闻监控工作流，定时爬取官网→AI 判断是否有更新→通过 Resend 邮件自动推送到 QQ 邮箱，实现无人值守的厂商动态追踪。',
        tags: ['Dify', 'Resend', '监控'],
        content: `
            <h2>需求</h2>
            <p>作为 AI 产品经理，需要持续关注 Anthropic 等头部厂商的最新动态。手动检查效率低下，于是搭建了这套自动化监控系统。</p>

            <h2>工作流设计</h2>
            <p><strong>定时触发器</strong> — 每天定时启动。</p>
            <p><strong>网页爬虫</strong> — 爬取 Anthropic 官网新闻页面。</p>
            <p><strong>AI 处理</strong> — 使用 kimi-k2.7-code 模型分析页面内容，判断是否有新内容发布。</p>
            <p><strong>条件分支</strong> — 根据 AI 判断结果决定是否需要推送通知。</p>
            <p><strong>邮件推送</strong> — 有新内容时通过 Resend 中转发送到 QQ 邮箱。</p>

            <h2>效果</h2>
            <p>实现了完全无人值守的厂商动态监控，每天自动检查并推送最新信息，不错过任何重要发布。</p>
        `
    },
    {
        id: 3,
        title: 'AI Agent 入门学习笔记',
        date: '2026-07-30',
        summary: '整理学习 AI Agent 过程中的核心知识点，从基础概念到架构设计，记录一个非技术背景学习者进入 AI 领域的思考路径。',
        tags: ['AI Agent', '学习笔记'],
        content: `
            <h2>为什么学 AI Agent</h2>
            <p>作为一个目标是成为 AI 产品经理的人，理解 Agent 的底层逻辑和架构设计是必修课。不是为了写代码，而是为了能和工程师有效沟通，做出真正好用的 AI 产品。</p>

            <h2>核心概念</h2>
            <p><strong>Agent 的本质</strong> — 一个能感知环境、做出决策、执行行动的智能体。它不同于传统的 chatbot，具备记忆、工具使用和自主规划能力。</p>
            <p><strong>多 Agent 协作</strong> — 当单个 Agent 无法完成复杂任务时，多个 Agent 可以组成协作网络，各有分工，共同完成目标。</p>

            <h2>实践体会</h2>
            <p>通过在 Coze 平台上实际搭建 Agent 项目，比纯看文档和教程的理解深了不止一个层次。动手做是学习 AI 产品最有效的方式。</p>
        `
    }
];

// ============================================
// 开屏动画控制
// ============================================
class SplashScreen {
    constructor() {
        this.splash = document.getElementById('splash-screen');
        this.mainContent = document.getElementById('main-content');
        this.particles = document.getElementById('particles');
        this.enterBtn = document.getElementById('enterBtn');
        this.bgImageLayer = document.getElementById('bgImageLayer');

        this.init();
    }

    init() {
        this.createParticles();
        // 按钮直接显示
        this.enterBtn.classList.add('visible');

        // 绑定点击事件
        this.enterBtn.addEventListener('click', () => this.enterSite());
    }

    createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (3 + Math.random() * 3) + 's';

            // 随机颜色
            const colors = ['#a855f7', '#ec4899', '#f59e0b', '#6366f1'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            this.particles.appendChild(particle);
        }
    }

    enterSite() {
        // 淡出开屏，进入主页
        this.splash.classList.add('fade-out');
        this.mainContent.classList.remove('hidden');

        setTimeout(() => {
            this.splash.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.initScrollAnimations();
            this.initNavigation();
            this.renderBlog();
            this.initImageModal();
        }, 1000);
    }

    // ============================================
    // 滚动动画
    // ============================================
    initScrollAnimations() {
        // 给各个元素添加 reveal 类
        const revealElements = document.querySelectorAll(
            '.glass-card, .section-title, .hero-content, .blog-card, .project-card'
        );
        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // 导航
    // ============================================
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileBtn = document.getElementById('navMobileBtn');
        const navLinksContainer = document.querySelector('.nav-links');

        // 滚动时导航栏变化
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // 更新当前活跃导航链接
            const sections = document.querySelectorAll('.section');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
                }
            });
        });

        // 导航链接平滑滚动
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                // 关闭移动端菜单
                navLinksContainer.classList.remove('open');
            });
        });

        // 移动端菜单
        mobileBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });
    }

    // ============================================
    // 博客渲染
    // ============================================
    renderBlog() {
        const blogList = document.getElementById('blogList');
        blogList.innerHTML = '';

        blogArticles.forEach(article => {
            const date = new Date(article.date);
            const day = date.getDate();
            const month = (date.getMonth() + 1) + '月';

            const card = document.createElement('div');
            card.className = 'blog-card glass-card reveal';
            card.innerHTML = `
                <div class="blog-date">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
                <div class="blog-info">
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <div class="blog-tags">
                        ${article.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => this.openArticle(article));
            blogList.appendChild(card);

            // 延迟触发 reveal 动画
            setTimeout(() => card.classList.add('visible'), 100);
        });
    }

    openArticle(article) {
        const modal = document.getElementById('blogModal');
        const modalArticle = document.getElementById('modalArticle');
        const date = new Date(article.date);
        const dateStr = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;

        modalArticle.innerHTML = `
            <h1>${article.title}</h1>
            <div class="article-meta">
                <span>${dateStr}</span>
                ${article.tags.map(t => `<span class="tag" style="margin-left:0.5rem;">${t}</span>`).join('')}
            </div>
            <div class="article-body">
                ${article.content}
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // 关闭弹窗
        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        };

        document.getElementById('modalClose').addEventListener('click', closeModal);
        document.getElementById('modalBackdrop').addEventListener('click', closeModal);

        // ESC 键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        }, { once: true });
    }

    // ============================================
    // 项目图片预览弹窗
    // ============================================
    initImageModal() {
        const projectImages = document.querySelectorAll('.project-image img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('imageModalImg');
        const modalCaption = document.getElementById('imageModalCaption');
        const modalBackdrop = document.getElementById('imageModalBackdrop');

        projectImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modalCaption.textContent = img.alt || '';
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            modalImg.src = '';
        };

        document.getElementById('imageModalClose').addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
}

// ============================================
// 图片配置（用户替换素材后在此配置）
// ============================================
const IMAGE_CONFIG = {
    // 贤者之塔背景图路径（放在 images/ 目录下）
    towerBg: 'images/tower-bg.jpg',
    // 角色图片路径（可选，如果不设置则使用 SVG 剪影）
    characterImg: 'images/subaru.png',
    // 头像图片路径
    avatarImg: 'images/avatar.jpg',
};

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 阻止滚动直到进入主页面
    document.body.style.overflow = 'hidden';

    // 尝试加载背景图片
    loadImages();

    // 启动开屏动画
    new SplashScreen();
});

function loadImages() {
    // 加载贤者之塔背景图
    const bgLayer = document.getElementById('bgImageLayer');
    const bgImg = new Image();
    bgImg.onload = () => {
        bgLayer.style.backgroundImage = `url('${IMAGE_CONFIG.towerBg}')`;
        bgLayer.classList.add('active');
    };
    bgImg.onerror = () => {
        console.log('背景图未找到，使用 CSS 绘制的场景');
    };
    bgImg.src = IMAGE_CONFIG.towerBg;
}
