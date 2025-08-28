package com.keahi.backend;

public class Prompt {
  private String subject;
  private String pageContext;
  private String userContext;

  // constructor
  public Prompt(String newSubject, String newPageContext, String newUserContext) { 
    this.subject = newSubject;
    this.pageContext = newPageContext;
    this.userContext = newUserContext;
  }

  public String getSubject() {
    return this.subject;
  }

  public String getPageContext() {
    return this.pageContext;
  }
}
