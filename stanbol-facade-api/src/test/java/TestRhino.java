import io.insideout.stanbol.facade.exceptions.ContentTypeNotSupportedException;
import io.insideout.stanbol.facade.services.UrlGrabberService;

import java.io.IOException;

import org.junit.Test;

public class TestRhino {

	private final UrlGrabberService urlGrabberService = new UrlGrabberService();

	@Test
	public void test() throws IOException, ContentTypeNotSupportedException {

		final String url = "http://www.enel.it/it-IT/media_investor/comunicati/release.aspx?iddoc=1656726"; // "http://www.corriere.it/politica/12_dicembre_18/legge-stabilita-conflitto-tempi_5b85204a-4928-11e2-af43-2ffd0f3e671f.shtml";
		final String content = urlGrabberService.get(url);

		System.out.println("=============================================");
		System.out.println(content);
		System.out.println("=============================================");
	}

}
