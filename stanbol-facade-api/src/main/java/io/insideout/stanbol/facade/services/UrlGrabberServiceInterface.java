package io.insideout.stanbol.facade.services;

import io.insideout.stanbol.facade.exceptions.ContentTypeNotSupportedException;

import java.io.IOException;

public interface UrlGrabberServiceInterface {

	public String get(final String url)
			throws ContentTypeNotSupportedException, IOException;

}