import { Chat, EventSourceData } from '@/types/chart'

export const parseEventSource = (
  data: string
): '[DONE]' | EventSourceData[] => {
  const result = data
    .split('\n\n')
    .filter(Boolean)
    .map((chunk) => {
      const jsonString = chunk
        .split('\n')
        .map((line) => line.replace(/^data: /, ''))
        .join('')
      if (jsonString === '[DONE]') return jsonString
      try {
        const json = JSON.parse(jsonString)
        return json
      } catch {
        return '[ERROR]'
      }
    })
  return result
}

export const chatToMarkdown = (chat: Chat) => {
  let markdown = `# ${chat.title}\n\n`
  chat.messages.forEach((message, index) => {
    const { role, content } = message
    if (role === 'user') {
      markdown += `### ${content}`
    } else {
      markdown += `\n\n${content}\n\n---\n\n`
    }
  })
  return markdown
}

export const downloadMarkdown = (markdown: string, fileName: string) => {
  const link = document.createElement('a')
  const markdownFile = new Blob([markdown], { type: 'text/markdown' })
  link.href = URL.createObjectURL(markdownFile)
  link.download = fileName
  link.click()
  link.remove()
}
