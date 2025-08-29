package com.keahi.backend;

public class Context {
  private String subject;
  private String pageContext;
  private String userContext;

  // constructor
  public Context(String newSubject, String newPageContext, String newUserContext) { 
    this.subject = newSubject;
    this.pageContext = newPageContext;
    this.userContext = newUserContext;
  }

  public String getGeminiPrompt() {
    return "Explain the following sentence briefly. Keep it to the point and return ONLY the explanation, nothing else. Your next response should only consist of the explanation of the following input. Input: " + this.subject;
  }
}
