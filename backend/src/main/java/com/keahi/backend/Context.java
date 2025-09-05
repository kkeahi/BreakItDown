package com.keahi.backend;

public final class Context {
  private String subject;
  private Tab tabs;

  public Context() {}

  public Context(String newSubject, Tab newTabs) { 
    this.subject = newSubject;
    this.tabs = newTabs;
  }

  public String getSubject() {
    return this.subject;
  }

  public Tab getTabs() {
    return this.tabs;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  public void setTabs(Tab tabs) {
    this.tabs = tabs;
  }
}
