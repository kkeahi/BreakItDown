package com.keahi.backend;

public final class Context {
  private String subject;

  public Context() {}

  public Context(String newSubject) { 
    this.subject = newSubject;
  }

  public String getSubject() {
    return this.subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }
}
