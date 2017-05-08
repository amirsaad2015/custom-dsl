/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Container } from "inversify";
import { TheiaApplication, browserApplicationModule } from "theia/lib/application/browser";
import { messagingModule } from "theia/lib/messaging/browser";
import { navigatorModule } from "theia/lib/navigator/browser";
import { fileSystemClientModule } from "theia/lib/filesystem/browser";
import { editorModule } from "theia/lib/editor/browser";
import { browserLanguagesModule } from 'theia/lib/languages/browser';
import { monacoModule } from 'theia/lib/monaco/browser';
import "theia/src/application/browser/style/index.css";
import "theia/src/monaco/browser/style/index.css";
import "theia/src/navigator/browser/style/index.css";
import "theia/src/terminal/browser/terminal.css";

// terminal extension
import terminalFrontendModule from 'theia/lib/terminal/browser/terminal-frontend-module'
import "xterm/dist/xterm.css";

import dslFrontendModule from 'theia-dsl-extension/lib/browser/frontend-extension'

export function start(clientContainer?: Container) {

    // Create the common client container.
    const container = new Container();
    container.load(browserApplicationModule);
    container.load(messagingModule);
    container.load(navigatorModule);
    container.load(fileSystemClientModule);
    container.load(editorModule);
    container.load(browserLanguagesModule);
    container.load(monacoModule);

    // terminal extension
    container.load(terminalFrontendModule);

    container.load(dslFrontendModule);

    // Merge the common container with the client specific one. If any.
    const mainContainer = clientContainer ? Container.merge(container, clientContainer) : container;

    // Obtain application and start.
    const application = mainContainer.get(TheiaApplication);
    application.start(mainContainer);
}