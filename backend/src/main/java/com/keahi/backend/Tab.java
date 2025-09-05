package com.keahi.backend;

public final class Tab {
  private String id;
  private Long dom;

  public Tab() {}

  public Tab(String newId, Long newDom) { 
    this.id = newId;
    this.dom = newDom;
  }

  public String getId() {
    return this.id;
  }

  public Long getDom() {
    return this.dom;
  }

  public void setSubject(String id) {
    this.id = id;
  }

  public void setTabs(Long dom) {
    this.dom = dom;
  }
}
