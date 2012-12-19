package io.insideout.stanbol.facade.services;

import io.insideout.stanbol.facade.exceptions.ContentTypeNotSupportedException;

import java.io.IOException;
import java.util.Arrays;

import org.apache.commons.io.IOUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ScriptableObject;

@Component(immediate = true)
@Service
public class UrlGrabberService implements UrlGrabberServiceInterface {

	private final static String CONTENT_TYPE_TEXT_PLAIN = "text/plain";
	private final static String CONTENT_TYPE_TEXT_HTML = "text/html";
	private final static String[] SUPPORTED_MIME_TYPES = { CONTENT_TYPE_TEXT_HTML };
	private final static String CONTENT_TYPE_HEADER_NAME = "Content-Type";

	public String get(final String url)
			throws ContentTypeNotSupportedException, IOException {
		final String mimeType = getMimeType(url);

		if (false == Arrays.asList(SUPPORTED_MIME_TYPES).contains(mimeType))
			throw new ContentTypeNotSupportedException(mimeType);

		if (CONTENT_TYPE_TEXT_PLAIN.equals(mimeType)) {
			return getContent(url);
		} else if (CONTENT_TYPE_TEXT_HTML.equals(mimeType)) {
			return getContent(url);
		}

		throw new ContentTypeNotSupportedException(mimeType);
	}

	private String getMimeType(final String url) {

		String mimeType = null;
		final DefaultHttpClient httpClient = new DefaultHttpClient();
		final HttpHead httpHead = new HttpHead(url);

		HttpResponse httpResponse;

		try {
			// in case you're asking, HttpClient handles redirects
			// automatically:
			// http://hc.apache.org/httpcomponents-client-ga/tutorial/html/httpagent.html
			httpResponse = httpClient.execute(httpHead);

			if (httpResponse.containsHeader(CONTENT_TYPE_HEADER_NAME)) {
				mimeType = httpResponse
						.getFirstHeader(CONTENT_TYPE_HEADER_NAME).getValue()
						.split(";")[0];
			}

			final HttpEntity httpEntity = httpResponse.getEntity();
			EntityUtils.consume(httpEntity);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			httpHead.releaseConnection();
		}

		return mimeType;
	}

	private String getContent(final String url) throws IOException {

		final Context cx = Context.enter();
		cx.setOptimizationLevel(-1);
		cx.setLanguageVersion(Context.VERSION_1_5);

		// final Global global = Main.getGlobal();
		// global.init(cx);

		final ScriptableObject scope = cx.initStandardObjects();

		final String envjs = IOUtils.toString(getClass().getResourceAsStream(
				"/env.rhino.js"));
		final String readabilityjs = IOUtils.toString(getClass()
				.getResourceAsStream("/readability.js"));
		final String printFunction = "function print(message) {java.lang.System.out.println(message);}";

		cx.evaluateString(scope, printFunction, "print", 1, null);
		cx.evaluateString(scope, envjs, "env.rhino.js", 1, null);

		cx.evaluateString(scope, "window.location = '" + url + "';", "", 1,
				null);
		cx.evaluateString(scope, readabilityjs, "readability.js", 1, null);
		cx.evaluateString(
				scope,
				"var results = document.getElementById('readability-content').textContent;",
				"", 1, null);

		final String results = Context.toString(scope.get("results", scope));

		// TODO: handle unreadable pages:
		// Sorry, readability was unable to parse this page for content. If you
		// feel like it should have been able to, please let us know by
		// submitting an issue.Also, please note that Readability does not play
		// very nicely with front pages. Readability is intended to work on
		// articles with a sizable chunk of text that you'd like to read
		// comfortably. If you're using Readability on a landing page (like
		// nytimes.com for example), please click into an article first before
		// using Readability.
		System.out.println("================================================");
		System.out.println(results);
		System.out.println("================================================");

		Context.exit();

		return results;
	}
}
