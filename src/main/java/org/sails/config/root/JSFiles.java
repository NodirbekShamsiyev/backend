package org.sails.config.root;

import com.google.gson.annotations.SerializedName;

public class JSFiles {

    @SerializedName("main.js")
    private String mainJS;

    @SerializedName("main.js.map")
    private String mainJSMap;

    public JSFiles() {
    }

    public String getMainJS() {
        return mainJS;
    }

    public void setMainJS(String mainJS) {
        this.mainJS = mainJS;
    }

    public String getMainJSMap() {
        return mainJSMap;
    }

    public void setMainJSMap(String mainJSMap) {
        this.mainJSMap = mainJSMap;
    }

    @Override
    public String toString() {
        return "JSFiles{" +
                "mainJS='" + mainJS + '\'' +
                ", mainJSMap='" + mainJSMap + '\'' +
                '}';
    }
}
