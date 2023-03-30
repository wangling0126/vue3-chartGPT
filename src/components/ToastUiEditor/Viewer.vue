<template>
  <div class="viewer-contanier">
    <div class="copy-box" @click="handlerCopy">
      <svg-icon icon="copy" color="#fff"></svg-icon>
    </div>
    <div ref="editor" style="width: 100%" />
  </div>
</template>

<script lang="ts">
export default { name: 'ViewerComp' }
</script>

<script setup lang="ts">
import Editor, { EditorCore, Viewer } from '@toast-ui/editor'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { ref, onMounted, watch } from 'vue'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
// Import prismjs
import Prism from 'prismjs'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
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
let mkEditor: EditorCore | Viewer | null = null
onMounted(() => {
  // mkEditor = new Editor({
  //   el: editor.value,
  //   theme: 'dark',
  //   viewer: true,
  //   height: 'auto',
  //   initialEditType: 'markdown',
  //   previewStyle: 'vertical',
  //   previewHighlight: true,
  //   hideModeSwitch: true,
  //   plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
  //   events: {
  //     change: () =>
  //       emit('update:modelValue', mkEditor && mkEditor.getMarkdown())
  //   }
  // })
  mkEditor = Editor.factory({
    el: editor.value,
    theme: 'dark',
    initialValue: props.modelValue,
    previewHighlight: true,
    initialEditType: 'markdown',
    height: 'auto',
    hideModeSwitch: true,
    previewStyle: 'vertical',
    viewer: true,
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]]
  })
  mkEditor && mkEditor.setMarkdown(props.modelValue)
})

watch(
  () => props.modelValue,
  (newVal) => {
    mkEditor && mkEditor.setMarkdown(props.modelValue)
  }
)
const { toClipboard } = useClipboard()
const handlerCopy = async () => {
  try {
    await toClipboard(props.modelValue)
    ElMessage.success('复制成功')
  } catch (e) {
    console.error(e)
  }
}
</script>
<style lang="scss">
.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  background: transparent;
}
</style>
<style scoped lang="scss">
.viewer-contanier {
  width: 100%;
  position: relative;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  padding: 20px;
}
.copy-box {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
