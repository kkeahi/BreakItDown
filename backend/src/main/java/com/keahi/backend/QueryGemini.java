package com.keahi.backend;

import java.util.List;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

public class QueryGemini {
  public static String input(List<String> contextList) {
    Client client = new Client();

    GenerateContentResponse response = client.models.generateContent(
      "gemini-2.5-flash",
      "Explain how AI works in a few words",
      null
    );

    client.close();

    return response.text();
  }
}
