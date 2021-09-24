export async function getMatchHistoryCached(ctx, ign) {
  try {
    const URL = `http://localhost:5500/api`;
    const response = await ctx.$axios.$get(`${URL}/history/matches`, { params: { ign } });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getMatchHistoryRefresh(ctx, ign) {
  try {
    const URL = `http://localhost:5500/api`;
    const response = await ctx.$axios.$get(`${URL}/history/refresh/matches`, { params: { ign } });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getRankRefresh(ctx, igns) {
  try {
    const URL = `http://localhost:5500/api`;
    const ranks = [];
    for (let i = 0; i < igns.length; i++) {
      const params = { params: { ign: igns[i] } };
      const rank = await ctx.$axios.$get(`${URL}/history/refresh/rank`, params);
      if (rank.filteredData.length > 0) {
        const { filteredData } = rank;
        const r = {};
        r.IGN = igns[i];
        r.tier = filteredData[0].tier;
        r.rank = filteredData[0].rank;
        r.elo = filteredData[0].leaguePoints;
        ranks.push(r);
      }
    }
    return ranks;
  } catch (err) {
    console.error(err);
  }
}

export async function getRankCached(ctx, igns) {
  try {
    const URL = `http://localhost:5500/api`;
    const ranks = [];
    for (let i = 0; i < igns.length; i++) {
      const params = { params: { ign: igns[i] } };
      const rank = await ctx.$axios.$get(`${URL}/history/rank`, params);
      if (rank.filteredData.length > 0) {
        const { filteredData } = rank;
        const r = {};
        r.IGN = igns[i];
        r.tier = filteredData[0].tier;
        r.rank = filteredData[0].rank;
        r.elo = filteredData[0].leaguePoints;
        ranks.push(r);
      }
    }
    return ranks;
  } catch (err) {
    console.error(err);
  }
}
