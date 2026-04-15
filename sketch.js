// 2026 포킹룸 리서치랩 토크를 위한 키워드 수집과 시각화
// by Seungbum Kim
// 
// 2025 토크 진행 작업  (https://bit.ly/forkingtalk-keywords) 을 기초로 개선 
// 구글설문 : https://bit.ly/forkingtalk
//
// https://opensource.org/license/unlicense


// 테스트데이터 사용시 true
let testData = false;
// let testData = true;

// 구글설문 응답시트 URL (공개된 시트를 CSV포맷으로 웹공개 설정 후 사용)
// 예: "https://docs.google.com/spreadsheets/d/e/2PACX-xxxx/pub?output=csv"
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMpm0A9BvPP_biSMMZdrHJdWOs-U9--04CjeXMiAKg8G2hXPbcfKGBmrxNB3pHDDx2nAse73eOPdZ0/pub?gid=1059531910&single=true&output=csv";
// const sheetURL = 
//   "https://docs.google.com/spreadsheets/d/e/2PACX-1vSludCnfXL02irS2zyXEhkw8sdh-P4bWou1CWqmscrXxIjlniGRPCVsQ9m1cBfxWvqFoXWcpVWQAWTv/pub?gid=1076528904&single=true&output=csv";


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

const appState = {
  isLoading: !testData,
  loadError: "",
  infoMessage: "",
  stats: null,
  columnMap: null,
  hasCanvas: false,
  needsLayoutRecalc: false,
};

const expectedColumns = {
  timestamp: ["타임스탬프", "Timestamp", "timestamp"],
  quadrant: ["발표번호", "발표 번호", "번호", "quadrant"],
  keyword: ["키워드나 질문", "키워드", "질문", "keyword", "keywords"],
};

const themePalettes = {
  modern: {
    label: "Modern",
    canvasBg: "#EEF2F7",
    divider: "#5C6673",
    marker: "#6D7682",
    overlayBg: "#FFFFFF",
    overlayBorder: "#B6C0CC",
    quadrants: [
      { bg: "#A8D8FF", text: "#1A2733" },
      { bg: "#FFC6A8", text: "#2D211C" },
      { bg: "#B6B4FF", text: "#1F1B33" },
      { bg: "#B6F2BE", text: "#1E3121" },
    ],
  },
  minimal: {
    label: "Minimal",
    canvasBg: "#F2F2EF",
    divider: "#4E4A43",
    marker: "#575248",
    overlayBg: "#FFFFFF",
    overlayBorder: "#A9A49A",
    quadrants: [
      { bg: "#C5CFCA", text: "#121512" },
      { bg: "#D6CCBE", text: "#16120D" },
      { bg: "#C8C7D1", text: "#131219" },
      { bg: "#C9D1BC", text: "#12170E" },
    ],
  },
  astral: {
    label: "Astral",
    canvasBg: "#0E1324",
    divider: "#7A88C7",
    marker: "#A2AEE1",
    overlayBg: "#1A2240",
    overlayBorder: "#4D5C97",
    quadrants: [
      { bg: "#2A3F7A", text: "#EAF0FF" },
      { bg: "#5A3B7A", text: "#F8EAFF" },
      { bg: "#2D6E73", text: "#E7FDFF" },
      { bg: "#6F5A2A", text: "#FFF8E5" },
    ],
  },
  kitsch: {
    label: "Kitsch",
    canvasBg: "#FFF5E9",
    divider: "#BF4E30",
    marker: "#A2452D",
    overlayBg: "#FFF8F2",
    overlayBorder: "#F2B295",
    quadrants: [
      { bg: "#4AD8D8", text: "#073333" },
      { bg: "#FF7F50", text: "#311A11" },
      { bg: "#FF5B99", text: "#3A0E21" },
      { bg: "#D1FF3F", text: "#243007" },
    ],
  },
};

let currentThemeKey = "modern";
let themeSelect = null;
const themeSelectWidth = 112;
const themeSelectHeight = 30;
const themeSelectBottomOffset = 14;
const resizeDebounceMs = 120;

const margin = 20; // 화면 가장자리와 키워드 사이 여백
const padding = 8; // 키워드 사이 여백 (약간 줄임)
const minKeywordFontSize = 8;
const maxKeywordFontSize = 72;
const maxKeywordBoxWidthRatio = 0.9;
let resizeDebounceTimer = null;
const layoutState = {
  margin,
  padding,
  minFontSize: minKeywordFontSize,
  cornerRadius: 10,
  bottomSafeArea: 0,
};

