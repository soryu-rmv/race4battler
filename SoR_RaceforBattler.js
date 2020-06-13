//=============================================================================
// SoR_RaceforBattler.js
// MIT License (C) 2020 蒼竜 @soryu_rpmaker
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Latest version v1.00 (2020/06/13)
//=============================================================================

/*:ja
 * @plugindesc ＜バトラー種族定義（＆対種族特効・耐性設定）＞
 * @author 蒼竜　@soryu_rpmaker
 *
 * @help
 * バトラーに種族の概念を、装備やスキルに特定の種族に対する特効効果を実装します。
 * 
 * -----------------------------------------------------------
 * 用法 (プラグイン設定)
 * -----------------------------------------------------------
 * 1. プラグインパラメータで好きな種族名(Race1~Race16)を設定してください。(最大16)
 * 2. バトラー（アクターやエネミー）および職業のメモ欄に種族を定義する次のタグを挿入します。
 *    <Race: 種族名>    
 *    ※ 種族名: 1.で定義した種族名(存在しないものを指定すると無視されます)
 * 3. スキルや装備に種族特効をする次のタグを挿入します。
 *    <Race_Killer: 種族名(, 数値)>
 *    ※ 数値（省略可能）は、ダメージを増幅させる割合(%)を指定してください。
 *       省略すると、プラグインパラメータ"Effective Rate"の値が採用されます(デフォルト+100%)。
 *    ※ バトラー・職業にも定義可能です。バトラーに定義すれば、常に特定種族に強いバトラーとしてキャラクターを作成できます。
 * 4. 次のタグを挿入すると、特定種族からのダメージを軽減させることができます。
 *    <Killer_Resist: (種族名, 数値)>
 *    ※ 数値は、ダメージを減少させる割合(%)を指定してください。
 *    ※ 単に<Killer_Resist>と書くと、受ける特効効果を無効化できます（特効を無効化する装備品など）。
 * 
 * 詳細な用例は
 * https://github.com/soryu-rmv/tech_menus
 * に記載しています。
 *
 * -----------------------------------------------------------
 * バージョン情報
 * -----------------------------------------------------------
 * v1.00 (2020/06/13)       公開  
 *
 *
 * @param Minimum Damage
 * @type value
 * @default 1
 * @desc 種族耐性によるダメージの最小値("種族耐性による"最終ダメージがこの値未満になりません)
 *
 * @param Effective Rate
 * @type value
 * @default 100
 * @desc 特効発生時の標準(割合無指定時)追加ダメージ倍率(+X%)
 *
 * @param Race1
 * @type string
 * @default 獣
 * @desc 1番目の種族の名前
 *
 * @param Race2
 * @type string
 * @default 人間
 * @desc 2番目の種族の名前
 *
 * @param Race3
 * @type string
 * @default 昆虫
 * @desc 3番目の種族の名前
 *
 * @param Race4
 * @type string
 * @default 植物
 * @desc 4番目の種族の名前
 *
 * @param Race5
 * @type string
 * @default 魚類
 * @desc 5番目の種族の名前
 *
 * @param Race6
 * @type string
 * @default 不死
 * @desc 6番目の種族の名前
 *
 * @param Race7
 * @type string
 * @default 妖精
 * @desc 7番目の種族の名前
 *
 * @param Race8
 * @type string
 * @default 機械
 * @desc 8番目の種族の名前
 *
 * @param Race9
 * @type string
 * @default 竜
 * @desc 9番目の種族の名前
 *
 * @param Race10
 * @type string
 * @default 悪魔
 * @desc 10番目の種族の名前
 *
 * @param Race11
 * @type string
 * @default 神
 * @desc 11番目の種族の名前
 *
 * @param Race12
 * @type string
 * @default 飛行
 * @desc 12番目の種族の名前
 *
 * @param Race13
 * @type string
 * @default 
 * @desc 13番目の種族の名前
 *
 * @param Race14
 * @type string
 * @default 
 * @desc 14番目の種族の名前
 *
 * @param Race15
 * @type string
 * @default 
 * @desc 15番目の種族の名前
 *
 * @param Race16
 * @type string
 * @default 
 * @desc 16番目の種族の名前
 */
