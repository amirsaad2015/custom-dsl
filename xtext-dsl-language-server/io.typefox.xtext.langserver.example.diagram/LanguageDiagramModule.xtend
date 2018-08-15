package io.typefox.xtext.langserver.example.diagram

import io.typefox.sprotty.server.xtext.DefaultDiagramModule
import io.typefox.sprotty.server.xtext.IDiagramGenerator

class TestLanguageDiagramModule extends DefaultDiagramModule {
	
	override bindILanguageServerExtension() {
		TestDiagramLanguageServerExtension
	}
	
	def Class<? extends IDiagramGenerator> bindIDiagramGenerator() {
		TestLanguageDiagramGenerator
	}
	
}