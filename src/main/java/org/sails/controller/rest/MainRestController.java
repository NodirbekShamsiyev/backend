package org.sails.controller.rest;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


public class MainRestController {

    ResponseEntity<String> getMainJSON() {
        ResponseEntity<String> entity = new ResponseEntity<String>("json:{id:1,is:2}", HttpStatus.OK);

        return entity;
    }

}