// 키워드 위치 저장용 변수
let keywordPositions = [[], [], [], []];

// 사분면별 초기 글자 크기 계수
const quadrantFontFactors = [1.5, 1.6, 1.0, 1.5]; // 2, 4사분면에 더 큰 글자 크기 적용, 뭐가 문제지?
const recommendedFontFactorRange = { min: 0.7, max: 2.0 };

function preload() {
  // CSV 파일로 게시된 구글 시트 데이터 로드
  if (!testData) {
    loadTable(sheetURL, "csv", "header", tableLoaded, tableLoadFailed);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  appState.hasCanvas = true;
  applyRetinaQuality();
  textAlign(CENTER, CENTER);
  setupThemeSelector();
  updateLayoutState();
  validateQuadrantFontFactors();

  // 키워드 위치 초기화
  calculateKeywordPositions();
  appState.needsLayoutRecalc = false;

  if (testData) {
    const testDataCount = quadrantData.reduce((sum, quadrant) => sum + quadrant.length, 0);
    appState.stats = {
      totalRows: testDataCount,
      addedRows: testDataCount,
      invalidQuadrant: 0,
      invalidKeyword: 0,
    };
  }
}

function getCurrentTheme() {
  return themePalettes[currentThemeKey] || themePalettes.modern;
}

function setupThemeSelector() {
  themeSelect = createSelect();
  const themeEntries = Object.entries(themePalettes);

  for (const [key, theme] of themeEntries) {
    themeSelect.option(theme.label, key);
  }

  themeSelect.selected(currentThemeKey);
  themeSelect.changed(() => {
    currentThemeKey = themeSelect.value();
    console.log("테마 변경", currentThemeKey);
  });

  themeSelect.style("position", "absolute");
  themeSelect.style("z-index", "10");
  themeSelect.style("width", `${themeSelectWidth}px`);
  themeSelect.style("height", `${themeSelectHeight}px`);
  themeSelect.style("padding", "2px 6px");
  themeSelect.style("border-radius", "8px");
  themeSelect.style("border", "1px solid #BFC7D1");
  themeSelect.style("background", "#FFFFFFE8");
  themeSelect.style("font-size", "12px");
  themeSelect.style("text-align", "center");

  positionThemeSelector();
  updateLayoutState();
}

function positionThemeSelector() {
  if (!themeSelect) {
    return;
  }

  const x = Math.round((windowWidth - themeSelectWidth) / 2);
  const y = Math.round(windowHeight - themeSelectHeight - themeSelectBottomOffset);
  themeSelect.position(x, y);
}

function applyRetinaQuality() {
  const ratio = window.devicePixelRatio || 1;
  pixelDensity(clamp(ratio, 1, 2));
}

function updateLayoutState() {
  const isPortrait = windowHeight > windowWidth;
  const isVerySmallMobile = isPortrait && windowWidth <= 560;
  const isCompact = windowWidth <= 760 || windowHeight <= 640;

  layoutState.margin = isVerySmallMobile ? 12 : margin;
  layoutState.padding = isVerySmallMobile ? 5 : isCompact ? 6 : padding;
  layoutState.minFontSize = isVerySmallMobile ? 7 : minKeywordFontSize;
  layoutState.cornerRadius = isVerySmallMobile ? 7 : 10;
  layoutState.bottomSafeArea = themeSelect ? themeSelectHeight + themeSelectBottomOffset + 10 : 0;
}

function getUsableCanvasHeight() {
  return Math.max(height - layoutState.bottomSafeArea, 120);
}

function resetQuadrantData() {
  quadrantData = [[], [], [], []];
}

function resolveColumn(table, candidates, fallbackIndex) {
  const availableColumns = Array.isArray(table.columns) ? table.columns : [];

  for (const candidate of candidates) {
    if (availableColumns.includes(candidate)) {
      return candidate;
    }
  }

  if (typeof table.getColumnCount === "function" && table.getColumnCount() > fallbackIndex) {
    return fallbackIndex;
  }

  return null;
}

function getCellString(row, columnRef) {
  if (columnRef === null || columnRef === undefined) {
    return "";
  }

  const value = row.getString(columnRef);
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function isValidKeyword(keyword) {
  if (keyword === "") {
    return false;
  }

  const normalized = keyword.toLowerCase();
  return normalized !== "null" && normalized !== "undefined";
}

function hasAnyKeywordData() {
  return quadrantData.some((quadrant) => quadrant.length > 0);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeKeyword(keyword) {
  return typeof keyword === "string" ? keyword.trim() : "";
}

function fitKeywordText(keyword, fontSize, maxWidth) {
  const ellipsis = "...";
  const normalized = normalizeKeyword(keyword);
  if (normalized === "") {
    return "";
  }

  textSize(fontSize);
  if (textWidth(normalized) <= maxWidth) {
    return normalized;
  }

  if (textWidth(ellipsis) > maxWidth) {
    return "";
  }

  let low = 0;
  let high = normalized.length;
  let best = "";

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = `${normalized.slice(0, mid)}${ellipsis}`;

    if (textWidth(candidate) <= maxWidth) {
      best = candidate;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
}

function validateQuadrantFontFactors() {
  const invalidIndexes = [];

  for (let i = 0; i < quadrantFontFactors.length; i++) {
    const factor = quadrantFontFactors[i];
    if (factor < recommendedFontFactorRange.min || factor > recommendedFontFactorRange.max) {
      invalidIndexes.push(`${i + 1}사분면:${factor}`);
    }
  }

  if (invalidIndexes.length > 0) {
    console.warn(
      "사분면 폰트 계수가 권장 범위를 벗어났습니다",
      invalidIndexes.join(", "),
      `권장 범위 ${recommendedFontFactorRange.min}~${recommendedFontFactorRange.max}`
    );
  }
}

function tableLoadFailed(error) {
  resetQuadrantData();
  appState.isLoading = false;
  appState.loadError = "구글 시트 데이터를 불러오지 못했습니다. 시트 공개 범위와 네트워크 상태를 확인해 주세요.";
  appState.infoMessage = "";
  appState.stats = {
    totalRows: 0,
    addedRows: 0,
    invalidQuadrant: 0,
    invalidKeyword: 0,
  };

  if (appState.hasCanvas) {
    calculateKeywordPositions();
  } else {
    appState.needsLayoutRecalc = true;
  }

  console.error("데이터 로드 실패", error);
}

function tableLoaded(table) {
  resetQuadrantData();

  const totalRows = table.getRowCount();
  const columnMap = {
    timestamp: resolveColumn(table, expectedColumns.timestamp, 0),
    quadrant: resolveColumn(table, expectedColumns.quadrant, 1),
    keyword: resolveColumn(table, expectedColumns.keyword, 2),
  };
  appState.columnMap = columnMap;

  if (columnMap.quadrant === null || columnMap.keyword === null) {
    appState.isLoading = false;
    appState.loadError = "CSV 컬럼 구성을 해석할 수 없습니다. 헤더명을 확인해 주세요.";
    appState.infoMessage = "필수 컬럼: 발표번호, 키워드나 질문";
    appState.stats = {
      totalRows,
      addedRows: 0,
      invalidQuadrant: 0,
      invalidKeyword: 0,
    };
    console.error("필수 컬럼 누락", table.columns);
    return;
  }

  const stats = {
    totalRows,
    addedRows: 0,
    invalidQuadrant: 0,
    invalidKeyword: 0,
  };

  // 각 행을 처리
  for (let i = 0; i < totalRows; i++) {
    let row = table.getRow(i);

    // 데이터 추출
    let quadrantRaw = getCellString(row, columnMap.quadrant);
    let keyword = getCellString(row, columnMap.keyword);
    let quadrantNumber = Number.parseInt(quadrantRaw, 10);

    // 유효성 검사
    if (!Number.isInteger(quadrantNumber) || quadrantNumber < 1 || quadrantNumber > 4) {
      stats.invalidQuadrant += 1;
      continue;
    }

    if (!isValidKeyword(keyword)) {
      stats.invalidKeyword += 1;
      continue;
    }

    // 해당 사분면 배열에 키워드 추가 (배열 인덱스는 0부터 시작하므로 -1 조정)
    quadrantData[quadrantNumber - 1].push(keyword);
    stats.addedRows += 1;
  }

  appState.isLoading = false;
  appState.loadError = "";
  appState.stats = stats;

  if (totalRows === 0) {
    appState.infoMessage = "CSV가 비어 있습니다. 설문 응답 데이터를 추가해 주세요.";
  } else if (stats.addedRows === 0) {
    appState.infoMessage = "유효한 키워드가 없습니다. 발표번호(1~4)와 키워드를 확인해 주세요.";
  } else {
    appState.infoMessage = "";
  }

  if (typeof columnMap.timestamp === "number" || typeof columnMap.quadrant === "number" || typeof columnMap.keyword === "number") {
    console.warn("컬럼명 fallback(인덱스) 사용", columnMap);
  }

  console.log("데이터 로드 완료", stats);
  if (appState.hasCanvas) {
    calculateKeywordPositions();
  } else {
    appState.needsLayoutRecalc = true;
  }
}

function drawOverlayMessage(title, detail, isError = false) {
  const theme = getCurrentTheme();
  fill(color(theme.overlayBg + "DD"));
  stroke(color(theme.overlayBorder + "C0"));
  strokeWeight(1);
  rect(width * 0.18, height * 0.42, width * 0.64, height * 0.16, 12);

  noStroke();
  textSize(22);
  fill(isError ? color("#B00020") : color("#303030"));
  text(title, width / 2, height * 0.475);

  textSize(14);
  fill(70);
  text(detail, width / 2, height * 0.53);
}


function calculateKeywordPositions() {
  // 키워드 위치 배열 초기화
  keywordPositions = [[], [], [], []];

  const currentMargin = layoutState.margin;
  const usableHeight = getUsableCanvasHeight();

  if (usableHeight <= currentMargin * 2) {
    return;
  }

  // 각 사분면의 경계 계산
  const midX = width / 2;
  const midY = usableHeight / 2;

  // 각 사분면별로 키워드 배치
  for (let q = 0; q < 4; q++) {
    // 사분면 영역 계산
    let startX, endX, startY, endY;

    switch (q) {
      case 0: // 1사분면 (좌상단)
        startX = currentMargin;
        endX = midX - currentMargin;
        startY = currentMargin;
        endY = midY - currentMargin;
        break;
      case 1: // 2사분면 (우상단)
        startX = midX + currentMargin;
        endX = width - currentMargin;
        startY = currentMargin;
        endY = midY - currentMargin;
        break;
      case 2: // 3사분면 (좌하단)
        startX = currentMargin;
        endX = midX - currentMargin;
        startY = midY + currentMargin;
        endY = usableHeight - currentMargin;
        break;
      case 3: // 4사분면 (우하단)
        startX = midX + currentMargin;
        endX = width - currentMargin;
        startY = midY + currentMargin;
        endY = usableHeight - currentMargin;
        break;
    }

    // 사분면 크기 계산
    const quadWidth = endX - startX;
    const quadHeight = endY - startY;
    const quadArea = quadWidth * quadHeight;

    // 키워드 수
    const keywordCount = quadrantData[q].length;

    if (keywordCount === 0) {
      keywordPositions[q] = [];
      continue;
    }

    const normalizedKeywords = quadrantData[q]
      .map((keyword) => normalizeKeyword(keyword))
      .filter((keyword) => keyword !== "");

    if (normalizedKeywords.length === 0) {
      keywordPositions[q] = [];
      continue;
    }

    // 평균 키워드 길이 계산
    const totalKeywordLength = normalizedKeywords.reduce((sum, keyword) => sum + keyword.length, 0);
    const avgKeywordLength = Math.max(totalKeywordLength / normalizedKeywords.length, 1);
    const safeKeywordCount = Math.max(normalizedKeywords.length, 1);

    // 사분면별 기본 글자 크기 계산
    // 면적, 키워드 수, 평균 길이 고려하여 계산
    let baseFontSize =
      Math.sqrt(quadArea / safeKeywordCount) / (avgKeywordLength * 0.5);

    if (!Number.isFinite(baseFontSize) || baseFontSize <= 0) {
      baseFontSize = 14;
    }

    // 2, 4사분면의 경우 글자 크기를 더 크게 설정 (계수 적용)
    const safeFactor = clamp(
      quadrantFontFactors[q],
      recommendedFontFactorRange.min,
      recommendedFontFactorRange.max
    );
    const adjustedBaseFontSize = baseFontSize * safeFactor;

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
      const currentFontSize = clamp(fontSize, layoutState.minFontSize, maxKeywordFontSize);

      if (!Number.isFinite(currentFontSize)) {
        continue;
      }

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
  const currentPadding = layoutState.padding;

  let currentX = startX + currentPadding;
  let currentY = startY + currentPadding;
  let rowHeight = fontSize * 1.8; // 기본 줄 높이
  let maxRowHeight = rowHeight; // 현재 행의 최대 높이

  for (let i = 0; i < keywords.length; i++) {
    const keyword = normalizeKeyword(keywords[i]);

    if (keyword === "") {
      continue;
    }

    // 키워드 길이에 따라 글자 크기 조정
    let adjustedFontSize = fontSize;
    if (keyword.length > 15) adjustedFontSize *= 0.92;
    if (keyword.length > 25) adjustedFontSize *= 0.88;
    if (keyword.length > 40) adjustedFontSize *= 0.82;
    adjustedFontSize = clamp(adjustedFontSize, layoutState.minFontSize, maxKeywordFontSize);

    const availableKeywordWidth = Math.max((endX - startX) * maxKeywordBoxWidthRatio - currentPadding * 2, 24);
    const displayText = fitKeywordText(keyword, adjustedFontSize, availableKeywordWidth);

    if (displayText === "") {
      continue;
    }

    textSize(adjustedFontSize);
    const txtWidth = textWidth(displayText) + currentPadding * 2;
    const txtHeight = adjustedFontSize * 1.8;

    // 현재 행의 최대 높이 갱신
    maxRowHeight = Math.max(maxRowHeight, txtHeight);

    // 현재 행이 넘치면 다음 행으로
    if (currentX + txtWidth > endX) {
      currentX = startX + currentPadding;
      currentY += maxRowHeight + currentPadding;
      maxRowHeight = txtHeight; // 새 행의 높이 초기화
    }

    // 사분면 높이를 넘어가면 실패
    if (currentY + txtHeight > endY) {
      return { success: false, positions: [] };
    }

    // 키워드 위치 정보 저장
    positions.push({
      text: displayText,
      originalText: keyword,
      x: currentX + txtWidth / 2,
      y: currentY + txtHeight / 2,
      width: txtWidth,
      height: txtHeight,
      fontSize: adjustedFontSize,
    });

    // 다음 키워드 위치
    currentX += txtWidth + currentPadding;
  }

  return { success: true, positions: positions };
}

// 격자 레이아웃 생성
function createGridLayout(quadrant, startX, startY, width, height) {
  const keywords = quadrantData[quadrant];
  const totalKeywords = keywords.length;
  const currentPadding = layoutState.padding;

   if (totalKeywords === 0) {
    return [];
  }

  const safeWidth = Math.max(width, 1);
  const safeHeight = Math.max(height, 1);

  // 가로세로 비율에 맞게 격자 구성
  const ratio = safeWidth / safeHeight;
  const cols = Math.max(1, Math.ceil(Math.sqrt(totalKeywords * ratio)));
  const rows = Math.ceil(totalKeywords / cols);

  const cellWidth = safeWidth / cols;
  const cellHeight = safeHeight / rows;

  // 격자에 맞는 글자 크기 계산 (2, 4사분면은 더 크게)
  const cellSize = Math.min(cellWidth, cellHeight);
  const safeFactor = clamp(
    quadrantFontFactors[quadrant],
    recommendedFontFactorRange.min,
    recommendedFontFactorRange.max
  );
  const baseFontSize = clamp(cellSize * 0.4 * safeFactor, layoutState.minFontSize, maxKeywordFontSize);

  const positions = [];

  for (let i = 0; i < totalKeywords; i++) {
    const keyword = normalizeKeyword(keywords[i]);

    if (keyword === "") {
      continue;
    }

    const row = Math.floor(i / cols);
    const col = i % cols;

    const x = startX + (col + 0.5) * cellWidth;
    const y = startY + (row + 0.5) * cellHeight;

    // 키워드 길이에 따라 글자 크기 조정
    let fontSize = baseFontSize;
    if (keyword.length > 15) fontSize *= 0.92;
    if (keyword.length > 25) fontSize *= 0.88;
    if (keyword.length > 40) fontSize *= 0.82;
    fontSize = clamp(fontSize, layoutState.minFontSize, maxKeywordFontSize);

    const maxTextWidth = Math.max(cellWidth - currentPadding * 2, 24);
    const displayText = fitKeywordText(keyword, fontSize, maxTextWidth);

    if (displayText === "") {
      continue;
    }

    positions.push({
      text: displayText,
      originalText: keyword,
      x: x,
      y: y,
      width: cellWidth - currentPadding * 2,
      height: cellHeight - currentPadding * 2,
      fontSize: fontSize,
    });
  }

  return positions;
}

// 레이아웃 최적화 - 사분면 공간을 최대한 활용하도록 스케일링
function optimizeLayout(quadrant, startX, startY, width, height) {
  if (keywordPositions[quadrant].length === 0) return;
  const currentPadding = layoutState.padding;

  if (width <= currentPadding * 2 || height <= currentPadding * 2) {
    return;
  }

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

  if (currentWidth <= 0 || currentHeight <= 0) {
    return;
  }

  // 사용 가능한 공간과 비교하여 스케일 계산
  const scaleX = (width - currentPadding * 2) / currentWidth;
  const scaleY = (height - currentPadding * 2) / currentHeight;

  if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) {
    return;
  }

  // 종횡비 유지를 위해 작은 스케일 선택
  const scale = Math.min(scaleX, scaleY);

  // 스케일이 1보다 크면 (여유 공간이 있으면) 키워드 확대
  if (scale > 1.05) {
    // 새로운 바운딩 박스 원점 계산
    const newMinX = startX + currentPadding;
    const newMinY = startY + currentPadding;

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
  const theme = getCurrentTheme();
  const usableHeight = getUsableCanvasHeight();
  const midY = usableHeight / 2;

  // 배경을 그려서 이전 그림을 지움
  background(theme.canvasBg);

  // 사분면 구분선 그리기
  stroke(theme.divider);
  strokeWeight(2);
  line(width / 2, 0, width / 2, usableHeight);
  line(0, midY, width, midY);
  
  // 사분면 숫자 쓰기
  let nSize = 20;
  let gap = nSize*0.7;
  textSize(nSize);
  fill(theme.marker);
  noStroke();
  text("1", width/2-gap, midY-gap);
  text("2", width/2+gap, midY-gap);
  text("3", width/2-gap, midY+gap);
  text("4", width/2+gap, midY+gap);

  noStroke();

  // 각 사분면 키워드 그리기
  for (let q = 0; q < 4; q++) {
    // 사분면별 색상 설정
    const bgColor = color(theme.quadrants[q].bg);
    const textColor = color(theme.quadrants[q].text);

    // 각 키워드 그리기
    for (let i = 0; i < keywordPositions[q].length; i++) {
      const kw = keywordPositions[q][i];

      // 배경 그리기
      fill(bgColor);
      rect(kw.x - kw.width / 2, kw.y - kw.height / 2, kw.width, kw.height, layoutState.cornerRadius);

      // 텍스트 그리기
      fill(textColor);
      textSize(kw.fontSize);
      text(kw.text, kw.x, kw.y);
    }
  }

  if (appState.isLoading) {
    drawOverlayMessage("데이터 불러오는 중...", "구글 시트에서 키워드 데이터를 읽고 있습니다.");
    return;
  }

  if (appState.loadError !== "") {
    drawOverlayMessage("데이터 로드 실패", appState.loadError, true);
    return;
  }

  if (!hasAnyKeywordData()) {
    const detail = appState.infoMessage || "표시할 키워드가 없습니다.";
    drawOverlayMessage("데이터 없음", detail);
  }
}

// 윈도우 크기 변경 시 캔버스 크기 조정 및 키워드 위치 재계산
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  applyRetinaQuality();
  updateLayoutState();
  positionThemeSelector();

  if (resizeDebounceTimer) {
    clearTimeout(resizeDebounceTimer);
  }

  resizeDebounceTimer = setTimeout(() => {
    calculateKeywordPositions();
    resizeDebounceTimer = null;
  }, resizeDebounceMs);
}

function keyPressed() {
  if (key !== "t" && key !== "T") {
    return;
  }

  const themeKeys = Object.keys(themePalettes);
  const currentIndex = themeKeys.indexOf(currentThemeKey);
  const nextIndex = (currentIndex + 1) % themeKeys.length;
  currentThemeKey = themeKeys[nextIndex];

  if (themeSelect) {
    themeSelect.selected(currentThemeKey);
  }
}
