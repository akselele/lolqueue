export async function getMatchHistory(ctx, ign) {
  try {
    const URL = `http://localhost:5500/api`;
    const response = await ctx.$axios.$get(`${URL}/history`, { params: { ign } });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getRank(ctx, igns) {
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
        r.rank = filteredData[0].tier;
        r.elo = filteredData[0].leaguePoints;
        r.loading = false;
        ranks.push(r);
      }
    }
    return ranks;
  } catch (err) {
    console.error(err);
  }
}
