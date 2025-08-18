// 뉴스 데이터 (실제로는 서버나 API에서 가져올 데이터)
const newsData = {
    2025: {
        8: [
            {
                date: "8월 18일",
                time: "14:30",
                title: "여야, 경제정책 놓고 국정감사 공방 격화",
                summary: "국회 기획재정위원회 국정감사에서 여야가 정부의 경제정책을 놓고 격렬한 공방을 벌였습니다. 야당은 현 정부의 물가 대책이 부실하다며 강하게 비판했고, 특히 서민층 부담 가중을 우려한다고 밝혔습니다. 반면 여당은 최근 경제 지표 개선과 수출 증가 등 경제 회복 성과를 강조하며 정책 방향이 옳다고 반박했습니다.",
                link: null
            },
            {
                date: "8월 18일",
                time: "10:45",
                title: "청와대 수석 회의, 민생 경제 대책 논의",
                summary: "대통령 주재 수석비서관 회의에서 물가 안정과 서민 경제 지원 방안이 집중 논의되었습니다. 추가적인 민생 대책 발표가 예정되어 있습니다.",
                link: null
            },
            {
                date: "8월 17일",
                time: "09:15",
                title: "대통령 지지율 45% 기록, 전주 대비 2%p 상승",
                summary: "최신 여론조사에서 대통령 국정 지지율이 45%를 기록하며 전주 대비 2%포인트 상승했습니다. 경제정책에 대한 긍정 평가가 상승 요인으로 분석됩니다.",
                link: "https://example.com/poll-results"
            },
            {
                date: "8월 17일",
                time: "16:20",
                title: "국회 본회의 추경 예산안 통과",
                summary: "국회 본회의에서 제2차 추가경정예산안이 여야 합의로 통과되었습니다. 총 15조원 규모의 추경으로 민생 지원이 강화됩니다.",
                link: "https://example.com/budget-news"
            },
            {
                date: "8월 15일",
                time: "16:20",
                title: "광복절 기념사에서 한반도 평화 강조",
                summary: "대통령은 광복절 78주년 기념사를 통해 한반도 평화 정착과 남북 관계 개선 의지를 밝혔습니다. 대화를 통한 평화적 해결 방안을 제시했습니다.",
                link: "https://example.com/liberation-day-speech"
            }
        ],
        7: [
            {
                date: "7월 28일",
                time: "16:45",
                title: "서울시, 2030년까지 탄소중립 도시 조성",
                summary: "서울시가 2030년까지 탄소 배출량을 50% 줄이고 2050년 완전한 탄소중립을 달성하겠다는 종합계획을 발표했습니다. 대중교통 전기화와 재생에너지 확대가 핵심입니다.",
                link: "#"
            },
            {
                date: "7월 15일",
                time: "11:20",
                title: "청년 주택 공급 확대, 1인 가구 지원 강화",
                summary: "정부가 청년층의 주거 부담 완화를 위해 공공임대주택 공급을 늘리고 1인 가구 맞춤형 주택 정책을 발표했습니다. 월세 지원금도 기존 20만원에서 30만원으로 인상됩니다.",
                link: "#"
            }
        ],
        6: [
            {
                date: "6월 30일",
                time: "13:00",
                title: "한국 GDP 성장률 3.2%, OECD 평균 상회",
                summary: "올해 2분기 한국의 GDP 성장률이 3.2%를 기록하며 OECD 평균 2.8%를 상회했습니다. 수출 증가와 내수 회복이 성장을 견인한 것으로 분석됩니다.",
                link: "#"
            }
        ]
    },
    2024: {
        12: [
            {
                date: "12월 20일",
                time: "10:30",
                title: "2024년 경제성장률 2.8% 달성",
                summary: "한국은행이 2024년 경제성장률이 당초 전망치 2.5%를 상회하는 2.8%를 기록했다고 발표했습니다. 반도체 수출 회복과 서비스업 성장이 주요 동력이었습니다.",
                link: "#"
            }
        ]
    }
};

let currentYear = 2025;
let currentMonth = 8;

// 탭 이벤트 리스너
document.querySelectorAll('.year-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentYear = parseInt(this.dataset.year);
        loadNews();
    });
});

document.querySelectorAll('.month-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.month-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentMonth = parseInt(this.dataset.month);
        loadNews();
    });
});

// 카드 확장/축소 기능
function toggleExpand(button) {
    const newsItem = button.closest('.news-item');
    const summary = newsItem.querySelector('.news-summary');
    
    if (newsItem.classList.contains('expanded')) {
        // 축소
        newsItem.classList.remove('expanded');
        summary.classList.remove('expanded');
        button.classList.remove('collapse');
        button.textContent = '더보기';
        button.innerHTML = '더보기<span style="margin-left: 8px;">↓</span>';
    } else {
        // 확장
        newsItem.classList.add('expanded');
        summary.classList.add('expanded');
        button.classList.add('collapse');
        button.innerHTML = '접기<span style="margin-left: 8px;">↑</span>';
    }
}

// 뉴스 로드 함수
function loadNews() {
    const newsContainer = document.querySelector('.news-content-area');
    const currentPeriod = document.querySelector('.current-period');
    
    currentPeriod.textContent = `${currentYear}년 ${currentMonth}월`;
    
    const monthData = newsData[currentYear]?.[currentMonth] || [];
    
    if (monthData.length === 0) {
        newsContainer.innerHTML = `
            <div class="no-news">
                <span class="icon">📰</span>
                <p>이 기간에는 등록된 뉴스가 없습니다.</p>
            </div>
        `;
        return;
    }
    
    newsContainer.innerHTML = monthData.map((news, index) => `
        <div class="news-item" style="animation-delay: ${index * 0.1}s;">
            <div class="news-datetime">
                <span class="date">${news.date}</span>
                <span class="time">${news.time}</span>
            </div>
            <div class="news-content">
                <div class="news-title">${news.title}</div>
                <div class="news-summary">${news.summary}</div>
                ${news.link ? 
                    `<a href="${news.link}" class="news-link" target="_blank" rel="noopener noreferrer">자세히 보기</a>` :
                    `<button class="expand-button" onclick="toggleExpand(this)">더보기</button>`
                }
            </div>
        </div>
    `).join('');
}

// 초기 로드
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
});

// 부드러운 스크롤 효과
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});