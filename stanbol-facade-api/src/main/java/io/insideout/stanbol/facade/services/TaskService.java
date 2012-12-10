package io.insideout.stanbol.facade.services;

import io.insideout.stanbol.facade.models.ContentItemBag;
import io.insideout.stanbol.facade.models.TaskRequest;

import java.io.IOException;
import java.io.OutputStream;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.apache.clerezza.rdf.core.MGraph;
import org.apache.clerezza.rdf.core.serializedform.Serializer;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.stanbol.enhancer.servicesapi.Chain;
import org.apache.stanbol.enhancer.servicesapi.ChainManager;
import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.ContentItemFactory;
import org.apache.stanbol.enhancer.servicesapi.EnhancementException;
import org.apache.stanbol.enhancer.servicesapi.EnhancementJobManager;
import org.apache.stanbol.enhancer.servicesapi.impl.StringSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate = true)
@Service
public class TaskService implements TaskServiceInterface {

	@Reference
	private ContentItemFactory contentItemFactory;

	@Reference
	private EnhancementJobManager enhancementJobManager;

	@Reference
	private ChainManager chainManager;

	@Reference
	private Serializer serializer;

	@Override
	public ContentItem create(final TaskRequest taskRequest)
			throws IOException, EnhancementException {
		logger.trace("A task request has been received.");

		final ContentItem contentItem = contentItemFactory
				.createContentItem(new StringSource(taskRequest.getContent()));

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
