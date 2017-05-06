package org.sails.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(value = {"/", "index", "index.html"})
    public String getIndex(Model model) {
        model.addAttribute("recipient", "World");
        return "index";
    }
}