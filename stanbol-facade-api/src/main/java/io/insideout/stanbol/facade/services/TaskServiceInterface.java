package io.insideout.stanbol.facade.services;

import io.insideout.stanbol.facade.models.TaskRequest;

import java.io.IOException;

import javax.ws.rs.core.Response;

import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.EnhancementException;

public interface TaskServiceInterface {

	public abstract ContentItem create(TaskRequest taskRequest)
			throws IOException, EnhancementException;

	public abstract Response writeContentItemToResponse(
			ContentItem contentItem, String mimeType);

}