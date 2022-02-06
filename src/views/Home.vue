<template>
  <div class="home" ref="scrollComponent">
    <search-repo @search="handleSearch" />
    <repo-listing :repos="repos" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import RepoListing from '../components/RepoListing.vue'
import SearchRepo from '../components/SearchRepo.vue'

export default {
  name: 'Home',
  components: {
    RepoListing,
    SearchRepo
  },
  setup () {
    const store = useStore()
    const repos = computed(() => store.getters['tetris/GetTetrisRepos'])
    const currentPage = ref(1)
    const scrollComponent = ref(null)
    store.dispatch('tetris/FetchTetrisRepos', {
      query: 'tetris',
      limit: 15,
      page: currentPage.value
    })
    const loadMoreRepos = () => {
      // console.log('repo fetch --- ')
      currentPage.value = currentPage.value + 1
      if (currentPage.value < 5) {
        store.dispatch('tetris/FetchTetrisRepos', {
          query: 'tetris',
          limit: 15,
          page: currentPage.value
        })
      }
      console.log('Limit pages exceeded, refresh again for infinite scroll to work.')
    }
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        loadMoreRepos()
      }
    }
    const handleSearch = (searchQuery) => {
      if (searchQuery.length >= 3) {
        currentPage.value = 1
        store.dispatch('tetris/FetchTetrisRepos', {
          query: searchQuery,
          limit: 15,
          page: currentPage.value
        })
      }
      if (searchQuery.length < 1) {
        store.dispatch('tetris/FetchTetrisRepos', {
          query: 'tetris',
          limit: 15,
          page: currentPage.value
        })
      }
      console.log('search query => ', searchQuery)
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      store.dispatch('user/GetUserIp')
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    return { repos, scrollComponent, handleSearch }
  }
}
</script>
