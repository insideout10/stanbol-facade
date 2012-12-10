package io.insideout.stanbol.facade.models;

import java.io.InputStream;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;

import org.apache.clerezza.rdf.core.MGraph;
import org.apache.clerezza.rdf.core.UriRef;
import org.apache.stanbol.enhancer.servicesapi.Blob;
import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.NoSuchPartException;

public class ContentItemBag implements ContentItem {

	private ContentItem contentItem;
	private Map<String, String> configuration;

	public ContentItemBag(final ContentItem contentItem,
			final Map<String, String> configuration) {
		this.contentItem = contentItem;
		this.configuration = configuration;
	}

	public Map<String, String> getConfiguration() {
		return configuration;
	}

	@Override
	public UriRef getUri() {
		return contentItem.getUri();
	}

	@Override
	public InputStream getStream() {
		return contentItem.getStream();
	}

	@Override
	public String getMimeType() {
		return contentItem.getMimeType();
	}

	@Override
	public ReadWriteLock getLock() {
		return contentItem.getLock();
	}

	@Override
	public MGraph getMetadata() {
		return contentItem.getMetadata();
	}

	@Override
	public Blob getBlob() {
		return contentItem.getBlob();
	}

	@Override
	public <T> T getPart(int index, Class<T> clazz) throws NoSuchPartException {
		return contentItem.getPart(index, clazz);
	}

	@Override
	public <T> T getPart(UriRef uri, Class<T> clazz) throws NoSuchPartException {
		return contentItem.getPart(uri, clazz);
	}

	@Override
	public UriRef getPartUri(int index) throws NoSuchPartException {
		return contentItem.getPartUri(index);
	}

	@Override
	public Object addPart(UriRef uriRef, Object object) {
		return contentItem.addPart(uriRef, object);
	}

	@Override
	public void removePart(int index) {
		contentItem.removePart(index);
	}

	@Override
	public void removePart(UriRef uriRef) {
		contentItem.removePart(uriRef);
	}

}
