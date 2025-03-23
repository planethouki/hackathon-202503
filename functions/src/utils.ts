export const generateRandomString = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 20;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export const generateRandomKatakanaName = (): string => {
  const firstNames = [
    "ジョン", "エミリー", "マイケル", "ソフィア", "ジェームズ",
    "オリビア", "デイビッド", "エマ", "ダニエル", "イザベラ",
    "チャールズ", "ミア", "アレクサンダー", "ハーパー", "ウィリアム",
    "アメリア", "ヘンリー", "エラ", "ベンジャミン", "アヴァ",
    "ノア", "シャーロット", "イーサン", "ルーシー", "ルーカス",
    "グレース", "クリストファー", "ハンナ", "エドワード", "ヴィクトリア",
    "オスカー", "エリザベス", "レオ", "アリス", "ジャック", "リリィ",
    "トーマス", "マーガレット", "セバスチャン", "エヴァ",
    "マシュー", "ローラ", "ジョージ", "メロディ", "オリバー", "ブルック",
    "アンドリュー", "アシュリー", "ライアン", "ナタリー",
    "ネイサン", "ゾーイ", "アーロン", "ペネロペ", "ジェイコブ", "セリーナ",
    "サミュエル", "スカーレット", "エリック", "ジュリア",
    "エヴァン", "ヴァレリー", "アダム", "ステラ", "ジェイデン", "サマー",
    "ジェイソン", "キャンディス", "ルイ", "クララ",
    "マーク", "ダイアナ", "サイモン", "ローズ", "エリオット", "サンドラ",
    "ジュード", "リーナ", "フェリックス", "アリーナ",
    "ハリー", "アンナ", "アレックス", "エリナ", "ピーター", "カレン",
    "ポール", "ユリナ", "カルロス", "アリアナ",
    "ヴィクター", "アンジェラ", "カイル", "ケイティ", "メイソン",
    "ソフィー", "アイザック", "エリカ", "ザック", "リサ",
  ];

  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

export const generateRandomAvatarFileName = () => {
  const list = [
    "1F21A.svg",
    "1F31B.svg",
    "1F31F.svg",
    "1F33D.svg",
    "1F359.svg",
    "1F385-1F3FD.svg",
    "1F414.svg",
    "1F467.svg",
    "1F469-200D-1F3A8.svg",
    "1F47A.svg",
    "1F47D.svg",
    "1F520.svg",
    "1F602.svg",
    "1F685.svg",
    "1F911.svg",
    "1F923.svg",
    "1F9D1-1F3FE-200D-1F33E.svg",
    "1F9DA-1F3FD-200D-2640-FE0F.svg",
    "1FADA.svg",
  ];

  return list[Math.floor(Math.random() * list.length)];
};


export const getWeekNumberFromJan1 = (date: Date): number => {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const jan1DayOfWeek = jan1.getDay();
  const offset = (jan1DayOfWeek === 0 ? 6 : jan1DayOfWeek - 1);
  const dayOfYear = Math.floor(
    (date.getTime() - jan1.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.floor((dayOfYear + offset) / 7) + 1;
};
