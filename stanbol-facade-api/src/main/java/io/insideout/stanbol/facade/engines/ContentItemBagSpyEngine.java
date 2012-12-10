package io.insideout.stanbol.facade.engines;

import io.insideout.stanbol.facade.models.ContentItemBag;

import java.util.Collections;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.ConfigurationPolicy;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.stanbol.enhancer.servicesapi.ContentItem;
import org.apache.stanbol.enhancer.servicesapi.EngineException;
import org.apache.stanbol.enhancer.servicesapi.EnhancementEngine;
import org.apache.stanbol.enhancer.servicesapi.ServiceProperties;
import org.apache.stanbol.enhancer.servicesapi.impl.AbstractEnhancementEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(policy = ConfigurationPolicy.IGNORE, specVersion = "1.1", metatype = true, immediate = true, inherit = true)
@Service
@Properties(value = { @Property(name = EnhancementEngine.PROPERTY_NAME, value = "ContentItemBagSpyEngine") })
public class ContentItemBagSpyEngine extends
		AbstractEnhancementEngine<RuntimeException, RuntimeException> implements
		EnhancementEngine, ServiceProperties {

	public static final Integer defaultOrder = 0;

	@Override
	public Map<String, Object> getServiceProperties() {
		return Collections.unmodifiableMap(Collections.singletonMap(
				ENHANCEMENT_ENGINE_ORDERING, (Object) defaultOrder));
	}

	@Override
	public int canEnhance(ContentItem contentItem) throws EngineException {
		return (contentItem instanceof ContentItemBag ? ENHANCE_ASYNC
				: CANNOT_ENHANCE);
	}

	@Override
	public void computeEnhancements(ContentItem contentItem)
			throws EngineException {
		final ContentItemBag contentItemBag = (ContentItemBag) contentItem;

		if (null != contentItemBag.getConfiguration()) {
			final Map<String, String> configuration = contentItemBag
					.getConfiguration();

			for (final Entry<String, String> parameter : configuration
					.entrySet()) {
				logger.info(String.format(
						"Parameter [ key :: %s ][ value :: %s ].",
						parameter.getKey(), parameter.getValue()));
			}
		}

	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

}
