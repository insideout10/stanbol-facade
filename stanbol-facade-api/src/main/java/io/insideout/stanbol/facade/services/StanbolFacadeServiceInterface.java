package io.insideout.stanbol.facade.services;

import org.osgi.framework.BundleContext;

public interface StanbolFacadeServiceInterface {

	public abstract void activate(BundleContext context) throws Exception;

	public abstract void deactivate(BundleContext context) throws Exception;

}