package com.yikesong.testserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 跳转到主页
 *
 * @author 曹子钰, 2018/5/14
 */
@Controller
public class HomePageController {
    @GetMapping({"/", "", "/login", "/main"})
    public String homepage() {
        return "redirect:/index.html";
    }
}
