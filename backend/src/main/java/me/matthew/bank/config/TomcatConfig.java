package me.matthew.bank.config;

import org.apache.catalina.valves.ErrorReportValve;
import org.springframework.boot.tomcat.servlet.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TomcatConfig {
    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> containerConsumer() {
        return factory -> {
            factory.addContextCustomizers(context -> {
                ErrorReportValve valve = new ErrorReportValve();
                valve.setShowReport(false);
                valve.setShowServerInfo(false);
                context.getParent().getPipeline().addValve(valve);
            });
        };
    }
}
