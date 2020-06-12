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
put following tags into the note for the specific battler.<br>
 
 ```<Race: RACENAME>```<br>

RACENAME must be **a name defined in 2.1. (plugin parameters settings)**.<br>
If the RACENAME is not appropriate, that tag is **ignored**.<br>

 
#### 2.2.2 Effective settings

To make special effect for specific races,<br>
put following tags into the note for the specific skills or equipments.<br>

```<Race_Killer: RACENAME(, VALUE)>```<br>
 
- VALUE(omittable) is a rate(%) to increase the damage. <br>
  If <Race_Killer: Beast, 50>, the damage for beasts are increased by 50%. <br>

- When you just write <Race_Killer: RACENAME>, the default percentage ("Effective Rate" in a plugin parameters).<br>
  This tag also can be used for battlers who always have advantage for specific races.
 
 
 

#### 2.2.3 Resistance for the attack from specific races

Following tag has a effect to decrease the damage from attakcs of the specific race.<br>

```<Killer_Resist(: RACENAME, VALUE)>```<br>

 VALUE is a rate(%) to decrease the damage.<br>

#### 2.2.4 Complete Resistance for Race Killer
Just write

```<Killer_Resist>```

to disable all special damage dealt.<br>
Then, no weapon/skill efficiency effects from opponents are applied.<br>


### 2.3. Examples
- Treat the specified battler as a Dragon<br>
```<Race_Killer: Dragon>```<br>

- Special effect to the Beasts (200% damages in default)<br>
```<Race_Killer: Beast>```<br>

- Increase the damage for Beast opponents by 20% (Totally 1.2x damages)<br>
```<Race_Killer: Beast, 20>```<br>


- Disable all effects of opponents by Race_Killer<br>
<Killer_Resist>

- Decrease the damage from Human by 20%<br>
<Killer_Resist: Human, 20>


### 2.4. Note

<Race_Killer> and <Killer_Resist> are compatible.<br>
Before starting an action, tags assigned in a subject of the action and targets are collected.<br>
Damage rate in each tag is dealt by taking **summation**.

For example, assume the subject has **three <Race_Killer: Beast, 20)> tags** (i.e. actor, its skill, an its weapon),<br>
The total damage increase to Beast is **60%**(20+20+20). <br>


## 3. Demonstartion
Using a skill which is effective for insects targeting on Bees.<br>
For visiblity, the damage rate is set as **100x**. (Click the thumbnail to check the movie in youtube.)<br>

Because the tag is set only for the skill, other actions like normal attack is not affected.<br>
(The damage of normal attacks is not 100x.)

[![](https://img.youtube.com/vi/puD0-RcSO3Q/0.jpg)](https://www.youtube.com/watch?v=puD0-RcSO3Q)


## 4. Implementation (Information for Possible Conflict to other plugins)<br>
No overwritten functions.<br>

- Branched from **BattleManager.startAction**<br>
-- To process tags for equipments/skills effeciency<br>

- Branched from **Game_Action.prototype.executeDamage**<br>
-- Put this below SoR_ComboCounter.js (currently not released)<br>

- Branched from **DataManager.isDatabaseLoaded**<br>
-- To read tags for races<br>

- Branched from **Game_Enemy.prototype.setup** and **Game_Actor.prototype.setup**<br>
-- Definition of races <br>


### Version info.
 - ver 1.00  (Jun 13, 2020)   Released!
