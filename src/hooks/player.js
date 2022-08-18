const setupHooks = (mod, state) => {
	mod.hook('S_PLAYER_STAT_UPDATE', 17, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if(!event.alive) {
      state.MB_active = false;
    }

		state.hasFireBuff = event.fireEdge > 0
		state.hasIceBuff = event.iceEdge > 0
		state.hasArcaneBuff = event.lightningEdge > 0
		return true
	})

	mod.hook('C_PLAYER_LOCATION', 5, event => {
		state.myPosition = event.loc
		state.myAngle = event.w
	});
};

module.exports = setupHooks;
