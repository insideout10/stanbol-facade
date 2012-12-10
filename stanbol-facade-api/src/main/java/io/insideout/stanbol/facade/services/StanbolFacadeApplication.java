package io.insideout.stanbol.facade.services;

import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sun.jersey.api.core.PackagesResourceConfig;

public class StanbolFacadeApplication extends PackagesResourceConfig {

	private BundleContext bundleContext;

	public StanbolFacadeApplication(final BundleContext bundleContext,
			final String... packages) {
		super(packages);

		this.bundleContext = bundleContext;
	}

	public BundleContext getBundleContext() {
		return bundleContext;
	}

	@SuppressWarnings("unchecked")
	public <T> T getService(Class<T> clazz) {
		final ServiceReference serviceReference = bundleContext
				.getServiceReference(clazz.getName());

		if (null == serviceReference) {
			final String message = String.format(
					"Cannot file a reference to the class [%s].",
					clazz.getName());
			logger.error(message);
			throw new RuntimeException(message);
		}

		return (T) bundleContext.getService(serviceReference);
	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

}
