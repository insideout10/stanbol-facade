package io.insideout.stanbol.facade.services;

import javax.ws.rs.core.Application;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.ConfigurationPolicy;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Service;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sun.jersey.spi.container.servlet.ServletContainer;

@Component(immediate = true, policy = ConfigurationPolicy.IGNORE)
@Service
public class StanbolFacadeService implements StanbolFacadeServiceInterface {

	private final static String API_URL = "/api";
	private final static String[] API_RESOURCES_PACKAGES = {
			"io.insideout.stanbol.facade.resources",
			"io.insideout.stanbol.facade.providers" };

	private HttpService getHttpService(final BundleContext context) {
		ServiceReference serviceReference = context
				.getServiceReference(HttpService.class.getName());
		if (null == serviceReference) {
			String message = "Cannot get a service reference to the HttpService class. Is the HttpService installed in the OSGI container?\nThe APIs will not be available.";
			logger.error(message);
			throw new RuntimeException(message);
		}

		return (HttpService) context.getService(serviceReference);
	}

	@Override
	@Activate
	public void activate(final BundleContext context) throws Exception {

		final Application application = new StanbolFacadeApplication(context,
				API_RESOURCES_PACKAGES);

		final ServletContainer servletContainer = new ServletContainer(
				application);
		getHttpService(context).registerServlet(API_URL, servletContainer,
				null, null);
	}

	@Override
	@Deactivate
	public void deactivate(BundleContext context) throws Exception {
		getHttpService(context).unregister(API_URL);
	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

}