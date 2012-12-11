package io.insideout.stanbol.facade.exceptions;

public class InvalidTaskRequestException extends Exception {

	public InvalidTaskRequestException() {
		super("The Task Request is invalid.");
	}

	private static final long serialVersionUID = 719201053563480409L;

}
