package io.insideout.stanbol.facade.exceptions;

public class ContentTypeNotSupportedException extends Exception {

	public ContentTypeNotSupportedException(final String contentType) {
		super(String.format(
				"The content type is not supported [ contentType :: %s ].",
				contentType));
	}

	private static final long serialVersionUID = 8643836624086426689L;

}
