## **初めに：１からwebアプリを制作**

生成AIの支援を受けてプログラム開発を行うことをVibecodingと称する。そこでVibecodingの力を借りて実践してみた所、ほとんどwebアプリ開発の知識がない状態からわずか４時間程度でwebアプリを開発出来たので、そのやり方を皆さんにも共有したいと思う。下は実際に動作するAWS、Azureの各URLである。

### webアプリの各動作環境：

1. AWS版：
→https://main.d1xy4rjc1tmhl9.amplifyapp.com/todo
2. Azure版：
→[https://lively-tree-01078a410.6.azurestaticapps.net/](https://lively-tree-01078a410.6.azurestaticapps.net/todo)
3. Docker実行環境版：/appで$docker compose up -d
→ [http://localhost:3000](http://localhost:3000/)
4. Dockerホットリロード版：/appで$npm run dev              
→ [http://localhost:5173](http://localhost:5173/)


2025年6月の段階で、OpneAIのo3/o3-Pro、Geminiの2.5Flash/Pro6-5、ClaudeのSONNET/OPUS4.0と登場し下記を実現している。

- IQ130超えの優れた知性
- 世界中の情報を読み込んだ知識
- AIエージェント機能によるNet/Local情報のリサーチ
- MCPやA2AなどAIサービス間の連携
- マルチモーダル

今回の取組は生成AIに熱心に取り組むMaglab武市さんのレクチャーを受けたものだが、課題を与えられただけで直接の指導はない。以下、始める前の状況を記載する。

## 未経験者の開始状態

開始時の状況を記載する。このレベルで問題なくこのwebアプリ開発は遂行できる。

- VSCode：基本的な操作は行える
- Git/GitHub：基本的な操作は行える
- shell(bash)：基本的な操作は行える
- AWS/Azure：ほとんど使ったことがない
- JavaScript/TypeScript：ほとんど知らない
- Docker：名前しか知らない
- 型エラーチェック/Lint：知らない
- CI/CD：やったことない
- バージョン固定・依存診断：やったことない

※VSCodeとGit/GitHub、shell（簡単な操作）は使えることが前提。

## **生成AIの利用**

今回の開発では生成AIを下記の目的で利用する：

- Gemini/ChatGPT：開発するためのノウハウや手順、情報を教えてもらう
- VSCode+GitHub copilot：Vibecoding：実装部分を自動生成してもらう
- CI/CD：GitHubを用いたコード管理やクラウドへの自動デプロイ
- test：各種自動テスト

生成AIエージェントはChatGPT、Gemini、Claudeがおすすめ。

### **開発課題：DockerでReact,Typescriptを使うwebアプリを作る**

王道ではあるが、まずはローカル（自分のPC上）でDockerを用いた開発を行い、その成果をAWSやAzure（サーバレス）に移植する方法を取る。自分のPC環境を汚さずに動作するにはDockerが適切であり、仮想Linux環境をまるっと用意してそこで開発やテスト、サービス提供を可能とする優れたものだ。14日のお試し期間などを活用すれば無料でも利用できる（個人ユーザーは無料）。

今回のトライは早ければ半日、遅くても数日で完了するので、最初の手順を覚える数日間はDockerの無料サービスを利用してよいかと思う（その後はAWSかAzure環境に移行出来るので）。

完成したwebアプリは、GitHubにpush(upload)するとAWS/Azureの両者同時にアプリが自動更新されるCI/CDを実現している。スマホでも閲覧できるレスポンシブ対応、更新データの保存なども生成AIが忖度して勝手に実装される。

なお生成AIを活用するwebアプリの実装は、Bolt.newやReplitという内部で生成AIサービスを利用出来るものがノーコードで実は最も簡単である。しかし基本の理解という意味ではやや不向きで応用が効きにくいので割愛する。

**課題を与えてスタート**

今回の開発は大きく３段階に分けて作業を進める。

1. Dockerを用いたReact, TypeScriptを使ったToDoのwebアプリ作成（1-2時間）
2. カレンダー、メモを追加するSPA化とハイデザイン対応（1時間）
3. 上記をAWS/Azureに移植（30分）

最初に１を開発すべく、下記を生成AIに指示。

> ①ToDoのwebアプリを作成したい
> ②生成AI利用でなるべくノーコードで開発したい
> ③ローカルDocker環境で動作する、React, TypeScriptを使ったアプリとする
> 実装手順を教えてもらえますか。

回答：**「ほぼノーコード」で React + TypeScript の ToDo アプリをローカル Docker 上に立ち上げる**までを、生成 AI（ChatGPT・Copilot など）を活用する前提で一気通貫に示します。

※注意：以下示す手順は全て生成AIが生成したもの。なので、各自も下記にこだわらず、生成AIに手順を教わって開発してほしい。各ステップやエラー発生時もその状況を生成AIに伝えると瞬時に解決する。

## 開発全体の手順（例）

### ①実装１：Todoアプリ（1～2時間）

- **Docker Desktop + Vite + React TS + Tailwind** の静的アプリは **「プロジェクト初期化 → AI 出力貼り付け → `docker compose up`」3 ステップ**で完了。
- コードをほぼ書かずに、*1 〜 2 時間で MVP* を立ち上げ完了。
- 以降の機能追加やリファクタも **ChatGPT / Copilot に差分指示**→ホットリロードで確認。

これで **①ToDo Webアプリ**、**②生成 AI を活用したノーコード開発**、**③ローカル Docker 上での React + TypeScript 運用** の３要件が揃う。

#### 0. 前提ツール

| ツール                                                       | 用途                       | 備考                                            |
| ------------------------------------------------------------ | -------------------------- | ----------------------------------------------- |
| **Docker Desktop** (Windows Home＝WSL 2 / Pro＝Hyper-V or WSL 2) | ローカル実行環境           | 14 日トライアルで可                             |
| **Node LTS** (18 以上)                                       | TypeScript 型定義の補完用※ | **ビルドはコンテナ内**だが Copilot の型推論が楽 |
| **GitHub Copilot / Copilot Chat**                            | エディタ内コード生成       | VS Code 拡張で可                                |
| **ChatGPT / GPT-4o**                                         | 全体設計・Dockerfile 生成  | Web UI or CLI (gpt-cli)                         |

> ※完全にノーコードに徹するならローカル Node なしでも動きます。以後は「全部コンテナで完結」仕様です。

------

#### 1. 作業用の空ディレクトリを用意

※VSCodeのターミナル(bash）での作業がオススメ。やり方がわからなければそのまま「＊＊＊のやり方がわかりません」と聞けば回答してもらえる。

mkdir todo-ai-demo && cd $_

git init -b main

echo "# AI-Todo" > README.md

#### 2. 生成 AIに「フロントひな形＋Dockerfile」を丸ごと作らせる

> 以下は、ChatGPT 自身が作った、ChatGPTで「フロントひな形＋Dockerfile」を生成させるためのプロンプト例（コピペでもいいが、実際に各自で試して下さい）

You are a senior Frontend engineer.

Produce an entire Vite+React+TypeScript ToDo sample

**in** a folder named `app/`.

Include:

  • package.json

  • vite.config.ts

  • src/main.tsx, src/App.tsx

  • minimal Tailwind config

  • Dockerfile multi-stage build (node:18-alpine → nginx:alpine)

  • docker-compose.yml exposing port 3000

**Return** everything as one Markdown code fence with file names.

コピーして投げると、**ファイル名付きコードブロック**が返って来ます。 そのまま VS Code の Copilot Chat でも OK。出力をローカルに貼り付けて保存。

※以下、フォルダの完成イメージ

````
```

todo-ai-demo/                 ← プロジェクトルート

├─ docker-compose.yml         ← ここだけが Compose ファイル

└─ app/                       ← build.context に指定

   ├─ Dockerfile              ← コンテナのビルド手順

   ├─ package.json

   ├─ vite.config.ts

   └─ src/

       └─ App.tsx など

```
````

------

#### 3. 依存をコンテナでインストール & ビルド

※この辺り、不明な箇所はドンドン生成AIに聞いて下さい。なんでも答えてくれます。

docker compose build            # node:18-alpine でビルド

docker compose up -d            # nginx:alpine に静的ファイルがコピー済み

open <http://localhost:3000>

*初回のみ* → `docker compose up --build` でも可。

------

#### 4. ToDo 機能を AI で肉付け

1. **Copilot Chat へ依頼** `Create a functional ToDo component with TypeScript: • props: none • state: todos (id:string, text:string, done:boolean) • add, toggle, delete • tailwind styling Return only src/components/Todo.tsx`
2. ファイルを保存すると Vite がホットリロードし、ブラウザで即確認。
3. **ChatGPT でテストも生成**（任意） `Write vitest unit tests for Todo component above.` → `/app/src/__tests__/Todo.test.tsx` を追加。

------

#### 5. Persistent 保存（ローカル Storage）もノーコードで

Prompt Copilot Chat:

"Enhance Todo component so todos persist to window.localStorage ('ai-todos').

Load on mount, save on change."

保存後ホットリロード → リロードしても残ることを確認。

------

#### 6. 型エラー／Lint の自動修正

npx @typescript-eslint/eslint-plugin --init

\# Copilot Chat:

"Fix all ESLint and TS errors in the repo."

Copilot が `--fix` 相当を提案し、自動で変更。コードを書かずに整形完了。

------

#### 7. 画像生成などの追加 UI も AI で

例）OpenAI 画像生成呼び出しを追加

ChatGPT:

"Add a button 'Surprise me' that fetches '<https://source.unsplash.com/random/400x300>'

and shows the image under the list."

------

#### 8. CI/CD（任意）：GitHub Actions テンプレも自動生成

ChatGPT:

"Create .github/workflows/docker-push.yml that

  \- builds the Dockerfile

  \- pushes ghcr.io/<USER>/ai-todo:latest when main branch."

PAT（Personal Access Token）設定だけでクラウドレジストリへ自動 Push。

------

#### 9. バージョン固定・依存診断

Docker Scout で脆弱性スキャン：

docker scout cves ghcr.io/<USER>/ai-todo:latest

結果を AI に読ませ「修正手順を提案」と頼めば次の PR が半自動に。

------

### ②実装２：SPA&デザイン（1時間）

次のステップとして、下記を生成AIに指示。

> 本webアプリを、SPA構成で、ToDo、カレンダー、メモの３ページの構成に拡張したいと思います。引き続き教えて下さい。

※参考：私の場合は生成AIから、下記の指示を受けた(mainのままでもOK）。
→*「feature/spa-structure」ブランチで開発を実施し、最後にmainにマージ：*

------

| #      | 施策                                           | 主なファイル／設定                                       | ひとことメモ                               |
| ------ | ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------------ |
| **1**  | **SPA 3 ページ化**（ToDo / カレンダー / メモ） | `App.tsx` + `pages/`3 つ                                 | React Router v6 導入                       |
| **2**  | **Zustand ストア化**                           | `store/useTodoStore.ts`, `useNoteStore.ts`               | persist で localStorage 永続               |
| **3**  | **ToDo 改修**期日入力・画像サプライズ          | `components/Todo.tsx`                                    | Framer Motion でカードふわっ               |
| **4**  | **FullCalendar 連携**                          | `CalendarPage.tsx`                                       | タスク締切を月表示へ                       |
| **5**  | **Markdown メモ機能**                          | `MemoPage.tsx` + `react-markdown`                        | Ctrl+Enter で追加                          |
| **6**  | **Tailwind テーマ化**                          | `tailwind.config.cjs`                                    | brand / accent 色・Noto Sans JP            |
| **7**  | **shadcn/ui コンポーネント化**                 | `components/ui/` (`button.tsx`, `card.tsx` …)            | ボタン・カード・ダイアログ                 |
| **8**  | **ダークモード対応**                           | `tailwind.config.cjs` (`darkMode:"class"`), `NavBar.tsx` | ☀️⇔🌙 トグルで切替                           |
| **9**  | **ヘッダー改修**                               | `NavBar.tsx`, `/public/sunelco_logo.png`                 | ロゴ&トグルを右端配置                      |
| **10** | **グローバル背景グラデ**                       | `index.html` `<body>`                                    | `from-slate-50 to-slate-200`               |
| **11** | **Favicon / OGP**                              | `public/` 直下画像 + `<head>` link/meta                  | ローカル確認: `localhost:5173/favicon.png` |
| **12** | **Lighthouse チェック**                        | DevTools → Lighthouse                                    | A11y & Performance 85↑                     |

### ③実装３：AWS/Azureへ移植：10-30分

次のステップとして、下記を生成AIに指示。

> これで機能は一区切りが付きました。
> 今度はこれをAWS(Azure)上で動かしたいと思います。
> 手順を一式教えて下さい。

- AWSへの展開はノートラブルで、5分程度で完了。
- Azureへの展開はエラー対応で30分程度かかった。

AWS版URL：”https://main.d1xy4rjc1tmhl9.amplifyapp.com/todo”
Azure版URL：”https://lively-tree-01078a410.6.azurestaticapps.net/todo”

※以下に **「新人用」チェックリスト形式** でまとめる。

※リポジトリ構成が `app/` サブディレクトリに Vite SPA を置くケースに最適化している。各ステップの所要時間目安も付けている。

------

## 3-1：AWS Amplify Hosting 版（静的 SPA）

| 手順                       | 作業内容                                                     | 目安    |
| -------------------------- | ------------------------------------------------------------ | ------- |
| **0. 前提**                | *GitHub* リポジトリ（`app/` 以下に `package.json`）　AWS コンソールにログイン（東京リージョン推奨） | –       |
| **1. アプリ作成**          | Amplify → **Host web app** → GitHub 連携 → ブランチ `main` 選択 | 2 min   |
| **2. `amplify.yml` 修正**  | **Detect build settings** → *Edit* で下記を反映：`yaml<br>preBuild:<br> commands:<br> - cd app<br> - npm ci<br>build:<br> commands:<br> - npm run build<br>artifacts:<br> baseDirectory: app/dist<br>` | 2 min   |
| **3. SPA リダイレクト**    | “Rewrites & redirects” にプリセット *SPA* か手動行：`/^((?!\\.).)*$/` → `/index.html` → *200* | 1 min   |
| **4. デプロイ開始**        | *Save & Deploy* → ビルド成功を確認                           | 3–5 min |
| **5. 動作確認**            | `https://<hash>.amplifyapp.com` + `/todo /calendar /memo`    | –       |
| **6. 独自ドメイン** (任意) | Amplify → **Domain management** → Route 53 or 外部レジストラ | 5 min   |
| **7. CI/CD 運用**          | Push 毎自動ビルド、PR プレビューを有効化（App settings → Preview） | –       |

> 詰まりやすい所
>
> - `app/dist/index.html` が無い → `baseDirectory` がずれていないか
> - ルート以外で 404 → SPA リライト行を確認

------

## 3-2：Azure Static Web Apps 版（静的 SPA）

| 手順                                | 作業内容                                                     | 目安  |
| ----------------------------------- | ------------------------------------------------------------ | ----- |
| **0. 前提**                         | Azure サブスク & GitHub リポジトリ                           | –     |
| **1. SWA 作成**                     | Azure Portal → *Static Web Apps* → **Create**                | 2 min |
|                                     | – デプロイ source: GitHub / ブランチ `main`                  |       |
|                                     | – **App location** `app`　**Output location** `app/dist`　**Api location** 空 |       |
| **2. 自動生成された Action の修正** | `.github/workflows/azure-static-web-apps-*.yml` を以下に差し替え **（devDeps 入れるため手動ビルド＋upload）** | 3 min |

\# ---- 必要部分のみ ----

steps:

  \- uses: actions/checkout@v3

  \- name: Install & Build

​    run: |

​      cd app

​      npm ci

​      npm run build          # → app/dist

  \- name: Deploy

​    uses: Azure/static-web-apps-deploy@v1

​    with:

​      azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}

​      repo_token: ${{ secrets.GITHUB_TOKEN }}

​      action: upload

​      app_location: "app/dist"   # ← dist がサイトルート

​      skip_app_build: **true**

​      api_location: ""

​      skip_api_build: **true**

| **3. ルーティング** | `app/staticwebapp.config.json` を追加：`json<br>{ "navigationFallback": { "rewrite": "/index.html" } }` | 1 min |

| **4. Push & Build** | GitHub Actions が SUCCESS → `https://<id>.azurestaticapps.net` で確認 | 3–5 min |

| **5. 独自ドメイン** (任意) | SWA → *Custom domains* → CNAME/TXT 追加 | 5 min |

> 詰まりやすい所
>
> - `vite: Permission denied` → devDeps がインストールされていない（上記ワークフローで回避）
> - 真っ白 + MIME type “application/octet-stream” → dist ではなく src が上がっている → `app_location` を `app/dist` にしたか確認
> - サブ URL 404 → `staticwebapp.config.json` が無い

------

## web開発情報の共有手順

| 施策                     | 方法                                                         |
| ------------------------ | ------------------------------------------------------------ |
| **手順書保管**           | 社内 Confluence / Wiki に本ページをコピペ                    |
| **Secrets 配布**         | Amplify: 個別に **Amplify Console → User management**Azure: **Portal → SWA → Manage deployment token** |
| **初回セットアップ講義** | 30 min で “ローカル → Git push → 本番反映” をライブ実演      |
| **トラブル FAQ**         | 上記 “詰まりやすい所” を Slack 固定メッセージ化              |

これを見れば新人でも **10〜15 分でクラウドに公開 → URL 共有** まで到達可能
