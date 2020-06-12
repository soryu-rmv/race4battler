# Race for Battler
Race for battlers and weapon/skills efficiency for specific opponents

by @soryu_rpmakermv

-------------------------------------------------

<br>

## 1. Introduction
In RPGMV, elements (Attribute?) like fire, water, and thunder etc. are an important factor<br>
to deal the damage control. On the other hand, some consumer video games also introduce <br>
**race** for battlers like animals, human, machines, and so on, but it is not available on RPGMV.<br>

This plugin introduces the concept of races and effective weapons and skills for specific races.<br>
You obtain a complex and profound damage control system for your battle scene. 



## 2. Usage
### 2.1. Plugin parameters settings（Definition of Races）

First, you need to define *races* for your game in plugin parameters.<br>
You can find items **Race1** to **Race16**. Fill them your prefer race name as much as you want.<br>
Currently, you can define 16 races at maximum.<br>



### 2.2. Database settings（Races for Actors/Enemies and Skills）
Note that since this plugin adds a new property (races) for every actor (and enemies),<br> 
you have to initialize the game (Start as NewGame) to work properly.<br>

#### 2.2.1 Race settings

To assign races for battlers (actors and enemies),<br>
put following tags into the note for the specific battler.
 
 ```<Race: RACENAME>```<br>

RACENAME must be **a name defined in 2.1. (plugin parameters settings)**.
If the RACENAME is not appropriate, that tag is **ignored**.

 
#### 2.2.2 Effective settings

To make special effect for specific races,<br>
put following tags into the note for the specific skills or equipments.

```<Race_Killer: RACENAME(, VALUE)>```<br>
 
- VALUE(omittable) is a rate(%) to increase the damage. <br>
  If <Race_Killer: Beast, 50>, the damage for beasts are increased by 50%. <br>

- When you just write <Race_Killer: RACENAME>, the default percentage ("Effective Rate" in a plugin parameters).
  This tag also can be used for battlers who always have advantage for specific races.
 
 
 

#### 2.2.3 Resistance for the attack from specific races

Following tag has a effect to decrease the damage from attakcs of the specific race.<br>

```<Killer_Resist(: RACENAME, VALUE)>```<br>

 VALUE is a rate(%) to decrease the damage.<br>

#### 2.2.4 Complete Resistance for Race Killer
Just write

```<Killer_Resist>```

to disable all special damage dealt.<br>
Then, no weapon/skill efficiency effects from opponents are applied.


### 2.3. Examples
- タグがつけられたアクター（エネミー）を竜種族扱いする<br>
```<Race_Killer: 竜>```<br>

- 獣種族に+100%ダメージ(デフォルト)特効<br>
```<Race_Killer: 獣>```<br>

- 獣種族に与えるダメージ+20% (合計1.2倍)<br>
```<Race_Killer: 獣, 20>```<br>


- Race_Killerタグによる特効を無効化<br>
<Killer_Resist>

- 人間種族から受けるダメージ-20%<br>
<Killer_Resist: 人間, 20>


### 2.4. Note

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


### Version info.
 - ver 1.00  (Jun 13, 2020)   Released!
