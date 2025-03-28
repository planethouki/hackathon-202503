import {Container} from "react-bootstrap";

function Privacy() {
  return (
    <div className="my-5">
      <Container className="py-5" style={{backgroundColor: "#f0f8ff"}}>
        <h1>プライバシーポリシー</h1>
        <p>
          本プライバシーポリシーは、Team ROFLoL（以下「当方」といいます）が提供するWebサービス（以下「本サービス」といいます）における、ユーザーの個人情報の取り扱いについて定めたものです。本サービスをご利用いただくにあたり、本プライバシーポリシーに同意いただいたものとみなされます。
        </p>

        <div className="section">
          <h2>1. 個人情報の定義</h2>
          <p>
            「個人情報」とは、個人情報保護法に定める、氏名、住所、生年月日、連絡先、その他個人を特定できる情報を指します。
          </p>
        </div>

        <div className="section">
          <h2>2. 個人情報の収集方法と利用目的</h2>
          <ul>
            <li>
              <strong>収集方法:</strong> 当方は、本サービスの利用に際して、ユーザーから直接、または自動的に情報を収集する場合があります。例えば、会員登録時に入力される情報、プロフィール内容、プロフィール画像、投稿されたコンテンツに含まれる情報などが該当します。
            </li>
            <li>
              <strong>利用目的:</strong> 収集した個人情報は、以下の目的のために利用されます。
              <ul>
                <li>本サービスの提供、運営、改善</li>
                <li>ユーザーからのお問い合わせへの対応</li>
                <li>本サービスに関する情報の提供および通知</li>
                <li>不正利用の防止、セキュリティの確保</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>3. 個人情報の第三者提供について</h2>
          <p>
            当方は、法令に基づく場合、またはユーザーの同意がある場合を除き、個人情報を第三者に提供することはありません。
          </p>
        </div>

        <div className="section">
          <h2>4. Cookie等の利用</h2>
          <p>
            本サービスでは、ユーザーの利便性向上やサービス改善のためにCookie等の技術を利用する場合があります。これにより自動的に収集される情報は、個人を特定するものではありません。詳細はCookieポリシーをご参照ください。
          </p>
        </div>

        <div className="section">
          <h2>5. 個人情報の管理</h2>
          <p>
            当方は、個人情報の漏洩、改ざん、紛失等を防止するために、適切な安全管理措置を講じ、管理体制の整備および見直しを行います。
          </p>
        </div>

        <div className="section">
          <h2>6. 個人情報の開示、訂正、利用停止等の手続き</h2>
          <p>
            ユーザーは、当方が保有する自己の個人情報について、開示、訂正、利用停止等を求める権利を有します。これらの権利を行使される場合は、下記のお問い合わせ窓口までご連絡ください。
          </p>
        </div>

        <div className="section">
          <h2>7. ブロックチェーン関連の情報について</h2>
          <p>
            本サービスでは、ブロックチェーンのテストネットを利用しているため、ブロックチェーン上での取引に関連する情報が記録される場合があります。これらの情報の管理については、本サービスの運営の一環として取り扱いますが、当方はブロックチェーン上の取引に起因する問題については一切の責任を負いません。
          </p>
        </div>

        <div className="section">
          <h2>8. プライバシーポリシーの変更</h2>
          <p>
            当方は、本プライバシーポリシーを必要に応じて変更することがあります。変更後のプライバシーポリシーは、本サービス上に掲示された時点から効力を生じるものとします。
          </p>
        </div>

        <div className="section">
          <h2>9. お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するご質問や個人情報の取り扱いに関するお問い合わせは、下記の窓口までご連絡ください。<br/>
            <a
              href="https://x.com/planethouki"
              target="_blank"
              rel="noreferrer noopener"
            >
              https://x.com/planethouki
            </a>
          </p>
        </div>

        <div className="section">
          <h2>附則</h2>
          <p>
            本プライバシーポリシーは、2025年3月23日より施行するものとします。
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Privacy;
