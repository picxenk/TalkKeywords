// 2025 포킹룸 리서치랩 토크를 위한 키워드 수집과 시각화
//
// Vibe Coding by Seungbum Kim <picxenk@gmail.com> w/ Claude Artifact (Free Plan)
// - https://claude.ai/share/b7f133cc-2b6a-4048-8936-0e0ee147ab19
// 구글설문 : https://bit.ly/forkingtalk
// 시각화 URL : https://bit.ly/forkingtalk-keywords
//
// https://opensource.org/license/unlicense


// 테스트데이터 사용시 true
let testData = false;
// let testData = true;

// 구글설문 응답시트 URL (공개된 시트를 CSV포맷으로 웹공개 설정 후 사용)
// 예: "https://docs.google.com/spreadsheets/d/e/2PACX-xxxx/pub?output=csv"
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMpm0A9BvPP_biSMMZdrHJdWOs-U9--04CjeXMiAKg8G2hXPbcfKGBmrxNB3pHDDx2nAse73eOPdZ0/pub?gid=1059531910&single=true&output=csv";


// 각 사분면별 키워드 데이터 테스트용
const quadrantTestData = [
  // 1사분면(좌상단) 키워드
  [
    "환경보호",
    "기후변화",
    "탄소중립",
    "재생에너지",
    "생물다양성",
    "지속가능한 발전",
    "순환경제",
    "친환경",
    "에너지 전환",
    "플라스틱 오염",
    "산림 보존",
    "해양 생태계",
    "온실가스",
    "환경 정의란 무엇인가?",
    "생태계 보존",
    "환경교육",
    "친환경 소비",
    "제로웨이스트",
    "자원 재활용",
    "태양광",
    "풍력발전",
    "수소경제",
    "기후위기 대응 방안은?",
    "지구온난화",
    "생태발자국",
    "환경영향평가",
    "물 부족",
    "사막화",
    "대기오염",
    "환경호르몬",
    "멸종위기종",
    "도시농업",
    "생태도시",
    "기후 적응",
    "그린 뉴딜",
    "환경윤리",
  ],

  // 2사분면(우상단) 키워드
  [
    "인공지능",
    "빅데이터",
    "머신러닝",
    "자율주행",
    "블록체인",
    "메타버스",
    "디지털 트랜스포메이션",
    "클라우드 컴퓨팅",
    "사물인터넷",
    "미래 기술은 어떻게 발전할까요?",
    "가상현실",
    "증강현실",
    "양자컴퓨팅",
    "로봇공학",
    "신경망",
    "딥러닝",
    "에지 컴퓨팅",
    "스마트시티",
    "데이터 분석",
    "알고리즘",
    "자연어처리",
    "컴퓨터 비전",
    "기술 혁신의 방향성은?",
    "디지털 리터러시",
    "사이버 보안",
    "핀테크",
    "인공지능 윤리",
    "기후 기술",
    "디지털 헬스케어",
    "그린 테크놀로지",
    "웨어러블 기기",
    "지속가능 기술",
    "스마트홈",
    "기술과 인간의 공존",
    "데이터 마이닝",
    "API 경제",
    "디지털 플랫폼",
  ],

  // 3사분면(좌하단) 키워드
  [
    "문화예술",
    "문학",
    "음악",
    "영화",
    "연극",
    "미술",
    "무용",
    "전통예술",
    "디자인",
    "창작",
    "예술치료",
    "공연예술",
    "문화콘텐츠",
    "대중문화",
    "문화다양성",
    "예술교육",
    "예술철학",
    "문화유산",
    "현대미술",
    "클래식",
    "재즈",
    "국악",
    "문화정책",
    "창의성이란 무엇인가?",
    "예술과 기술의 융합",
    "문화 정체성",
    "문화산업",
    "뮤지컬",
    "문화 향유",
    "스토리텔링",
    "시각예술",
    "문화 매개",
    "예술 비평",
    "문화 교류",
    "예술 경영",
    "문화 역량",
    "영상문화",
    "예술 작품의 가치는 어떻게 결정되나요?",
  ],

  // 4사분면(우하단) 키워드
  [
    "건강",
    "웰빙",
    "영양",
    "운동",
    "면역력",
    "정신건강",
    "의료기술",
    "디지털 헬스케어",
    "원격의료",
    "건강한 노화",
    "식이요법",
    "스트레스 관리",
    "수면",
    "예방의학",
    "건강 불평등",
    "공중보건",
    "만성질환",
    "통합의학",
    "건강 리터러시",
    "의료 접근성",
    "건강한 생활습관이란?",
    "건강검진",
    "운동 처방",
    "건강한 식습관",
    "마음챙김",
    "정서적 웰빙",
    "사회적 건강",
    "직업 건강",
    "환경과 건강",
    "건강 지표",
    "디지털 디톡스",
    "면역체계",
    "항노화",
    "건강 형평성",
    "웰니스 트렌드",
    "영양소",
    "건강과 행복의 관계는 무엇일까요?",
  ],
];

