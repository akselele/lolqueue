export async function getMatchHistory(ctx) {
  try {
    const URL = `http://localhost:5500/api`;
    const response = await ctx.$axios.$get(`${URL}/history`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getRank(ctx, params) {
  try {
    const URL = `http://localhost:5500/api`;
    const response = await ctx.$axios.$get(`${URL}/history/rank`, params);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
