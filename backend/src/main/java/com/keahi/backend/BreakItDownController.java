package com.keahi.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.google.gson.Gson;

// ai api request

// mvn clean package
// mvn spring-boot:run

@RestController
class BreakItDownController {
  @PostMapping("/breakitdown")
  public String createPrompt(@RequestBody String context) {
    Gson gson = new Gson();
    Prompt prompt = gson.fromJson(context, Prompt.class);
    return prompt.getSubject();
  }
}
