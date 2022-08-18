const setupHooks = (mod, state) => {
  mod.hook('S_START_USER_PROJECTILE', 9, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		state.block_hit = false
		if(!state.boss.id || !state.bs) {
			return;
		}
		const targets = [];
		targets.push({ gameId: state.boss.id });

		state.block_hit = true;
		mod.send('S_START_USER_PROJECTILE', 9, event)
		mod.send('C_HIT_USER_PROJECTILE', 4, {
			id: event.id,
			end: event.end,
			loc: bossloc,
			targets: targets
		});
		return false;
	});

	mod.hook('C_HIT_USER_PROJECTILE', 4, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		return !state.block_hit;
	});
};

module.exports = setupHooks;
