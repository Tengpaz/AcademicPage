<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import "katex/dist/katex.min.css";

marked.use(markedKatex({
  throwOnError: false,
  nonStandard: true
}));

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  entry: {
    type: Object,
    default: null
  },
  activeNoteIndex: {
    type: Number,
    required: true
  },
  ui: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["close", "change-note"]);

const noteHtml = ref("");
const tocItems = ref([]);
const loading = ref(false);
const error = ref("");
const articleRef = ref(null);
const previousBodyOverflow = ref("");

const activeNote = computed(() => props.entry?.notes?.[props.activeNoteIndex] ?? null);

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") || "section";
}

function buildHtmlFromMarkdown(markdown) {
  const rawHtml = marked.parse(markdown);
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);
  const parser = new DOMParser();
  const documentNode = parser.parseFromString(`<div>${sanitizedHtml}</div>`, "text/html");
  const container = documentNode.body.firstElementChild;
  const headings = [];
  const slugCounter = new Map();

  container.querySelectorAll("h1, h2, h3").forEach((heading) => {
    const baseSlug = slugify(heading.textContent || "section");
    const currentCount = slugCounter.get(baseSlug) || 0;
    const id = currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount}`;
    slugCounter.set(baseSlug, currentCount + 1);
    heading.id = id;
    headings.push({
      id,
      text: heading.textContent || "",
      level: Number(heading.tagName.slice(1))
    });
  });

  noteHtml.value = container.innerHTML;
  tocItems.value = headings;
}

async function loadNote() {
  if (!props.open || !activeNote.value) {
    noteHtml.value = "";
    tocItems.value = [];
    error.value = "";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}notes/${activeNote.value.file}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${activeNote.value.file}`);
    }

    const markdown = await response.text();
    buildHtmlFromMarkdown(markdown);
    await nextTick();
    if (articleRef.value) {
      articleRef.value.scrollTop = 0;
    }
  } catch (_error) {
    noteHtml.value = "";
    tocItems.value = [];
    error.value = props.ui.failed;
  } finally {
    loading.value = false;
  }
}

function handleKeydown(event) {
  if (event.key === "Escape" && props.open) {
    emit("close");
  }
}

function scrollToHeading(id) {
  const target = articleRef.value?.querySelector(`[id="${id}"]`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

watch(() => props.open, (isOpen) => {
  if (typeof document === "undefined") {
    return;
  }

  if (isOpen) {
    previousBodyOverflow.value = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = previousBodyOverflow.value;
  }
});

watch([() => props.open, activeNote], () => {
  loadNote();
}, { immediate: true });

onBeforeUnmount(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = previousBodyOverflow.value;
    window.removeEventListener("keydown", handleKeydown);
  }
});

if (typeof window !== "undefined") {
  window.addEventListener("keydown", handleKeydown);
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="note-dialog-backdrop" @click.self="emit('close')">
      <section class="note-dialog-shell">
        <header class="note-dialog-header">
          <div>
            <p class="note-dialog-kicker">{{ entry?.date }}</p>
            <h2>{{ entry?.title }}</h2>
          </div>
          <button class="note-dialog-close" type="button" @click="emit('close')">{{ ui.close }}</button>
        </header>

        <div class="note-dialog-layout">
          <aside class="note-sidebar note-sidebar-left">
            <p class="note-sidebar-title">{{ ui.noteListTitle }}</p>
            <button
              v-for="(note, index) in entry?.notes || []"
              :key="note.file"
              class="note-switcher"
              :class="{ active: index === activeNoteIndex }"
              type="button"
              @click="emit('change-note', index)"
            >
              {{ note.title }}
            </button>
          </aside>

          <section ref="articleRef" class="note-article-wrap">
            <div v-if="loading" class="note-state">{{ ui.loading }}</div>
            <div v-else-if="error" class="note-state">{{ error }}</div>
            <div v-else-if="!noteHtml" class="note-state">{{ ui.empty }}</div>
            <article v-else class="note-article" v-html="noteHtml"></article>
          </section>

          <aside class="note-sidebar note-sidebar-right">
            <p class="note-sidebar-title">{{ ui.tocTitle }}</p>
            <button
              v-for="item in tocItems"
              :key="item.id"
              class="toc-link"
              :class="`level-${item.level}`"
              type="button"
              @click="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </button>
          </aside>
        </div>
      </section>
    </div>
  </Teleport>
</template>
