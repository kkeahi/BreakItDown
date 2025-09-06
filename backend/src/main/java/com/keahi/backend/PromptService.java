package com.keahi.backend;

import org.springframework.stereotype.Service;
import org.apache.commons.lang3.builder.ToStringBuilder;

@Service
public class PromptService {
  public String createPrompt(String subject) {
    return """
    Explain the highlighted text in simple, clear language. Use only plain text, no markdown, emojis, or special formatting. 
    Give a brief, straight-to-the-point explanation that makes the highlighted text easier to understand. Include the key meaning of the highlighted
    text and provide any useful context or facts that help clarify it. Highlighted text: 
    """ + subject;
  }

  public String createResearchPrompt(String subject, Tab[] tabs) {
    System.out.println("\n" + ToStringBuilder.reflectionToString(tabs)); // check frontend console.log({ subject: info.selectionText, tabs: researchTabs });
    return """
    Explain the highlighted text in simple, clear language. Use only plain text, no markdown, emojis, or special formatting. 
    Give a brief, straight-to-the-point explanation that makes the highlighted text easier to understand. Include the key meaning of the highlighted
    text and provide any useful context or facts that help clarify it. Actively try to reference any text in the provided tabs variable,
    which contains the DOM and tab ID of each tab the user has opened. Make sure to include the IDs of any tabs you reference, if any, while also
    making it clear you referenced that tab(s).
    \n Highlighted text: """ + subject + """
    \n Tabs ({dom: _dom_, tabId: _id_}): """ + ToStringBuilder.reflectionToString(tabs[0]);
  }
}
