export type FactCategory =
  | 'history'
  | 'culture'
  | 'food'
  | 'technology'
  | 'entertainment'
  | 'geography'
  | 'society'

export interface KoreaFact {
  id: string
  text: string
  category: FactCategory
  era?: string
}

export const CATEGORY_META: Record<FactCategory, { label: string; korean: string; color: string; border: string; bg: string }> = {
  history:       { label: 'History',       korean: '역사', color: '#fcd34d', border: 'rgba(245,158,11,0.35)', bg: 'rgba(180,83,9,0.12)' },
  culture:       { label: 'Culture',       korean: '문화', color: '#a78bfa', border: 'rgba(139,92,246,0.35)', bg: 'rgba(109,40,217,0.12)' },
  food:          { label: 'Food',          korean: '음식', color: '#f97316', border: 'rgba(249,115,22,0.35)', bg: 'rgba(194,65,12,0.12)' },
  technology:    { label: 'Technology',    korean: '기술', color: '#38bdf8', border: 'rgba(14,165,233,0.35)', bg: 'rgba(2,132,199,0.12)' },
  entertainment: { label: 'Entertainment', korean: '한류', color: '#f472b6', border: 'rgba(236,72,153,0.35)', bg: 'rgba(190,24,93,0.12)' },
  geography:     { label: 'Geography',     korean: '지리', color: '#6ee7b7', border: 'rgba(16,185,129,0.35)', bg: 'rgba(5,150,105,0.12)' },
  society:       { label: 'Society',       korean: '사회', color: '#c4b5fd', border: 'rgba(167,139,250,0.35)', bg: 'rgba(109,40,217,0.10)' },
}

