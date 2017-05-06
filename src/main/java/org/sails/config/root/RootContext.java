package org.sails.config.root;

import com.google.gson.Gson;
import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
@ComponentScan(excludeFilters = {@ComponentScan.Filter(org.springframework.stereotype.Controller.class)})
public class RootContext {

    @Bean("buildJSFiles")
    JSFiles getBuildJSFilesNames() {
        String jsFilesJSON = null;
        try {
            jsFilesJSON = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("sails/client/files-manifest.json"), "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new Gson().fromJson(jsFilesJSON, JSFiles.class);
    }

}