/*:
 * @plugindesc <Race for Battler> 
 * @author @soryu_rpmaker
 *
 * @help
 * Define the race for every actor and enemy. Besides, special effect like 
 * "weapon efficiency" to handle damages are presented for skills and equipments.
 * 
 * -----------------------------------------------------------
 * How to use
 * -----------------------------------------------------------
 * 1. Define your prefer race name in plugin parameters (Race1~Race16). (16 races at maximum)
 * 2. Insert the following tag in the note for battlers (Actor or Enemy) to define races for them.
 *    <Race: RACENAME>    
 *    + RACENAME: Name defined in 1. (If undefined name is specified, the tag is ignored.)
 * 3. Insert the following tag in the note for skills or equipments to define the special effect for specific races.
 *    <Race_Killer: RACENAME(, VALUE)>
 *    + VALUE(omittable) is a rate(%) to increase the damage. 
 *       If <Race_Killer: Beast, 50>, the damage for beasts are increased by 50%. 
 *       When you just write <Race_Killer: RACENAME>, the default percentage ("Effective Rate" in a plugin parameters).
 *    +  This tag also can be used for battlers/classes who always have advantage for specific races.
 * 4. Following tag has a effect to decrease the damage from attakcs of the specific race.
 *    <Killer_Resist: (RACENAME, VALUE)>
 *    + VALUE is a rate(%) to decrease the damage. 
 *    + Just write <Killer_Resist> to disable all special damage dealt.
 *      (No weapon/skill efficiency effects from opponents are applied.) 
 * 
 * To get more instructions, see https://github.com/soryu-rmv/tech_menus .
 *
 * ------------------------------------------------------------
 * Version info
 * ------------------------------------------------------------
 * v1.00 (Jun 13, 2020)       Released!
 *
 * @param Minimum Damage
 * @type value
 * @default 1
 * @desc Lower Damage cap for specific race's resitance 
 *
 * @param Effective Rate
 * @type value
 * @default 100
 * @desc Default additional damage dealt(+X%)
 *
 * @param Race1
 * @type string
 * @default Beast
 * @desc 1st Race name
 *
 * @param Race2
 * @type string
 * @default Human
 * @desc 2nd Race name
 *
 * @param Race3
 * @type string
 * @default Insect
 * @desc 3rd Race name
 *
 * @param Race4
 * @type string
 * @default Plants
 * @desc 4th Race name
 *
 * @param Race5
 * @type string
 * @default Fish
 * @desc 5th Race name
 *
 * @param Race6
 * @type string
 * @default Undead
 * @desc 6th Race name
 *
 * @param Race7
 * @type string
 * @default Fairy
 * @desc 7th Race name
 *
 * @param Race8
 * @type string
 * @default Machine
 * @desc 8th Race name
 *
 * @param Race9
 * @type string
 * @default Dragon
 * @desc 9th Race name
 *
 * @param Race10
 * @type string
 * @default Demon
 * @desc 10th Race name
 *
 * @param Race11
 * @type string
 * @default God
 * @desc 11th Race name
 *
 * @param Race12
 * @type string
 * @default Flying
 * @desc 12th Race name
 *
 * @param Race13
 * @type string
 * @default 
 * @desc 13th Race name
 *
 * @param Race14
 * @type string
 * @default 
 * @desc 14th Race name
 *
 * @param Race15
 * @type string
 * @default 
 * @desc 15th Race name
 *
 * @param Race16
 * @type string
 * @default 
 * @desc 16th Race name
 */
 
var Imported = Imported || {};
Imported.SoR_RfB = true;
var SoR = SoR || {};

(function() {
	
var Param = PluginManager.parameters('SoR_RaceforBattler');
var Race_name = [];
var Race_lowerDamageCap = Number(Param['Minimum Damage'] || 1);
var Race_Killer_Rate = Number(Param['Effective Rate'] || 100);

console.log(Race_Killer_Rate)

Race_name[0] = undefined;
Race_name[1] = String(Param['Race1'] || '');
Race_name[2] = String(Param['Race2'] || '');
Race_name[3] = String(Param['Race3'] || '');
Race_name[4] = String(Param['Race4'] || '');
Race_name[5] = String(Param['Race5'] || '');
Race_name[6] = String(Param['Race6'] || '');
Race_name[7] = String(Param['Race7'] || '');
Race_name[8] = String(Param['Race8'] || '');
Race_name[9] = String(Param['Race9'] || '');
Race_name[10] = String(Param['Race10'] || '');
Race_name[11] = String(Param['Race11'] || '');
Race_name[12] = String(Param['Race12'] || '');
Race_name[13] = String(Param['Race13'] || '');
Race_name[14] = String(Param['Race14'] || '');
Race_name[15] = String(Param['Race15'] || '');
Race_name[16] = String(Param['Race16'] || '');




var SoR_RFB_GA_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	SoR_RFB_GA_setup.call(this, actorId);
	this._race = $dataActors[actorId]._Race;
	this._killer_Race = $dataActors[actorId]._killer_Race;
	this._killer_resists = $dataActors[actorId]._killer_resists;
	this.complete_resist = $dataActors[actorId].complete_resist;
}

var SoR_RFB_GE_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	SoR_RFB_GE_setup.call(this,enemyId, x, y);
	this._race = $dataEnemies[enemyId]._Race;
	this._killer_Race = $dataEnemies[enemyId]._killer_Race;
	this._killer_resists = $dataEnemies[enemyId]._killer_resists;
	this.complete_resist = $dataEnemies[enemyId].complete_resist;
}


