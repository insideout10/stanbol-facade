package io.insideout.stanbol.facade.resources;

import io.insideout.stanbol.facade.exceptions.InvalidTaskRequestException;
import io.insideout.stanbol.facade.exceptions.UnsupportedMimeTypeException;
import io.insideout.stanbol.facade.models.TaskRequest;
import io.insideout.stanbol.facade.services.StanbolFacadeApplication;
import io.insideout.stanbol.facade.services.TaskServiceInterface;

import java.io.IOException;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.EnhancementException;
import org.apache.tika.exception.TikaException;
import org.xml.sax.SAXException;

@Path("/tasks")
public class TaskResource {

	@Context
	private Application application;

	@POST
	public Response create(final TaskRequest taskRequest) throws IOException,
			EnhancementException, IllegalStateException, InvalidTaskRequestException, UnsupportedMimeTypeException, SAXException, TikaException {

		final TaskServiceInterface taskService = getService(TaskServiceInterface.class);
		final ContentItem contentItem = taskService.create(taskRequest);
		final String mimeType = taskRequest.getMimeType();

		return taskService.writeContentItemToResponse(contentItem, mimeType);
	}

	private <T> T getService(Class<T> clazz) {
		return ((StanbolFacadeApplication) application).getService(clazz);
	}

}
