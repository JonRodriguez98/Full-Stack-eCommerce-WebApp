package com.luv2code.ecommerce.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.data.auditing.AuditableBeanWrapperFactory;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.mapping.LinkCollector;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.ecommerce.model.Product;
import com.luv2code.ecommerce.model.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		//Array of unsupported Actions for V.1.0
		HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		//disable the unsupported HTTP Methods for ProductCategory.
		config.getExposureConfiguration().forDomainType(ProductCategory.class).withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
		.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
		//disable the unsupported HTTP Methods for Products.
				config.getExposureConfiguration().forDomainType(Product.class).withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

	@Override
	public void configureConversionService(ConfigurableConversionService conversionService) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureConversionService(conversionService);
	}

	@Override
	public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureValidatingRepositoryEventListener(validatingListener);
	}

	@Override
	public void configureExceptionHandlerExceptionResolver(ExceptionHandlerExceptionResolver exceptionResolver) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureExceptionHandlerExceptionResolver(exceptionResolver);
	}

	@Override
	public void configureHttpMessageConverters(List<HttpMessageConverter<?>> messageConverters) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureHttpMessageConverters(messageConverters);
	}

	@Override
	public void configureJacksonObjectMapper(ObjectMapper objectMapper) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureJacksonObjectMapper(objectMapper);
	}

	@Override
	public AuditableBeanWrapperFactory customizeAuditableBeanWrapperFactory(AuditableBeanWrapperFactory factory) {
		// TODO Auto-generated method stub
		return RepositoryRestConfigurer.super.customizeAuditableBeanWrapperFactory(factory);
	}

	@Override
	public LinkCollector customizeLinkCollector(LinkCollector collector) {
		// TODO Auto-generated method stub
		return RepositoryRestConfigurer.super.customizeLinkCollector(collector);
	}
	

}
