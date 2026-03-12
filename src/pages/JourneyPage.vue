<script setup>
import { ref } from "vue";
import JourneyNoteDialog from "../components/JourneyNoteDialog.vue";

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

const activeEntry = ref(null);
const activeNoteIndex = ref(0);

function renderContent(text) {
  // 1. Escape HTML special chars to prevent injection
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  // 2. Wrap bare URLs with anchor tags
  const linked = escaped.replace(
    /(https?:\/\/[^\s<>"]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  // 3. Convert newlines to <br>
  return linked.replace(/\n/g, "<br>");
}

function openNote(entry, index) {
  activeEntry.value = entry;
  activeNoteIndex.value = index;
}

function closeNoteDialog() {
  activeEntry.value = null;
  activeNoteIndex.value = 0;
}

function changeActiveNote(index) {
  activeNoteIndex.value = index;
}
</script>

<template>
  <main>
    <section class="card reveal journey-intro" style="--delay: 0.1s">
      <h2>{{ content.sectionTitles.journey }}</h2>
      <p class="journey-intro-text">{{ content.journeyIntro }}</p>
    </section>

    <div class="journey-timeline">
      <article
        v-for="(entry, idx) in content.journeyEntries"
        :key="entry.date + entry.title"
        class="card reveal journey-entry"
        :style="`--delay: ${0.15 + idx * 0.08}s`"
      >
        <div class="journey-entry-header">
          <span class="news-date">{{ entry.date }}</span>
          <div class="hero-tags" v-if="entry.tags && entry.tags.length">
            <span v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <h3>{{ entry.title }}</h3>
        <p class="journey-entry-content" v-html="renderContent(entry.content)"></p>
        <div v-if="entry.notes && entry.notes.length" class="journey-entry-notes">
          <span class="journey-notes-label">{{ props.content.journeyUi.notesLabel }}</span>
          <button
            v-for="(note, noteIndex) in entry.notes"
            :key="note.file"
            class="journey-note-chip"
            type="button"
            @click="openNote(entry, noteIndex)"
          >
            {{ note.title }}
          </button>
        </div>
      </article>
    </div>

    <JourneyNoteDialog
      :open="Boolean(activeEntry)"
      :entry="activeEntry"
      :active-note-index="activeNoteIndex"
      :ui="props.content.journeyUi"
      @close="closeNoteDialog"
      @change-note="changeActiveNote"
    />
  </main>
</template>

