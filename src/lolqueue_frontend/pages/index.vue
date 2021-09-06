<template>
<Name
  matches=matches>
</Name>
  
</template>

<script>
import { getMatchHistory } from '~/services/historyService'

export default {
  async asyncData(context) {
    const matches = await getMatchHistory(context);
    console.log(matches);
    return { matches };
  },
}
</script>