export const KOREA_FACTS: KoreaFact[] = [
  // ── History ──────────────────────────────────────────────────────────
  {
    id: 'h001',
    category: 'history',
    era: 'Ancient',
    text: 'According to legend, Korea was founded in 2333 BC by Dangun, who was said to be the son of the god Hwanung and a bear-woman who transformed into a human after 100 days of eating garlic and mugwort.',
  },
  {
    id: 'h002',
    category: 'history',
    era: 'Ancient',
    text: 'Korea\'s first kingdom, Gojoseon, is considered one of the earliest states in East Asia and gives the peninsula one of the longest continuous histories of any nation.',
  },
  {
    id: 'h003',
    category: 'history',
    era: 'Three Kingdoms (57 BC – 668 AD)',
    text: 'For over 700 years, the Korean peninsula was divided among three rival kingdoms: Goguryeo in the north, Baekje in the southwest, and Silla in the southeast — each with distinct cultures, art styles, and alliances.',
  },
  {
    id: 'h004',
    category: 'history',
    era: 'Three Kingdoms',
    text: 'Goguryeo, the northernmost of the Three Kingdoms, was one of the most powerful empires in East Asia, stretching deep into Manchuria and rivalling the Chinese Tang Dynasty in military strength.',
  },
  {
    id: 'h005',
    category: 'history',
    era: 'Unified Silla (668 – 935 AD)',
    text: 'Silla unified the peninsula in 668 AD by allying with Tang China to defeat Baekje and Goguryeo. It then fought a second war to expel Chinese forces and consolidate Korean sovereignty.',
  },
  {
    id: 'h006',
    category: 'history',
    era: 'Silla',
    text: 'The Cheomseongdae Observatory, built in 632 AD during the Silla Dynasty, is the oldest surviving astronomical observatory in Asia. It still stands in Gyeongju today.',
  },
  {
    id: 'h007',
    category: 'history',
    era: 'Goryeo (918 – 1392)',
    text: 'The name "Korea" comes from Goryeo, the dynasty that ruled from 918 to 1392 and was so prominent in trade that Arab and Persian merchants spread the name across the medieval world.',
  },
  {
    id: 'h008',
    category: 'history',
    era: 'Goryeo',
    text: 'Korea invented movable metal type printing around 1230 AD — approximately 200 years before Gutenberg\'s press in Europe. The Jikji, printed in 1377, is the world\'s oldest surviving book printed with metal type.',
  },
  {
    id: 'h009',
    category: 'history',
    era: 'Goryeo',
    text: 'The Tripitaka Koreana, completed in 1251 during the Goryeo period, comprises over 80,000 individually carved wooden blocks containing the entire Buddhist canon. Stored at Haeinsa Temple, it is a UNESCO World Heritage Site.',
  },
  {
    id: 'h010',
    category: 'history',
    era: 'Goryeo',
    text: 'Goryeo celadon pottery, with its distinctive jade-green glaze, was so prized that Chinese artisans of the Song Dynasty acknowledged it as the finest celadon in the world.',
  },
  {
    id: 'h011',
    category: 'history',
    era: 'Joseon Dynasty (1392 – 1897)',
    text: 'The Joseon Dynasty is one of the longest-ruling dynasties in world history, lasting over 500 years. It deeply shaped Korean language, Confucian ethics, architecture, and art to this day.',
  },
  {
    id: 'h012',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'King Sejong the Great commissioned the creation of Hangul in 1443. The script was designed so that even common people could learn to read — the royal proclamation said a wise man could learn it in a morning.',
  },
  {
    id: 'h013',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'Gyeongbokgung, the main palace of the Joseon Dynasty, was built in 1395 and contained over 500 buildings at its peak. It was burned during Japanese invasions in 1592 and has been progressively restored since 1990.',
  },
  {
    id: 'h014',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'Admiral Yi Sun-sin (이순신) is one of Korea\'s greatest heroes. During the Japanese invasions of 1592–98, he won 23 battles in a row without a single defeat, and famously destroyed a fleet of 333 Japanese ships with just 13 vessels at the Battle of Myeongnyang.',
  },
  {
    id: 'h015',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'The Turtle Ship (거북선), developed by Admiral Yi Sun-sin, is considered one of the world\'s first ironclad warships. Its iron-spiked roof prevented enemies from boarding and gave it devastating effectiveness against Japanese fleets.',
  },
  {
    id: 'h016',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'Hwaseong Fortress, completed in 1796 by King Jeongjo as a tribute to his father, is a UNESCO World Heritage Site and an engineering marvel that blended Eastern and Western construction techniques including mobile cranes called geojunggi.',
  },
  {
    id: 'h017',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'Korea was known as the "Hermit Kingdom" in the 19th century due to its strict isolationist policy that severely restricted foreign contact and trade for hundreds of years.',
  },
  {
    id: 'h018',
    category: 'history',
    era: 'Japanese Colonial Period (1910–1945)',
    text: 'Japan annexed Korea in 1910 and ruled for 35 years. During this period, Korean language, names, and cultural identity were systematically suppressed — Koreans were even forced to adopt Japanese names.',
  },
  {
    id: 'h019',
    category: 'history',
    era: 'March First Movement (1919)',
    text: 'On March 1, 1919, over two million Koreans participated in peaceful nationwide demonstrations against Japanese colonial rule. The movement became a defining moment in Korean national identity and is still celebrated as a national holiday.',
  },
  {
    id: 'h020',
    category: 'history',
    era: 'Korean War (1950–1953)',
    text: 'The Korean War began on June 25, 1950, when North Korean forces crossed the 38th parallel. More than 36,000 Americans, 137,000 South Koreans, and millions of civilians died before an armistice was signed in 1953 — technically, the war has never officially ended.',
  },
  {
    id: 'h021',
    category: 'history',
    era: 'Modern',
    text: 'South Korea transformed from one of the world\'s poorest countries after the Korean War (with a per-capita income of about $67 in 1953) to the 10th largest economy in the world by the 2000s — a rise economists call the "Miracle on the Han River."',
  },
  {
    id: 'h022',
    category: 'history',
    era: 'Modern',
    text: 'The 1988 Seoul Summer Olympics was South Korea\'s debut on the world stage and symbolised the country\'s transformation into a modern democracy and economic power just 35 years after the Korean War left Seoul in ruins.',
  },
  {
    id: 'h023',
    category: 'history',
    era: 'Ancient',
    text: 'Korea has more prehistoric dolmen (stone burial monuments) than anywhere else in the world — about 40,000 of the world\'s 60,000 known dolmen are on the Korean peninsula, earning a UNESCO World Heritage designation.',
  },
  {
    id: 'h024',
    category: 'history',
    era: 'Silla',
    text: 'The Hwarang (화랑, "flower knights") were an elite order of young male warriors in Silla who trained in martial arts, arts, music, and Confucian ethics. Their code of honour strongly influenced Korean culture and is seen as an early form of chivalry.',
  },
  {
    id: 'h025',
    category: 'history',
    era: 'Goryeo',
    text: 'During the Mongol invasions of the 13th century, the Goryeo court retreated to Ganghwa Island and held out for almost 30 years — one of the longest sustained resistances against the Mongol Empire in history.',
  },
  {
    id: 'h026',
    category: 'history',
    era: 'Joseon Dynasty',
    text: 'King Sejong invented Hangul partly because the Korean language has sounds that cannot be accurately represented in Chinese characters (hanja), which had been the only writing system available to educated Koreans.',
  },

  // ── Geography ────────────────────────────────────────────────────────
  {
    id: 'g001',
    category: 'geography',
    text: 'South Korea is roughly the size of Indiana or Portugal, covering about 100,000 km² — yet it is home to nearly 52 million people, making it one of the most densely populated countries on Earth.',
  },
  {
    id: 'g002',
    category: 'geography',
    text: 'About 70% of South Korea\'s terrain is mountainous, with the Taebaek Range running along the east coast. This leaves relatively little flat land for agriculture, which historically drove Korean ingenuity in terraced farming.',
  },
  {
    id: 'g003',
    category: 'geography',
    text: 'Jeju Island, South Korea\'s largest island, was formed by volcanic activity and is home to Hallasan, a dormant shield volcano and the highest peak in South Korea at 1,950 m. It is a UNESCO World Natural Heritage Site.',
  },
  {
    id: 'g004',
    category: 'geography',
    text: 'The Han River (한강) flows through Seoul for over 80 km and is the lifeblood of the capital. Its banks were transformed into parks, bike paths, and leisure areas as part of Seoul\'s urban renewal, and are now a beloved gathering space.',
  },
  {
    id: 'g005',
    category: 'geography',
    text: 'South Korea has over 3,000 islands scattered off its western and southern coasts. Many are uninhabited, and the archipelago forms some of the most dramatic coastlines in East Asia.',
  },
  {
    id: 'g006',
    category: 'geography',
    text: 'The DMZ (Demilitarized Zone) between North and South Korea, about 4 km wide and 250 km long, has been one of the most heavily fortified borders in the world since 1953. Paradoxically, the absence of human activity has made it one of the best-preserved natural habitats in Asia.',
  },
  {
    id: 'g007',
    category: 'geography',
    text: 'Seoul is home to about half of South Korea\'s entire population in its greater metropolitan area, making it one of the most concentrated urban centres in the world.',
  },
  {
    id: 'g008',
    category: 'geography',
    text: 'South Korea experiences four distinct seasons: cherry blossoms in spring, hot and humid monsoon summers, crisp and colourful autumns, and cold snowy winters — especially in the mountainous regions.',
  },
  {
    id: 'g009',
    category: 'geography',
    text: 'Dokdo (독도), two rocky islets in the Sea of Japan (East Sea), is claimed by both South Korea and Japan. South Korea administers the islands, and they hold deep symbolic importance for Korean national identity.',
  },

  // ── Culture ──────────────────────────────────────────────────────────
  {
    id: 'c001',
    category: 'culture',
    text: 'Koreans traditionally used a different age system: everyone turned one year old at birth and gained another year every New Year\'s Day rather than on their birthday. The government abolished this "Korean age" system in 2023, standardising to international age.',
  },
  {
    id: 'c002',
    category: 'culture',
    text: 'Chuseok (추석) is often called the "Korean Thanksgiving." Celebrated on the full moon of the 8th lunar month, families gather to share food, perform ancestral rites, and visit graves — causing the largest annual mass migration in the country.',
  },
  {
    id: 'c003',
    category: 'culture',
    text: 'Seollal (설날), Korean Lunar New Year, is one of the most important holidays. Families perform the ritual of sebae (세배) — a deep bow to elders — in exchange for New Year blessings and gifts of money in colourful envelopes.',
  },
  {
    id: 'c004',
    category: 'culture',
    text: 'Hanbok (한복) is the traditional Korean garment, characterised by vibrant colours and simple lines. While daily wear has given way to Western clothing, hanbok is still worn for weddings, holidays, and increasingly as a fashion statement.',
  },
  {
    id: 'c005',
    category: 'culture',
    text: 'The concept of "nunchi" (눈치) — the subtle art of reading a room and responding appropriately — is deeply embedded in Korean social culture. Having good nunchi means understanding unspoken cues and social hierarchies instinctively.',
  },
  {
    id: 'c006',
    category: 'culture',
    text: 'Korea has a strong culture of collective dining: dishes are placed in the centre of the table and shared, rather than being individually plated. The communal side dish kimchi is replenished endlessly and free at almost every Korean restaurant.',
  },
  {
    id: 'c007',
    category: 'culture',
    text: 'Jjimjilbang (찜질방) are 24-hour public bathhouses and saunas that are a beloved social institution. Koreans of all ages visit to relax, sleep, socialise, and even work. They cost around 10,000–15,000 won (~$8) for unlimited time.',
  },
  {
    id: 'c008',
    category: 'culture',
    text: 'Noraebang (노래방) — private karaoke rooms for hire — are ubiquitous in Korean cities. Unlike Western karaoke, you rent a room for your group, order drinks, and sing without an audience, which has made it enormously popular across all ages.',
  },
  {
    id: 'c009',
    category: 'culture',
    text: 'Korea has a deeply hierarchical language: the same sentence can be said in six different speech levels depending on the relationship between speaker and listener. Getting the formality level wrong is a serious social misstep.',
  },
  {
    id: 'c010',
    category: 'culture',
    text: 'The concept of "han" (한) is a uniquely Korean emotion — a collective feeling of sorrow, resentment, and grief born from centuries of foreign invasions, oppression, and hardship. It is considered a defining thread in Korean art, music, and storytelling.',
  },
  {
    id: 'c011',
    category: 'culture',
    text: 'Taekwondo (태권도), Korea\'s national sport, was included in the Olympic Games in 2000. Practised by an estimated 80 million people in over 200 countries, it is one of the world\'s most widely practised martial arts.',
  },
  {
    id: 'c012',
    category: 'culture',
    text: '"Ppali ppali" (빨리빨리, meaning "hurry hurry") is a cultural mindset that drives South Korea\'s fast-paced society. It is credited with fuelling rapid economic development but also contributes to high stress levels.',
  },
  {
    id: 'c013',
    category: 'culture',
    text: 'Confucian values — respect for elders, importance of education, group harmony, and loyalty — have shaped Korean society for over 600 years since the Joseon Dynasty adopted Confucianism as its state philosophy.',
  },
  {
    id: 'c014',
    category: 'culture',
    text: 'Shamanism (무속신앙) is one of Korea\'s oldest spiritual traditions, predating Buddhism and Confucianism. Shamans called mudang (무당) conduct rituals called gut to communicate with spirits, heal illness, and bring good fortune.',
  },
  {
    id: 'c015',
    category: 'culture',
    text: 'Korea has the highest rate of plastic surgery per capita in the world. The most common procedures are double-eyelid surgery and jaw contouring, and it is socially acceptable — even encouraged — to discuss cosmetic surgery openly.',
  },
  {
    id: 'c016',
    category: 'culture',
    text: 'Pansori (판소리) is a genre of traditional Korean musical storytelling in which a solo singer and a drummer perform a dramatic narrative that can last several hours. It is a UNESCO Intangible Cultural Heritage.',
  },
  {
    id: 'c017',
    category: 'culture',
    text: 'In Korea, the number 4 is considered unlucky because the word for four (사, sa) sounds like the word for death. Many buildings skip the 4th floor, labelling it "F" instead — similar to the Western avoidance of 13.',
  },
  {
    id: 'c018',
    category: 'culture',
    text: 'Korea\'s "skinship" culture — the casual physical affection between same-sex friends, like holding hands or resting on each other — is a normal expression of close friendship, entirely distinct from romantic relationships.',
  },
  {
    id: 'c019',
    category: 'culture',
    text: 'Buddhism arrived in Korea in 372 AD and profoundly shaped its art, philosophy, and temple architecture. Today there are over 900 registered Buddhist temples in South Korea, many nestled in mountain valleys.',
  },
  {
    id: 'c020',
    category: 'culture',
    text: 'The Haenyeo (해녀) — "sea women" — of Jeju Island are female free-divers who harvest seafood from the ocean floor without scuba gear, sometimes diving to depths of 20 metres. Their tradition, spanning centuries, is a UNESCO Intangible Cultural Heritage.',
  },
  {
    id: 'c021',
    category: 'culture',
    text: 'Ssireum (씨름) is Korea\'s ancient form of folk wrestling, where opponents grip each other\'s cloth belt and attempt to throw the other to the ground. It has been practised for over 2,000 years and is depicted in Goguryeo tomb murals.',
  },

  // ── Food ─────────────────────────────────────────────────────────────
  {
    id: 'f001',
    category: 'food',
    text: 'Kimchi (김치) is not just a dish — it is a cultural institution. Made by fermenting vegetables (usually napa cabbage) with chili, garlic, and ginger, it is served at virtually every Korean meal and has over 200 regional varieties.',
  },
  {
    id: 'f002',
    category: 'food',
    text: 'South Korea consumes more instant ramen per capita than any other country in the world. Shin Ramyun, produced by Nongshim, is one of the best-selling instant noodle products globally.',
  },
  {
    id: 'f003',
    category: 'food',
    text: 'Kimjang (김장), the communal tradition of making kimchi in large batches before winter, was inscribed on UNESCO\'s Intangible Cultural Heritage list in 2013. Families and neighbours gather to ferment hundreds of heads of cabbage together.',
  },
  {
    id: 'f004',
    category: 'food',
    text: 'Korean BBQ (고기구이) — grilling meat directly at the table on a built-in grill — has become one of the most internationally recognised Korean dining experiences, exported to restaurants on every continent.',
  },
  {
    id: 'f005',
    category: 'food',
    text: 'Soju (소주) is the world\'s best-selling spirit by volume. More bottles of soju are sold each year than Johnnie Walker Scotch and Jack Daniel\'s combined. Jinro Chamisul is consistently the world\'s most sold spirit brand.',
  },
  {
    id: 'f006',
    category: 'food',
    text: 'Tteok (떡), Korean rice cake, is a staple of celebrations and rites of passage. There are hundreds of varieties — pounded, steamed, fried — and eating tteokguk (rice cake soup) on New Year\'s Day is believed to add a year to your age.',
  },
  {
    id: 'f007',
    category: 'food',
    text: 'Korean street food culture is legendary: tteokbokki (spicy rice cakes), hotteok (sweet filled pancakes), sundae (blood sausage), and bungeoppang (fish-shaped waffle pastry) are sold by vendors in every city district.',
  },
  {
    id: 'f008',
    category: 'food',
    text: 'The "mukbang" (먹방) phenomenon — livestreaming yourself eating large quantities of food while interacting with viewers — originated in South Korea around 2010 and has since become a global internet genre.',
  },
  {
    id: 'f009',
    category: 'food',
    text: 'Doenjang (된장), Korean fermented soybean paste, is sometimes called "Korea\'s miso." It is a foundational ingredient in Korean cooking and is fermented for months or years in traditional earthenware pots called onggi (옹기).',
  },
  {
    id: 'f010',
    category: 'food',
    text: 'Korean convenience stores (GS25, CU, 7-Eleven) are a full dining experience: they offer fresh kimbap, hot ramyun cooked on-site, steamed buns, and dozens of fried snacks — and Koreans eat in them regularly rather than just grabbing snacks.',
  },
  {
    id: 'f011',
    category: 'food',
    text: 'Makgeolli (막걸리) is Korea\'s oldest alcoholic beverage — a milky, slightly fizzy rice wine that has been brewed for over 2,000 years. It was historically the drink of farmers and labourers and is experiencing a major craft revival.',
  },
  {
    id: 'f012',
    category: 'food',
    text: 'Bibimbap (비빔밥), meaning "mixed rice," is one of Korea\'s most iconic dishes: a bowl of rice topped with sautéed vegetables, gochujang (red chili paste), and often an egg and sliced beef, all mixed together before eating.',
  },
  {
    id: 'f013',
    category: 'food',
    text: 'Korea\'s delivery culture is unmatched globally. Nearly any food can be delivered in 30 minutes or less, 24 hours a day. Riders even deliver single cups of coffee and entire multi-course meals, and delivery drones are already being tested.',
  },
  {
    id: 'f014',
    category: 'food',
    text: 'Samgyeopsal (삼겹살) — thick slices of pork belly grilled at the table — is so popular that March 3rd (3/3, sam-sam) is unofficially celebrated as "Samgyeopsal Day" in South Korea.',
  },

  // ── Technology ───────────────────────────────────────────────────────
  {
    id: 't001',
    category: 'technology',
    text: 'South Korea consistently ranks first or second in the world for internet speed and broadband penetration. The country rolled out nationwide gigabit fibre infrastructure years before most Western nations.',
  },
  {
    id: 't002',
    category: 'technology',
    text: 'Samsung Electronics is one of the world\'s most valuable companies, producing around 20% of South Korea\'s total exports. It makes everything from semiconductors and smartphones to medical equipment and construction cranes.',
  },
  {
    id: 't003',
    category: 'technology',
    text: 'South Korea is the world\'s largest producer of DRAM memory chips. Samsung and SK Hynix together control over 70% of the global DRAM market — the chips that power virtually every computer and smartphone on Earth.',
  },
  {
    id: 't004',
    category: 'technology',
    text: 'The Korean messaging app KakaoTalk is used by 97% of South Koreans — a higher penetration rate than any other single app in any major country. Not being on KakaoTalk in South Korea is the social equivalent of not having a phone number.',
  },
  {
    id: 't005',
    category: 'technology',
    text: 'LG Electronics invented the world\'s first OLED TV display and continues to lead in OLED panel technology, which is now used in flagship phones and TVs from Apple, Samsung, and Sony.',
  },
  {
    id: 't006',
    category: 'technology',
    text: 'South Korea was the first country in the world to have a nationwide 5G network, launched in April 2019 — just hours ahead of the US carriers who were also racing to be first.',
  },
  {
    id: 't007',
    category: 'technology',
    text: 'PC방 (PC bang, "PC room") gaming cafés are a uniquely Korean institution: open 24/7, they offer high-end gaming PCs, food delivery, and headsets for a few dollars an hour. StarCraft and League of Legends became phenomenon partly because of them.',
  },
  {
    id: 't008',
    category: 'technology',
    text: 'Hyundai Motor, once mocked for poor quality in the 1980s, is now one of the world\'s top five automakers by volume and consistently ranks among the highest in quality surveys. Its turnaround is studied in business schools worldwide.',
  },
  {
    id: 't009',
    category: 'technology',
    text: 'Incheon International Airport, opened in 2001, has been voted the world\'s best airport multiple times. It features a golf course, ice-skating rink, spa, casino, and a transit hotel — all within the terminal complex.',
  },
  {
    id: 't010',
    category: 'technology',
    text: 'Korea\'s KTX bullet train, launched in 2004, connects Seoul to Busan (450 km) in under 2.5 hours at speeds of up to 305 km/h, transforming a 4.5-hour journey and reshaping Korea\'s economic geography.',
  },
  {
    id: 't011',
    category: 'technology',
    text: 'POSCO, the South Korean steelmaker founded in 1968 with a US$6 million loan (which the World Bank initially refused to grant), is now the world\'s fourth-largest steel producer and a symbol of Korea\'s industrial rise.',
  },
  {
    id: 't012',
    category: 'technology',
    text: 'Korea has one of the highest smartphone penetration rates in the world — over 95% of the population owns a smartphone, compared to around 85% in the United States.',
  },
  {
    id: 't013',
    category: 'technology',
    text: 'The Seoul Metropolitan Subway is one of the largest and busiest metro systems in the world, with over 300 stations spanning 9 lines. It is renowned for its WiFi connectivity, clean facilities, and punctuality.',
  },

  // ── Entertainment ────────────────────────────────────────────────────
  {
    id: 'e001',
    category: 'entertainment',
    text: '"Hallyu" (한류, "Korean Wave") refers to the global spread of Korean culture — starting with dramas in the 1990s, expanding to K-pop in the 2000s, and now encompassing film, food, beauty, fashion, and language.',
  },
  {
    id: 'e002',
    category: 'entertainment',
    text: 'BTS became the first Korean act to reach number one on the US Billboard Hot 100, achieving the feat in 2020 with "Dynamite." They are also the first Korean artists to perform at the Grammy Awards.',
  },
  {
    id: 'e003',
    category: 'entertainment',
    text: 'Parasite (기생충), directed by Bong Joon-ho, became the first non-English-language film to win the Academy Award for Best Picture in 2020 — a historic milestone seen as recognition of Korean cinema\'s decades of world-class filmmaking.',
  },
  {
    id: 'e004',
    category: 'entertainment',
    text: 'Squid Game (오징어 게임) became Netflix\'s most-watched series ever upon release in 2021, viewed in 94% of all countries where Netflix operates, proving that Korean storytelling had fully entered the global mainstream.',
  },
  {
    id: 'e005',
    category: 'entertainment',
    text: 'PSY\'s "Gangnam Style" became the first YouTube video to reach 1 billion views in 2012. The song satirised the affluent Gangnam district of Seoul and introduced the world to modern Korean pop culture.',
  },
  {
    id: 'e006',
    category: 'entertainment',
    text: 'K-pop is not just music — it is a highly engineered system. Trainees sign contracts as young as 12, train for up to 7 years in singing, dancing, acting, and languages before debuting as carefully crafted group acts.',
  },
  {
    id: 'e007',
    category: 'entertainment',
    text: 'StarCraft became a national phenomenon in South Korea in the late 1990s. Professional players had celebrity status, matches were broadcast on dedicated TV channels, and arenas sold out for live tournaments — years before eSports was a global concept.',
  },
  {
    id: 'e008',
    category: 'entertainment',
    text: 'The Korean film industry has produced globally acclaimed directors including Bong Joon-ho (Parasite, The Host), Park Chan-wook (Oldboy), and Kim Ki-duk — giving Korea outsized influence in world cinema relative to its size.',
  },
  {
    id: 'e009',
    category: 'entertainment',
    text: 'K-beauty (Korean beauty) pioneered innovations like BB cream, sheet masks, essence, and the 10-step skincare routine that have since been adopted worldwide. The Korean beauty industry is worth over $10 billion globally.',
  },
  {
    id: 'e010',
    category: 'entertainment',
    text: 'The WEBTOON format — vertical-scroll digital comics optimised for smartphones — was invented in South Korea around 2003. It is now a global medium, with Naver Webtoon serving over 85 million monthly users in 100+ countries.',
  },
  {
    id: 'e011',
    category: 'entertainment',
    text: 'Korean dramas (K-dramas) are exported to over 100 countries. Titles like Winter Sonata, Jewel in the Palace, and Crash Landing on You sparked massive fan followings across Asia, Latin America, and the Middle East.',
  },
  {
    id: 'e012',
    category: 'entertainment',
    text: 'BLACKPINK became the first K-pop group to headline Coachella in 2019, playing to the largest audience in the festival\'s history for their set, cementing K-pop\'s arrival in Western mainstream music.',
  },

  // ── Society ──────────────────────────────────────────────────────────
  {
    id: 's001',
    category: 'society',
    text: 'South Korea has one of the world\'s most intense education cultures, described as "education fever" (교육열). Students attend school from early morning until late at night, with hagwon (학원, private tutoring academies) operating until 10 PM.',
  },
  {
    id: 's002',
    category: 'society',
    text: 'The Suneung (수능), Korea\'s university entrance exam, is a single high-stakes test taken once a year. On test day, flights are rescheduled to avoid noise during the listening section and police are deployed to help students who are running late.',
  },
  {
    id: 's003',
    category: 'society',
    text: 'All able-bodied South Korean men are required to complete approximately 18–21 months of mandatory military service, a policy rooted in the ongoing Korean War armistice and the constant threat from North Korea.',
  },
  {
    id: 's004',
    category: 'society',
    text: 'South Korea has one of the lowest birth rates in the world, recording a total fertility rate of 0.72 in 2023 — the lowest ever recorded by any country — creating a serious demographic and economic challenge.',
  },
  {
    id: 's005',
    category: 'society',
    text: 'The "sampo generation" (삼포세대) is a term coined in the 2010s for young Koreans who give up (포기) on three things: dating, marriage, and having children — due to high living costs, job insecurity, and extreme competition.',
  },
  {
    id: 's006',
    category: 'society',
    text: 'South Korea transformed from a military dictatorship to a vibrant democracy within a single generation. Major pro-democracy protests in 1987 forced the government to allow direct presidential elections after decades of authoritarian rule.',
  },
  {
    id: 's007',
    category: 'society',
    text: 'In 2017, South Korean president Park Geun-hye became the country\'s first democratically elected leader to be impeached and imprisoned — following months of massive candlelight protests in Seoul that drew millions of citizens.',
  },
  {
    id: 's008',
    category: 'society',
    text: 'Koreans have the world\'s highest per-capita spending on private education, with families spending an enormous proportion of income on tutoring, music lessons, and extracurriculars for children as young as three.',
  },
  {
    id: 's009',
    category: 'society',
    text: 'Korean men spend more money on skincare than men in any other country. The male grooming market is normalised to an extent rarely seen elsewhere, with skincare routines, BB cream, and even light makeup common among young men.',
  },
  {
    id: 's010',
    category: 'society',
    text: 'The concept of "jeong" (정) — a deep emotional bond that builds slowly over time through shared experience — is central to Korean relationships and is often described as what makes it hard to leave Korea once you\'ve lived there.',
  },
  {
    id: 's011',
    category: 'society',
    text: 'South Korea is the most religiously diverse major country in East Asia: approximately 29% Christian, 23% Buddhist, and 46% no religious affiliation — with widespread syncretic practice blending multiple traditions.',
  },
  {
    id: 's012',
    category: 'society',
    text: 'The welfare of "365-day convenience": Seoul operates 24/7 at a level unmatched in most cities — pharmacies, restaurants, karaoke bars, gyms, spas, and study cafés all operate around the clock throughout the city.',
  },
  {
    id: 's013',
    category: 'society',
    text: 'South Korea has the highest concentration of Fortune Global 500 companies per capita of any country, with Samsung, Hyundai, SK, LG, and Lotte among the conglomerates (chaebol) that dominate the economy.',
  },
  {
    id: 's014',
    category: 'society',
    text: 'The "chaebol" (재벌) system — family-controlled conglomerates that dominate the economy — was central to Korea\'s rapid development but has also been criticised for stifling competition, concentrating wealth, and enabling corruption.',
  },
  {
    id: 's015',
    category: 'society',
    text: 'Hangul Proclamation Day (한글날) is a national public holiday celebrated on October 9th, marking the 1446 promulgation of King Sejong\'s script. South Korea is one of very few countries to have a holiday dedicated to its writing system.',
  },

  // ── Additional History & Ancient History ───────────────────────────────────

  {
    id: 'h027',
    category: 'history',
    era: 'c. 8000–1500 BC',
    text: 'The Jeulmun people (빗살무늬토기) inhabited the Korean peninsula from around 8000 BC, leaving behind distinctive comb-pattern pottery — some of the oldest ceramics in East Asia. They were skilled hunters, fishers, and gatherers long before rice agriculture arrived.',
  },
  {
    id: 'h028',
    category: 'history',
    era: 'c. 1500–300 BC',
    text: 'The Mumun period brought bronze-age farming villages to Korea. Mumun people cultivated rice and millet, lived in rectangular pit-dwellings, and erected massive stone dolmens as burial monuments — over 35,000 survive in Korea today, the largest concentration of dolmens on Earth.',
  },
  {
    id: 'h029',
    category: 'history',
    era: 'c. 300 BC',
    text: 'Iron technology spread to the Korean peninsula around 300 BC, accelerating state formation. Iron tools and weapons gave rise to more powerful chiefdoms, paving the way for the emergence of the Three Kingdoms within a few centuries.',
  },
  {
    id: 'h030',
    category: 'history',
    era: '18 BC – 660 AD',
    text: 'Baekje (백제), one of the Three Kingdoms, became a crucial cultural bridge between East Asia and Japan. Korean artisans, Buddhist monks, and scholars carried writing, Buddhism, advanced agriculture, and sophisticated crafts to the Japanese archipelago — profoundly shaping early Japanese civilisation.',
  },
  {
    id: 'h031',
    category: 'history',
    era: '5th century AD',
    text: 'The scholar Wani (왕인) of Baekje is traditionally credited with bringing Chinese writing (Hanja) and the Confucian Analects to Japan in the early 5th century AD, making him one of the most consequential cultural intermediaries in East Asian history.',
  },
  {
    id: 'h032',
    category: 'history',
    era: '552 AD',
    text: 'Buddhism was officially transmitted from Baekje to Japan in 552 AD (or 538 by some accounts), sending Buddhist scriptures and a statue of the Buddha as a gift from the Baekje king to the Japanese court — initiating a religious transformation of Japanese society.',
  },
  {
    id: 'h033',
    category: 'history',
    era: '698–926 AD',
    text: 'Balhae (발해) was a powerful kingdom founded by former Goguryeo general Dae Joyeong after Goguryeo\'s fall in 668. At its height it controlled Manchuria and parts of the Russian Far East, and maintained sophisticated diplomatic relations with Tang China and Japan.',
  },
  {
    id: 'h034',
    category: 'history',
    era: '900–936 AD',
    text: 'The Later Three Kingdoms period (후삼국시대) saw Silla fragment into rival states — Later Baekje and Taebong (Later Goguryeo) — before Wang Geon reunified the peninsula in 936, founding the Goryeo Dynasty and giving Korea its modern English name.',
  },
  {
    id: 'h035',
    category: 'history',
    era: '958 AD',
    text: 'Goryeo introduced one of the world\'s first civil service examination systems (과거) in 958 AD, modelled on Tang China\'s keju. Merit-based recruitment gradually opened government posts to talented scholars beyond the hereditary aristocracy.',
  },
  {
    id: 'h036',
    category: 'history',
    era: '1231–1259 AD',
    text: 'The Mongol invasions of Goryeo lasted nearly three decades. The Goryeo court fled to Ganghwa Island and held out for 28 years — one of the longest sustained resistances to Mongol conquest — before finally accepting vassal status under the Mongol Yuan dynasty.',
  },
  {
    id: 'h037',
    category: 'history',
    era: '1592–1598 AD',
    text: 'The Imjin War (임진왜란) — the Japanese invasions led by Toyotomi Hideyoshi — devastated Joseon over seven years. An estimated 1–2 million Koreans died, countless cultural treasures were looted or destroyed, and tens of thousands of Korean craftsmen and scholars were taken to Japan.',
  },
  {
    id: 'h038',
    category: 'history',
    era: '1592–1598 AD',
    text: 'The Imjin War is also known as "the Pottery War" in Japan because Hideyoshi\'s armies abducted thousands of Korean ceramic artisans whose techniques transformed Japanese pottery. Korean celadon and white porcelain traditions directly founded several of Japan\'s most celebrated ceramic schools.',
  },
  {
    id: 'h039',
    category: 'history',
    era: '1627 & 1636 AD',
    text: 'Joseon suffered two devastating Manchu invasions — the first in 1627 and a far more destructive second invasion in 1636. After the second, King Injo was forced to bow nine times to the Manchu emperor in a ceremony of total submission, a humiliation seared into Korean historical memory.',
  },
  {
    id: 'h040',
    category: 'history',
    era: '18th century',
    text: 'King Yeongjo (영조, r. 1724–1776) reigned for 52 years — the longest of any Joseon king. He enacted sweeping tax reforms (균역법) to ease peasant burdens and promoted practical Confucian scholarship, though his reign was darkened by his tragic execution of Crown Prince Sado.',
  },
  {
    id: 'h041',
    category: 'history',
    era: '18th century',
    text: 'King Jeongjo (정조, r. 1776–1800) is celebrated as one of Joseon\'s great philosopher-kings. He founded the Gyujanggak royal library, championed the Silhak ("practical learning") movement, built the innovative Hwaseong Fortress, and sought to modernise governance through enlightened reform.',
  },
  {
    id: 'h042',
    category: 'history',
    era: '1860–1894 AD',
    text: 'The Donghak (동학, "Eastern Learning") movement was a Korean religious and social revolution blending Confucianism, Buddhism, and shamanism into a call for equality and resistance to foreign influence. The Donghak Peasant Revolution of 1894 was one of the largest peasant uprisings in East Asian history.',
  },
  {
    id: 'h043',
    category: 'history',
    era: '1894–1895 AD',
    text: 'The First Sino-Japanese War was fought largely on Korean soil and decided Korea\'s fate. Japan\'s victory ended China\'s traditional suzerainty over Korea, but instead of independence, Korea found itself drawn increasingly into Japan\'s sphere of influence.',
  },
  {
    id: 'h044',
    category: 'history',
    era: '1895 AD',
    text: 'Queen Myeongseong (명성황후), widely known as Empress Myeongseong, was assassinated in her own palace by Japanese agents on 8 October 1895. Japanese operatives broke into Gyeongbokgung at dawn, murdered the queen, and burned her body — an act of state terrorism that shocked the world.',
  },
  {
    id: 'h045',
    category: 'history',
    era: '1897 AD',
    text: 'King Gojong proclaimed the Korean Empire (대한제국) in 1897, declaring Korea fully independent and elevating himself to Emperor — a direct rebuttal to China\'s historical suzerainty and Japan\'s growing dominance. The empire lasted only until Japan forced its annexation in 1910.',
  },
  {
    id: 'h046',
    category: 'history',
    era: '1905 AD',
    text: 'The Eulsa Treaty (을사조약) of 1905, signed under Japanese military pressure, stripped Korea of diplomatic sovereignty, making it a Japanese protectorate. Many Korean officials refused to sign; Min Yeong-hwan took his own life in protest, and nationwide resistance erupted across the country.',
  },
  {
    id: 'h047',
    category: 'history',
    era: '1909 AD',
    text: 'Ahn Jung-geun (안중근) assassinated the first Japanese Resident-General of Korea, Itō Hirobumi, at Harbin railway station on 26 October 1909. Executed in 1910 at age 31, he is revered in Korea as a patriotic martyr and wrote a treatise on East Asian peace while awaiting execution.',
  },
  {
    id: 'h048',
    category: 'history',
    era: '1919 AD',
    text: 'The Korean Provisional Government (대한민국 임시정부) was established in Shanghai in April 1919, weeks after the March First Movement. It operated in exile for 26 years — issuing declarations of independence, running intelligence networks, and maintaining diplomatic activity — until Korea\'s liberation in 1945.',
  },
  {
    id: 'h049',
    category: 'history',
    era: '1932 AD',
    text: 'Yun Bong-gil (윤봉길) detonated a bomb at a Japanese military ceremony in Shanghai\'s Hongkou Park on 29 April 1932, killing Japanese generals and injuring senior officers. Chinese Nationalist leader Chiang Kai-shek remarked that one Korean had done what a million Chinese soldiers could not.',
  },
  {
    id: 'h050',
    category: 'history',
    era: '1940–1945 AD',
    text: 'During World War II, an estimated 200,000–400,000 Korean women were coerced into sexual slavery for Japanese Imperial forces as "comfort women" (일본군 위안부). The issue remains a deeply painful and unresolved source of tension between South Korea and Japan.',
  },
  {
    id: 'h051',
    category: 'history',
    era: '1945 AD',
    text: 'At the end of World War II, the Soviet Union and the United States divided Korea along the 38th parallel in just 30 minutes of improvised planning. Two young U.S. Army officers — Dean Rusk and Charles Bonesteel — drew the line with a National Geographic map, splitting a nation that had been unified for over 1,300 years.',
  },
  {
    id: 'h052',
    category: 'history',
    era: '1948 AD',
    text: 'The Republic of Korea (South Korea) was officially proclaimed on 15 August 1948, with Syngman Rhee as its first president. The Democratic People\'s Republic of Korea (North Korea) was established weeks later on 9 September 1948 under Kim Il-sung — cementing the division of the peninsula.',
  },
  {
    id: 'h053',
    category: 'history',
    era: '25 June 1950',
    text: 'The Korean War began at 4 a.m. on 25 June 1950, when North Korean forces crossed the 38th parallel in a surprise invasion supported by Stalin. Within three days, Seoul had fallen. It remains technically ongoing — the 1953 armistice was a ceasefire, not a peace treaty.',
  },
  {
    id: 'h054',
    category: 'history',
    era: 'September 1950',
    text: 'General Douglas MacArthur\'s amphibious landing at Incheon (인천상륙작전) on 15 September 1950 reversed the course of the Korean War. Widely considered one of the most audacious and successful military operations of the 20th century, it cut off North Korean supply lines and allowed UN forces to recapture Seoul within two weeks.',
  },
  {
    id: 'h055',
    category: 'history',
    era: 'November–December 1950',
    text: 'The Battle of the Chosin Reservoir was fought in -40°C temperatures in North Korea\'s mountains in late 1950. Surrounded by Chinese forces, approximately 15,000 US Marines and UN troops fought their way out in a grueling 78-mile retreat — one of the most brutal battles in US Marine Corps history.',
  },
  {
    id: 'h056',
    category: 'history',
    era: '1964–1973 AD',
    text: 'South Korea sent over 320,000 soldiers to fight in the Vietnam War — the second-largest allied force after the United States. The Korean troops, especially the Capital Division ("Tiger Division"), were known for their fierce combat effectiveness. Payments from the US for these forces helped fuel South Korea\'s economic take-off.',
  },
  {
    id: 'h057',
    category: 'history',
    era: '1961–1979 AD',
    text: 'Park Chung-hee (박정희) seized power in a military coup in 1961 and ruled as dictator for 18 years. His authoritarian Yushin system suppressed democracy, but his aggressive export-led industrialisation policy transformed Korea from one of the world\'s poorest nations to an industrial power — a legacy that remains intensely debated.',
  },
  {
    id: 'h058',
    category: 'history',
    era: 'May 1980',
    text: 'The Gwangju Uprising (5·18 민주화운동) began on 18 May 1980 when citizens of Gwangju revolted against the military government of Chun Doo-hwan. An estimated 165–600 civilians were killed when paratroopers crushed the uprising. The massacre became the symbol of South Korea\'s democratic movement and is now a UNESCO Memory of the World.',
  },
  {
    id: 'h059',
    category: 'history',
    era: '1987 AD',
    text: 'The June Democracy Movement (6월 민주항쟁) of 1987 forced South Korea\'s military government to accept direct presidential elections. Millions of protesters across the country demanded democracy, and the regime\'s capitulation — the "June 29 Declaration" — marked the decisive turn toward South Korea\'s democratic system.',
  },
  {
    id: 'h060',
    category: 'history',
    era: '1997–1998 AD',
    text: 'The 1997 Asian Financial Crisis hit South Korea with devastating force — the won lost half its value, unemployment doubled, and the IMF bailout of $58 billion came with harsh austerity conditions. In an extraordinary act of national solidarity, millions of ordinary Koreans donated gold jewellery to help pay off the national debt.',
  },
  {
    id: 'h061',
    category: 'history',
    era: '2000 AD',
    text: 'President Kim Dae-jung (김대중) won the Nobel Peace Prize in 2000 for his Sunshine Policy of engagement with North Korea, which culminated in the first-ever inter-Korean summit in Pyongyang. A former dissident who survived multiple assassination attempts, he is often called the "Nelson Mandela of Asia."',
  },
  {
    id: 'h062',
    category: 'history',
    era: '2016–2017 AD',
    text: 'President Park Geun-hye was impeached and removed from office in 2017 following massive candlelight protests by millions of citizens — up to 1.7 million in a single night. The peaceful, music-filled protests became a global model of democratic civic action.',
  },
  {
    id: 'h063',
    category: 'history',
    era: '4th–7th century AD',
    text: 'The Hwarang (화랑) were an elite youth corps of Silla warriors who studied martial arts, poetry, music, and Confucian ethics. Many of Silla\'s greatest generals were Hwarang. Their ethos of loyalty, bravery, and refined culture is sometimes compared to Japanese bushidō and is considered a forerunner of modern taekwondo values.',
  },
  {
    id: 'h064',
    category: 'history',
    era: '7th century AD',
    text: 'Silla\'s alliance with Tang China in the 660s finally destroyed Baekje and Goguryeo after centuries of three-way warfare. But when Tang tried to absorb the entire peninsula, Silla fought a second war against its former ally — and won, expelling Tang forces and unifying Korea under Korean rule for the first time.',
  },
  {
    id: 'h065',
    category: 'history',
    era: 'c. 800–900 AD',
    text: 'Buddhist monk Jang Bogo (장보고) built a maritime empire in the 9th century, controlling trade across the Yellow Sea and the route between China, Korea, and Japan. He established a great monastery on Cheonghaejin Island and is regarded as one of the greatest maritime traders in Korean history.',
  },
  {
    id: 'h066',
    category: 'history',
    era: '1725–1800 AD',
    text: 'The Silhak (실학, "practical learning") movement of the 17th–19th centuries challenged Neo-Confucian orthodoxy by emphasising empirical investigation, social reform, and practical utility. Scholars like Yi Ik, Jeong Yak-yong (Dasan), and Park Ji-won wrote pioneering works on economics, science, and statecraft.',
  },
  {
    id: 'h067',
    category: 'history',
    era: '1866 AD',
    text: 'The General Sherman Incident of 1866 saw an American merchant/gunboat sail up the Taedong River demanding trade. After a tense standoff, Koreans burned the ship and killed its crew. The US cited the incident as justification for the 1871 Korean Expedition — a failed attempt to force Korea open by gunboat diplomacy.',
  },
  {
    id: 'h068',
    category: 'history',
    era: '1882 AD',
    text: 'The Joseon–US Treaty of 1882 was Korea\'s first treaty with a Western power, negotiated via China. It granted the US most-favoured-nation status and opened Korea to American trade — cracking open the "Hermit Kingdom" and beginning a new era of foreign entanglement that would culminate in annexation.',
  },
]
