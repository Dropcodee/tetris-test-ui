<template>
  <div>
    <a-row :gutter="4" v-if="repos.length > 0">
      <a-col
        :xs="24"
        :md="24"
        :lg="12"
        :xl="8"
        v-for="repo in repos"
        :key="repo.id"
        style="margin-bottom: 2em"
      >
        <a-card hoverable style="width: auto">
          <a-row type="flex" justify="center" align="middle">
            <a-col :xs="24" :md="24" :lg="14" :xl="14">
              <a-card-meta :title="repo.name" :style="{ marginTop: '1em' }">
                <template #description
                  >{{ repo.login }}
                  <p>{{ repo.size }}</p>
                </template>
              </a-card-meta>
            </a-col>
            <a-col :xs="24" :md="6" :lg="6" :xl="6">
              <svg
                @click="handleFavorite(repo)"
                xmlns="http://www.w3.org/2000/svg"
                style="width: '2em', height: '2em'"
                :style="repo.favorite ? {color: 'red'} : {}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row v-else-if="repos.length < 1">
      <a-col :span="24" :style="{ textAlign: 'center' }">
        <img
          src="/img/no-data.jpg"
          alt=""
          class="opacity-50"
          :style="{ marginTop: '1em', width: '400px', height: 'auto' }"
        />
        <p :style="{ marginTop: '1em' }">No Tetris Repos Found...</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    repos: {
      type: Object,
      default: () => {
        return { items: [] }
      }
    }
  },
  setup () {
    const store = useStore()
    const handleFavorite = async (repo) => {
      try {
        const payload = {
          repo_id: repo.id,
          name: repo.name,
          login: repo.login,
          avatar_url: repo.avatar_url,
          repo_url: repo.repo_url,
          favorite: true,
          description: repo.description,
          size: repo.size
        }
        await store.dispatch('tetris/SetFavoriteRepo', payload)
        repo.favorite = true
      } catch (error) {
        repo.favorite = false
      }
    }

    return { handleFavorite }
  }
}
</script>

<style lang="scss" scoped>
</style>
