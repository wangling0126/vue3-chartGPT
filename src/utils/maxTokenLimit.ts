import { CharContentItem } from '@/types/chart';
import countTokens from './countToTokens';
/**
 * limit字数： 4096
 * 
*/
export const limitMessageTokens = (
  messages: CharContentItem[],
  limit: number = 4096
): CharContentItem[] => {
  const limitedMessages: CharContentItem[] = [];
  let tokenCount = 0;

  for (let i = messages.length - 1; i >= 0; i--) {
    const count = countTokens(messages[i].content);
    if (count + tokenCount > limit) break;
    tokenCount += count;
    limitedMessages.unshift({ ...messages[i] });
  }

  return limitedMessages;
};
