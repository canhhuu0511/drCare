package com.example.doctorappointment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RSSFeedDTO {
    String title;
    String description;
    String link;
    String pubDate;
    String html_content;
}
