package com.keahi.backend;

import org.springframework.stereotype.Service;

@Service
public class PromptService {
  public String createPrompt(String subject) {
    return "Explain this in 20 or less words. Use plain text and output only the explanation: " + subject;
  }
}
