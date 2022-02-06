<template>
  <div :style="{ marginBottom: '1em' }">
    <a-layout>
      <a-input
        v-model:value="query"
        placeholder="Search Repo"
        @change="searchRepos"
      />
    </a-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['search'],
  setup (props, context) {
    const query = ref('')
    const searchRepos = () => {
      context.emit('search', query.value)
    }
    return {
      searchRepos,
      query
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
