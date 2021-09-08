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
  nuxtI18n: {
    paths: {
      en: '/about-us',
      de: '/ueber-uns'
    }
  }
}
</script>