// 구글 시트 데이터를 사용하기 위한 준비
let quadrantData = [[], [], [], []]; 
if (testData) quadrantData = quadrantTestData;

// 각 사분면별 색상 설정
const quadrantColors = [
  { bg: "#80C9FF", text: "#000000" }, // 1사분면: 하늘색 배경, 검정 텍스트
  { bg: "#FF9F80", text: "#000000" }, // 2사분면: 살구색 배경, 검정 텍스트
  { bg: "#9580FF", text: "#FFFFFF" }, // 3사분면: 보라색 배경, 흰색 텍스트
  { bg: "#80FF95", text: "#000000" }, // 4사분면: 연두색 배경, 검정 텍스트
];

const margin = 20; // 화면 가장자리와 키워드 사이 여백
const padding = 8; // 키워드 사이 여백 (약간 줄임)

// 키워드 위치 저장용 변수
let keywordPositions = [[], [], [], []];

// 사분면별 초기 글자 크기 계수
const quadrantFontFactors = [1.5, 1.6, 1.0, 1.5]; // 2, 4사분면에 더 큰 글자 크기 적용, 뭐가 문제지?

function preload() {
  // CSV 파일로 게시된 구글 시트 데이터 로드
  if (!testData) {
  loadTable(sheetURL, 'csv', 'header', tableLoaded);  
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // 키워드 위치 초기화
  calculateKeywordPositions();
}

function tableLoaded(table) {
  console.log("데이터 로드 완료: " + table.getRowCount() + "개의 행");
  
  // 각 행을 처리
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    
    // 데이터 추출
    let timestamp = row.getString('타임스탬프');
    let quadrantNumber = parseInt(row.getString('발표번호')); // 1~4 사이의 값
    let keyword = row.getString('키워드나 질문');
    
    // 유효성 검사
    if (quadrantNumber >= 1 && quadrantNumber <= 4 && keyword.trim() !== '') {
      // 해당 사분면 배열에 키워드 추가 (배열 인덱스는 0부터 시작하므로 -1 조정)
      quadrantData[quadrantNumber - 1].push(keyword.trim());
    }
  }
  
  // 결과 출력
  // console.log("변환된 quadrantData 배열:", quadrantData);
  
}


