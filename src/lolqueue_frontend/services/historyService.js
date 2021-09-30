export async function getMatchHistory(ctx, ign, cached) {
  try {
    const URL = `http://localhost:5500/api`;
    let response;
    if (cached) {
      response = await ctx.$axios.$get(`${URL}/history/matches`, { params: { ign } });
    } else {
      response = await ctx.$axios.$get(`${URL}/history/refresh/matches`, { params: { ign } });
    }
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getRank(ctx, igns, cached) {
  try {
    const URL = `http://localhost:5500/api`;
    const ranks = [];
    for (let i = 0; i < igns.length; i++) {
      const params = { params: { ign: igns[i] } };
      let rank;
      if (cached) {
        rank = await ctx.$axios.$get(`${URL}/history/rank`, params);
      } else {
        rank = await ctx.$axios.$get(`${URL}/history/refresh/rank`, params);
      }
      if (rank) {
        const r = {};
        r.IGN = igns[i];
        r.icon = rank.profileIconId;
        r.tier = rank.tier;
        r.rank = rank.rank;
        r.elo = rank.leaguePoints;
        if(rank.tier === 'CHALLENGER') r.challengerRank = rank.challengerRank;
        ranks.push(r);
      }
    }
    return ranks;
  } catch (err) {
    console.error(err);
  }
}