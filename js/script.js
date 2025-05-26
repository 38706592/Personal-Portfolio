// 等待頁面加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 淡出載入動畫
    setTimeout(function() {
        const loader = document.querySelector('.loader-wrapper');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);

    // 導航欄連結點擊事件
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 獲取目標部分
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // 檢查是否點擊的是當前已經活動的分頁
            if (this.classList.contains('active') && targetSection.classList.contains('active')) {
                // 如果當前分頁正在顯示內容頁面，返回主畫面
                const sectionContainer = targetSection.querySelector('.section-container');
                const sectionContent = targetSection.querySelector('.section-content');
                
                if (!sectionContent.classList.contains('hide')) {
                    // 隱藏內容頁面，顯示主畫面
                    sectionContent.classList.add('hide');
                    setTimeout(() => {
                        sectionContainer.style.display = 'flex';
                        sectionContainer.style.opacity = '1';
                        sectionContainer.style.transform = 'translateY(0)';
                    }, 300);
                }
                return; // 不執行後續的切換邏輯
            }
            
            // 移除所有活動狀態
            navLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(section => {
                section.classList.remove('active');
                // 隱藏內容並重置主畫面狀態
                const content = section.querySelector('.section-content');
                const container = section.querySelector('.section-container');
                if (content) {
                    content.classList.add('hide');
                }
                if (container) {
                    container.style.display = 'flex';
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }
            });
            
            // 添加活動狀態到當前點擊的連結
            this.classList.add('active');
            
            // 添加淡入動畫
            targetSection.classList.add('active');
            
            // 平滑滾動到目標部分
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 添加查看作品按鈕事件
    const viewButtons = document.querySelectorAll('.view-content-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.section');
            const sectionContainer = section.querySelector('.section-container');
            const sectionContent = section.querySelector('.section-content');
            
            // 滑動隱藏主畫面
            sectionContainer.style.transform = 'translateY(-100%)';
            sectionContainer.style.opacity = '0';
            
            // 延遲顯示內容
            setTimeout(() => {
                sectionContainer.style.display = 'none';
                sectionContent.classList.remove('hide');
                
                // 滾動到頂部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
        });
    });

    // 為每個內容區域添加返回按鈕
    sections.forEach(section => {
        const content = section.querySelector('.section-content');
        if (content) {
            const backBtn = document.createElement('button');
            backBtn.className = 'back-btn';
            backBtn.innerHTML = '返回';
            backBtn.addEventListener('click', function() {
                const sectionContainer = section.querySelector('.section-container');
                
                // 隱藏內容
                content.classList.add('hide');
                
                // 延遲顯示主畫面
                setTimeout(() => {
                    sectionContainer.style.display = 'flex';
                    sectionContainer.style.opacity = '1';
                    sectionContainer.style.transform = 'translateY(0)';
                }, 300);
            });
            
            content.insertBefore(backBtn, content.firstChild);
        }
    });

    // 添加滾動事件處理
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 導航欄背景變化
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
        
        // 添加滾動顯示動畫效果
        const animateElements = document.querySelectorAll('.project-group, .gallery-item, .design-item, .clothing-project');
        
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fadeIn');
            }
        });
    });

    // 初始化活動部分
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        const activeSectionId = activeSection.getAttribute('id');
        const activeLink = document.querySelector(`nav ul li a[data-section="${activeSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }


}); 