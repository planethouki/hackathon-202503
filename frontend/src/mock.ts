
export interface Punchline {
  id: number;
  title: string;
  url: string;
  contestId: number;
}

export interface Contest {
  id: number;
  title: string;
  imageNumber: number;
}

export const youTubeUrl = "https://www.youtube.com/embed/M0xy9bGhn4Y";

export const initialPunchlines: Punchline[] = [
  { id: 1, title: "歯科のダンス", url: youTubeUrl, contestId: 32 },
  { id: 2, title: "パンの探検", url: youTubeUrl, contestId: 12 },
  { id: 3, title: "猫の逆襲", url: youTubeUrl, contestId: 5 },
  { id: 4, title: "迫る影！", url: youTubeUrl, contestId: 22 },
  { id: 5, title: "ワンコの大失敗", url: youTubeUrl, contestId: 8 },
  { id: 6, title: "AIの覚醒", url: youTubeUrl, contestId: 13 },
  { id: 7, title: "タコ踊り", url: youTubeUrl, contestId: 6 },
  { id: 8, title: "秘密のレシピ", url: youTubeUrl, contestId: 27 },
  { id: 9, title: "超人の作戦", url: youTubeUrl, contestId: 3 },
  { id: 10, title: "未来から来た犬", url: youTubeUrl, contestId: 18 },
  { id: 11, title: "怒れる象", url: youTubeUrl, contestId: 31 },
  { id: 12, title: "カエルの冒険", url: youTubeUrl, contestId: 4 },
  { id: 13, title: "迷子のスイカ", url: youTubeUrl, contestId: 19 },
  { id: 14, title: "天空のピクニック", url: youTubeUrl, contestId: 25 },
  { id: 15, title: "月の秘密", url: youTubeUrl, contestId: 15 },
  { id: 16, title: "忍者とドラゴン", url: youTubeUrl, contestId: 9 },
  { id: 17, title: "高速ハムスター", url: youTubeUrl, contestId: 20 },
  { id: 18, title: "真夜中のコーヒー", url: youTubeUrl, contestId: 7 },
  { id: 19, title: "落ち葉の謎", url: youTubeUrl, contestId: 29 },
  { id: 20, title: "カラスの仕返し", url: youTubeUrl, contestId: 16 },
  { id: 21, title: "冷凍の月見だんご", url: youTubeUrl, contestId: 1 },
  { id: 22, title: "ねじれた次元", url: youTubeUrl, contestId: 11 },
  { id: 23, title: "不思議なドア", url: youTubeUrl, contestId: 30 },
  { id: 24, title: "忘れられた秘密", url: youTubeUrl, contestId: 14 },
  { id: 25, title: "ワッフルの逆襲", url: youTubeUrl, contestId: 2 },
  { id: 26, title: "風船と冒険家", url: youTubeUrl, contestId: 21 },
  { id: 27, title: "ネコとロボットの友情", url: youTubeUrl, contestId: 10 },
  { id: 28, title: "カメの大ジャンプ", url: youTubeUrl, contestId: 26 },
  { id: 29, title: "謎の占い師", url: youTubeUrl, contestId: 17 },
  { id: 30, title: "舞うバナナ", url: youTubeUrl, contestId: 28 },
  { id: 31, title: "森の探偵物語", url: youTubeUrl, contestId: 24 },
  { id: 32, title: "井戸のレシピ", url: youTubeUrl, contestId: 23 }
];

export const initialContests: Contest[] = [
  { id: 1, title: "よく柿食う客は？", imageNumber: 101 },
  { id: 2, title: "ふとんはどこへふっとんだ？", imageNumber: 102 },
  { id: 3, title: "さるも木から落ちた話", imageNumber: 103 },
  { id: 4, title: "空飛ぶタコ", imageNumber: 104 },
  { id: 5, title: "最後のどんぐり", imageNumber: 105 },
  { id: 6, title: "冬眠しすぎたクマ", imageNumber: 106 },
  { id: 7, title: "ロボットのピクニック", imageNumber: 107 },
  { id: 8, title: "世界一バランスの悪い象", imageNumber: 108 },
  { id: 9, title: "カラスの特訓", imageNumber: 109 },
  { id: 10, title: "月を目指したカメ", imageNumber: 110 },
  { id: 11, title: "ウサギの反則レース", imageNumber: 111 },
  { id: 12, title: "走れワンコ！", imageNumber: 112 },
  { id: 13, title: "未来からのポストカード", imageNumber: 113 },
  { id: 14, title: "雨の日のパレード", imageNumber: 114 },
  { id: 15, title: "驚異の発明家", imageNumber: 115 },
  { id: 16, title: "迷子のドーナツ", imageNumber: 116 },
  { id: 17, title: "空を見上げたサル", imageNumber: 117 },
  { id: 18, title: "ニワトリの大冒険", imageNumber: 118 },
  { id: 19, title: "天空のハンモック", imageNumber: 119 },
  { id: 20, title: "午後の紅茶とカエル", imageNumber: 120 },
  { id: 21, title: "井戸から出たカニ", imageNumber: 121 },
  { id: 22, title: "星を数えるナマケモノ", imageNumber: 122 },
  { id: 23, title: "くしゃみするトナカイ", imageNumber: 123 },
  { id: 24, title: "氷のレース", imageNumber: 124 },
  { id: 25, title: "アヒルのミステリー", imageNumber: 125 },
  { id: 26, title: "落ち葉と冒険", imageNumber: 126 },
  { id: 27, title: "ひとりぼっちのホタル", imageNumber: 127 },
  { id: 28, title: "マツボックリの旅", imageNumber: 128 },
  { id: 29, title: "虹を渡るイヌ", imageNumber: 129 },
  { id: 30, title: "風に舞うバナナ", imageNumber: 130 },
  { id: 31, title: "おばけとかくれんぼ", imageNumber: 131 },
  { id: 32, title: "ネコとネズミの夜", imageNumber: 132 },
];
