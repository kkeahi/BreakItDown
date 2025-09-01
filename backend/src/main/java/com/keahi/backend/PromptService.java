package com.keahi.backend;

import org.springframework.stereotype.Service;

@Service
public class PromptService {
  public String createPrompt(String subject) {
    return "Explain the highlighted text in simple plain language. Use plain text, no markdown or emojis, just letters, numbers, and symbols. Give only a short, clear explanation of the full text. Do not add anything else. Make a short but neccessary reference to the highlighted text rather than vaguely referring to it as 'it'. Highlighted text: " + subject;
  }
}
