// Theme Management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Show corresponding section
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Update URL hash
        window.location.hash = sectionId;
    });
});

// Handle initial hash
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetLink = document.querySelector(`[data-section="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

// Modal Management
const createTestBtn = document.getElementById('createTestBtn');
const createTestModal = document.getElementById('createTestModal');
const closeTestModal = document.getElementById('closeTestModal');
const cancelTestBtn = document.getElementById('cancelTestBtn');
const submitTestBtn = document.getElementById('submitTestBtn');

createTestBtn.addEventListener('click', () => {
    createTestModal.classList.add('active');
});

closeTestModal.addEventListener('click', () => {
    createTestModal.classList.remove('active');
});

cancelTestBtn.addEventListener('click', () => {
    createTestModal.classList.remove('active');
});

createTestModal.addEventListener('click', (e) => {
    if (e.target === createTestModal) {
        createTestModal.classList.remove('active');
    }
});

submitTestBtn.addEventListener('click', () => {
    // In a real application, this would submit the form data
    alert('تم إنشاء الاختبار بنجاح!');
    createTestModal.classList.remove('active');
});

// Search and Filter Functionality
const testSearch = document.getElementById('testSearch');
const testStatusFilter = document.getElementById('testStatusFilter');
const testCategoryFilter = document.getElementById('testCategoryFilter');

if (testSearch) {
    testSearch.addEventListener('input', filterTests);
}

if (testStatusFilter) {
    testStatusFilter.addEventListener('change', filterTests);
}

if (testCategoryFilter) {
    testCategoryFilter.addEventListener('change', filterTests);
}

function filterTests() {
    // This is a placeholder for filtering logic
    // In a real application, this would filter the test cards based on search and filter values
    console.log('Filtering tests...');
}

// Chart.js Integration (Mock Data)
// Performance Chart
const performanceCtx = document.getElementById('performanceChart');
if (performanceCtx) {
    // For demo purposes, we'll create a simple canvas visualization
    drawPerformanceChart(performanceCtx);
}

function drawPerformanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Sample data
    const data = [85, 87, 89, 88, 90, 92, 94];
    const labels = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = 100;
    const stepX = chartWidth / (data.length - 1);

    // Get theme colors
    const styles = getComputedStyle(document.documentElement);
    const primaryColor = styles.getPropertyValue('--primary-color').trim();
    const textSecondary = styles.getPropertyValue('--text-secondary').trim();

    // Draw grid lines
    ctx.strokeStyle = textSecondary;
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    ctx.globalAlpha = 1;

    // Draw line
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + chartHeight - (value / maxValue * chartHeight);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = primaryColor;
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + chartHeight - (value / maxValue * chartHeight);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = textSecondary;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    labels.forEach((label, index) => {
        const x = padding + stepX * index;
        ctx.fillText(label, x, height - 10);
    });
}

// Distribution Chart
const distributionCtx = document.getElementById('distributionChart');
if (distributionCtx) {
    drawDistributionChart(distributionCtx);
}

function drawDistributionChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Sample data
    const data = [
        { label: 'ممتاز', value: 45, color: '#10b981' },
        { label: 'جيد جداً', value: 30, color: '#6366f1' },
        { label: 'جيد', value: 15, color: '#8b5cf6' },
        { label: 'مقبول', value: 10, color: '#f59e0b' }
    ];

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    let startAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw pie slices
    data.forEach(item => {
        const sliceAngle = (item.value / total) * Math.PI * 2;

        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        startAngle += sliceAngle;
    });

    // Draw legend
    const legendX = 20;
    let legendY = height - 80;

    ctx.font = '13px Arial';
    ctx.textAlign = 'right';

    data.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY, 15, 15);

        const styles = getComputedStyle(document.documentElement);
        const textPrimary = styles.getPropertyValue('--text-primary').trim();
        ctx.fillStyle = textPrimary;
        ctx.fillText(`${item.label}: ${item.value}%`, legendX + 130, legendY + 12);

        legendY += 25;
    });
}

// Comparison Chart
const comparisonCtx = document.getElementById('comparisonChart');
if (comparisonCtx) {
    drawComparisonChart(comparisonCtx);
}

function drawComparisonChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Sample data
    const categories = ['توليد النصوص', 'البرمجة', 'التفكير المنطقي', 'الرؤية', 'السرعة'];
    const models = [
        { name: 'GPT-4 Turbo', data: [95, 92, 96, 93, 88], color: '#6366f1' },
        { name: 'Claude 3 Opus', data: [94, 95, 92, 95, 91], color: '#8b5cf6' }
    ];

    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / (categories.length * 2.5);

    const styles = getComputedStyle(document.documentElement);
    const textPrimary = styles.getPropertyValue('--text-primary').trim();
    const textSecondary = styles.getPropertyValue('--text-secondary').trim();

    // Draw categories
    ctx.fillStyle = textSecondary;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    categories.forEach((category, index) => {
        const x = padding + (chartWidth / categories.length) * index + (chartWidth / categories.length) / 2;
        const words = category.split(' ');
        words.forEach((word, wordIndex) => {
            ctx.fillText(word, x, height - 10 - (words.length - wordIndex - 1) * 15);
        });
    });

    // Draw bars
    categories.forEach((category, catIndex) => {
        const baseX = padding + (chartWidth / categories.length) * catIndex;

        models.forEach((model, modelIndex) => {
            const value = model.data[catIndex];
            const barHeight = (value / 100) * chartHeight;
            const x = baseX + barWidth * modelIndex * 1.2 + 10;
            const y = padding + chartHeight - barHeight;

            ctx.fillStyle = model.color;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw value on top of bar
            ctx.fillStyle = textPrimary;
            ctx.font = 'bold 11px Arial';
            ctx.fillText(value + '%', x + barWidth / 2, y - 5);
        });
    });

    // Draw legend
    const legendY = 20;
    let legendX = padding;

    models.forEach((model, index) => {
        ctx.fillStyle = model.color;
        ctx.fillRect(legendX, legendY, 15, 15);

        ctx.fillStyle = textPrimary;
        ctx.font = '13px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(model.name, legendX + 100, legendY + 12);

        legendX += 120;
    });
}

// Handle window resize for charts
window.addEventListener('resize', debounce(() => {
    if (performanceCtx) drawPerformanceChart(performanceCtx);
    if (distributionCtx) drawDistributionChart(distributionCtx);
    if (comparisonCtx) drawComparisonChart(comparisonCtx);
}, 250));

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Compare functionality
const compareBtn = document.getElementById('compareBtn');
const compareModel1 = document.getElementById('compareModel1');
const compareModel2 = document.getElementById('compareModel2');
const compareModel3 = document.getElementById('compareModel3');

if (compareBtn) {
    compareBtn.addEventListener('click', () => {
        const model1 = compareModel1.value;
        const model2 = compareModel2.value;
        const model3 = compareModel3.value;

        if (!model1 || !model2) {
            alert('الرجاء اختيار نموذجين على الأقل للمقارنة');
            return;
        }

        // In a real application, this would fetch and display comparison data
        console.log('Comparing models:', model1, model2, model3);

        // Redraw comparison chart with selected models
        if (comparisonCtx) {
            drawComparisonChart(comparisonCtx);
        }
    });
}

// Leaderboard filters
const leaderboardCategory = document.getElementById('leaderboardCategory');
const leaderboardPeriod = document.getElementById('leaderboardPeriod');

if (leaderboardCategory) {
    leaderboardCategory.addEventListener('change', () => {
        console.log('Filtering leaderboard by category:', leaderboardCategory.value);
        // In a real application, this would filter the leaderboard
    });
}

if (leaderboardPeriod) {
    leaderboardPeriod.addEventListener('change', () => {
        console.log('Filtering leaderboard by period:', leaderboardPeriod.value);
        // In a real application, this would filter the leaderboard
    });
}

// Animate stats on load
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const numericValue = parseFloat(target);

        if (!isNaN(numericValue)) {
            animateValue(stat, 0, numericValue, 1500, isPercentage);
        }
    });
}

function animateValue(element, start, end, duration, isPercentage) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }

        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else if (Number.isInteger(end)) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 16);
}

// Animate on page load
window.addEventListener('load', () => {
    setTimeout(animateStats, 300);
});

// Add Model Button
const addModelBtn = document.getElementById('addModelBtn');
if (addModelBtn) {
    addModelBtn.addEventListener('click', () => {
        alert('سيتم إضافة نموذج جديد قريباً!');
    });
}

// Test Action Buttons (delegated event handling)
document.addEventListener('click', (e) => {
    // View test results
    if (e.target.closest('.test-actions .btn-secondary')) {
        const testCard = e.target.closest('.test-card');
        if (testCard) {
            const testName = testCard.querySelector('h3').textContent;
            console.log('Viewing results for:', testName);
            alert(`عرض نتائج: ${testName}`);
        }
    }

    // Rerun test
    if (e.target.closest('.test-actions .btn-accent')) {
        const testCard = e.target.closest('.test-card');
        if (testCard) {
            const testName = testCard.querySelector('h3').textContent;
            console.log('Rerunning test:', testName);
            alert(`إعادة تشغيل: ${testName}`);
        }
    }

    // Start test
    if (e.target.closest('.test-actions .btn-primary')) {
        const testCard = e.target.closest('.test-card');
        if (testCard) {
            const testName = testCard.querySelector('h3').textContent;
            console.log('Starting test:', testName);
            alert(`بدء الاختبار: ${testName}`);
        }
    }

    // Model details
    if (e.target.closest('.model-actions .btn-secondary')) {
        const modelCard = e.target.closest('.model-card');
        if (modelCard) {
            const modelName = modelCard.querySelector('h3').textContent;
            console.log('Viewing details for:', modelName);
            alert(`تفاصيل النموذج: ${modelName}`);
        }
    }

    // Test model
    if (e.target.closest('.model-actions .btn-accent')) {
        const modelCard = e.target.closest('.model-card');
        if (modelCard) {
            const modelName = modelCard.querySelector('h3').textContent;
            console.log('Testing model:', modelName);
            alert(`اختبار النموذج: ${modelName}`);
        }
    }
});

// Simulate real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update running tests progress
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            if (currentWidth < 100) {
                const newWidth = Math.min(currentWidth + Math.random() * 5, 100);
                bar.style.width = newWidth + '%';

                const progressText = bar.closest('.progress-container')?.querySelector('.progress-text');
                if (progressText) {
                    progressText.textContent = Math.floor(newWidth) + '% مكتمل';
                }
            }
        });
    }, 3000);
}

// Start real-time updates
simulateRealTimeUpdates();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (testSearch) {
            testSearch.focus();
        }
    }

    // Escape to close modal
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !this.classList.contains('nav-link')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            // Don't add loading state to navigation or modal controls
            if (!this.closest('.nav-link') &&
                !this.id.includes('Modal') &&
                !this.id.includes('cancel')) {

                const originalContent = this.innerHTML;
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';

                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalContent;
                }, 2000);
            }
        }
    });
});

// Initialize tooltips (if needed in future)
function initTooltips() {
    // Placeholder for tooltip initialization
}

// Log initialization
console.log('Benchmark app initialized successfully');
console.log('Current theme:', html.getAttribute('data-theme'));
