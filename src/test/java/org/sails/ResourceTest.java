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

public class ResourceTest {

   // @Test
    public void testMetaInf(){
        try {
            String jsFilesJSON = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("META-INF/resources/sails/client/files-manifest.json"), "UTF-8");

            Gson gson = new Gson();

            System.out.println("------------------META-INF------------------");
            System.out.println(gson.fromJson(jsFilesJSON, JSFiles.class));

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    @Test
    public void test(){
        try {
            String jsFilesJSON = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("sails/client/files-manifest.json"), "UTF-8");

            Gson gson = new Gson();

            System.out.println("------------------resource------------------");
            System.out.println(gson.fromJson(jsFilesJSON, JSFiles.class));

        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    @Test
    public void testPath(){
        System.out.println(System.getProperty("user.dir"));
    }
}
