package org.sails;

import net.jodah.concurrentunit.Waiter;
import org.junit.Test;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by Nodirbek on 5/15/2017.
 */

public class SchedulerTest {


    @Test(expected = java.util.concurrent.TimeoutException.class)
    public void testScheduler() throws Throwable {
        final Waiter waiter = new Waiter();
        ScheduledExecutorService service = Executors.newScheduledThreadPool(1);
        service.scheduleAtFixedRate(new Runnable() {
            public void run() {
                System.out.println("/----------------------Periodic schedule----------------------\\");
            }
        }, 5, 5, TimeUnit.SECONDS);

        //   while (true);
        waiter.await(20000);

    }
}
