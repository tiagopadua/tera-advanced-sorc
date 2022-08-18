
class Skill {
	constructor(id) {
		this.id = id;
		this.name = null;
		this.isInCooldown = false;
		this.timer = null;
		this.shouldCast = () => !this.isInCooldown; // Default behaviour: cast when it's not on cooldown.
	}

	startCooldown = time_ms => {
		clearTimeout(this.timer);
		this.isInCooldown = true;
		setTimeout(() => {
			this.isInCooldown = false;
		}, time_ms);
	}
}

const skillMap = {
  mb: new Skill(340230),
  implosion: new Skill(390100),
  fusion: new Skill(360600),
  prime: new Skill(360200),
  iceberg: new Skill(360400),
  arcane_fus: new Skill(360300),
  arcane_press: new Skill(41200),
  fb: new Skill(61000),
  hail: new Skill(270900),
  void: new Skill(120900),
  nova: new Skill(300900),
  frost: new Skill(21000),
  light: new Skill(111100),
  barrage: new Skill(200500),
  lances: new Skill(350100),
};

// Custom functions to decide if it's good to cast
skillMap.mb.shouldCast         = state => !skillMap.mp.isInCooldown && state.bs;
skillMap.implosion.shouldCast  = state => !skillMap.implosion.isInCooldown && state.implosion_enabled && skillMap.arcane_press.isInCooldown && !skillMap.fb.isInCooldown;
skillMap.fusion.shouldCast     = state => !skillMap.fusion.isInCooldown && state.hasFireBuff && state.hasIceBuff && state.hasArcaneBuff && !replaced && state.fusion_enabled;
skillMap.prime.shouldCast      = state => !skillMap.prime.isInCooldown && state.hasFireBuff && state.hasIceBuff;
skillMap.iceberg.shouldCast    = state => !skillMap.iceberg.isInCooldown && state.hasIceBuff && state.hasArcaneBuff;
skillMap.arcane_fus.shouldCast = state => !skillMap.arcane_fus.isInCooldown && state.hasFireBuff && state.hasArcaneBuff;

// This object holds all the skills to be cast, in order of priority
const skillsByOrder = [
  skillMap.mb,
  skillMap.implosion,
  skillMap.fusion,
  skillMap.prime,
  skillMap.iceberg,
  skillMap.hail,
  skillMap.arcane_press,
  skillMap.fb,
  skillMap.void,
  skillMap.nova,
  skillMap.light,
  skillMap.frost,
  skillMap.barrage,
];

const getSkillInfo = id => ({
  id,
  group: Math.floor(id / 10000),
  level: Math.floor(id / 100) % 100,
  sub: id % 100
});

const castSkill = (skillId, d, n, state) => {
  const x = (Math.cos(state.myAngle) * d) + state.myPosition.x;
  const y = (Math.sin(state.myAngle) * d) + state.myPosition.y;
  const z = state.myPosition.z + n;
  const w = state.myAngle || 0;

  mod.send('C_START_SKILL', 7, {
    skill: {
      reserved: 0,
      npc: false,
      type: 1,
      huntingZoneId: 0,
      id: skillId,
    },
    w: state.bs ? state.boss.w : myAngle,
    loc: {
        x: state.bs ? (Math.cos(state.boss.w) * -150) + state.boss.loc.x : state.myPosition.x,
        y: state.bs ? (Math.sin(state.boss.w) * -150) + state.boss.loc.y : state.myPosition.y,
        z: state.bs ? state.boss.loc.z : state.myPosition.z,
    },
    dest: {
      x: x,
      y: y,
      z: z,
    },
    unk: true,
    moving: false,
    continue: false,
    target: 0,
    unk2: false						
  });
};

module.exports = {
  skillMap,
  skillsByOrder,
  getSkillInfo,
  castSkill,
};
