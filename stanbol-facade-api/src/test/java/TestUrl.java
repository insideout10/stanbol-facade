import io.insideout.stanbol.facade.exceptions.UnsupportedMimeTypeException;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.LinkedList;

import org.apache.commons.io.IOUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.ccil.cowan.tagsoup.Parser;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;

public class TestUrl {

	@Test
	public void test() throws IllegalStateException, IOException, SAXException,
			UnsupportedMimeTypeException {
		System.out
				.println(getContentFromUrl("http://milano.corriere.it/milano/notizie/cronaca/12_dicembre_18/sanita-scandalo-regione-lombardia-perquisizioni-cliniche-private-varese-2113214389404.shtml"));
	}

	private final static String MIME_TYPE_TEXT_HTML = "text/html";
	private final static String MIME_TYPE_TEXT_PLAIN = "text/plain";
	private final static String[] DONT_CAPTURE_ELEMENTS = { "ul", "title",
			"script", "iframe", "script", "object", "embed", "style", "option",
			"input", "form" };

	private String getContentFromUrl(final String url)
			throws IllegalStateException, IOException, SAXException,
			UnsupportedMimeTypeException {

		final String urlContent;

		final DefaultHttpClient httpClient = new DefaultHttpClient();
		final URI uri = URI.create(url);
		final HttpGet httpGet = new HttpGet(uri);
		final HttpResponse response = httpClient.execute(httpGet);

		try {
			final HttpEntity entity = response.getEntity();
			final Header contentTypeHeader = entity.getContentType();
			if (null == contentTypeHeader)
				throw new UnsupportedMimeTypeException("none");

			final String mimeType = contentTypeHeader.getValue();

			if (mimeType.startsWith(MIME_TYPE_TEXT_HTML)) {

				final Parser parser = new Parser();
				final StringBuffer content = new StringBuffer();
				parser.setContentHandler(new ContentHandler() {

					private final LinkedList<Boolean> captures = new LinkedList<Boolean>();

					@Override
					public void startPrefixMapping(String prefix, String uri)
							throws SAXException {
						// TODO Auto-generated method stub

					}

					@Override
					public void startElement(String uri, String localName,
							String qName, Attributes atts) throws SAXException {

						logger.trace(
								"Received a start element [ uri :: {} ][ localName :: {} ][ qName :: {} ].",
								new Object[] { uri, localName, qName });

						if ("title".equals(qName) || "body".equals(qName))
							captures.add(true);

						if (Arrays.asList(DONT_CAPTURE_ELEMENTS)
								.contains(qName))
							captures.add(false);
					}

					@Override
					public void startDocument() throws SAXException {
						captures.add(false);
					}

					@Override
					public void skippedEntity(String name) throws SAXException {
						// TODO Auto-generated method stub

					}

					@Override
					public void setDocumentLocator(Locator locator) {
						// TODO Auto-generated method stub

					}

					@Override
					public void processingInstruction(String target, String data)
							throws SAXException {
						// TODO Auto-generated method stub

					}

					@Override
					public void ignorableWhitespace(char[] ch, int start,
							int length) throws SAXException {
						// TODO Auto-generated method stub

					}

					@Override
					public void endPrefixMapping(String prefix)
							throws SAXException {
						// TODO Auto-generated method stub

					}

					@Override
					public void endElement(String uri, String localName,
							String qName) throws SAXException {

						logger.trace(
								"Received an end element [ uri :: {} ][ localName :: {} ][ qName :: {} ].",
								new Object[] { uri, localName, qName });

						if ("title".equals(qName))
							content.append("\n");

						if ("title".equals(qName)
								|| "body".equals(qName)
								|| Arrays.asList(DONT_CAPTURE_ELEMENTS)
										.contains(qName))
							captures.pollLast();

					}

					@Override
					public void endDocument() throws SAXException {
						// TODO Auto-generated method stub

					}

					@Override
					public void characters(char[] ch, int start, int length)
							throws SAXException {

						if (!captures.peekLast())
							return;

						final StringBuilder chunk = new StringBuilder(length)
								.append(ch, start, length);
						final String chunkTrimmed = chunk.toString().trim();
						if (0 == chunkTrimmed.length())
							return;

						content.append(" " + chunkTrimmed);
					}
				});

				parser.parse(new InputSource(entity.getContent()));

				logger.trace(
						"The following content has been extracted from the remote URL: {}",
						content.toString());

				urlContent = content.toString();

			} else if (mimeType.startsWith(MIME_TYPE_TEXT_PLAIN)) {
				urlContent = IOUtils.toString(entity.getContent());
			} else {
				throw new UnsupportedMimeTypeException(mimeType);
			}
			// do something useful with the response body
			// and ensure it is fully consumed
			EntityUtils.consume(entity);
		} finally {
			httpGet.releaseConnection();
		}

		return urlContent;
	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

}
