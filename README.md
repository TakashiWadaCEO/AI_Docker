# AI-Todo

## 初めに：１からwebアプリを制作

私は一応プログラム歴は長く、商品として現役で使われているものもあるが、もっぱらエンベデッドの世界で生きてきた。過去には、モノのデータを計測して可視化する、いわゆるIoTのプログラムを作ろうとしたこともあったが、webのバックエンドやフロントエンド、スマホ端末のプログラムなど余りにも膨大な知識が必要なこともあり、ほとんど入門をかじった程度で終わってしまった。

しかし今や、生成AIがある。2025年6月の段階で、OpneAIのo3/o3-Pro、Geminiの2.5Flash/Pro6-5、ClaudeのSONNET/OPUS4.0と登場し下記を実現している。

- IQ130超えの優れた知性
- 世界中の情報を読み込んだ知識
- AIエージェント機能によるNet/Local情報のリサーチ
- MCPやA2AなどAIサービス間の連携
- マルチモーダル

ならば、生成AIを活用すれば今度は楽にゼロから構築出来るのではと考え、実際に取り組むこととなった。なお前回もそうだが、各プロセスに必要な情報量が多く、後で何をやったのか思い出せなくなってしまうため、このブログでイチから詳細を記録していく。よって目的は備忘録だが、読者の方にも参考になるだろう。

## 開発における生成AIの利用

私が開発で生成AIを利用するポイントは以下の通り。

- AIエージェント：開発するためのノウハウや手順、情報を教えてもらう
- Vibecoding：実装すべき部分を生成してもらう
- CI/CD：GitHubを用いたコード管理や自動デプロイ
- test：各種自動テスト

では、さっそく始めよう。

## 開発：DockerでReact,Typescriptを使うwebアプリを作る

まずは生成AIがどこまで支援出来るのか、実力を確認すべくやってみる。また発展性を重視し、やがて大きなプロジェクトもこなせる所まで進めるべく構成要素を定義する。

なお生成AIを活用するwebアプリの実装は、Bolt.newやReplitという内部で生成AIサービスを利用出来るものが最も簡単である。いずれそちらにも触れるとして基本の理解という意味ではやや不向きだ。

しかしながらAWSやAzureなどのweb上にアプリを構築するのも初期段階では荷が重い。そこでローカル（自分のPC上）で実行してその結果をブラウザで確認するところから始める。

私はWindowsとMacを使っているが、両者のローカル上で環境を汚さずに動作するにはDockerが適切である。これは仮想のOS環境をまるっと用意して、そこで開発やテスト、サービス提供を可能とする優れたものだ。14日のお試し期間などを活用すれば無料でも利用できる（個人ユーザーは無料）。

#### Step1: 事前準備：

以下を用意する。なお今後CursorやClaude codeなども利用する。

- PC：Windows11 またはMac
- 仮想環境：Docker Desktop
  - WSL：Windowsのみ　※無ければDockerが自動インストール
  - JS環境：Node LTS（18以上）　※Docker内で自動インストール
- エディター：VSCode (無料)
- コード支援：GitHub copilot  $10/月
- 生成AIエージェント：ChatGPT o3  $20/月

生成AIエージェントはGemini2.5Flash/Pro、Claude SONNET/OPUS4.0も可能（むしろそちらの方が良いとの情報も多いが、私はo3推し）


#### Step2: OpenAI o3に聞く

早速、下記をo3に問い合わせてみる。

> ①ToDoのwebアプリを作成したい
> ②生成AI利用でなるべくノーコードで開発したい 
> ③ローカルDocker環境で動作する、React, TypeScriptを使ったアプリとする
> 実装手順を教えてもらえますか。

回答：
以下では **「ほぼノーコード」で React + TypeScript の ToDo アプリをローカル Docker 上に立ち上げる** までを、生成 AI（ChatGPT・Copilot など）を活用する前提で一気通貫に示します。
*コマンドの雰囲気やプロンプト例も載せていますが、すべて AI に貼り付けて生成してもらう想定です。*

---

#### 0. 前提ツール

| ツール                                                            | 用途                  | 備考                             |
| -------------------------------------------------------------- | ------------------- | ------------------------------ |
| **Docker Desktop** (Windows Home＝WSL 2 / Pro＝Hyper-V or WSL 2) | ローカル実行環境            | 14 日トライアルで可                    |
| **Node LTS** (18 以上)                                           | TypeScript 型定義の補完用※ | **ビルドはコンテナ内**だが Copilot の型推論が楽 |
| **GitHub Copilot / Copilot Chat**                              | エディタ内コード生成          | VS Code 拡張で可                   |
| **ChatGPT / GPT-4o**                                           | 全体設計・Dockerfile 生成  | Web UI or CLI (gpt-cli)        |

