package com.keahi.backend;

import org.springframework.stereotype.Service;

@Service
public class PromptService {
  public String createPrompt(String subject) {
    return """
    Explain the highlighted text in simple, clear language. Use only plain text, no markdown, emojis, or special formatting. 
    Give a brief, straight-to-the-point explanation that makes the highlighted text easier to understand. Include the key meaning of the highlighted
    text and provide any useful context or facts that help clarify it. Highlighted text: 
    """ + subject;
  }

  public String createResearchPrompt(String subject, String tabs) {
    return "";
  }
}