SoR_RFB_DM_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if(!SoR_RFB_DM_isDatabaseLoaded.call(this)) return false;
	
	if(!SoR.RaceforBattler_isLoaded){		
      getRaceTags($dataActors);
      getRaceTags($dataEnemies);
      getRaceTags($dataClasses);
      getRace_KillerTags($dataActors);
      getRace_KillerTags($dataClasses);
      getRace_KillerTags($dataWeapons);
      getRace_KillerTags($dataArmors);
      getRace_KillerTags($dataSkills);
      getRace_KillerResistTags($dataActors);
      getRace_KillerResistTags($dataClasses);
      getRace_KillerResistTags($dataEnemies);
      getRace_KillerResistTags($dataWeapons);
      getRace_KillerResistTags($dataArmors);
      SoR.RaceforBattler_isLoaded = true;
	}
    return true;
}


var SoR_RFB_GA_executeDamage = Game_Action.prototype.executeDamage
Game_Action.prototype.executeDamage = function(target, value) {
	// If damage=0 after correction by Element rate, race efficiency is ignored.
    if(value > 0 && target.isKiller && !target.complete_resist ){
        value = Math.floor(value*(1.00+target.KillerRate/100));
        if(value < Race_lowerDamageCap) value = Race_lowerDamageCap; // Be damage >=1 in default
	}
    SoR_RFB_GA_executeDamage.call(this,target, value);
};


var SoR_RFB_BM_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    SoR_RFB_BM_startAction.call(this);
    this._action.Race_effect = ComputeKillerEffect(this._subject, this._action, this._targets);
}


function ComputeKillerEffect(sub,act,tar){
    if(tar[0] == undefined) return;
    for(var i=0;i < tar.length; i++){
      tar[i].isKiller = false;
      tar[i].KillerRate = 0;
    }
    var killer_arr = [];
    var num = 0;
	
    var A2E = (sub.isActor() && tar[0].isEnemy());
    var E2A = (sub.isEnemy() && tar[0].isActor());
    if(!A2E && !E2A) return;
    if(!act.item()._killer_Race) return;
	
    //subject
    if(sub._killer_Race){
        for(var i=0; i < sub._killer_Race.length; i++){
	       killer_arr[num] = sub._killer_Race[i];
	       num++;
        }
    }
	//Killer (skill)
    for(var i=0; i < act.item()._killer_Race.length; i++){
	  killer_arr[num] = act.item()._killer_Race[i];
	  num++;
    }
	//Killer (actor dependent)
	if(sub.isActor()){
		//class
		if($dataClasses[sub._classId]._killer_Race && $dataClasses[sub._classId]._killer_Race.length > 0){
	       killer_arr[num] = $dataClasses[sub._classId]._killer_Race[i];
	       num++;
	    }	
		//equipments
		for(var i=0; i < sub._equips.length; i++){
			var eq_id = sub._equips[i]._itemId;
			if(eq_id == 0) continue;
			if(sub._equips[i]._dataClass == "weapon"){
				if($dataWeapons[eq_id]._killer_Race && $dataWeapons[eq_id]._killer_Race.length > 0){
					for(var j=0; j < $dataWeapons[eq_id]._killer_Race.length; j++){
					  killer_arr[num] = $dataWeapons[eq_id]._killer_Race[j];
					  num++;
					}
				}
			}			
			else if(sub._equips[i]._dataClass == "armor"){
				if($dataArmors[eq_id]._killer_Race && $dataArmors[eq_id]._killer_Race.length > 0){
					for(var j=0; j < $dataArmors[eq_id]._killer_Race.length; j++){
					   killer_arr[num] = $dataArmors[eq_id]._killer_Race[j];
					   num++;
					}
				}
			}
			
		}
	}
	
	
	
	
	for(var j=0; j < tar.length; j++){
	//judge killer
		if (killer_arr.length>0 && tar[j]._race.length>0) {
			for(var i=0; i<killer_arr.length; i++){
				var isKiller = tar[j]._race.some ( 
						function ( value ) {
							return value === killer_arr[i].Race;
						}
					);
					
			  if(isKiller){				  
				  tar[j].isKiller = true;
				  tar[j].KillerRate += killer_arr[i].rate;
			  }
			  
			}
			
			

		//resistance for actor&subject
			if(tar[j]._killer_resists && tar[j]._killer_resists.length > 0){
			   for(var i=0; i<tar[j]._killer_resists.length; i++){
				  
				  var res = tar[j]._killer_resists[i];
				  if(res.complete_resist){
					 tar[j].complete_resist = true;
					 break;
				  }
				  if(res.Race == sub._race){
					 tar[j].isKiller = true;
					 tar[j].KillerRate -= res.rate;
				  }
			   }
			}
			
			if(tar[j].isActor()){// decrease effect by equipments
			if($dataClasses[tar[j]._classId]._killer_resists && $dataClasses[tar[j]._classId]._killer_resists.length > 0){
			 for(var i=0; i< $dataClasses[tar[j]._classId]._killer_resists; i++){

			   	  var res = $dataClasses[tar[j]._classId]._killer_resists[i];
				  if(res.complete_resist){
					 tar[j].complete_resist = true;
					 break;
				  }
				  if(res.Race == sub._race){
					 tar[j].isKiller = true;
					 tar[j].KillerRate -= res.rate;							   
				  }
			 }
			  
			  
			}
			for(var i=0; i < tar[j]._equips.length; i++){
				var eq_id = tar[j]._equips[i]._itemId;
				if(eq_id == 0) continue;
				if(tar[j]._equips[i]._dataClass == "weapon"){
					if($dataWeapons[eq_id]._killer_resists && $dataWeapons[eq_id]._killer_resists.length > 0){
						for(var k=0; k < $dataWeapons[eq_id]._killer_resists.length; k++){
						   if($dataWeapons[eq_id].complete_resist){
							   tar[j].complete_resist = true;
							   break;
						   }
						   var __race = $dataWeapons[eq_id]._killer_resists[k].Race;
						   if(__race == sub._race){
								tar[j].isKiller = true;
								tar[j].KillerRate -= $dataWeapons[eq_id]._killer_resists[k].rate;							   
						   }
						  
						}
					}
				}			
				else if(tar[j]._equips[i]._dataClass == "armor"){
					if($dataArmors[eq_id]._killer_resists && $dataArmors[eq_id]._killer_resists.length > 0){
						for(var k=0; k < $dataArmors[eq_id]._killer_resists.length; k++){
							if($dataArmors[eq_id].complete_resist){
							   tar[j].complete_resist = true;
							   break;
						   }
						    var __race = $dataArmors[eq_id]._killer_resists[k].Race;
						    if(__race == sub._race){
								tar[j].isKiller = true;
								tar[j].KillerRate -= $dataArmors[eq_id]._killer_resists[k].rate;							   
						    }						   
						}
					}
				}
				
			}

		 }			
			
	   }
	}	
	
}


