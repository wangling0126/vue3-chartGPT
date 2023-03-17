<template>
  <div style="border: 1px solid #ccc" class="wang-editor-box">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: auto; overflow-y: auto"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
export default { name: 'EditorComp' }
</script>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import 'highlight.js/styles/monokai-sublime.css'
import { IEditorConfig, Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
Boot.registerModule(markdownModule)

const props = defineProps<{
  content: string
}>()

const emits = defineEmits(['update:content'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
onMounted(() => {
  setTimeout(() => {
    valueHtml.value =
      '\n\nVue 3 中的响应式系统使用了 ECMAScript 2015 的 Proxy 对象来实现。下面是一个简单的 Vue 3 reactive 实现，它使用了 Proxy 和 Reflect 对象：\n\n```\nfunction reactive(obj) {\n  return new Proxy(obj, {\n    get(target, key, receiver) {\n      const result = Reflect.get(target, key, receiver);\n      track(target, key); // 收集依赖\n      return result;\n    },\n    set(target, key, value, receiver) {\n      const oldValue = Reflect.get(target, key, receiver);\n      const result = Reflect.set(target, key, value, receiver);\n      if (oldValue !== value) {\n        trigger(target, key); // 触发更新\n      }\n      return result;\n    },\n    deleteProperty(target, key) {\n      const result = Reflect.deleteProperty(target, key);\n      trigger(target, key); // 触发更新\n      return result;\n    }\n  });\n}\n\nlet activeEffect = null;\nlet targetMap = new WeakMap();\n\nfunction track(target, key) {\n  if (!activeEffect) {\n    return;\n  }\n\n  let depsMap = targetMap.get(target);\n  if (!depsMap) {\n    depsMap = new Map();\n    targetMap.set(target, depsMap);\n  }\n\n  let dep = depsMap.get(key);\n  if (!dep) {\n    dep = new Set();\n    depsMap.set(key, dep);\n  }\n\n  dep.add(activeEffect);\n}\n\nfunction trigger(target, key) {\n  const depsMap = targetMap.get(target);\n  if (!depsMap) {\n    return;\n  }\n\n  const dep = depsMap.get(key);\n  if (dep) {\n    dep.forEach((effect) => {\n      effect();\n    });\n  }\n}\n\nfunction effect(fn) {\n  activeEffect = fn;\n  fn();\n  activeEffect = null;\n}\n```\n\n这里的 `reactive` 函数接收一个对象，然后将其转化为响应式的对象。当我们访问响应式对象的某个属性时，会触发 `get` 拦截器。在 `get` 拦截器中，我们调用了 `track` 函数来收集这个属性的依赖关系。\n\n当我们改变响应式对象的某个属性时，会触发 `set` 拦截器。在 `set` 拦截器中，我们首先调用了 `Reflect.set` 方法来真正改变对象的属性值。然后，我们检查新值和旧值是否相等。如果不相等，我们调用 `trigger` 函数来触发更新操作。\n\n`track` 函数用于收集依赖。它会将当前的响应式函数存储到全局变量 `activeEffect` 中，然后将其加入到依赖关系中。`trigger` 函数则会遍历依赖关系中的响应式函数，然后依次调用它们。\n\n最后，我们还提供了一个 `effect` 函数来执行响应式函数。在执行之前，我们先将当前的响应式函数保存到 `activeEffect` 中，然后再执行函数。当函数执行完毕后，我们将 `activeEffect` 设置为 `null`，以便在后续的操作中不会再访问到它。'
  }, 3000)
})
watchEffect(() => {
  valueHtml.value = props.content
})

watch(valueHtml, (newVal) => {
  emits('update:content', newVal)
})
const mode = ref('default')

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...'
  // highlight: true,
  // theme: 'dark'
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log(editor)
}
</script>
<style scoped lang="scss">
.wang-editor-box {
  --w-e-textarea-bg-color: rgb(64, 65, 79);
  --w-e-textarea-color: #fff;

  // textarea - css vars
  --w-e-textarea-bg-color: rgb(64, 65, 79);
  --w-e-textarea-color: #fff;
  --w-e-textarea-border-color: rgb(64, 65, 79, 0.7);
  --w-e-textarea-slight-border-color: #272525;
  --w-e-textarea-slight-color: #d4d4d4;
  --w-e-textarea-slight-bg-color: #222121;
  --w-e-textarea-selected-border-color: #b4d5ff; // 选中的元素，如选中了分割线
  --w-e-textarea-handler-bg-color: #4290f7; // 工具，如图片拖拽按钮

  // toolbar - css vars
  --w-e-toolbar-color: #fff;
  --w-e-toolbar-bg-color: #595959;
  --w-e-toolbar-active-color: #f1f1f1;
  --w-e-toolbar-active-bg-color: #333;
  --w-e-toolbar-disabled-color: #e8e8e8;
  --w-e-toolbar-border-color: #999;

  // modal - css vars
  --w-e-modal-button-bg-color: #4d4949;
  --w-e-modal-button-border-color: #1a1919;
  // :deep(.w-e-text-container [data-slate-editor]) {
  //   background: rgb(64, 65, 79);
  //   color: white;
  // }
  :deep(.w-e-text-container [data-slate-editor] pre > code) {
    text-shadow: none;
  }
}
</style>
