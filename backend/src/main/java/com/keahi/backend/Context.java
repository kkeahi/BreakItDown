package com.keahi.backend;

public final class Context {
  private String subject;
  private String tabs;

  public Context() {}

  public Context(String newSubject, String newTabs) { 
    this.subject = newSubject;
    this.tabs = newTabs;
  }

  public String getSubject() {
    return this.subject;
  }

  public String getTabs() {
    return this.tabs;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  public void setTabs(String tabs) {
    this.tabs = tabs;
  }
}
