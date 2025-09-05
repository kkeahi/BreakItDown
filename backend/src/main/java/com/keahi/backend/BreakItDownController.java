package com.keahi.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

// mvn clean package
// mvn spring-boot:run

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "chrome-extension://nbpmifdfjibkfjlhbpedldcakfbbliig")
public class BreakItDownController {

  private final PromptService promptService;

  public BreakItDownController(PromptService promptService) {
    this.promptService = promptService;
  }

  @PostMapping("/breakitdown")
  public Response breakItDown(@RequestBody Context context) {
    Gemini client = new Gemini();
    String prompt = promptService.createPrompt(context.getSubject());
    return new Response(client.query(prompt));
  }
}