function calculateKeywordPositions() {
  // 키워드 위치 배열 초기화
  keywordPositions = [[], [], [], []];

  // 각 사분면의 경계 계산
  const midX = width / 2;
  const midY = height / 2;

  // 각 사분면별로 키워드 배치
  for (let q = 0; q < 4; q++) {
    // 사분면 영역 계산
    let startX, endX, startY, endY;

    switch (q) {
      case 0: // 1사분면 (좌상단)
        startX = margin;
        endX = midX - margin;
        startY = margin;
        endY = midY - margin;
        break;
      case 1: // 2사분면 (우상단)
        startX = midX + margin;
        endX = width - margin;
        startY = margin;
        endY = midY - margin;
        break;
      case 2: // 3사분면 (좌하단)
        startX = margin;
        endX = midX - margin;
        startY = midY + margin;
        endY = height - margin;
        break;
      case 3: // 4사분면 (우하단)
        startX = midX + margin;
        endX = width - margin;
        startY = midY + margin;
        endY = height - margin;
        break;
    }

    // 사분면 크기 계산
    const quadWidth = endX - startX;
    const quadHeight = endY - startY;
    const quadArea = quadWidth * quadHeight;

    // 키워드 수
    const keywordCount = quadrantData[q].length;

    // 평균 키워드 길이 계산
    const avgKeywordLength =
      quadrantData[q].reduce((sum, kw) => sum + kw.length, 0) / keywordCount;

    // 사분면별 기본 글자 크기 계산
    // 면적, 키워드 수, 평균 길이 고려하여 계산
    const baseFontSize =
      Math.sqrt(quadArea / keywordCount) / (avgKeywordLength * 0.5);

    // 2, 4사분면의 경우 글자 크기를 더 크게 설정 (계수 적용)
    const adjustedBaseFontSize = baseFontSize * quadrantFontFactors[q];

    // 글자 크기 시도 범위 (큰 것부터 작은 것까지)
    const fontSizes = [
      adjustedBaseFontSize * 1.2,
      adjustedBaseFontSize * 1.0,
      adjustedBaseFontSize * 0.8,
      adjustedBaseFontSize * 0.6,
      adjustedBaseFontSize * 0.4,
    ];

    // 각 폰트 크기별로 시도
    let success = false;

    for (const fontSize of fontSizes) {
      // 최소 글자 크기 적용
      const currentFontSize = Math.max(fontSize, 8);

      // 이 폰트 크기로 배치 시도
      const result = tryLayoutWithFontSize(
        q,
        startX,
        startY,
        endX,
        endY,
        currentFontSize
      );

      if (result.success) {
        keywordPositions[q] = result.positions;
        success = true;
        break;
      }
    }

    // 모든 시도가 실패하면 격자 레이아웃 사용
    if (!success) {
      keywordPositions[q] = createGridLayout(
        q,
        startX,
        startY,
        quadWidth,
        quadHeight
      );
    }

    // 각 키워드 위치 확정 후 사분면 공간 최대 활용을 위해 스케일링
    optimizeLayout(q, startX, startY, quadWidth, quadHeight);
  }
}

// 특정 폰트 크기로 레이아웃 시도
function tryLayoutWithFontSize(quadrant, startX, startY, endX, endY, fontSize) {
  const keywords = quadrantData[quadrant];
  const positions = [];

  let currentX = startX + padding;
  let currentY = startY + padding;
  let rowHeight = fontSize * 1.8; // 기본 줄 높이
  let maxRowHeight = rowHeight; // 현재 행의 최대 높이

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];

    // 키워드 길이에 따라 글자 크기 조정
    let adjustedFontSize = fontSize;
    if (keyword.length > 15) adjustedFontSize *= 0.95;
    if (keyword.length > 25) adjustedFontSize *= 0.95;

    textSize(adjustedFontSize);
    const txtWidth = textWidth(keyword) + padding * 2;
    const txtHeight = adjustedFontSize * 1.8;

    // 현재 행의 최대 높이 갱신
    maxRowHeight = Math.max(maxRowHeight, txtHeight);

    // 현재 행이 넘치면 다음 행으로
    if (currentX + txtWidth > endX) {
      currentX = startX + padding;
      currentY += maxRowHeight + padding;
      maxRowHeight = txtHeight; // 새 행의 높이 초기화
    }

    // 사분면 높이를 넘어가면 실패
    if (currentY + txtHeight > endY) {
      return { success: false, positions: [] };
    }

    // 키워드 위치 정보 저장
    positions.push({
      text: keyword,
      x: currentX + txtWidth / 2,
      y: currentY + txtHeight / 2,
      width: txtWidth,
      height: txtHeight,
      fontSize: adjustedFontSize,
    });

    // 다음 키워드 위치
    currentX += txtWidth + padding;
  }

  return { success: true, positions: positions };
}

