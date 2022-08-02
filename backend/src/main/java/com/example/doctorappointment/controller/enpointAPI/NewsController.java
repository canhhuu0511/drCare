package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.RSSFeedDTO;
import com.example.doctorappointment.utility.RSSFeedParser;
import com.example.doctorappointment.utility.WebCrawler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/news")
public class NewsController {

    private WebCrawler webCrawler;
    private RSSFeedParser rssFeedParser;

    @GetMapping("/")
    public ResponseEntity<List<RSSFeedDTO>> getAll(){
        rssFeedParser = new RSSFeedParser("https://vnexpress.net/rss/suc-khoe.rss");
        List<RSSFeedDTO> list =  rssFeedParser.readFeed();
        list.remove(0);
        List<RSSFeedDTO> listResult =  new ArrayList<>();
        for(int i = 0 ; i <= 9 ; i++){
            listResult.add(list.get(i));
        }
        return ResponseEntity.ok().body(listResult);
    }
    @GetMapping("/detail")
    public ResponseEntity<String> getDetail(@RequestParam String url){
        webCrawler = new WebCrawler();

        return ResponseEntity.ok().body(webCrawler.getHTMLContent(url));
    }
}
