package hello;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rs.omegavesko.animesimulcastfetcher.CrunchyrollProvider;
import rs.omegavesko.animesimulcastfetcher.HorribleSubsProvider;
import rs.omegavesko.animesimulcastfetcher.ScheduleItem;
import rs.omegavesko.animesimulcastfetcher.SenpaiProvider;

@RestController
public class AnimeKoyomiController
{
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }

    @RequestMapping("/schedule/horriblesubs")
    public List<ScheduleItem> getHorriblesubsSchedule()
    {
        HorribleSubsProvider horribleSubsProvider = new HorribleSubsProvider();
        return horribleSubsProvider.getItems();
    }

    @RequestMapping("/schedule/senpai")
    public List<ScheduleItem> getSenpaiSchedule()
    {
        SenpaiProvider senpaiProvider = new SenpaiProvider();
        return senpaiProvider.getItems();
    }

    @RequestMapping("/schedule/crunchyroll")
    public List<ScheduleItem> getCrunchyrollSchedule()
    {
        CrunchyrollProvider crunchyrollProvider = new CrunchyrollProvider();
        return crunchyrollProvider.getItems();
    }
}
