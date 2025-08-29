package com.keahi.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.ArrayList;

import com.google.gson.Gson;

// ai api request

// mvn clean package
// mvn spring-boot:run

@RestController
class BreakItDownController {

  @PostMapping("/breakitdown")
  public String createPrompt(@RequestBody String contextJson) {
    Gson gson = new Gson();

    Context context = gson.fromJson(contextJson, Context.class);
    String queryPrompt = context.getGeminiPrompt();

    QueryGemini gemini = new QueryGemini();
    String response = gemini.query(queryPrompt);
    // ai api call
    return response;
  }
}