function getRaceTags(DM) {
  for (var i = 1; i < DM.length; i++) {
    var obj = DM[i];
	obj._Race = [];

 	var tag = /<(?:Race):[ ]*(.*)>/;

	var notes = obj.note.split(/[\r\n]+/);	
		for(var n = 0; n < notes.length; n++) {
		  var line = notes[n];
		  if(line.match(tag)) {
			  var str = String(RegExp.$1);
			  if(isValidRaceTag(str)) obj._Race.push(String(RegExp.$1));
		  }
      }	  
   }
}
					
					

function getRace_KillerTags(DM) {
  for (var i = 1; i < DM.length; i++) {
    var obj = DM[i];
	obj._killer_Race = [];

 	var tag = /<(?:Race_Killer):[ ]*([^\n\t,]*)[ ]*,?[ ]*(.*)?>/;
	var notes = obj.note.split(/[\r\n]+/);	
		for(var n = 0; n < notes.length; n++) {
		  var line = notes[n];
		  if(line.match(tag)) {	
		     var str = String(RegExp.$1);
			 if(!isValidRaceTag(str)) continue;
		
		  	 var killer = {
					Race: str,
					rate: Race_Killer_Rate
			};
			if(RegExp.$2) killer.rate = parseInt(RegExp.$2);				
			obj._killer_Race.push(killer);
			
		  }
      }
	  
   }
}



function getRace_KillerResistTags(DM) {
  for (var i = 1; i < DM.length; i++) {
    var obj = DM[i];
	obj.complete_resist = false;
	obj._killer_resists = [];

 	var tag = /<(?:Killer_Resist):?[ ]*([^\n\t,]*)?[ ]*,?[ ]*(.*)?>/;
	var notes = obj.note.split(/[\r\n]+/);	
		for(var n = 0; n < notes.length; n++) {
		  var line = notes[n];
		  if(line.match(tag)) {	
		  
		    if(!RegExp.$1){
				obj.complete_resist = true;
				continue;
			}		  
		  
		     var str = String(RegExp.$1);
			 if(!isValidRaceTag(str)) continue;
			 
		  	 var resists = {
					Race: str,
					rate: Race_Killer_Rate
			};
			
			if(RegExp.$2) resists.rate = parseInt(RegExp.$2);		
			obj._killer_resists.push(resists);
		  }
      }
	  
   }
}


function isValidRaceTag(race){
	return Race_name.some ( function ( value ) { return value === race; });
}

}());
