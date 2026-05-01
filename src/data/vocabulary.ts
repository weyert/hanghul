export interface VocabEntry {
  id: string
  korean: string
  romanized: string
  meaning: string
  quizzable?: boolean
}

export interface VocabCategory {
  id: string
  label: string
  korean: string
  accent: string
  entries: VocabEntry[]
}

export const VOCAB_CATEGORIES: VocabCategory[] = [
  {
    id: 'greetings', label: 'Greetings', korean: '인사', accent: 'violet',
    entries: [
      { id: 'annyeonghaseyo', korean: '안녕하세요',    romanized: 'an-nyeong-ha-se-yo',  meaning: 'Hello (formal)' },
      { id: 'annyeong',       korean: '안녕',          romanized: 'an-nyeong',           meaning: 'Hi / Bye (casual)' },
      { id: 'ne',             korean: '네',            romanized: 'ne',                  meaning: 'Yes',               quizzable: true },
      { id: 'aniyo',          korean: '아니요',        romanized: 'a-ni-yo',             meaning: 'No',                quizzable: true },
      { id: 'bangapseumnida', korean: '반갑습니다',    romanized: 'ban-gap-seum-ni-da',  meaning: 'Nice to meet you',  quizzable: true },
      { id: 'annyeonghigaseyo', korean: '안녕히 가세요', romanized: 'an-nyeong-hi ga-se-yo', meaning: 'Goodbye (to someone leaving)' },
      { id: 'annyeonghigyeseyo', korean: '안녕히 계세요', romanized: 'an-nyeong-hi gye-se-yo', meaning: 'Goodbye (you are leaving)' },
      { id: 'cheoeum',        korean: '처음 뵙겠습니다', romanized: 'cheo-eum boep-get-seum-ni-da', meaning: 'How do you do (first meeting)' },
      { id: 'jalbutakdeurimnida', korean: '잘 부탁드립니다', romanized: 'jal bu-tak-deu-rim-ni-da', meaning: 'Please take care of me' },
    ],
  },
  {
    id: 'polite', label: 'Polite Phrases', korean: '예의 표현', accent: 'emerald',
    entries: [
      { id: 'gamsahamnida',   korean: '감사합니다',    romanized: 'gam-sa-ham-ni-da',    meaning: 'Thank you (formal)',   quizzable: true },
      { id: 'gomawoyo',       korean: '고마워요',      romanized: 'go-ma-wo-yo',         meaning: 'Thank you (informal)' },
      { id: 'joesonghamnida', korean: '죄송합니다',    romanized: 'joe-song-ham-ni-da',  meaning: 'I am sorry (formal)',  quizzable: true },
      { id: 'mianhaeyo',      korean: '미안해요',      romanized: 'mi-an-hae-yo',        meaning: 'Sorry (informal)' },
      { id: 'gwaenchanhayo',  korean: '괜찮아요',      romanized: 'gwaen-cha-na-yo',     meaning: "It's okay",            quizzable: true },
      { id: 'cheonmaneyo',    korean: '천만에요',      romanized: 'cheon-man-e-yo',      meaning: "You're welcome" },
      { id: 'sillyehamnida',  korean: '실례합니다',    romanized: 'sil-lye-ham-ni-da',   meaning: 'Excuse me',            quizzable: true },
      { id: 'jamkkanman',     korean: '잠깐만요',      romanized: 'jam-kkan-man-yo',     meaning: 'Just a moment' },
      { id: 'algesseoyo',     korean: '알겠어요',      romanized: 'al-get-seo-yo',       meaning: 'I understand' },
      { id: 'moreugeseoyo',   korean: '모르겠어요',    romanized: 'mo-reu-get-seo-yo',   meaning: "I don't know" },
    ],
  },
  {
    id: 'questions', label: 'Questions & Phrases', korean: '질문', accent: 'amber',
    entries: [
      { id: 'igeo-mwoyeyo',   korean: '이게 뭐예요?',         romanized: 'i-ge mwo-ye-yo',             meaning: 'What is this?' },
      { id: 'eolmayeyo',      korean: '얼마예요?',             romanized: 'eol-ma-ye-yo',               meaning: 'How much is it?',       quizzable: true },
      { id: 'eodiyeyo',       korean: '어디예요?',             romanized: 'eo-di-ye-yo',                meaning: 'Where is it?' },
      { id: 'yeongeo',        korean: '영어 할 줄 아세요?',    romanized: 'yeong-eo hal jul a-se-yo',   meaning: 'Do you speak English?' },
      { id: 'cheoncheonhi',   korean: '천천히 말해 주세요',    romanized: 'cheon-cheon-hi mal-hae ju-se-yo', meaning: 'Please speak slowly' },
      { id: 'dasi',           korean: '다시 말씀해 주세요',    romanized: 'da-si mal-sseum-hae ju-se-yo', meaning: 'Please say that again' },
      { id: 'ihaemotaesseoyo', korean: '이해 못 했어요',       romanized: 'i-hae mot haet-seo-yo',      meaning: "I didn't understand" },
      { id: 'hwajangsileo',   korean: '화장실이 어디예요?',    romanized: 'hwa-jang-si-ri eo-di-ye-yo', meaning: 'Where is the bathroom?' },
      { id: 'meogeobeoryeoyo', korean: '먹어 봐도 돼요?',     romanized: 'meog-eo bwa-do dwae-yo',     meaning: 'Can I try eating this?' },
      { id: 'sagihaji',       korean: '사진 찍어도 돼요?',     romanized: 'sa-jin jjig-eo-do dwae-yo',  meaning: 'Can I take a photo?' },
    ],
  },
  {
    id: 'numbers', label: 'Numbers', korean: '숫자', accent: 'rose',
    entries: [
      { id: 'il',   korean: '일', romanized: 'il',   meaning: '1',     quizzable: true },
      { id: 'i',    korean: '이', romanized: 'i',    meaning: '2',     quizzable: true },
      { id: 'sam',  korean: '삼', romanized: 'sam',  meaning: '3',     quizzable: true },
      { id: 'sa',   korean: '사', romanized: 'sa',   meaning: '4',     quizzable: true },
      { id: 'o',    korean: '오', romanized: 'o',    meaning: '5',     quizzable: true },
      { id: 'yuk',  korean: '육', romanized: 'yuk',  meaning: '6',     quizzable: true },
      { id: 'chil', korean: '칠', romanized: 'chil', meaning: '7',     quizzable: true },
      { id: 'pal',  korean: '팔', romanized: 'pal',  meaning: '8',     quizzable: true },
      { id: 'gu',   korean: '구', romanized: 'gu',   meaning: '9',     quizzable: true },
      { id: 'sip',  korean: '십', romanized: 'sip',  meaning: '10',    quizzable: true },
      { id: 'baek', korean: '백', romanized: 'baek', meaning: '100',   quizzable: true },
      { id: 'cheon',korean: '천', romanized: 'cheon',meaning: '1,000', quizzable: true },
    ],
  },
  {
    id: 'food', label: 'Food & Drink', korean: '음식', accent: 'orange',
    entries: [
      { id: 'mul',         korean: '물',       romanized: 'mul',          meaning: 'Water',          quizzable: true },
      { id: 'bap',         korean: '밥',       romanized: 'bap',          meaning: 'Rice / Meal',    quizzable: true },
      { id: 'kimchi',      korean: '김치',     romanized: 'gim-chi',      meaning: 'Kimchi',         quizzable: true },
      { id: 'bulgogi',     korean: '불고기',   romanized: 'bul-go-gi',    meaning: 'Bulgogi (beef)', quizzable: true },
      { id: 'samgyeopsal', korean: '삼겹살',   romanized: 'sam-gyeop-sal',meaning: 'Pork belly',     quizzable: true },
      { id: 'bibimbap',    korean: '비빔밥',   romanized: 'bi-bim-bap',   meaning: 'Bibimbap',       quizzable: true },
      { id: 'naengmyeon',  korean: '냉면',     romanized: 'naeng-myeon',  meaning: 'Cold noodles',   quizzable: true },
      { id: 'tteokbokki',  korean: '떡볶이',   romanized: 'tteok-bok-gi', meaning: 'Spicy rice cakes', quizzable: true },
      { id: 'maekju',      korean: '맥주',     romanized: 'maek-ju',      meaning: 'Beer',           quizzable: true },
      { id: 'soju',        korean: '소주',     romanized: 'so-ju',        meaning: 'Soju',           quizzable: true },
      { id: 'kopi',        korean: '커피',     romanized: 'keo-pi',       meaning: 'Coffee',         quizzable: true },
      { id: 'masisseoyo',  korean: '맛있어요', romanized: 'ma-si-sseo-yo',meaning: 'It is delicious' },
      { id: 'gyesanseo',   korean: '계산서 주세요', romanized: 'gye-san-seo ju-se-yo', meaning: 'Check, please' },
      { id: 'maepji',      korean: '맵지 않게', romanized: 'maep-ji an-ke', meaning: 'Not too spicy' },
    ],
  },
  {
    id: 'places', label: 'Places', korean: '장소', accent: 'teal',
    entries: [
      { id: 'seoul',      korean: '서울',   romanized: 'seo-ul',       meaning: 'Seoul',               quizzable: true },
      { id: 'gonggang',   korean: '공항',   romanized: 'gong-hang',    meaning: 'Airport',             quizzable: true },
      { id: 'hotel',      korean: '호텔',   romanized: 'ho-tel',       meaning: 'Hotel',               quizzable: true },
      { id: 'sikdang',    korean: '식당',   romanized: 'sik-dang',     meaning: 'Restaurant',          quizzable: true },
      { id: 'hwajangsi',  korean: '화장실', romanized: 'hwa-jang-sil', meaning: 'Bathroom',            quizzable: true },
      { id: 'yakguk',     korean: '약국',   romanized: 'yak-guk',      meaning: 'Pharmacy',            quizzable: true },
      { id: 'pyeonjum',   korean: '편의점', romanized: 'pyeon-ui-jeom',meaning: 'Convenience store',   quizzable: true },
      { id: 'jihacheol',  korean: '지하철', romanized: 'ji-ha-cheol',  meaning: 'Subway',              quizzable: true },
      { id: 'byeongwon',  korean: '병원',   romanized: 'byeong-won',   meaning: 'Hospital',            quizzable: true },
      { id: 'eunhaeng',   korean: '은행',   romanized: 'eun-haeng',    meaning: 'Bank',                quizzable: true },
      { id: 'sijang',     korean: '시장',   romanized: 'si-jang',      meaning: 'Market',              quizzable: true },
      { id: 'hakkyo',     korean: '학교',   romanized: 'hak-gyo',      meaning: 'School',              quizzable: true },
    ],
  },
  {
    id: 'transport', label: 'Transportation', korean: '교통', accent: 'blue',
    entries: [
      { id: 'taeksi',      korean: '택시',      romanized: 'taek-si',            meaning: 'Taxi',              quizzable: true },
      { id: 'beoseu',      korean: '버스',      romanized: 'beo-seu',            meaning: 'Bus',               quizzable: true },
      { id: 'gicha',       korean: '기차',      romanized: 'gi-cha',             meaning: 'Train',             quizzable: true },
      { id: 'bihaenggi',   korean: '비행기',    romanized: 'bi-haeng-gi',        meaning: 'Airplane',          quizzable: true },
      { id: 'pyo',         korean: '표',        romanized: 'pyo',                meaning: 'Ticket',            quizzable: true },
      { id: 'gajuseyo',    korean: '가 주세요', romanized: 'ga ju-se-yo',        meaning: 'Please take me to…' },
      { id: 'yeogiseo',    korean: '여기서 세워주세요', romanized: 'yeo-gi-seo se-wo-ju-se-yo', meaning: 'Stop here, please' },
      { id: 'eolmanayo',   korean: '얼마나 걸려요?', romanized: 'eol-ma-na geol-lyeo-yo', meaning: 'How long does it take?' },
      { id: 'hwanseoung',  korean: '환승',      romanized: 'hwan-seung',         meaning: 'Transfer (transit)' },
      { id: 'churgumeodi', korean: '출구가 어디예요?', romanized: 'chul-gu-ga eo-di-ye-yo', meaning: 'Where is the exit?' },
    ],
  },
  {
    id: 'shopping', label: 'Shopping', korean: '쇼핑', accent: 'pink',
    entries: [
      { id: 'bissayo',    korean: '비싸요',       romanized: 'bi-ssa-yo',           meaning: 'It\'s expensive',   quizzable: true },
      { id: 'ssayo',      korean: '싸요',         romanized: 'ssa-yo',              meaning: 'It\'s cheap',       quizzable: true },
      { id: 'yeongsujeung', korean: '영수증',     romanized: 'yeong-su-jeung',      meaning: 'Receipt',           quizzable: true },
      { id: 'kkakka',     korean: '깎아 주세요',  romanized: 'kka-kka ju-se-yo',    meaning: 'Please give a discount' },
      { id: 'igeo-juseyo',korean: '이거 주세요',  romanized: 'i-geo ju-se-yo',      meaning: 'I\'ll take this one' },
      { id: 'kadeu',      korean: '카드 돼요?',   romanized: 'ka-deu dwae-yo',      meaning: 'Can I pay by card?' },
      { id: 'gyohwan',    korean: '교환',         romanized: 'gyo-hwan',            meaning: 'Exchange',           quizzable: true },
      { id: 'hwanbul',    korean: '환불',         romanized: 'hwan-bul',            meaning: 'Refund',             quizzable: true },
      { id: 'keugeo',     korean: '더 큰 거 있어요?', romanized: 'deo keun geo i-sseo-yo', meaning: 'Do you have a bigger size?' },
      { id: 'ibeobol',    korean: '입어 봐도 돼요?', romanized: 'i-beo bwa-do dwae-yo', meaning: 'Can I try it on?' },
    ],
  },
  {
    id: 'accommodation', label: 'Accommodation', korean: '숙박', accent: 'indigo',
    entries: [
      { id: 'yeoyak',     korean: '예약',          romanized: 'ye-yak',           meaning: 'Reservation',     quizzable: true },
      { id: 'chekeuin',   korean: '체크인',        romanized: 'che-keu-in',       meaning: 'Check-in',        quizzable: true },
      { id: 'chekeuaut',  korean: '체크아웃',      romanized: 'che-keu-a-ut',     meaning: 'Check-out',       quizzable: true },
      { id: 'bang',       korean: '방',            romanized: 'bang',             meaning: 'Room',            quizzable: true },
      { id: 'yeolsoe',    korean: '열쇠',          romanized: 'yeol-soe',         meaning: 'Key',             quizzable: true },
      { id: 'waipai',     korean: '와이파이',      romanized: 'wa-i-pa-i',        meaning: 'Wi-Fi',           quizzable: true },
      { id: 'chosik',     korean: '조식 포함이에요?', romanized: 'jo-sik po-ham-i-e-yo', meaning: 'Is breakfast included?' },
      { id: 'sujeon',     korean: '수건',          romanized: 'su-geon',          meaning: 'Towel',           quizzable: true },
      { id: 'cheongso',   korean: '청소해 주세요', romanized: 'cheong-so-hae ju-se-yo', meaning: 'Please clean the room' },
      { id: 'naengnanbang', korean: '냉난방',      romanized: 'naeng-nan-bang',   meaning: 'Air conditioning / Heating' },
    ],
  },
  {
    id: 'emergency', label: 'Emergencies', korean: '응급 상황', accent: 'red',
    entries: [
      { id: 'dowajuseyo',  korean: '도와주세요!',    romanized: 'do-wa-ju-se-yo',      meaning: 'Help!',                  quizzable: true },
      { id: 'gyeongchal',  korean: '경찰',           romanized: 'gyeong-chal',         meaning: 'Police',                 quizzable: true },
      { id: 'gugeupcha',   korean: '구급차',         romanized: 'gu-geup-cha',         meaning: 'Ambulance',              quizzable: true },
      { id: 'apayo',       korean: '아파요',         romanized: 'a-pa-yo',             meaning: 'I\'m sick / It hurts',   quizzable: true },
      { id: 'yeokwon',     korean: '여권을 잃어버렸어요', romanized: 'yeo-gwon-eul il-eo-beo-ryeot-seo-yo', meaning: 'I lost my passport' },
      { id: 'jigab',       korean: '지갑을 잃어버렸어요', romanized: 'ji-gab-eul il-eo-beo-ryeot-seo-yo', meaning: 'I lost my wallet' },
      { id: 'wiheomhaeyo', korean: '위험해요',       romanized: 'wi-heom-hae-yo',      meaning: 'It\'s dangerous',        quizzable: true },
      { id: 'daesamgwan',  korean: '대사관',         romanized: 'dae-sa-gwan',         meaning: 'Embassy',                quizzable: true },
      { id: 'bulchwol',    korean: '불!',            romanized: 'bul',                 meaning: 'Fire!',                  quizzable: true },
    ],
  },
  {
    id: 'directions', label: 'Directions', korean: '방향', accent: 'sky',
    entries: [
      { id: 'oenjjok',    korean: '왼쪽',   romanized: 'oen-jjok',    meaning: 'Left',            quizzable: true },
      { id: 'oreunjjok',  korean: '오른쪽', romanized: 'o-reun-jjok', meaning: 'Right',           quizzable: true },
      { id: 'jikjin',     korean: '직진',   romanized: 'jik-jin',     meaning: 'Straight ahead',  quizzable: true },
      { id: 'dwi',        korean: '뒤',     romanized: 'dwi',         meaning: 'Behind / Back',   quizzable: true },
      { id: 'wi',         korean: '위',     romanized: 'wi',          meaning: 'Up / Above',      quizzable: true },
      { id: 'arae',       korean: '아래',   romanized: 'a-rae',       meaning: 'Down / Below',    quizzable: true },
      { id: 'geunche',    korean: '근처',   romanized: 'geun-cheo',   meaning: 'Nearby',          quizzable: true },
      { id: 'yeogi',      korean: '여기',   romanized: 'yeo-gi',      meaning: 'Here',            quizzable: true },
      { id: 'jeogi',      korean: '저기',   romanized: 'jeo-gi',      meaning: 'Over there',      quizzable: true },
      { id: 'meoreoyo',   korean: '멀어요?',romanized: 'meol-eo-yo',  meaning: 'Is it far?' },
    ],
  },
  {
    id: 'time', label: 'Time & Days', korean: '시간·요일', accent: 'purple',
    entries: [
      { id: 'oneul',    korean: '오늘',   romanized: 'o-neul',   meaning: 'Today',      quizzable: true },
      { id: 'naeil',    korean: '내일',   romanized: 'nae-il',   meaning: 'Tomorrow',   quizzable: true },
      { id: 'eoje',     korean: '어제',   romanized: 'eo-je',    meaning: 'Yesterday',  quizzable: true },
      { id: 'jigeum',   korean: '지금',   romanized: 'ji-geum',  meaning: 'Now',        quizzable: true },
      { id: 'achim',    korean: '아침',   romanized: 'a-chim',   meaning: 'Morning',    quizzable: true },
      { id: 'jeomsim',  korean: '점심',   romanized: 'jeom-sim', meaning: 'Lunch / Noon', quizzable: true },
      { id: 'jeonyeok', korean: '저녁',   romanized: 'jeo-nyeok',meaning: 'Evening',    quizzable: true },
      { id: 'bam',      korean: '밤',     romanized: 'bam',      meaning: 'Night',      quizzable: true },
      { id: 'woryoil',  korean: '월요일', romanized: 'wol-yo-il',meaning: 'Monday',     quizzable: true },
      { id: 'hwayoil',  korean: '화요일', romanized: 'hwa-yo-il',meaning: 'Tuesday',    quizzable: true },
      { id: 'suyoil',   korean: '수요일', romanized: 'su-yo-il', meaning: 'Wednesday',  quizzable: true },
      { id: 'mokyoil',  korean: '목요일', romanized: 'mok-yo-il',meaning: 'Thursday',   quizzable: true },
      { id: 'geumyoil', korean: '금요일', romanized: 'geum-yo-il',meaning: 'Friday',    quizzable: true },
      { id: 'toyoil',   korean: '토요일', romanized: 'to-yo-il', meaning: 'Saturday',   quizzable: true },
      { id: 'iryoil',   korean: '일요일', romanized: 'il-yo-il', meaning: 'Sunday',     quizzable: true },
    ],
  },
]

export const QUIZ_VOCAB: VocabEntry[] = VOCAB_CATEGORIES
  .flatMap((c) => c.entries)
  .filter((e) => e.quizzable)
