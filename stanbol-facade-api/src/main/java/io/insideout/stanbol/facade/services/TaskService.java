package io.insideout.stanbol.facade.services;

import io.insideout.stanbol.facade.exceptions.ContentTypeNotSupportedException;
import io.insideout.stanbol.facade.exceptions.InvalidTaskRequestException;
import io.insideout.stanbol.facade.exceptions.UnsupportedMimeTypeException;
import io.insideout.stanbol.facade.models.ContentItemBag;
import io.insideout.stanbol.facade.models.TaskRequest;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.util.Arrays;
import java.util.LinkedList;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.apache.clerezza.rdf.core.MGraph;
import org.apache.clerezza.rdf.core.serializedform.Serializer;
import org.apache.commons.io.IOUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.stanbol.enhancer.servicesapi.Chain;
import org.apache.stanbol.enhancer.servicesapi.ChainManager;
import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.ContentItemFactory;
import org.apache.stanbol.enhancer.servicesapi.ContentSource;
import org.apache.stanbol.enhancer.servicesapi.EnhancementException;
import org.apache.stanbol.enhancer.servicesapi.EnhancementJobManager;
import org.apache.stanbol.enhancer.servicesapi.impl.StringSource;
import org.apache.tika.exception.TikaException;
import org.ccil.cowan.tagsoup.Parser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;

@Component(immediate = true)
@Service
public class TaskService implements TaskServiceInterface {

	private final static String MIME_TYPE_TEXT_PLAIN = "text/plain";
	private final static String MIME_TYPE_TEXT_HTML = "text/html";

	@Reference
	private ContentItemFactory contentItemFactory;

	@Reference
	private EnhancementJobManager enhancementJobManager;

	@Reference
	private ChainManager chainManager;

	@Reference
	private Serializer serializer;

	@Reference
	private UrlGrabberService urlGrabberService;

	@Override
	public ContentItem create(final TaskRequest taskRequest)
			throws IOException, EnhancementException,
			InvalidTaskRequestException, IllegalStateException,
			UnsupportedMimeTypeException, SAXException, TikaException,
			ContentTypeNotSupportedException {

		logger.trace("A task request has been received.");

		// check for the validity of the task request.
		if (null == taskRequest
				|| (null == taskRequest.getContent() && null == taskRequest
						.getUrl())) {
			throw new InvalidTaskRequestException();
		}

		final ContentItem contentItem = contentItemFactory
				.createContentItem(getContentSource(taskRequest));

		final ContentItemBag contentItemBag = new ContentItemBag(contentItem,
				taskRequest.getConfiguration());

		// get the chain specified in the request or the default one.
		final Chain chain = (null != taskRequest.getChainName()
				&& false == "".equals(taskRequest.getChainName()) ? chainManager
				.getChain(taskRequest.getChainName()) : chainManager
				.getDefault());

		enhancementJobManager.enhanceContent(contentItemBag, chain);

		return contentItemBag;
	}

	private ContentSource getContentSource(final TaskRequest taskRequest)
			throws ContentTypeNotSupportedException, IOException,
			InvalidTaskRequestException {

		if (null != taskRequest.getContent())
			return new StringSource(taskRequest.getContent());

		if (null != taskRequest.getUrl())
			return new StringSource(urlGrabberService.get(taskRequest.getUrl()));

		throw new InvalidTaskRequestException();
	}

	private ContentSource getContentFromTextPlain(final TaskRequest taskRequest)
			throws UnsupportedMimeTypeException, ClientProtocolException,
			IOException, IllegalStateException, SAXException {
		final DefaultHttpClient httpClient = new DefaultHttpClient();
		final URI uri = URI.create(taskRequest.getUrl());
		final HttpGet httpGet = new HttpGet(uri);
		final HttpResponse response = httpClient.execute(httpGet);

		final ContentSource contentSource;

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

					private final String[] DONT_CAPTURE_ELEMENTS = { "script",
							"iframe", "script", "object", "embed" };

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

						if (captures.peekLast())
							content.append(ch, start, length);
					}
				});

				parser.parse(new InputSource(entity.getContent()));

				logger.trace(
						"The following content has been extracted from the remote URL: {}",
						content.toString());

				contentSource = new StringSource(content.toString());

			} else if (mimeType.startsWith(MIME_TYPE_TEXT_PLAIN)) {
				contentSource = new StringSource(IOUtils.toString(entity
						.getContent()));
			} else {
				throw new UnsupportedMimeTypeException(mimeType);
			}
			// do something useful with the response body
			// and ensure it is fully consumed
			EntityUtils.consume(entity);
		} finally {
			httpGet.releaseConnection();
		}

		return contentSource;
	}

	@Override
	public Response writeContentItemToResponse(final ContentItem contentItem,
			final String mimeType) {
		final int graphSize = contentItem.getMetadata().size();
		final String contentItemUri = contentItem.getUri().toString();

		final StreamingOutput streamingOutput = new StreamingOutput() {

			@Override
			public void write(final OutputStream outputStream)
					throws IOException, WebApplicationException {

				final MGraph graph = contentItem.getMetadata();
				serializer.serialize(outputStream, graph, mimeType);

			}
		};

		return Response.ok().type(mimeType)
				.header("Data-Processing-Units-Cost", graphSize)
				.header("Content-Item-Id", contentItemUri)
				.entity(streamingOutput).build();
	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

}
