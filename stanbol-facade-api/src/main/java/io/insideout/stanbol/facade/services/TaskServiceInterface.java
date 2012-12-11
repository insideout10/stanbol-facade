package io.insideout.stanbol.facade.services;

import io.insideout.stanbol.facade.exceptions.InvalidTaskRequestException;
import io.insideout.stanbol.facade.exceptions.UnsupportedMimeTypeException;
import io.insideout.stanbol.facade.models.TaskRequest;

import java.io.IOException;

import javax.ws.rs.core.Response;

import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.EnhancementException;
import org.apache.tika.exception.TikaException;
import org.xml.sax.SAXException;

public interface TaskServiceInterface {

	public abstract ContentItem create(TaskRequest taskRequest)
			throws IOException, EnhancementException,
			InvalidTaskRequestException, IllegalStateException,
			UnsupportedMimeTypeException, SAXException, TikaException;

	public abstract Response writeContentItemToResponse(
			ContentItem contentItem, String mimeType);

}