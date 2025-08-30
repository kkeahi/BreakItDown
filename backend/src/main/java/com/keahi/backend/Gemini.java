package com.keahi.backend;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

public class Gemini {
  public String query(String prompt) {
    Client client = new Client();

    GenerateContentResponse response = client.models.generateContent(
      "gemini-2.5-flash",
      prompt,
      null
    );

    client.close();

    return response.text();
  }
}
