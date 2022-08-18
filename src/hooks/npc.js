const setupHooks = (mod, state) => {
	mod.hook('S_SPAWN_NPC', 12, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		state.monsters.push({
			gameId: event.gameId,
			loc: event.loc,
			w: event.w
		});
	});

	mod.hook('S_BOSS_GAGE_INFO', 3, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if (state.bossid && state.bossid === event.id) {
			return;
		}

		state.bossid = event.id
		mod.send("S_CUSTOM_STYLE_SYSTEM_MESSAGE", 1, {
			message: "Boss detected",
			style: 54
		});
		mod.send("S_PLAY_SOUND", 1, {
			SoundID: 2023
		});		
		const monster = state.monsters.find(m => m.gameId === event.id);
		if (monster) { 
			state.boss.loc = monster.loc;
			state.boss.w = monster.w;
		}
	});

  mod.hook('S_NPC_LOCATION', 3, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		const monster = state.monsters.find(m => m.gameId === event.gameId)
		if (monster) { 
			monster.loc = event.loc
			monster.w = event.w
		}
		if(state.boss.id === event.gameId) { 
			state.boss.loc = event.loc;
			state.boss.w = event.w;
		}
	});

	mod.hook('S_DESPAWN_NPC', 3, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		state.monsters = state.monsters.filter(m => m.gameId !== event.gameId);
		if (state.boss.id === event.gameId) { 
			state.boss.id = null;
			state.boss.loc = null;
			state.boss.w = null;
		}	
	});
};

module.exports = setupHooks;
