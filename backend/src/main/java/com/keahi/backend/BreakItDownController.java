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
  public String createPrompt(@RequestBody String context) {
    Gson gson = new Gson();
    Prompt prompt = gson.fromJson(context, Prompt.class);

    List<String> contextList = new ArrayList<String>();
    contextList.add("a");
    contextList.add("b");

    QueryGemini query = new QueryGemini();
    String response = query.input(contextList);
    // ai api call
    return response;
  }
}
