<template>
  <div>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
    <h2 class="subtitle">
      {{ $t('welcome') }}
    </h2>
    <p>{{ posts }}</p>
    <nuxt-link :to="localePath('index')">Index</nuxt-link>
    <Tutorial/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import config from '../../config'

export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    ...mapState({
      posts: (state) => {
        return state.posts
      },
    }),
  },
  async asyncData ({ app, params, store, payload }) {
    console.log('asyncData', params, payload);

    if (payload?.routeParams) {
      await store.dispatch('i18n/setRouteParams', payload.routeParams);
    }

    return payload
  },
  head() {
    // TODO: tooltip bei englisch, dass diese seite nur in deutsch verfügbar ist
    return {
      link: [
        {
          rel: 'canonical',
          href: config.hostname + '/de/jobs'
        }
      ]
    }
  }
}
</script>
