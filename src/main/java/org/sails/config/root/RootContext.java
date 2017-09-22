package org.sails.config.root;

import com.firebase.client.Firebase;
import com.google.gson.Gson;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;

import javax.inject.Inject;
import java.io.IOException;

@Configuration
@Import({DataSource.class})
@PropertySource({
        "classpath:config.properties"
})
@ComponentScan( basePackages = "org.sails.*", excludeFilters = {@ComponentScan.Filter(org.springframework.stereotype.Controller.class)})
public class RootContext {

    private Environment env;

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean("buildJSFiles")
    JSFiles getBuildJSFilesNames() {
        String jsFilesJSON = null;
        try {
            jsFilesJSON = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("client/resources/files-manifest.json"), "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Gson().fromJson(jsFilesJSON, JSFiles.class);
    }

    Firebase getFireBase(){
        return new Firebase("/localhost");
    }

    @Inject
    public Environment getEnv() {
        return env;
    }
}