> ※完全にノーコードに徹するならローカル Node なしでも動きます。以後は「全部コンテナで完結」仕様です。

---

#### 1. 空ディレクトリを用意

```bash
mkdir todo-ai-demo && cd $_
git init -b main
echo "# AI-Todo" > README.md
```

---

#### 2. 生成 AIに「フロントひな形＋Dockerfile」を丸ごと作らせる

> **ChatGPT へのプロンプト例**

```
You are a senior Frontend engineer.
Produce an entire Vite+React+TypeScript ToDo sample
in a folder named `app/`.
Include:
  • package.json
  • vite.config.ts
  • src/main.tsx, src/App.tsx
  • minimal Tailwind config
  • Dockerfile multi-stage build (node:18-alpine → nginx:alpine)
  • docker-compose.yml exposing port 3000
Return everything as one Markdown code fence with file names.
```

コピーして投げると、**ファイル名付きコードブロック**が返って来ます。
そのまま VS Code の Copilot Chat でも OK。出力をローカルに貼り付けて保存。

---

#### 3. 依存をコンテナでインストール & ビルド

```bash
docker compose build            # node:18-alpine でビルド
docker compose up -d            # nginx:alpine に静的ファイルがコピー済み
open http://localhost:3000
```

*初回のみ* → `docker compose up --build` でも可。

---

#### 4. ToDo 機能を AI で肉付け

1. **Copilot Chat へ依頼**

   ```
   Create a functional ToDo component with TypeScript:
   • props: none
   • state: todos (id:string, text:string, done:boolean)
   • add, toggle, delete
   • tailwind styling
   Return only src/components/Todo.tsx
   ```
2. ファイルを保存すると Vite がホットリロードし、ブラウザで即確認。
3. **ChatGPT でテストも生成**（任意）

   ```
   Write vitest unit tests for Todo component above.
   ```

   → `/app/src/__tests__/Todo.test.tsx` を追加。

---

#### 5. Persistent 保存（ローカル Storage）もノーコードで

```
Prompt Copilot Chat:
"Enhance Todo component so todos persist to window.localStorage ('ai-todos').
Load on mount, save on change."
```

保存後ホットリロード → リロードしても残ることを確認。

---

#### 6. 型エラー／Lint の自動修正

```
npx @typescript-eslint/eslint-plugin --init
# Copilot Chat:
"Fix all ESLint and TS errors in the repo."
```

Copilot が `--fix` 相当を提案し、自動で変更。コードを書かずに整形完了。

---

#### 7. 画像生成などの追加 UI も AI で

例）OpenAI 画像生成呼び出しを追加

```
ChatGPT:
"Add a button 'Surprise me' that fetches 'https://source.unsplash.com/random/400x300'
and shows the image under the list."
```

---

#### 8. CI/CD（任意）：GitHub Actions テンプレも自動生成

```
ChatGPT:
"Create .github/workflows/docker-push.yml that
  - builds the Dockerfile
  - pushes ghcr.io/<USER>/ai-todo:latest when main branch."
```

PAT（Personal Access Token）設定だけでクラウドレジストリへ自動 Push。

---

#### 9. バージョン固定・依存診断

Docker Scout で脆弱性スキャン：

```bash
docker scout cves ghcr.io/<USER>/ai-todo:latest
```

結果を AI に読ませ「修正手順を提案」と頼めば次の PR が半自動に。

---

#### 10. 試行錯誤のコツ ― “AI First” フロー

1. **まず「完成形」をグローバルに依頼**

   * 例：今回の “全ファイル生成” プロンプト
2. **動かしながら不足機能を差分プロンプトで追加**

   * 「Filter 機能を付けて」「Dark mode 対応して」など
3. エラーが出たら **スタックトレースごと Copilot Chat に貼る**

   * “Suggest a fix” をクリック → 修正 PR が提案される
4. **コードレビューも AI に**

   * 「この PR を要件定義に照らしてレビューして」

---

#### まとめ

* **Docker Desktop + Vite + React TS + Tailwind** の静的アプリは
  **「プロジェクト初期化 → AI 出力貼り付け → `docker compose up`」3 ステップ**で完了。
