# Race for Battler
任意歩数ごとのアクターへの各種効果を与えるステート・装備

by 蒼竜 @soryu_rpmakermv

-------------------------------------------------

<br>

## 1. はじめに
RPGツクールの標準機能に、スキルやキャラクターの「属性」の概念はありますが<br>
一般的なRPGに現れる動物、人型、機械といった「種族」の概念はありません。<br>
本プラグインは、ゲームに「種族」の概念を導入し、キャラクターやスキル・装備に<br>
種族の設定を付加することで、種族耐性・特効といった「属性」の概念との複合的な<br>
戦闘ダメージ処理を提供します。<br>



## 2. 使い方
### 2.1. プラグインパラメータ設定（種族定義）

まず始めに、**種族の定義**を**プラグインパラメータ**で行います。<br>
プラグインパラメータ内の、**Race1**から**Race16**までの項目に必要な分だけ種族名を入力してください。<br>
現状仕様では、最大１６種族まで定義できます。<br><br>






### 2.2. データベース設定（アクター、スキル等への種族適用）
アクターのステータス追加に相当するため、<br>
本プラグイン導入後、ニューゲーム等でパーティーキャラクターの情報を初期化した状態でなければ<br>
正しく動作しません。

#### 2.2.1 種族設定

バトラー（アクターやエネミー）のメモ欄に種族を定義する次のタグを挿入します。
 
 ```<Race: 種族名>```<br>
 
 ただし、2.1.で定義した種族名以外のものを指定した場合は、タグそのものが無視されます。<br>
 **あくまで、プラグインパラメータで事前に定義されているものがゲーム内の「種族」として扱われます。**
 
#### 2.2.2 特効設定


スキルや装備に種族特効をする次のタグを挿入します。

```<Race_Killer: 種族名(, 数値)>```<br>
 
※ 数値（省略可能）は、ダメージを増幅させる割合(%)を指定してください。<br>
   省略すると、**プラグインパラメータ"Effective Rate"**の値が採用されます(デフォルト+100%)。<br>
※ バトラーにも定義可能です。バトラーに定義すれば、常に特定種族に強いバトラーとしてキャラクターを作成できます。<br>

#### 2.2.3 耐性設定

次のタグを挿入すると、特定種族からのダメージを軽減させることができます。<br>

```<Killer_Resist(: 種族名, 数値)>```<br>

※ 数値は、ダメージを減少させる割合(%)を指定してください。<br>

#### 2.2.4 絶対耐性
単に

```<Killer_Resist>```

と書くと、受ける特効効果を無効化できます（特効を無効化する装備品などが作成できます）。<br>
相手がRace_Killerタグの効果を得ていても、全て無効（通常のダメージ処理）となります。


### 2.3. 記述例

- 獣種族に+100%ダメージ(デフォルト)特効
```<Race_Killer: 獣)>```<br>

- 獣種族に与えるダメージ+20% (合計1.2倍)
```<Race_Killer: 獣, 20)>```<br>


- Race_Killerタグによる特効を無効化
<Killer_Resist>

- 人間種族から受けるダメージ-20%
<Killer_Resist: 人間, 20>


### 2.4. 仕様

Race_KillerタグやKiller_Resistタグは重複します。<br>
行動開始時点で、行動主体と、対象のタグを収集し、総和を取っているため、<br>

<Race_Killer: 獣, 20)> のタグを３つついた状態（例えばアクター、スキル、武器）だと、<br>
獣種族に与えるダメージは+60%となります。

## 3. 実装（競合）情報<br>
上書き定義なし<br>

- **BattleManager.startAction** より処理派生<br>
-- 特効・耐性タグ読み取り<br>

- **Game_Action.prototype.executeDamage** より処理派生<br>
-- SoR_ComboCounter.js (2020/06/12時点非公開)より下<br>

- **DataManager.isDatabaseLoaded**  より処理派生<br>
-- タグ読み取り用<br>

- **Game_Enemy.prototype.setup** および **Game_Actor.prototype.setup** より処理派生<br>
-- 種族定義用<br>


### バージョン情報
 - ver 1.00  (Jun 12, 2020)   公開
