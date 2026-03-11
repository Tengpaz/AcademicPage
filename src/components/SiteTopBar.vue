<script setup>
const emit = defineEmits(["change-language"]);

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  language: {
    type: String,
    required: true
  }
});

</script>

<template>
  <header class="topbar reveal" style="--delay: 0.05s">
    <div class="brand">{{ content.siteBrand }}</div>
    <nav class="nav-links">
      <a v-for="item in content.navItems" :key="`${item.href}-${item.label}`" :href="item.href">{{ item.label }}</a>
    </nav>
    <div class="lang-switch" role="group" aria-label="Language switcher">
      <button class="lang-btn" :class="{ active: language === 'zh' }" type="button" @click="emit('change-language', 'zh')">
        中文
      </button>
      <button class="lang-btn" :class="{ active: language === 'en' }" type="button" @click="emit('change-language', 'en')">
        EN
      </button>
    </div>
  </header>
</template>
