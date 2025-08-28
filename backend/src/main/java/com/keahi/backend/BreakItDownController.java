package com.keahi.backend;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// ai api request

// mvn clean package
// mvn spring-boot:run

@RestController
class BreakItDownController {
  @GetMapping("/breakitdown")
  public static void main(String[] args) {
    System.out.println("received /breakitdown");
  }
}