* 以降の機能追加やリファクタも **ChatGPT / Copilot に差分指示**→ホットリロードで確認。
* コードをほぼ書かずに、*1 〜 2 時間で MVP* を立ち上げられます。

これで **①ToDo Webアプリ**、**②生成 AI を活用したノーコード開発**、**③ローカル Docker 上での React + TypeScript 運用** の３要件が揃いました。
ご不明点や「ここを深掘りしたい」という部分があれば、いつでもお知らせください。

#### Step3：やってみる

では生成AIの回答に従って進めてみる。

#### 事前準備

- PCは手持ちのものを利用（Windows11 またはMac）
- 仮想環境：Docker Desktopをインストール
  - WSL：Windowsのみ　※無ければDockerが自動インストール
  - JS環境：Node LTS（18以上）　※Docker内で自動インストール
- エディター：VSCodeをインストール
- コード支援：GitHub copilotを契約  $10/月
- 生成AIエージェント：ChatGPT plusを契約 $20/月

#### Dockerインストール

下記記事が詳しい。

[https://qiita.com/zembutsu/items/a98f6f25ef47c04893b3:embed:cite]

- VSCodeとの統合は、VSCodeの拡張で「WSL」を選択すればOK

#### Step1を実装

- VSCodeを起動
- ターミナルでbash
- 指定のコマンドをコピペ実行

#### Step2を実装

実装したら正しく動作する。以下注意点を記載するが、生成AIにヘルプしてもらえるので安心して進めてほしい。

- 指定通りのフォルダに各ファイルを格納すること
- Dockerfileの中を修正する必要がある

※Dockerfileは以下が修正内容。エラーでRUN npm ci が失敗する理由は package-lock.json が無いためで、それをfixしている。 

```shell
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --no-fund --no-audit
COPY vite.config.ts tailwind.config.cjs postcss.config.cjs ./
COPY index.html ./index.html
COPY src ./src
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

$docker compose build
$docker compose up -d
でビルドが完了し、
ブラウザで、http://localhost:3000 を打つと ToDo アプリが表示される。

#### GitHubにアップロード

この段階で最初のcommitとアップロードを済ませておく。以下、手順を簡単に記載する。

1. GitHubでリポジトリを新規作成する：
  - GitHubの利用が初めてならユーザー登録を済ませる
  - GitHubにログイン
  - 画面右上の「New Repository」ボタンを押す
  - 以下を入力
  - Repository name：リポジトリ名を入力（例：AI_Docker）
  - Visibility：PublicかPrivateを選択
  - READMEはLocal側で作成するので、作成しない
  - Create repositoryをクリック

2. ローカルで操作する：
  - VSCodeで開発コードのルートディレクトリへ移動して以下実行

```shell
# Gitリポジトリを初期化（上の手順通りなら初期化済みなので不要）
$ git init

# ファイルを全てステージング
$ git add .

# コミット
$ git commit -m "コミットメッセージを書く"

# リモートリポジトリを登録
$ git remote add origin https://github.com/ユーザー名/リポジトリ名.git

# mainブランチに強制プッシュ
git push -u origin main
```

#### 手順4：生成AIで機能UP

手順4で機能UPを行う。

- 指示通り生成AIで生成
- app/src/components/Todo.tsx   ← いま生成したコードをそのまま貼り付け
- ※components フォルダーが無ければ作成
- pp/src/App.tsx を書き換え。既存の内容（最初に入っていた ToDo ロジック）をすべて削除し、下記のシンプルなラッパーだけにする。

```shell
// app/src/App.tsx
import Todo from "./components/Todo";

export default function App() {
  return <Todo />;
}
```

- 保存 → ブラウザでホットリロードを確認。
- Docker を“開発モード”で動かしている場合（docker compose up 中）→ ファイル保存後に自動リビルド＋ブラウザが更新される
- そうでなければ、いったん docker compose up -d --build で再起動。

#### 手順５：（ローカル Storage）もノーコードで

上の手順は外部（ChatGPT）で生成したコードをVSCodeに貼り付けた。

次に、VSCodeの中でGitHub copilotを用いてVivecodingを行う。

- VSCodeでcopilotチャットを開く
- エージェントモードに切り替える
- copilotチャットに以下を指示

"Enhance Todo component so todos persist to window.localStorage ('ai-todos').
Load on mount, save on change."

保存後ホットリロード → リロードしてもToDoが残ることを確認。

ここで２回目のcommit&upload


