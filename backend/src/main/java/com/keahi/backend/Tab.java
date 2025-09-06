package com.keahi.backend;

public final class Tab {
  private Long tabId;
  private String dom;

  public Tab() {}

  public Tab(Long newId, String newDom) { 
    this.tabId = newId;
    this.dom = newDom;
  }

  public Long getTabId() {
    return this.tabId;
  }

  public String getDom() {
    return this.dom;
  }

  public void setTabId(Long tabId) {
    this.tabId = tabId;
  }

  public void setTabs(String dom) {
    this.dom = dom;
  }
}
