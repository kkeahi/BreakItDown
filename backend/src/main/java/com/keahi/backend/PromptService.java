package com.keahi.backend;

import org.springframework.stereotype.Service;

@Service
public class PromptService {
  public String createPrompt(String subject) {
    return "Explain this briefly: " + subject;
  }
}
