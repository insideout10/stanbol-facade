package io.insideout.stanbol.facade.exceptions;

public class UnsupportedMimeTypeException extends Exception {

	public UnsupportedMimeTypeException(final String mimeType) {
		super(String.format("The mime type [ mimeType :: %s ] is unsupported.",
				mimeType));
	}

	private static final long serialVersionUID = -6166073967626357553L;

}
