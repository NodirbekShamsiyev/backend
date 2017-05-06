package org.sails;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;
import org.junit.Test;
import org.sails.config.root.JSFiles;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.Map;

/**
 * Created by Nodirbek on 5/6/2017.
 */
public class ResourceTest {

    @Test
    public void test(){
        try {
            String jsFilesJSON = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("META-INF/resources/sails/client/files-manifest.json"), "UTF-8");


            Gson gson = new Gson();

            System.out.println(gson.fromJson(jsFilesJSON, JSFiles.class));

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