// 격자 레이아웃 생성
function createGridLayout(quadrant, startX, startY, width, height) {
  const keywords = quadrantData[quadrant];
  const totalKeywords = keywords.length;

  // 가로세로 비율에 맞게 격자 구성
  const ratio = width / height;
  const cols = Math.ceil(Math.sqrt(totalKeywords * ratio));
  const rows = Math.ceil(totalKeywords / cols);

  const cellWidth = width / cols;
  const cellHeight = height / rows;

  // 격자에 맞는 글자 크기 계산 (2, 4사분면은 더 크게)
  const cellSize = Math.min(cellWidth, cellHeight);
  const baseFontSize = cellSize * 0.4 * quadrantFontFactors[quadrant];

  const positions = [];

  for (let i = 0; i < totalKeywords; i++) {
    const keyword = keywords[i];
    const row = Math.floor(i / cols);
    const col = i % cols;

    const x = startX + (col + 0.5) * cellWidth;
    const y = startY + (row + 0.5) * cellHeight;

    // 키워드 길이에 따라 글자 크기 조정
    let fontSize = baseFontSize;
    if (keyword.length > 15) fontSize *= 0.95;
    if (keyword.length > 25) fontSize *= 0.9;

    positions.push({
      text: keyword,
      x: x,
      y: y,
      width: cellWidth - padding * 2,
      height: cellHeight - padding * 2,
      fontSize: Math.max(fontSize, 8), // 최소 글자 크기 8px
    });
  }

  return positions;
}

// 레이아웃 최적화 - 사분면 공간을 최대한 활용하도록 스케일링
function optimizeLayout(quadrant, startX, startY, width, height) {
  if (keywordPositions[quadrant].length === 0) return;

  // 현재 레이아웃의 바운딩 박스 계산
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const kw of keywordPositions[quadrant]) {
    minX = Math.min(minX, kw.x - kw.width / 2);
    minY = Math.min(minY, kw.y - kw.height / 2);
    maxX = Math.max(maxX, kw.x + kw.width / 2);
    maxY = Math.max(maxY, kw.y + kw.height / 2);
  }

  // 현재 레이아웃 크기
  const currentWidth = maxX - minX;
  const currentHeight = maxY - minY;

  // 사용 가능한 공간과 비교하여 스케일 계산
  const scaleX = (width - padding * 2) / currentWidth;
  const scaleY = (height - padding * 2) / currentHeight;

  // 종횡비 유지를 위해 작은 스케일 선택
  const scale = Math.min(scaleX, scaleY);

  // 스케일이 1보다 크면 (여유 공간이 있으면) 키워드 확대
  if (scale > 1.05) {
    // 새로운 바운딩 박스 원점 계산
    const newMinX = startX + padding;
    const newMinY = startY + padding;

    // 모든 키워드 위치와 크기 스케일링
    for (const kw of keywordPositions[quadrant]) {
      // 원래 위치에서 원점까지의 상대 위치
      const relX = kw.x - minX;
      const relY = kw.y - minY;

      // 스케일 적용하여 새 위치 계산
      kw.x = newMinX + relX * scale;
      kw.y = newMinY + relY * scale;
      kw.width *= scale;
      kw.height *= scale;
      kw.fontSize *= scale;
    }
  }
}

function draw() {
  // 배경을 그려서 이전 그림을 지움
  background(240);

  // 사분면 구분선 그리기
  stroke(100);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  
  // 사분면 숫자 쓰기
  let nSize = 20;
  let gap = nSize*0.7;
  textSize(nSize);
  fill(130);
  noStroke();
  text("1", width/2-gap, height/2-gap);
  text("2", width/2+gap, height/2-gap);
  text("3", width/2-gap, height/2+gap);
  text("4", width/2+gap, height/2+gap);

  noStroke();

  // 각 사분면 키워드 그리기
  for (let q = 0; q < 4; q++) {
    // 사분면별 색상 설정
    const bgColor = color(quadrantColors[q].bg);
    const textColor = color(quadrantColors[q].text);

    // 각 키워드 그리기
    for (let i = 0; i < keywordPositions[q].length; i++) {
      const kw = keywordPositions[q][i];

      // 배경 그리기
      fill(bgColor);
      rect(kw.x - kw.width / 2, kw.y - kw.height / 2, kw.width, kw.height, 10);

      // 텍스트 그리기
      fill(textColor);
      textSize(kw.fontSize);
      text(kw.text, kw.x, kw.y);
    }
  }
}

// 윈도우 크기 변경 시 캔버스 크기 조정 및 키워드 위치 재계산
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateKeywordPositions();
}
