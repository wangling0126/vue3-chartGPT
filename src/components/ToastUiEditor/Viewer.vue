<template>
  <div ref="editor" />
</template>

<script lang="ts">
export default { name: 'ViewerComp' }
</script>

<script setup lang="ts">
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { ref, onMounted, watch } from 'vue'
import 'prismjs/themes/prism.css'
// Import prismjs
import Prism from 'prismjs'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
const props = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {
    modelValue: ''
  }
)

const emit = defineEmits(['update:modelValue'])
const editor = ref()
let mkEditor: Editor | null = null
onMounted(() => {
  mkEditor = new Editor({
    el: editor.value,
    theme: 'dark',
    height: '500px',
    viewer: true,
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    events: {
      change: () =>
        emit('update:modelValue', mkEditor && mkEditor.getMarkdown())
    }
  })
  mkEditor && mkEditor.setMarkdown(props.modelValue)
})

watch(
  () => props.modelValue,
  (newVal) => {
    mkEditor && mkEditor.setMarkdown(props.modelValue)
  }
)
</script>
<style scoped lang="scss"></style>
